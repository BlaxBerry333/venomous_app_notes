import { createClient, type RedisClientType } from "redis";

const config = useRuntimeConfig();

const redisClient: RedisClientType = createClient({
  socket: {
    host: config.db.redisHost,
    port: config.db.redisPort,
    timeout: 5000,
  },
});

export async function getRedisClient(): Promise<RedisClientType> {
  return redisClient;
}

export function closeRedisClient() {
  redisClient.quit();
}

/**
 * 设置 Redis 中的键值对
 * @param key {string} 键名
 * @param value {unknown} 值
 * @param ttl {number | null} 过期时间
 */
export async function setRedisKey<T>(
  key: string,
  value: T,
  ttl: number | null = null,
): Promise<void> {
  await redisClient.set(key, JSON.stringify(value));

  if (ttl) {
    await redisClient.expire(key, ttl);
  }
}

/**
 * 获取 Redis 中的键值对
 * @param key {string} 键名
 */
export async function getRedisKey<T>(key: string): Promise<T> {
  return JSON.parse((await redisClient.get(key)) || "null") as T;
}

/**
 * 删除 Redis 中的键值对
 * @param key {string} 键名
 */
export async function deleteRedisKey(key: string): Promise<void> {
  await redisClient.del(key);
}