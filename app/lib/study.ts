import fs from "node:fs";
import path from "node:path";

const STUDY_SOURCE_KINDS = ["talk", "video", "article", "paper"] as const;

export type StudySourceKind = (typeof STUDY_SOURCE_KINDS)[number];

export type StudySource = {
  kind: StudySourceKind;
  title: string;
  author: string;
  org?: string;
  url: string;
  durationMinutes?: number;
};

export type StudyLesson = {
  slug: string;
  lesson: number;
  title: string;
  titleAccent?: string;
  summary: string;
  publishedAt: string;
  readMinutes: number;
  tags: string[];
  source: StudySource;
  css: string;
  html: string;
  script: string;
};

export type StudyLessonMeta = Omit<StudyLesson, "slug" | "css" | "html" | "script">;

export type LessonParts = Pick<StudyLesson, "css" | "html" | "script">;

const STUDY_DIR = path.join(process.cwd(), "content", "study");

class StudyContentError extends Error {
  constructor(file: string, message: string) {
    super(`${file}: ${message}`);
    this.name = "StudyContentError";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// `field` may be a dotted path ("source.url"); only its last segment is read from `obj`.
function readString(obj: Record<string, unknown>, field: string, file: string): string {
  const value = obj[field.split(".").pop()!];
  if (typeof value !== "string" || value.trim() === "") {
    throw new StudyContentError(file, `"${field}" must be a non-empty string`);
  }
  return value;
}

function readOptionalString(
  obj: Record<string, unknown>,
  field: string,
  file: string,
): string | undefined {
  return obj[field.split(".").pop()!] === undefined ? undefined : readString(obj, field, file);
}

function readPositiveInt(obj: Record<string, unknown>, field: string, file: string): number {
  const value = obj[field.split(".").pop()!];
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1) {
    throw new StudyContentError(file, `"${field}" must be a positive integer`);
  }
  return value;
}

function readSource(value: unknown, file: string): StudySource {
  if (!isRecord(value)) throw new StudyContentError(file, `"source" must be an object`);
  const kind = value.kind;
  if (!STUDY_SOURCE_KINDS.includes(kind as StudySourceKind)) {
    throw new StudyContentError(
      file,
      `"source.kind" must be one of ${STUDY_SOURCE_KINDS.join(", ")}`,
    );
  }
  const url = readString(value, "source.url", file);
  if (!/^https?:\/\//.test(url)) {
    throw new StudyContentError(file, `"source.url" must be an http(s) URL`);
  }
  return {
    kind: kind as StudySourceKind,
    title: readString(value, "source.title", file),
    author: readString(value, "source.author", file),
    org: readOptionalString(value, "source.org", file),
    url,
    durationMinutes:
      value.durationMinutes === undefined
        ? undefined
        : readPositiveInt(value, "source.durationMinutes", file),
  };
}

export function parseStudyMeta(raw: unknown, file: string): StudyLessonMeta {
  if (!isRecord(raw)) throw new StudyContentError(file, "must contain a JSON object");

  const title = readString(raw, "title", file);
  const titleAccent = readOptionalString(raw, "titleAccent", file);
  if (titleAccent !== undefined && !title.includes(titleAccent)) {
    throw new StudyContentError(file, `"titleAccent" must be a substring of "title"`);
  }

  const publishedAt = readString(raw, "publishedAt", file);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(publishedAt) ||
    Number.isNaN(Date.parse(`${publishedAt}T00:00:00Z`))
  ) {
    throw new StudyContentError(file, `"publishedAt" must be a YYYY-MM-DD date`);
  }

  const tags = raw.tags;
  if (!Array.isArray(tags) || !tags.every((tag) => typeof tag === "string" && tag !== "")) {
    throw new StudyContentError(file, `"tags" must be an array of non-empty strings`);
  }

  return {
    lesson: readPositiveInt(raw, "lesson", file),
    title,
    titleAccent,
    summary: readString(raw, "summary", file),
    publishedAt,
    readMinutes: readPositiveInt(raw, "readMinutes", file),
    tags,
    source: readSource(raw.source, file),
  };
}

// lesson.html is written by scripts/study/import-lesson.mjs in this exact order.
const LESSON_HTML_RE =
  /^\s*<style>([\s\S]*?)<\/style>\s*<div class="study-lesson">([\s\S]*)<\/div>\s*<script>([\s\S]*?)<\/script>\s*$/;

export function splitLessonHtml(source: string, file: string): LessonParts {
  const match = source.match(LESSON_HTML_RE);
  if (!match) {
    throw new StudyContentError(
      file,
      'expected <style>…</style>, <div class="study-lesson">…</div>, <script>…</script> in that order',
    );
  }
  const [, css, html, script] = match;
  return { css: css.trim(), html: html.trim(), script: script.trim() };
}

function loadLesson(slug: string): StudyLesson {
  const dir = path.join(STUDY_DIR, slug);
  const metaFile = path.join(dir, "meta.json");
  const lessonFile = path.join(dir, "lesson.html");
  const label = (file: string) => path.relative(process.cwd(), file);

  let raw: unknown;
  try {
    raw = JSON.parse(fs.readFileSync(metaFile, "utf8"));
  } catch (error) {
    throw new StudyContentError(label(metaFile), `cannot read JSON (${(error as Error).message})`);
  }

  return {
    slug,
    ...parseStudyMeta(raw, label(metaFile)),
    ...splitLessonHtml(fs.readFileSync(lessonFile, "utf8"), label(lessonFile)),
  };
}

export function getStudyLessons(): StudyLesson[] {
  if (!fs.existsSync(STUDY_DIR)) return [];
  const lessons = fs
    .readdirSync(STUDY_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => loadLesson(entry.name));

  const seen = new Map<number, string>();
  for (const lesson of lessons) {
    const other = seen.get(lesson.lesson);
    if (other) {
      throw new Error(`content/study: lesson number ${lesson.lesson} is used by both "${other}" and "${lesson.slug}"`);
    }
    seen.set(lesson.lesson, lesson.slug);
  }

  return lessons.sort((a, b) => b.lesson - a.lesson);
}

export function getStudyLesson(slug: string): StudyLesson | undefined {
  return getStudyLessons().find((lesson) => lesson.slug === slug);
}

export function formatLessonNumber(lesson: number): string {
  return `Lesson ${String(lesson).padStart(2, "0")}`;
}

export function formatStudySource(source: StudySource): string {
  const length = source.durationMinutes
    ? `${source.durationMinutes} min ${source.kind}`
    : source.kind;
  return [source.author, source.org, length].filter(Boolean).join(" · ");
}

export function splitTitleAccent(title: string, accent?: string) {
  const at = accent ? title.lastIndexOf(accent) : -1;
  if (!accent || at === -1) return { before: title, accent: "", after: "" };
  return {
    before: title.slice(0, at),
    accent,
    after: title.slice(at + accent.length),
  };
}
