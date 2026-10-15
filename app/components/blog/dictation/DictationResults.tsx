"use client";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { m, useReducedMotion } from "framer-motion";
import { AppLogo } from "./AppLogo";
import {
  summaryRows,
  type AppLogo as AppLogoName,
  type SummaryRow,
  type Tone,
} from "./data";
import { appLinks } from "./links";

// The app I kept after the test. Its row gets a "My pick" badge.
const MY_PICK = "VoiceInk";

const PILL: Record<Tone, string> = {
  G: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  Y: "bg-amber-50 text-amber-700 ring-amber-600/15",
  R: "bg-rose-50 text-rose-700 ring-rose-600/15",
  N: "bg-slate-50 text-slate-500 ring-slate-500/15",
};

const BAR: Record<Exclude<Tone, "N">, string> = {
  G: "bg-emerald-500",
  Y: "bg-amber-400",
  R: "bg-rose-400",
};

type SortKey = "app" | "accuracy" | "speed" | "ram" | "price";
type Direction = "asc" | "desc";
type Filter = "all" | "ai" | "raw";

// First click on a column sorts best-first: high accuracy, low speed, RAM and price.
const COLUMNS: { key: SortKey; label: string; first: Direction }[] = [
  { key: "app", label: "App", first: "asc" },
  { key: "accuracy", label: "Accuracy", first: "desc" },
  { key: "speed", label: "Speed", first: "asc" },
  { key: "ram", label: "RAM", first: "asc" },
  { key: "price", label: "Price", first: "asc" },
];

const SORT_NAMES: Record<SortKey, Record<Direction, string>> = {
  app: { asc: "name, A to Z", desc: "name, Z to A" },
  accuracy: { asc: "accuracy, lowest first", desc: "accuracy, highest first" },
  speed: { asc: "speed, fastest first", desc: "speed, slowest first" },
  ram: { asc: "RAM, lightest first", desc: "RAM, heaviest first" },
  price: { asc: "price, cheapest first", desc: "price, priciest first" },
};

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI cleanup" },
  { key: "raw", label: "Raw" },
];

function sortValue(row: SummaryRow, key: SortKey): number | string | null {
  switch (key) {
    case "app":
      return row.app.toLowerCase();
    case "accuracy":
      return row.accuracy;
    case "speed":
      return row.speed;
    case "ram":
      return row.ramMb;
    case "price":
      return row.priceFirstYear;
  }
}

function sortRows(rows: SummaryRow[], key: SortKey, direction: Direction) {
  const sign = direction === "asc" ? 1 : -1;
  return [...rows].sort((a, b) => {
    const left = sortValue(a, key);
    const right = sortValue(b, key);
    // Rows with no value stay at the bottom in both directions.
    if (left === null && right !== null) return 1;
    if (right === null && left !== null) return -1;
    if (left !== null && right !== null && left !== right) {
      return (left < right ? -1 : 1) * sign;
    }
    return a.rank - b.rank;
  });
}

function promptTone(score: number): Exclude<Tone, "N"> {
  if (score >= 97) return "G";
  if (score >= 90) return "Y";
  return "R";
}

function Bar({ width, tone }: { width: number; tone: Exclude<Tone, "N"> }) {
  return (
    <span className="hidden h-1.5 w-14 shrink-0 overflow-hidden rounded-full bg-slate-100 sm:block">
      <span
        className={clsx("block h-full rounded-full", BAR[tone])}
        style={{ width: `${width}%` }}
      />
    </span>
  );
}

function Pill({ label, tone }: { label: string; tone: Tone }) {
  return (
    <span
      className={clsx(
        "inline-block rounded-full px-2 py-0.5 font-mono text-xs ring-1 ring-inset",
        PILL[tone],
      )}
    >
      {label}
    </span>
  );
}

function SortIcon({ active, direction }: { active: boolean; direction: Direction }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className={clsx(
        "h-3 w-3 shrink-0 transition",
        active ? "text-purple-primary" : "text-slate-300 group-hover:text-slate-400",
        active && direction === "asc" && "rotate-180",
      )}
    >
      {active ? (
        <path d="M6 9 2.5 4.5h7L6 9Z" fill="currentColor" />
      ) : (
        <path
          d="M6 1.5 3 5h6L6 1.5Zm0 9L3 7h6l-3 3.5Z"
          fill="currentColor"
        />
      )}
    </svg>
  );
}

// App name, linked to the app's site when links.ts has an entry for it.
function AppName({ app, logo }: { app: string; logo: AppLogoName | null }) {
  const link = logo ? appLinks[logo] : undefined;
  if (!link) return <>{app}</>;
  return (
    <a
      href={link.url}
      target="_blank"
      rel={
        link.affiliate ? "sponsored noopener noreferrer" : "noopener noreferrer"
      }
      className="rounded-sm text-inherit no-underline hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-primary"
    >
      {app}
    </a>
  );
}

// Summary table of the dictation test: one row per app. Readers sort by any
// column and filter AI cleanup apps from raw ones.
export function DictationResults() {
  const [sortKey, setSortKey] = useState<SortKey>("accuracy");
  const [direction, setDirection] = useState<Direction>("desc");
  const [filter, setFilter] = useState<Filter>("all");
  const reduceMotion = useReducedMotion();

  const rows = useMemo(() => {
    const kept = summaryRows.filter(
      (row) => filter === "all" || row.cleanup === filter,
    );
    return sortRows(kept, sortKey, direction);
  }, [sortKey, direction, filter]);

  function sortBy(key: SortKey, first: Direction) {
    if (key === sortKey) {
      setDirection(direction === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setDirection(first);
    }
  }

  const counts: Record<Filter, number> = {
    all: summaryRows.length,
    ai: summaryRows.filter((row) => row.cleanup === "ai").length,
    raw: summaryRows.filter((row) => row.cleanup === "raw").length,
  };

  return (
    <div className="my-10 overflow-hidden rounded-2xl border border-border-primary bg-white shadow-code-shadow">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-primary bg-bg-primary px-4 py-3">
        <div
          role="group"
          aria-label="Filter apps"
          className="flex rounded-full bg-white p-0.5 ring-1 ring-inset ring-border-primary"
        >
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              aria-pressed={filter === key}
              onClick={() => setFilter(key)}
              className={clsx(
                "rounded-full px-3 py-1 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-primary",
                filter === key
                  ? "bg-slate-900 text-white"
                  : "text-slate-500 hover:text-slate-900",
              )}
            >
              {label}{" "}
              <span
                className={clsx(
                  "font-mono",
                  filter === key ? "text-slate-300" : "text-slate-400",
                )}
              >
                {counts[key]}
              </span>
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-500" aria-live="polite">
          Sorted by {SORT_NAMES[sortKey][direction]}
          <span className="hidden sm:inline"> · click a column to sort</span>
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="!table w-full !max-w-none !whitespace-nowrap text-left text-sm">
          <thead className="border-b border-border-primary text-xs uppercase tracking-wide text-slate-500">
            <tr>
              {COLUMNS.map(({ key, label, first }) => {
                const active = key === sortKey;
                return (
                  <th
                    key={key}
                    scope="col"
                    aria-sort={
                      active
                        ? direction === "asc"
                          ? "ascending"
                          : "descending"
                        : undefined
                    }
                    className={clsx(
                      "py-1.5 font-medium",
                      key === "app"
                        ? "sticky left-0 z-10 bg-white pl-2 pr-2"
                        : "px-1",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => sortBy(key, first)}
                      className={clsx(
                        "group inline-flex items-center gap-1 rounded-md px-2 py-1.5 uppercase tracking-wide transition hover:bg-slate-50 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-primary",
                        active && "text-slate-900",
                      )}
                    >
                      {label}
                      <SortIcon active={active} direction={direction} />
                    </button>
                  </th>
                );
              })}
              <th scope="col" className="py-3 pl-3 pr-4 font-medium">
                By prompt
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dashed divide-border-primary">
            {rows.map((row) => {
              const pick = row.app === MY_PICK;
              return (
                <m.tr
                  key={row.app}
                  layout={reduceMotion ? false : "position"}
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  className={clsx(
                    "group/row",
                    pick ? "bg-violet-50/60" : "hover:bg-slate-50/70",
                  )}
                >
                  <th
                    scope="row"
                    className={clsx(
                      "sticky left-0 z-10 py-2.5 pl-4 pr-3 font-normal",
                      pick
                        ? "bg-[#F7F4FF]"
                        : "bg-white group-hover/row:bg-[#FAFBFC]",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <AppLogo
                        logo={row.logo}
                        size={30}
                        className="rounded-lg"
                      />
                      <div className="flex flex-col leading-tight">
                        <span className="flex items-center gap-1.5 font-medium text-slate-900">
                          <AppName app={row.app} logo={row.logo} />
                          {pick && (
                            <span className="rounded-full bg-purple-primary px-1.5 py-px text-[10px] font-semibold uppercase tracking-wide text-white">
                              My pick
                            </span>
                          )}
                        </span>
                        <span className="text-xs text-slate-400">
                          {row.kind}
                        </span>
                      </div>
                    </div>
                  </th>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <Bar width={row.accuracy} tone={row.accuracyTone} />
                      <b
                        className={clsx(
                          "font-mono text-xs tabular-nums text-slate-700",
                          sortKey === "accuracy" ? "font-semibold" : "font-medium",
                        )}
                      >
                        {row.accuracy}%
                      </b>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <Bar width={row.speedBar} tone={row.speedTone} />
                      <b
                        className={clsx(
                          "font-mono text-xs tabular-nums text-slate-700",
                          sortKey === "speed" ? "font-semibold" : "font-medium",
                        )}
                      >
                        {row.speed.toFixed(1)} s
                      </b>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <Pill label={row.ram} tone={row.ramTone} />
                  </td>
                  <td className="px-3 py-2.5">
                    <Pill label={row.price} tone={row.priceTone} />
                  </td>
                  <td className="py-2.5 pl-3 pr-4">
                    <div className="flex gap-1 font-mono text-xs tabular-nums">
                      {row.byPrompt.map((score, index) => (
                        <span
                          key={index}
                          title={`Prompt ${index + 1}: ${score}%`}
                          className={clsx(
                            "w-9 rounded-md py-0.5 text-center",
                            PILL[promptTone(score)],
                          )}
                        >
                          <span className="sr-only">Prompt {index + 1}: </span>
                          {score}
                        </span>
                      ))}
                    </div>
                  </td>
                </m.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
