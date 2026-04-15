import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "../../credentials.json";
 
initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});
 
export const db = getFirestore();
export const auth = getAuth();