import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

export const env = createEnv(
    {
        client: {

        },
        server: {
            SUPABASE_URL: z.string().url(),
            SUPABASE_ANON_KEY: z.string()
        },
        runtimeEnv: {
            SUPABASE_URL: process.env.SUPABASE_URL,
            SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY
        }
    }
)