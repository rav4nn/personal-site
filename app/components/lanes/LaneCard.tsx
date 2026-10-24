import type { ReactNode } from "react";
import { statusDot, type Lane } from "./lanes";

const cardClassName = "block rounded-2xl text-center";

export function LaneCard({ name, line, status, href, Tile }: Lane) {
  const { colour, label } = statusDot[status];
  const body: ReactNode = (
    <>
      <Tile />
      <h2 className="mt-3 flex items-center justify-center gap-2 text-base font-semibold text-text-primary">
        {name}
        <span
          aria-hidden="true"
          className="inline-block h-[7px] w-[7px] rounded-full"
          style={{ backgroundColor: colour }}
        />
        <span className="text-xs font-medium text-text-secondary">{label}</span>
      </h2>
      <p className="mt-0.5 text-sm text-text-secondary">{line}</p>
    </>
  );

  return href ? (
    <a
      href={href}
      className={`${cardClassName} transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500`}
    >
      {body}
    </a>
  ) : (
    <div className={cardClassName}>{body}</div>
  );
}
