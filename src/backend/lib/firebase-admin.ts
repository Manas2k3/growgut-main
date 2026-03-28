import "server-only";

import { readFileSync } from "node:fs";
import path from "node:path";

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
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
