// app/lib/visitorCounter.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  VISITOR_SEED,
  registerNewVisitor,
  lookupVisitor,
  type RedisLike,
} from "./visitorCounter";

// In-memory Redis double that honours the subset of commands we use.
function makeFakeRedis(): RedisLike & { dump: () => Map<string, number | string> } {
  const store = new Map<string, number | string>();
  return {
    async set(key, value, opts) {
      if (opts?.nx && store.has(key)) return null;
      store.set(key, value);
      return "OK";
    },
    async incr(key) {
      const next = Number(store.get(key) ?? 0) + 1;
      store.set(key, next);
      return next;
    },
    async get(key) {
      return store.has(key) ? (store.get(key) as number | string) : null;
    },
    dump: () => store,
  };
}

test("seed is 1204", () => {
  assert.equal(VISITOR_SEED, 1204);
});

test("first new visitor is seed + 1 and gets a stored record", async () => {
  const redis = makeFakeRedis();
  let n = 0;
  const record = await registerNewVisitor(redis, () => `id-${++n}`);
  assert.deepEqual(record, { id: "id-1", number: 1205 });
  assert.equal(redis.dump().get("visitors:count"), 1205);
  assert.equal(redis.dump().get("visitor:id-1"), 1205);
});

test("subsequent visitors increment without re-seeding", async () => {
  const redis = makeFakeRedis();
  let n = 0;
  const make = () => `id-${++n}`;
  const a = await registerNewVisitor(redis, make);
  const b = await registerNewVisitor(redis, make);
  assert.equal(a.number, 1205);
  assert.equal(b.number, 1206);
  assert.notEqual(a.id, b.id);
});

test("seed is only applied once even if count already exists", async () => {
  const redis = makeFakeRedis();
  await redis.set("visitors:count", 5000);
  const record = await registerNewVisitor(redis, () => "id-x");
  assert.equal(record.number, 5001); // incremented, not reset to seed
});

test("lookupVisitor returns the stored record for a known id", async () => {
  const redis = makeFakeRedis();
  const created = await registerNewVisitor(redis, () => "known");
  const found = await lookupVisitor(redis, "known");
  assert.deepEqual(found, created);
});

test("lookupVisitor returns null for an unknown id", async () => {
  const redis = makeFakeRedis();
  const found = await lookupVisitor(redis, "missing");
  assert.equal(found, null);
});

test("lookupVisitor coerces a string-encoded number (real Redis behavior)", async () => {
  const redis = makeFakeRedis();
  await redis.set("visitor:str", "1300" as unknown as number);
  const found = await lookupVisitor(redis, "str");
  assert.deepEqual(found, { id: "str", number: 1300 });
});
