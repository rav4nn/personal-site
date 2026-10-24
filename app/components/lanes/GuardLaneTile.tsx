import { TileFrame } from "./TileFrame";
import styles from "./tiles.module.css";

export function GuardLaneTile() {
  return (
    <TileFrame tone={styles.guard}>
      <defs>
        <linearGradient id="guardlane-sweep" x1="0" x2="1">
          <stop offset="0" stopColor="#bef264" stopOpacity="0" />
          <stop offset="1" stopColor="#bef264" stopOpacity=".35" />
        </linearGradient>
      </defs>
      <circle cx="180" cy="135" r="78" fill="none" stroke="rgba(190,242,100,.14)" />
      <circle cx="180" cy="135" r="54" fill="none" stroke="rgba(190,242,100,.1)" />
      <path className={styles.scan} d="M180 135 L258 135 A78 78 0 0 0 235 80 Z" fill="url(#guardlane-sweep)" />
      <g className={styles.shield}>
        <path d="M180 92 148 104v26c0 20 13.5 35.5 32 41.5 18.5-6 32-21.5 32-41.5v-26z" fill="#1a2e05" stroke="#bef264" strokeWidth="3" strokeLinejoin="round" />
        <path className={styles.chk} d="M166 132l10 10 20-21" fill="none" stroke="#bef264" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g className={styles.chip}>
        <rect x="24" y="30" width="112" height="26" rx="8" fill="rgba(0,0,0,.35)" />
        <text x="36" y="47" fill="#d9f99d">claude 2.1.6 ✓</text>
      </g>
      <g className={`${styles.chip} ${styles.c2}`}>
        <rect x="214" y="208" width="122" height="26" rx="8" fill="rgba(0,0,0,.35)" />
        <text x="226" y="225" fill="#fca5a5">MCP advisory ⚠</text>
      </g>
      <g className={`${styles.chip} ${styles.c3}`}>
        <rect x="226" y="30" width="110" height="26" rx="8" fill="rgba(0,0,0,.35)" />
        <text x="238" y="47" fill="#d9f99d">patched ✓</text>
      </g>
    </TileFrame>
  );
}
