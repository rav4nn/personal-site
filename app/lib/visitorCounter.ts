// app/lib/visitorCounter.ts
// Pure, dependency-free visitor-counting helpers. No Next.js or Supabase imports
// here so it stays trivially unit-testable.
//
// The atomic seed/increment logic lives in Postgres (a sequence + the
// `register_visitor()` RPC), so this module's only real job is to validate and
// normalize the row the RPC returns. The sequence starts at VISITOR_SEED + 1,
// so the first registered visitor is #1205.

export const VISITOR_SEED = 1204;

export type VisitorRecord = {
  id: string;
  number: number;
};

// Validate + normalize a single row returned by register_visitor()/lookup_visitor().
// Postgres `bigint` arrives as a string over the wire, so `number` is coerced.
// Returns null for any malformed/missing input (callers treat null as "no record").
export function parseVisitorRow(row: unknown): VisitorRecord | null {
  if (row === null || typeof row !== "object") return null;
  const { id, number } = row as { id?: unknown; number?: unknown };
  if (typeof id !== "string") return null;
  if (typeof number !== "string" && typeof number !== "number") return null;
  const n = Number(number);
  if (!Number.isFinite(n)) return null;
  return { id, number: n };
}
