import { createEnv } from "@t3-oss/env-core";
import { env as channelEnv } from "@workspace/channels/env";

export const env = createEnv({
  extends: [channelEnv],
  server: {},

  runtimeEnv: process.env,
});
