// app/lib/visitorCounter.ts
// Pure, Redis-agnostic visitor counting. No Next.js or Upstash imports here so
// it stays trivially unit-testable with an in-memory fake.

export const VISITOR_SEED = 1204;

const COUNT_KEY = "visitors:count";
const visitorKey = (id: string) => `visitor:${id}`;

export type VisitorRecord = {
  id: string;
  number: number;
};

// The subset of Redis commands this module needs. Both the real Upstash client
// and the test fake satisfy this shape.
export type RedisLike = {
  set(
    key: string,
    value: number,
    opts?: { nx?: boolean },
  ): Promise<unknown>;
  incr(key: string): Promise<number>;
  // Real Redis/Upstash clients may return the stored value as a string; callers coerce.
  get(key: string): Promise<string | number | null>;
};

// Register a brand-new visitor: seed the counter once, increment it, and persist
// the visitor's assigned number so return visits are stable.
export async function registerNewVisitor(
  redis: RedisLike,
  makeId: () => string,
): Promise<VisitorRecord> {
  await redis.set(COUNT_KEY, VISITOR_SEED, { nx: true });
  const number = await redis.incr(COUNT_KEY);
  const id = makeId();
  await redis.set(visitorKey(id), number);
  return { id, number };
}

// Look up an existing visitor by id. Returns null if we have no record for them.
export async function lookupVisitor(
  redis: RedisLike,
  id: string,
): Promise<VisitorRecord | null> {
  const raw = await redis.get(visitorKey(id));
  if (raw === null || raw === undefined) return null;
  const number = Number(raw);
  if (!Number.isFinite(number)) return null;
  return { id, number };
}
