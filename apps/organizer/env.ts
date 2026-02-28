import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        FIREBASE_PROJECT_ID: z.string().min(1),
        FIREBASE_CLIENT_EMAIL: z.string().email(),
        FIREBASE_STORAGE_BUCKET: z.string().min(1),
        GOOGLE_APPLICATION_CREDENTIALS: z.string().min(1),
        NOTIFYLK_USER_ID: z.string().min(1),
        NOTIFYLK_API_KEY: z.string().min(1),
        NOTIFYLK_URL: z.string().url(),
        NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    },
    client: {
        NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1),
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1),
        NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1),
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().min(1),
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1),
        NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1),
        NEXT_PUBLIC_ORGANIZER_PORTAL_BASE_PATH: z.string().url(),
    },
    runtimeEnv: {
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
        FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
        FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
        GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        NOTIFYLK_USER_ID: process.env.NOTIFYLK_USER_ID,
        NOTIFYLK_API_KEY: process.env.NOTIFYLK_API_KEY,
        NOTIFYLK_URL: process.env.NOTIFYLK_URL,
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        NEXT_PUBLIC_ORGANIZER_PORTAL_BASE_PATH: process.env.NEXT_PUBLIC_ORGANIZER_PORTAL_BASE_PATH,
    },
});
