import { createHmac, timingSafeEqual } from "node:crypto";
import { type NextRequest, NextResponse } from "next/server";
import { saveOrder, type OrderPayload } from "@/backend/lib/firebase-admin";

// ─── POST /api/orders/verify-payment ─────────────────────────────────────────
//
// Security model:
//   1. Razorpay signs every successful payment with HMAC-SHA256.
//      signature = HMAC_SHA256(key_secret, razorpay_order_id + "|" + razorpay_payment_id)
//   2. We verify this server-side. A wrong/missing signature → 400, nothing written.
//   3. Firestore write happens ONLY after the signature is verified.
//   4. Uses timingSafeEqual to prevent timing-based bypass attacks.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      razorpayOrderId: string;
      razorpayPaymentId: string;
      razorpaySignature: string;
      orderId: string;
      customer: {
        name: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        state: string;
        pincode: string;
      };
      orderDetails: {
        quantity: number;
        pricePerBox: number;
        totalAmount: number;
        promoCode?: string;
        discount?: number;
        paymentMethod: "online" | "cod";
      };
      amountPaidInPaise: number;
    };

    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      orderId,
      customer,
      orderDetails,
      amountPaidInPaise,
    } = body;

    // ── Presence check ────────────────────────────────────────────────────────
    if (
      !razorpayOrderId?.trim() ||
      !razorpayPaymentId?.trim() ||
      !razorpaySignature?.trim() ||
      !orderId?.trim()
    ) {
      return NextResponse.json({ error: "Invalid payment callback payload." }, { status: 400 });
    }

    // ── HMAC-SHA256 signature verification ────────────────────────────────────
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      console.error("[verify-payment] RAZORPAY_KEY_SECRET not configured.");
      return NextResponse.json({ error: "Payment verification service unavailable." }, { status: 500 });
    }

    const expectedSig = createHmac("sha256", keySecret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    // Constant-time comparison prevents timing attacks
    const sigBuffer = Buffer.from(razorpaySignature, "hex");
    const expectedBuffer = Buffer.from(expectedSig, "hex");

    const isValid =
      sigBuffer.length === expectedBuffer.length &&
      timingSafeEqual(sigBuffer, expectedBuffer);

    if (!isValid) {
      console.warn("[verify-payment] Signature mismatch — possible tampered request.", {
        orderId,
        razorpayOrderId,
      });
      return NextResponse.json({ error: "Payment verification failed. Signature mismatch." }, { status: 400 });
    }

    // ── Build and save the order document ────────────────────────────────────
    const amountPaidInRupees = amountPaidInPaise / 100;

    const orderPayload: OrderPayload = {
      orderId,
      status: "Confirmed",
      customer: {
        name: customer.name.trim(),
        email: customer.email?.trim() ?? "",
        phone: customer.phone.trim(),
        address: customer.address.trim(),
        city: customer.city.trim(),
        state: customer.state.trim(),
        pincode: customer.pincode.trim(),
      },
      order: {
        product: "GrowGut Synbiotic",
        quantity: orderDetails.quantity,
        pricePerBox: orderDetails.pricePerBox,
        totalAmount: orderDetails.totalAmount,
      },
      payment: {
        status: "Confirmed",
        amountPaid: amountPaidInRupees,
        razorpayOrderId,
        razorpayPaymentId,
        paymentMethod: orderDetails.paymentMethod,
        ...(orderDetails.promoCode ? { promoCode: orderDetails.promoCode } : {}),
        ...(orderDetails.discount != null ? { discount: orderDetails.discount } : {}),
      },
    };

    await saveOrder(orderPayload);

    console.info("[verify-payment] Order saved successfully:", orderId);

    return NextResponse.json({ success: true, orderId });
  } catch (err) {
    console.error("[verify-payment] Unexpected error:", err);
    return NextResponse.json({ error: "An unexpected error occurred during payment verification." }, { status: 500 });
  }
}
