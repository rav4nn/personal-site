import { TileFrame } from "./TileFrame";
import styles from "./tiles.module.css";

const LABEL_FONT = "-apple-system,Inter,sans-serif";
const DESKTOP_X = [24, 135, 246];

export function QuickSpaceSwitchTile() {
  return (
    <TileFrame tone={styles.qss}>
      <g className={styles.qsCue}>
        <rect x="58" y="26" width="72" height="34" rx="10" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.18)" />
        <text x="94" y="49" textAnchor="middle" fill="#fff" fontFamily={LABEL_FONT} fontSize="17" fontWeight="700">
          ⌃ →
        </text>
      </g>
      <g className={`${styles.qsCue} ${styles.q2}`}>
        <rect x="144" y="26" width="72" height="34" rx="10" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.18)" />
        <rect x="163" y="33" width="34" height="20" rx="4" fill="none" stroke="#fff" strokeWidth="2" />
        <circle cx="172" cy="43" r="2.2" fill="#fff" />
        <circle cx="180" cy="43" r="2.2" fill="#fff" />
        <circle cx="188" cy="43" r="2.2" fill="#fff" />
      </g>
      <g className={`${styles.qsCue} ${styles.q3}`}>
        <rect x="230" y="26" width="72" height="34" rx="10" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.18)" />
        <rect x="258" y="31" width="16" height="24" rx="8" fill="none" stroke="#fff" strokeWidth="2" />
        <path d="M266 31v8" stroke="#fff" strokeWidth="2" />
      </g>
      {DESKTOP_X.map((x) => (
        <g key={x}>
          <rect x={x} y="88" width="90" height="60" rx="6" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.14)" />
          <rect x={x} y="88" width="90" height="7" rx="3" fill="rgba(255,255,255,.14)" />
          <rect x={x + 14} y="104" width="46" height="32" rx="3" fill="rgba(255,255,255,.12)" />
        </g>
      ))}
      <rect className={styles.qsGhost} x="19" y="83" width="100" height="70" rx="10" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="2" strokeDasharray="6 5" />
      <rect className={styles.qsHl} x="19" y="83" width="100" height="70" rx="10" fill="rgba(251,113,133,.14)" stroke="#fb7185" strokeWidth="3" />
      <rect x="24" y="186" width="200" height="10" rx="5" fill="rgba(255,255,255,.08)" />
      <rect className={styles.qsFast} x="24" y="186" width="40" height="10" rx="5" fill="#fb7185" />
      <text x="336" y="197" textAnchor="end" fill="#fb7185" fontFamily={LABEL_FONT} fontSize="18" fontWeight="800">
        0.2 s
      </text>
      <rect x="24" y="226" width="200" height="10" rx="5" fill="rgba(255,255,255,.08)" />
      <rect className={styles.qsSlow} x="24" y="226" width="200" height="10" rx="5" fill="rgba(255,255,255,.4)" />
      <text x="336" y="237" textAnchor="end" fill="rgba(255,255,255,.55)" fontFamily={LABEL_FONT} fontSize="16" fontWeight="600">
        macOS 1 s
      </text>
    </TileFrame>
  );
}
