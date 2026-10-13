import clsx from "clsx";
import { AppLogo } from "./AppLogo";
import { promptTakes, type Take, type TakeTone } from "./data";

const VISIBLE_TAKES = 4;

const TONE: Record<TakeTone, string> = {
  g: "text-emerald-600",
  w: "text-amber-600",
  r: "text-rose-600",
};

function TakeCard({ take }: { take: Take }) {
  return (
    <li className="rounded-xl border border-border-primary bg-white p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <AppLogo logo={take.logo} size={20} className="rounded-md" />
          <span className="text-sm font-medium text-slate-900">{take.app}</span>
        </div>
        <span className="font-mono text-xs text-slate-400">
          <b className={clsx("font-medium", TONE[take.accuracyTone])}>
            {take.accuracy}%
          </b>{" "}
          ·{" "}
          <span className={TONE[take.speedTone]}>
            {take.speed.toFixed(1)} s
          </span>
        </span>
      </div>
      <p className="text-sm leading-6 text-slate-600">
        {take.segments.map((segment, index) => {
          if (segment.kind === "wrong") {
            return (
              <mark
                key={index}
                className="rounded-sm bg-rose-50 px-0.5 text-rose-700"
              >
                {segment.text}
              </mark>
            );
          }
          if (segment.kind === "missing") {
            return (
              <del key={index} className="text-slate-400">
                {segment.text}
              </del>
            );
          }
          return segment.text;
        })}
      </p>
    </li>
  );
}

// What each app typed for one prompt. The first takes show, the rest open
// with a native <details>, so the post needs no JavaScript.
export function DictationTakes({ prompt }: { prompt: 1 | 2 | 3 }) {
  const takes = promptTakes.find((p) => p.prompt === prompt)?.takes ?? [];
  const visible = takes.slice(0, VISIBLE_TAKES);
  const hidden = takes.slice(VISIBLE_TAKES);

  return (
    <div className="mb-10 mt-6">
      <ul className="grid gap-2 sm:grid-cols-2">
        {visible.map((take) => (
          <TakeCard key={take.app} take={take} />
        ))}
      </ul>
      {hidden.length > 0 && (
        <details className="group mt-2">
          <summary className="cursor-pointer list-none py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">
              Show {hidden.length} more takes ›
            </span>
            <span className="hidden group-open:inline">
              Hide {hidden.length} takes
            </span>
          </summary>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {hidden.map((take) => (
              <TakeCard key={take.app} take={take} />
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
