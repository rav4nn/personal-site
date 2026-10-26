"use client";

import { m, useMotionValue, useMotionValueEvent, useScroll } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

type Side = "mid" | "center" | "left" | "right";

const GUTTER = 28;
const RADIUS = 16;
const TURN_GAP = 40;

// Sections opt in with data-track; the track runs down that side of each one and turns just above the next.
function sideX(side: Side, width: number) {
  if (side === "left") return GUTTER;
  if (side === "right") return width - GUTTER;
  if (side === "center") return width / 2;
  return width / 2 - 48;
}

function roundedPath(points: [number, number][]) {
  let d = `M${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i - 1];
    const [cx, cy] = points[i];
    const [nx, ny] = points[i + 1];
    const inLen = Math.hypot(cx - px, cy - py);
    const outLen = Math.hypot(nx - cx, ny - cy);
    const r = Math.min(RADIUS, inLen / 2, outLen / 2);
    const ax = cx - ((cx - px) / inLen) * r;
    const ay = cy - ((cy - py) / inLen) * r;
    const bx = cx + ((nx - cx) / outLen) * r;
    const by = cy + ((ny - cy) / outLen) * r;
    d += ` L${ax} ${ay} Q${cx} ${cy} ${bx} ${by}`;
  }
  const [lx, ly] = points[points.length - 1];
  return `${d} L${lx} ${ly}`;
}

// Where the dot of an "i" would sit above the dotless "ı" in `origin`, from the font's real ink.
// The baseline comes from an empty inline-block inside origin, whose bottom edge sits on the baseline.
function letterDot(origin: HTMLElement) {
  const baseline = origin.querySelector<HTMLElement>("[data-track-baseline]");
  const ctx = document.createElement("canvas").getContext("2d");
  if (!baseline || !ctx) return null;
  const style = getComputedStyle(origin);
  ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  const stem = ctx.measureText("\u0131");
  const dotted = ctx.measureText("i");
  const box = origin.getBoundingClientRect();
  const baselineY = baseline.getBoundingClientRect().bottom;
  const stemTop = stem.actualBoundingBoxAscent;
  const dotTop = dotted.actualBoundingBoxAscent;
  const dotSize = (stem.actualBoundingBoxRight + stem.actualBoundingBoxLeft) * 1.1;
  return {
    x: box.left + (stem.actualBoundingBoxRight - stem.actualBoundingBoxLeft) / 2,
    y: baselineY - Math.max(dotTop - dotSize / 2, stemTop + 12),
  };
}

function buildTrack(container: HTMLElement) {
  const box = container.getBoundingClientRect();
  const width = box.width;
  const sections = Array.from(
    container.querySelectorAll<HTMLElement>("[data-track]"),
  ).map((el) => {
    const r = el.getBoundingClientRect();
    return {
      side: el.dataset.track as Side,
      top: r.top - box.top,
      bottom: r.bottom - box.top,
    };
  });
  if (sections.length === 0) return null;

  const points: [number, number][] = [];
  const first = sections[0];
  let y = first.top;
  // The track can start from a letter (data-track-origin): the ball sits where its dot would be.
  const origin = container.querySelector<HTMLElement>("[data-track-origin]");
  const dot = origin?.offsetParent ? letterDot(origin) : null;
  if (dot) {
    const x = dot.x - box.left;
    points.push([x, dot.y - box.top]);
    y = first.top + TURN_GAP;
    points.push([x, y]);
  }
  sections.forEach((section, i) => {
    const x = sideX(section.side, width);
    points.push([x, y]);
    const next = sections[i + 1];
    y = next ? next.top - TURN_GAP : section.bottom;
    points.push([x, y]);
  });
  return { d: roundedPath(points), width, height: box.height };
}

export function HomeTrack() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [track, setTrack] = useState<ReturnType<typeof buildTrack>>(null);
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);

  // Page scroll, not the track's own position: the ball sits at the start at the top of the page and at the end at the bottom.
  const { scrollYProgress } = useScroll();

  useLayoutEffect(() => {
    const container = rootRef.current?.parentElement;
    if (!container) return;
    const update = () => setTrack(buildTrack(container));
    update();
    // Web fonts load after first paint and move the letters, so measure again once they are in.
    document.fonts?.ready.then(update);
    window.addEventListener("resize", update);
    const observer = new ResizeObserver(update);
    observer.observe(container);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const placeBall = (progress: number) => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    const point = path.getPointAtLength(length * Math.max(0, Math.min(progress, 1)));
    cx.set(point.x);
    cy.set(point.y);
  };

  useMotionValueEvent(scrollYProgress, "change", placeBall);

  useLayoutEffect(() => {
    placeBall(scrollYProgress.get());
  });

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden lg:block"
    >
      {track ? (
        <svg width={track.width} height={track.height} className="absolute inset-0 overflow-visible">
          <defs>
            <filter id="homeTrackGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="15" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="0 0 0 0 0.42 0 0 0 0 0.28 0 0 0 0 1 0 0 0 0.6 0"
              />
            </filter>
            <mask id="homeTrackMask" maskUnits="userSpaceOnUse">
              <path d={track.d} stroke="white" strokeWidth="8" strokeLinejoin="round" fill="none" />
            </mask>
            <filter id="homeTrackInset" filterUnits="userSpaceOnUse" x="0" y="0" width={track.width} height={track.height}>
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="2" />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.65 0 0 0 0 0.68 0 0 0 0 0.72 0 0 0 0.32 0" />
              <feBlend mode="normal" in2="shape" />
            </filter>
          </defs>
          <g mask="url(#homeTrackMask)">
            <m.circle cx={cx} cy={cy} r="120" fill="#6C47FF" filter="url(#homeTrackGlow)" opacity="0.5" />
          </g>
          <g filter="url(#homeTrackInset)">
            <path
              ref={pathRef}
              d={track.d}
              stroke="#D6DADE"
              strokeOpacity="0.24"
              strokeWidth="8"
              strokeLinejoin="round"
              fill="none"
            />
          </g>
          <m.circle className="fill-indigo-600" cx={cx} cy={cy} r="10" />
        </svg>
      ) : null}
    </div>
  );
}
