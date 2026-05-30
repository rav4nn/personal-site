// app/api/visitors/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "app/db/redis";
import { registerNewVisitor, lookupVisitor } from "app/lib/visitorCounter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST { id?: string }
//  - known id  -> return the existing record, do NOT increment
//  - no/unknown id -> register a new visitor
// Always fails soft: any missing-config or Redis error returns { ok: false } so
// the page is never broken by the counter.
export async function POST(request: Request) {
  const redis = getRedis();
  if (!redis) return NextResponse.json({ ok: false });

  try {
    const body = (await request.json().catch(() => ({}))) as { id?: unknown };
    const id = typeof body.id === "string" ? body.id : null;

    if (id) {
      const existing = await lookupVisitor(redis, id);
      if (existing) return NextResponse.json({ ok: true, ...existing });
    }

    const record = await registerNewVisitor(redis, () => crypto.randomUUID());
    return NextResponse.json({ ok: true, ...record });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
