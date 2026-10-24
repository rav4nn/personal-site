import { TileFrame } from "./TileFrame";
import styles from "./tiles.module.css";

export function CallLaneTile() {
  return (
    <TileFrame tone={styles.call}>
      <g className={styles.clPill}>
        <rect x="112" y="26" width="136" height="36" rx="18" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.2)" />
        <g transform="translate(124 32)">
          <g className={styles.clRing}>
            <circle cx="12" cy="12" r="12" fill="#22c55e" />
            <path
              fill="#fff"
              transform="translate(5 5) scale(.58)"
              d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"
            />
          </g>
        </g>
        <text x="156" y="49" fill="#fff" fontSize="16" fontWeight="700">
          Call started
        </text>
      </g>
      <g transform="translate(70 92)">
        <path d="M0 22h16l20-18v62L16 48H0z" fill="#f5f5f4" />
        <path className={styles.arc} d="M46 20a20 20 0 0 1 0 30" />
        <path className={`${styles.arc} ${styles.a2}`} d="M56 10a34 34 0 0 1 0 50" />
        <path className={`${styles.arc} ${styles.a3}`} d="M66 0a48 48 0 0 1 0 70" />
      </g>
      <rect x="70" y="190" width="220" height="16" rx="8" fill="rgba(255,255,255,.12)" />
      <rect x="70" y="190" width="220" height="16" rx="8" fill="#e6e51e" />
      <rect className={styles.hold} x="66" y="186" width="228" height="24" rx="12" fill="none" strokeWidth="2" />
      <rect className={styles.ghost} x="70" y="214" width="220" height="5" rx="2.5" fill="#f97316" />
      <text x="290" y="178" fill="#e6e51e" fontSize="24" fontWeight="800" textAnchor="end">
        100%
      </text>
      <g className={styles.blocked}>
        <text x="70" y="244" fill="#fdba74" fontSize="16" fontWeight="700">
          macOS would drop it to 20%
        </text>
      </g>
    </TileFrame>
  );
}
