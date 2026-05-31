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
// `skip` (reduced motion, or tab hidden so rAF is paused) jumps straight to the
// final value instead of animating — otherwise the count-up would stall at its
// start value and display the wrong number.
function RollingNumber({ value, skip }: { value: number; skip?: boolean }) {
  const reduceMotion = useReducedMotion();
  const noAnim = skip || reduceMotion;
  const start = noAnim ? value : Math.max(VISITOR_SEED, value - 60);
  const count = useMotionValue(start);
  const text = useTransform(count, (v) =>
    Math.round(v).toLocaleString("en-US"),
  );

  useEffect(() => {
    if (noAnim) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, { duration: 0.9, ease: "easeOut" });
    return controls.stop;
  }, [value, noAnim, count]);

  return <motion.span>{text}</motion.span>;
}

export function VisitorCounter() {
  const [record, setRecord] = useState<Stored | null>(null);
  const [dismissed, setDismissed] = useState(true); // hidden until we decide to show
  // When the tab is backgrounded at reveal time, framer-motion's rAF-driven
  // entrance is paused, which would leave the pill stuck invisible until focus.
  // In that case we skip the animation and render at the final state instead.
  const [skipEnter, setSkipEnter] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    const wasDismissed = localStorage.getItem(DISMISSED_KEY) === "1";

    async function ensureRecord() {
      const existing = readStored();
      if (existing) {
        if (!cancelled) {
          if (document.hidden) setSkipEnter(true);
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
          if (document.hidden) setSkipEnter(true);
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
          // initial={false} renders straight at the `animate` state with no
          // entrance tween — used when the tab is hidden (rAF is paused) so the
          // pill is guaranteed visible the moment the tab is foregrounded.
          initial={
            skipEnter ? false : reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }
          }
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          transition={
            reduceMotion
              ? { duration: 0.15 }
              : { type: "spring", stiffness: 260, damping: 24 }
          }
          /* `!fixed` overrides the `position: relative` from the `.drama-shadow`
             utility (defined after @tailwind utilities, so it would otherwise win
             and drop the pill into normal flow at full width). `w-fit` keeps it
             pill-width regardless of the flow context. */
          className="drama-shadow !fixed right-4 z-50 flex w-fit items-center gap-2 rounded-full border border-border-primary bg-white px-3.5 py-2 text-[13px] text-text-secondary"
          style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
        >
          <span
            aria-hidden
            className="h-[7px] w-[7px] flex-none rounded-full bg-purple-primary shadow-[0_0_0_3px_rgba(108,71,255,0.15),0_0_10px_rgba(108,71,255,0.25)]"
          />
          <span className="hidden sm:inline">You&apos;re visitor&nbsp;</span>
          <span className="font-mono font-semibold tabular-nums text-purple-primary">
            #<RollingNumber value={record!.number} skip={skipEnter} />
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
