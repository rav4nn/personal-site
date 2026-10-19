import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import {
  formatLessonNumber,
  formatStudySource,
  getStudyLesson,
  getStudyLessons,
  splitTitleAccent,
} from "@/app/lib/study";

export const alt = "A Study lesson on hardeep.cv";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#F7F7F8";
const BORDER = "#D6DADE";
const TEXT = "#0f172a";
const TEXT_DIM = "#5E5F6E";
const ACCENT = "#6C47FF";

// Same 45° hatch as the layout rails, on a 10px tile so it reads at OG size.
const HATCH = `linear-gradient(45deg, ${BORDER} 12.5%, transparent 12.5%, transparent 50%, ${BORDER} 50%, ${BORDER} 62.5%, transparent 62.5%, transparent 100%)`;

const FONT_DIR = path.join(process.cwd(), "node_modules/geist/dist/fonts");

export function generateStaticParams() {
  return getStudyLessons().map(({ slug }) => ({ slug }));
}

function words(text: string, accent: boolean) {
  return text.split(/\s+/).filter(Boolean).map((word) => ({ word, accent }));
}

function Band({ edge }: { edge: "top" | "bottom" }) {
  return (
    <div
      style={{
        display: "flex",
        height: 40,
        width: "100%",
        backgroundImage: HATCH,
        backgroundSize: "10px 10px",
        opacity: 0.75,
        [edge === "top" ? "borderBottom" : "borderTop"]: `1px solid ${BORDER}`,
      }}
    />
  );
}

export default async function Image({ params }: { params: { slug: string } }) {
  const lesson = getStudyLesson(params.slug);
  if (!lesson) throw new Error(`opengraph-image: no study lesson "${params.slug}"`);

  const [sans, sansMedium, mono] = await Promise.all([
    readFile(path.join(FONT_DIR, "geist-sans/Geist-Regular.ttf")),
    readFile(path.join(FONT_DIR, "geist-sans/Geist-Medium.ttf")),
    readFile(path.join(FONT_DIR, "geist-mono/GeistMono-Medium.ttf")),
  ]);
  // Satori has no inline flow, so each word is a flex item that can wrap.
  const title = splitTitleAccent(lesson.title, lesson.titleAccent);
  const titleWords = [
    ...words(title.before, false),
    ...words(title.accent, true),
    ...words(title.after, false),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: BG,
          fontFamily: "Geist",
          color: TEXT,
        }}
      >
        <Band edge="top" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            padding: "48px 72px",
          }}
        >
          <div style={{ display: "flex", fontFamily: "Geist Mono", fontSize: 26, color: TEXT_DIM }}>
            <span>hardeep.cv</span>
            <span style={{ margin: "0 14px", color: BORDER }}>/</span>
            <span>Study</span>
            <span style={{ margin: "0 14px", color: BORDER }}>·</span>
            <span style={{ color: ACCENT }}>{formatLessonNumber(lesson.lesson)}</span>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 72,
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              maxWidth: 1000,
            }}
          >
            {titleWords.map(({ word, accent }, i) => (
              <span key={i} style={{ marginRight: "0.24em", color: accent ? ACCENT : TEXT }}>
                {word}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 28, color: TEXT_DIM }}>
            {formatStudySource(lesson.source)}
          </div>
        </div>
        <Band edge="bottom" />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: sans, weight: 400, style: "normal" },
        { name: "Geist", data: sansMedium, weight: 500, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
