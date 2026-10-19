import { test } from "node:test";
import assert from "node:assert/strict";
import {
  formatStudySource,
  getStudyLesson,
  getStudyLessons,
  parseStudyMeta,
  splitLessonHtml,
  splitTitleAccent,
} from "./study";

const validMeta = {
  lesson: 1,
  title: "Evals are fuzzy unit tests, and the judge can lie",
  titleAccent: "the judge can lie",
  summary: "Notes.",
  publishedAt: "2026-10-20",
  readMinutes: 8,
  tags: ["evals"],
  source: {
    kind: "talk",
    title: "Evals in AI",
    author: "Tejas Kumar",
    org: "IBM",
    url: "https://www.youtube.com/watch?v=NdrSPm6NCdk",
    durationMinutes: 60,
  },
};

test("a valid meta.json parses", () => {
  assert.equal(parseStudyMeta(validMeta, "meta.json").source.kind, "talk");
});

test("an invalid meta.json names the file and the field", () => {
  assert.throws(
    () => parseStudyMeta({ ...validMeta, readMinutes: "8" }, "content/study/x/meta.json"),
    /content\/study\/x\/meta\.json: "readMinutes" must be a positive integer/,
  );
  assert.throws(
    () => parseStudyMeta({ ...validMeta, source: { ...validMeta.source, kind: "podcast" } }, "m"),
    /"source\.kind" must be one of/,
  );
  assert.throws(
    () => parseStudyMeta({ ...validMeta, source: { ...validMeta.source, url: "" } }, "m"),
    /"source\.url" must be a non-empty string/,
  );
  assert.throws(
    () => parseStudyMeta({ ...validMeta, titleAccent: "not in the title" }, "m"),
    /"titleAccent" must be a substring of "title"/,
  );
  assert.throws(
    () => parseStudyMeta({ ...validMeta, publishedAt: "20 Oct 2026" }, "m"),
    /"publishedAt" must be a YYYY-MM-DD date/,
  );
  for (const publishedAt of ["2026-02-31", "2026-13-01", "2026-00-10"]) {
    assert.throws(
      () => parseStudyMeta({ ...validMeta, publishedAt }, "m"),
      /"publishedAt" must be a YYYY-MM-DD date/,
      publishedAt,
    );
  }
  assert.equal(parseStudyMeta({ ...validMeta, publishedAt: "2028-02-29" }, "m").publishedAt, "2028-02-29");
});

test("lesson.html splits into css, html and script", () => {
  const parts = splitLessonHtml(
    '<style>\n.a{}\n</style>\n<div class="study-lesson">\n<p>hi</p>\n</div>\n<script>\nrun()\n</script>\n',
    "lesson.html",
  );
  assert.deepEqual(parts, { css: ".a{}", html: "<p>hi</p>", script: "run()" });
  assert.throws(() => splitLessonHtml("<div>no style</div>", "x/lesson.html"), /x\/lesson\.html: expected/);
});

test("lesson 01 loads from content/study", () => {
  const lesson = getStudyLesson("evals-deep-dive");
  assert.ok(lesson, "evals-deep-dive exists");
  assert.equal(lesson.lesson, 1);
  assert.match(lesson.html, /id="anatomy"/);
  assert.doesNotMatch(lesson.script, /\bdocument\.(?!createElementNS)/);
  assert.equal(getStudyLessons()[0].lesson >= 1, true);
});

test("source line and title accent", () => {
  assert.equal(formatStudySource(validMeta.source as never), "Tejas Kumar · IBM · 60 min talk");
  assert.deepEqual(splitTitleAccent(validMeta.title, validMeta.titleAccent), {
    before: "Evals are fuzzy unit tests, and ",
    accent: "the judge can lie",
    after: "",
  });
  assert.deepEqual(splitTitleAccent("Plain"), { before: "Plain", accent: "", after: "" });
});
