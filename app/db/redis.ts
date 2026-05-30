// app/db/redis.ts
import { Redis } from "@upstash/redis";
import type { RedisLike } from "app/lib/visitorCounter";

// Returns an Upstash client, or null when env vars are absent (local dev without
// credentials, or a misconfigured deploy). Callers treat null as "counter off".
export function getRedis(): RedisLike | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token }) as unknown as RedisLike;
}
