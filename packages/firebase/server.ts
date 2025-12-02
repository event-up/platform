import { cert, initializeApp } from "firebase-admin/app";
import { env } from "./env";
import { Firestore, getFirestore } from "firebase-admin/firestore";
import { Auth, getAuth } from "firebase-admin/auth";
import { Storage, getStorage } from "firebase-admin/storage";

const isRunningInGoogleCloud =
  !!process.env.FUNCTION_TARGET || !!process.env.FIREBASE_CONFIG;

const serverApp = !isRunningInGoogleCloud
  ? initializeApp({
      credential: cert(JSON.parse(env().FIREBASE_PRIVATE_KEY)),
    })
  : initializeApp();

export const serverDb: Firestore = getFirestore(serverApp);
export const serverAuth: Auth = getAuth(serverApp);
export const serverStorage: Storage = getStorage(serverApp);
export { serverApp };
