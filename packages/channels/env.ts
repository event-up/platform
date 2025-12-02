import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
const isDev = true; //= process.env.FUNCTIONS_EMULATOR === "true";
console.log("isDev:", { isDev, pro: process.env.FUNCTIONS_EMULATOR });

export const env = createEnv({
  server: {
    NOTIFYLK_API_KEY: isDev ? z.string().optional() : z.string(),
    NOTIFYLK_USER_ID: isDev ? z.string().optional() : z.string(),
    NOTIFYLK_URL: isDev ? z.string().optional() : z.string(),
  },

  runtimeEnv: process.env,
});
