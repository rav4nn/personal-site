import type { ReactNode } from "react";
import styles from "./tiles.module.css";

export function TileFrame({
  tone,
  children,
}: {
  tone: string;
  children: ReactNode;
}) {
  return (
    <div className={`${styles.tile} ${tone}`}>
      <svg viewBox="0 0 360 270" aria-hidden="true" focusable="false">
        {children}
      </svg>
    </div>
  );
}
