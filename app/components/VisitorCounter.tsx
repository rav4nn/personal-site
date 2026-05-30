// app/components/VisitorCounter.tsx
"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import { VISITOR_SEED } from "app/lib/visitorCounter";

const STORAGE_KEY = "visitorCounter";
const DISMISSED_KEY = "visitorCounterDismissed";

type Stored = { id: string; number: number };

function readStored(): Stored | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Stored;
    if (typeof parsed?.number === "number" && typeof parsed?.id === "string") {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

// Animated, comma-formatted number that rolls up to its final value once.
function RollingNumber({ value }: { value: number }) {
  const reduceMotion = useReducedMotion();
  const start = reduceMotion ? value : Math.max(VISITOR_SEED, value - 60);
  const count = useMotionValue(start);
  const text = useTransform(count, (v) =>
    Math.round(v).toLocaleString("en-US"),
  );

  useEffect(() => {
    if (reduceMotion) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, { duration: 0.9, ease: "easeOut" });
    return controls.stop;
  }, [value, reduceMotion, count]);

  return <motion.span>{text}</motion.span>;
}

export function VisitorCounter() {
  const [record, setRecord] = useState<Stored | null>(null);
  const [dismissed, setDismissed] = useState(true); // hidden until we decide to show
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    const wasDismissed = localStorage.getItem(DISMISSED_KEY) === "1";

    async function ensureRecord() {
      const existing = readStored();
      if (existing) {
        if (!cancelled) {
          setRecord(existing);
          setDismissed(wasDismissed);
        }
        return;
      }
      // New browser: register (counts the visit) even if previously dismissed,
      // so the global count stays accurate.
      try {
        const res = await fetch("/api/visitors", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({}),
        });
        const data = (await res.json()) as
          | { ok: true; id: string; number: number }
          | { ok: false };
        if (!data.ok) return; // soft-fail: render nothing
        const next = { id: data.id, number: data.number };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        if (!cancelled) {
          setRecord(next);
          setDismissed(wasDismissed);
        }
      } catch {
        // network error: render nothing
      }
    }

    void ensureRecord();
    return () => {
      cancelled = true;
    };
  }, []);

  function handleDismiss() {
    localStorage.setItem(DISMISSED_KEY, "1");
    setDismissed(true);
  }

  const show = record !== null && !dismissed;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="visitor-counter"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          transition={
            reduceMotion
              ? { duration: 0.15 }
              : { type: "spring", stiffness: 260, damping: 24 }
          }
          className="drama-shadow fixed right-4 z-50 flex items-center gap-2 rounded-full border border-border-primary bg-white px-3.5 py-2 text-[13px] text-text-secondary"
          style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
        >
          <span
            aria-hidden
            className="h-[7px] w-[7px] flex-none rounded-full bg-purple-primary shadow-[0_0_0_3px_rgba(108,71,255,0.15),0_0_10px_rgba(108,71,255,0.25)]"
          />
          <span className="hidden sm:inline">You&apos;re&nbsp;</span>
          <span className="font-mono font-semibold tabular-nums text-purple-primary">
            #<RollingNumber value={record!.number} />
          </span>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss visitor counter"
            className="-mr-1 ml-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full text-text-tertiary transition-colors hover:text-text-primary"
          >
            <svg viewBox="0 0 14 14" className="h-3 w-3" aria-hidden>
              <path
                d="M3.5 3.5l7 7M10.5 3.5l-7 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
