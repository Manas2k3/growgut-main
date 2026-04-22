import { type NextRequest, NextResponse } from "next/server";
import { getNextOrderId, saveOrder, type OrderPayload } from "@/backend/lib/firebase-admin";

// ─── POST /api/orders/save-cod ────────────────────────────────────────────────
// Saves a Cash on Delivery order. No Razorpay involved.
// Still validates all customer fields server-side.

function isValidIndianPhone(phone: string): boolean {
  return /^[6-9][0-9]{9}$/.test(phone.trim());
}
function isValidPincode(pincode: string): boolean {
  return /^[1-9][0-9]{5}$/.test(pincode.trim());
}

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
      orderDetails: {
        quantity: number;
        pricePerBox: number;
        totalAmount: number;
        promoCode?: string;
        discount?: number;
      };
      finalAmount: number;
    };

    const { customer, orderDetails, finalAmount } = body;

    // Server-side validation
    if (!customer?.name?.trim()) {
      return NextResponse.json({ error: "Full name is required." }, { status: 400 });
    }
    if (!isValidIndianPhone(customer?.phone ?? "")) {
      return NextResponse.json({ error: "A valid 10-digit Indian mobile number is required." }, { status: 400 });
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

    const orderId = await getNextOrderId();

    const orderPayload: OrderPayload = {
      orderId,
      status: "Pending COD",
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
        status: "Pending COD",
        amountPaid: finalAmount,
        paymentMethod: "cod",
        ...(orderDetails.promoCode ? { promoCode: orderDetails.promoCode } : {}),
        ...(orderDetails.discount != null ? { discount: orderDetails.discount } : {}),
      },
    };

    await saveOrder(orderPayload);

    console.info("[save-cod] COD order saved:", orderId);

    return NextResponse.json({ success: true, orderId });
  } catch (err) {
    console.error("[save-cod] Unexpected error:", err);
    return NextResponse.json({ error: "An unexpected error occurred. Please try again." }, { status: 500 });
  }
}
