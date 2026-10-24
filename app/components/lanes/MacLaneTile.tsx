import { TileFrame } from "./TileFrame";
import styles from "./tiles.module.css";

const LABEL_FONT = "-apple-system,Inter,sans-serif";

export function MacLaneTile() {
  return (
    <TileFrame tone={styles.mac}>
      <path className={styles.path} d="M 92 118 C 140 70, 220 70, 268 118" />
      <path className={styles.path} d="M 268 150 C 220 192, 150 192, 112 146" />
      <g className={styles.cloud}>
        <path d="M66 146h48a20 20 0 0 0 3-39.8A27 27 0 0 0 65 101a22 22 0 0 0 1 45z" fill="#c7d2fe" opacity=".95" />
        <text x="88" y="178" textAnchor="middle" fill="#a5b4fc" fontFamily={LABEL_FONT} fontSize="12" fontWeight="600">
          agent
        </text>
      </g>
      <g transform="translate(232 104)">
        <rect x="0" y="0" width="72" height="48" rx="6" fill="#c7d2fe" />
        <rect className={styles.screen} x="5" y="5" width="62" height="38" rx="3" fill="#1e1b4b" />
        <path className={styles.tick} d="M24 24l8 8 16-16" fill="none" stroke="#86efac" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M-8 52h88l-6 6H-2z" fill="#a5b4fc" />
        <text x="36" y="80" textAnchor="middle" fill="#a5b4fc" fontFamily={LABEL_FONT} fontSize="12" fontWeight="600">
          your Mac
        </text>
      </g>
      <circle className={styles.pkt} r="5" />
      <circle className={`${styles.pkt} ${styles.p2}`} r="5" />
      <circle className={`${styles.pkt} ${styles.p3}`} r="5" />
      <circle className={styles.back} r="5" />
    </TileFrame>
  );
}
