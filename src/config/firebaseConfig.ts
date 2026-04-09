import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const serviceAccount = JSON.parse(
    readFileSync(join(process.cwd(), "credentials.json"), "utf8")
) as ServiceAccount;

initializeApp({
    credential: cert(serviceAccount),
});

const auth: Auth = getAuth();
const db: Firestore = getFirestore();

export { auth, db };