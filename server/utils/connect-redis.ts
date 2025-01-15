import { getRedisClient } from "./handle-redis";
import { logProcessTime, logErrorMessage } from "./log-process-time";

export default async function connectRedis() {
  logProcessTime({
    processName: "Redis Connection",
    func: async () => {
      const client = await getRedisClient();

      client.on("error", (err) => {
        logErrorMessage("Redis Client Error");
        throw new Error((err as Error).message);
      });

      await client.connect();
    },
  });
}
