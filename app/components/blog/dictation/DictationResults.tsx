import clsx from "clsx";
import { AppLogo } from "./AppLogo";
import { summaryRows, type Tone } from "./data";

const PILL: Record<Tone, string> = {
  G: "bg-emerald-50 text-emerald-700",
  Y: "bg-amber-50 text-amber-700",
  R: "bg-rose-50 text-rose-700",
  N: "bg-slate-100 text-slate-500",
};

const BAR: Record<Exclude<Tone, "N">, string> = {
  G: "bg-emerald-500",
  Y: "bg-amber-400",
  R: "bg-rose-400",
};

const HEADERS = [
  "App",
  "Accuracy",
  "Speed",
  "RAM",
  "Price",
  "Kind",
  "By prompt (1 · 2 · 3)",
];

function Bar({ width, tone }: { width: number; tone: Exclude<Tone, "N"> }) {
  return (
    <span className="h-1.5 w-12 shrink-0 overflow-hidden rounded-full bg-slate-100">
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
      className={clsx("rounded-full px-2 py-0.5 font-mono text-xs", PILL[tone])}
    >
      {label}
    </span>
  );
}

// Summary table of the dictation test: one row per app, best app first.
export function DictationResults() {
  return (
    <div className="my-10 overflow-x-auto rounded-2xl border border-border-primary bg-white shadow-code-shadow">
      <table className="!table w-full !max-w-none !whitespace-nowrap text-left text-sm">
        <thead className="border-b border-border-primary bg-bg-primary text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th scope="col" className="py-3 pl-4 pr-1">
              <span className="sr-only">Rank</span>
            </th>
            {HEADERS.map((header, index) => (
              <th
                key={header}
                scope="col"
                className={clsx(
                  "px-2 py-3 font-medium",
                  index === HEADERS.length - 1 && "pr-4",
                )}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-dashed divide-border-primary">
          {summaryRows.map((row) => (
            <tr
              key={row.app}
              className={clsx(row.rank === 1 && "bg-indigo-50/50")}
            >
              <td className="py-2.5 pl-4 pr-1 font-mono text-xs text-slate-400">
                {row.rank}
              </td>
              <th scope="row" className="px-2 py-2.5 font-normal">
                <div className="flex items-center gap-2.5">
                  <AppLogo logo={row.logo} size={28} className="rounded-lg" />
                  <span className="font-medium text-slate-900">{row.app}</span>
                </div>
              </th>
              <td className="px-2 py-2.5">
                <div className="flex items-center gap-2">
                  <Bar width={row.accuracy} tone={row.accuracyTone} />
                  <b className="font-mono text-xs font-medium text-slate-700">
                    {row.accuracy}%
                  </b>
                </div>
              </td>
              <td className="px-2 py-2.5">
                <div className="flex items-center gap-2">
                  <Bar width={row.speedBar} tone={row.speedTone} />
                  <b className="font-mono text-xs font-medium text-slate-700">
                    {row.speed.toFixed(1)} s
                  </b>
                </div>
              </td>
              <td className="px-2 py-2.5">
                <Pill label={row.ram} tone={row.ramTone} />
              </td>
              <td className="px-2 py-2.5">
                <Pill label={row.price} tone={row.priceTone} />
              </td>
              <td className="px-2 py-2.5 text-xs text-slate-500">{row.kind}</td>
              <td className="py-2.5 pl-2 pr-4 font-mono text-xs text-slate-500">
                {row.byPrompt.join(" · ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
