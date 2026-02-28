import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    },
    client: {
        NEXT_PUBLIC_ORGANIZER_PORTAL_BASE_PATH: z.string().url(),
        NEXT_PUBLIC_CONTACT_PHONE: z.string().default("+94 71 123 4567"),
    },
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_ORGANIZER_PORTAL_BASE_PATH: process.env.NEXT_PUBLIC_ORGANIZER_PORTAL_BASE_PATH,
        NEXT_PUBLIC_CONTACT_PHONE: process.env.NEXT_PUBLIC_CONTACT_PHONE,
    },
});
