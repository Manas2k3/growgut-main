import "server-only";

import { readFileSync } from "node:fs";
import path from "node:path";

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import type { ServiceAccount } from "firebase-admin";

import type { GrowGutProduct } from "../../shared/types/product";

const defaultServiceAccountPath = path.join(process.cwd(), "service-account.json");

function resolveServiceAccountPath() {
  const configuredPath =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ?? defaultServiceAccountPath;

  return path.isAbsolute(configuredPath)
    ? configuredPath
    : path.join(process.cwd(), configuredPath);
}

function getFirebaseAdminApp() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  let serviceAccount: ServiceAccount;

  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT) as ServiceAccount;
  } else {
    const serviceAccountPath = resolveServiceAccountPath();
    serviceAccount = JSON.parse(
      readFileSync(serviceAccountPath, "utf8"),
    ) as ServiceAccount;
  }

  return initializeApp({
    credential: cert(serviceAccount),
  });
}

const firestore = getFirestore(getFirebaseAdminApp());

export async function getProductData(): Promise<GrowGutProduct> {
  const snapshot = await firestore
    .collection("products")
    .where("is_active", "==", true)
    .limit(1)
    .get();

  if (snapshot.empty) {
    throw new Error("No active product found in the products collection.");
  }

  return snapshot.docs[0].data() as GrowGutProduct;
}

// ─── Order types ──────────────────────────────────────────────────────────────

export interface OrderPayload {
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  order: {
    product: string;
    quantity: number;
    pricePerBox: number;
    totalAmount: number;
  };
  payment: {
    status: "Confirmed" | "Pending COD" | "Failed";
    amountPaid: number;
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    paymentMethod: "online" | "cod";
    promoCode?: string;
    discount?: number;
  };
  orderId: string;
  status: "Confirmed" | "Pending COD" | "Failed";
}

// ─── Atomic order-ID counter ──────────────────────────────────────────────────

/**
 * Atomically increments the global order counter and returns the next
 * order ID in the format "BC-XXXX" (zero-padded to 4 digits).
 */
export async function getNextOrderId(): Promise<string> {
  const counterRef = firestore.collection("meta").doc("orderCounter");

  const nextNumber = await firestore.runTransaction(async (tx) => {
    const snap = await tx.get(counterRef);
    const current = snap.exists ? (snap.data()?.count as number) : 96;
    const next = current + 1;
    tx.set(counterRef, { count: next }, { merge: true });
    return next;
  });

  return `BC-${String(nextNumber).padStart(4, "0")}`;
}

// ─── Save order to Firestore ──────────────────────────────────────────────────

/**
 * Writes a verified order to the "Orders" collection.
 * Only called after server-side HMAC signature verification.
 */
export async function saveOrder(payload: OrderPayload): Promise<void> {
  const now = new Date().toISOString();

  await firestore.collection("Orders").doc(payload.orderId).set({
    ...payload,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: now,
  });
}
