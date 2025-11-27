import { cert, initializeApp } from "firebase-admin/app";
import { env } from "./env";
import { Firestore, getFirestore } from "firebase-admin/firestore";
import { Auth, getAuth } from "firebase-admin/auth";
import { Storage, getStorage } from "firebase-admin/storage";
const serviceAccount = env().FIREBASE_PRIVATE_KEY;
const serviceAccountjson = JSON.parse(serviceAccount);
const serverApp = initializeApp({
  credential: cert(serviceAccountjson),
});

export const serverDb: Firestore = getFirestore(serverApp);
export const serverAuth: Auth = getAuth(serverApp);
export const serverStorage: Storage = getStorage(serverApp);
export { serverApp };
