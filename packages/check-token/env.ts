import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

export const env = createEnv({
  client: {},
  server: {
    CHECKIN_TOKEN_SECRET: z.string(),
  },
  runtimeEnv: {
    CHECKIN_TOKEN_SECRET: process.env.CHECKIN_TOKEN_SECRET,
  },
});
