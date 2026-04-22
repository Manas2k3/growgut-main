import { type NextRequest, NextResponse } from "next/server";
import { getNextOrderId } from "@/backend/lib/firebase-admin";

// ─── Input validation helpers ─────────────────────────────────────────────────

function isValidIndianPhone(phone: string): boolean {
  return /^[6-9][0-9]{9}$/.test(phone.trim());
}

function isValidPincode(pincode: string): boolean {
  return /^[1-9][0-9]{5}$/.test(pincode.trim());
}

function isValidEmail(email: string): boolean {
  if (!email) return true; // email is optional
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// ─── POST /api/orders/create-payment ─────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      customer: {
        name: string;
        email?: string;
        phone: string;
        address: string;
        city: string;
        state: string;
        pincode: string;
      };
      amountInPaise: number;
    };

    // ── Server-side validation ────────────────────────────────────────────────
    const { customer, amountInPaise } = body;

    if (!customer?.name?.trim()) {
      return NextResponse.json({ error: "Full name is required." }, { status: 400 });
    }
    if (!isValidIndianPhone(customer?.phone ?? "")) {
      return NextResponse.json({ error: "A valid 10-digit Indian mobile number is required." }, { status: 400 });
    }
    if (!isValidEmail(customer?.email ?? "")) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!customer?.address?.trim()) {
      return NextResponse.json({ error: "Delivery address is required." }, { status: 400 });
    }
    if (!isValidPincode(customer?.pincode ?? "")) {
      return NextResponse.json({ error: "A valid 6-digit pincode is required." }, { status: 400 });
    }
    if (!customer?.city?.trim() || !customer?.state?.trim()) {
      return NextResponse.json({ error: "City and state are required." }, { status: 400 });
    }
    if (!amountInPaise || amountInPaise < 100) {
      return NextResponse.json({ error: "Invalid order amount." }, { status: 400 });
    }

    // ── Razorpay credentials (server-side only) ───────────────────────────────
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error("[create-payment] Razorpay credentials not configured.");
      return NextResponse.json({ error: "Payment gateway is not configured." }, { status: 500 });
    }

    // ── Generate unique order ID (BC-XXXX) ────────────────────────────────────
    const orderId = await getNextOrderId();

    // ── Create Razorpay order via REST API ────────────────────────────────────
    const razorpayRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
      },
      body: JSON.stringify({
        amount: amountInPaise,          // Razorpay expects paise
        currency: "INR",
        receipt: orderId,               // BC-XXXX used as Razorpay receipt
        notes: {
          growgut_order_id: orderId,
          customer_name: customer.name,
          customer_phone: customer.phone,
        },
      }),
    });

    if (!razorpayRes.ok) {
      const err = await razorpayRes.text();
      console.error("[create-payment] Razorpay API error:", err);
      return NextResponse.json({ error: "Failed to initiate payment. Please try again." }, { status: 502 });
    }

    const razorpayOrder = await razorpayRes.json() as {
      id: string;
      amount: number;
      currency: string;
    };

    return NextResponse.json({
      razorpayOrderId: razorpayOrder.id,
      orderId,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (err) {
    console.error("[create-payment] Unexpected error:", err);
    return NextResponse.json({ error: "An unexpected error occurred. Please try again." }, { status: 500 });
  }
}
