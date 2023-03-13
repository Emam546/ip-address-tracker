/* eslint-disable node/no-process-env */

import { NodeEnvs } from "../enums";

export default {
  nodeEnv: (process.env.NODE_ENV ?? NodeEnvs.Dev) as NodeEnvs,
  port: (process.env.PORT ?? 0),
  API_KEY:(process.env.API_KEY ?? ""),
} as const;
