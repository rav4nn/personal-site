#!/usr/bin/env node
// Converts a standalone visual-explainer page into content/study/<slug>/lesson.html:
// a scoped <style>, the <main> content inside <div class="study-lesson">, and a
// <script> that runs against the lesson root instead of `document`.
// The standalone page is kept beside it as source.html, the input for re-imports.
// Usage:
//   node scripts/study/import-lesson.mjs <standalone.html> <slug>   copy in a new source, then convert
//   node scripts/study/import-lesson.mjs <slug>                     re-convert the committed source.html

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import postcss from "postcss";

const ROOT_CLASS = "study-lesson";
const ROOT = `.${ROOT_CLASS}`;
// Must match the parameter name LessonBody passes to `new Function`.
const ROOT_PARAM = "lessonRoot";

// The standalone page fakes the site chrome; the real layout provides it.
const CHROME_CLASSES = ["site", "rail", "body-grid", "col", "glow", "sitenav", "navpill", "social"];
const CHROME_RE = new RegExp(`\\.(?:${CHROME_CLASSES.join("|")})(?![\\w-])`);
const ROOT_ELEMENT_RE = /^(?::root|html|body|main)(?![\w-])/;
const STRAY_ROOT_ELEMENT_RE = /(?:^|[\s>+~(,])(?::root|html|body|main)(?![\w-])/;

// app/globals.css and Tailwind preflight style bare elements site-wide. These
// restore browser defaults inside a lesson. :where() keeps them at the lowest
// specificity a scoped rule can have, so any lesson rule still wins.
const ELEMENT_RESETS = `
${ROOT} :where(h1, h2, h3, h4, h5, h6) { font-size: revert; font-weight: revert; }
${ROOT} :where(h3, h4) { font-weight: bold !important; letter-spacing: normal !important; }
${ROOT} :where(code)::before, ${ROOT} :where(code)::after { content: none; }
${ROOT} :where(table) { display: table; max-width: none; overflow-x: visible; white-space: normal; }
${ROOT} :where(ol, ul, menu) { list-style: revert; padding: revert; }
${ROOT} :where(img, svg, video, canvas, audio, iframe, embed, object) { display: revert; vertical-align: revert; }
${ROOT} :where(iframe) { margin-bottom: revert; }
${ROOT} :where(button, [type="button"], [type="reset"], [type="submit"]) { background-color: revert; background-image: revert; }
${ROOT} :where(a) { color: revert; text-decoration: revert; }
`;

// Lesson classes that app/globals.css also styles, and what to undo for each.
// A new collision fails the import until it gets an entry here.
const GLOBAL_CLASS_RESETS = {
  "code-frame": "justify-content: revert; overflow: revert; border-radius: revert;",
};

const GOOGLE_FONTS_RE = /\bfonts\.googleapis\.com\//;

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

export class ImportError extends Error {
  name = "ImportError";
}

function fail(message) {
  throw new ImportError(message);
}

function extractOne(html, re, what) {
  const matches = [...html.matchAll(re)];
  if (matches.length !== 1) fail(`expected exactly one ${what}, found ${matches.length}`);
  return matches[0][1];
}

function lastCompound(selector) {
  return selector.split(/\s*[>+~]\s*|\s+/).filter(Boolean).pop() ?? "";
}

function scopeSelector(selector) {
  let rest = selector.trim();
  let motion = "";
  const motionMatch = rest.match(/^\.js-motion(?![\w-])\s+/);
  if (motionMatch) {
    motion = ".js-motion";
    rest = rest.slice(motionMatch[0].length);
  }
  const rootMatch = rest.match(ROOT_ELEMENT_RE);
  const scoped = rootMatch
    ? `${ROOT}${motion}${rest.slice(rootMatch[0].length)}`
    : `${ROOT}${motion} ${rest}`;
  if (STRAY_ROOT_ELEMENT_RE.test(scoped.slice(ROOT.length + motion.length))) {
    fail(`selector "${selector}" names :root/html/body/main somewhere other than its start`);
  }
  return scoped;
}

function replaceFonts(value) {
  return value
    .replace(/(["'])Geist Mono\1/g, "var(--font-geist-mono)")
    .replace(/(["'])Geist\1/g, "var(--font-geist-sans)");
}

function classNames(selectors) {
  const names = new Set();
  for (const selector of selectors) {
    for (const m of selector.matchAll(/\.([A-Za-z_][\w-]*)/g)) names.add(m[1]);
  }
  return names;
}

async function globalClassNames() {
  const css = await readFile(path.join(repoRoot, "app/globals.css"), "utf8");
  const names = new Set();
  postcss.parse(css).walkRules((rule) => {
    for (const name of classNames(rule.selectors)) names.add(name);
  });
  return names;
}

function convertCss(source, globalClasses) {
  const root = postcss.parse(source);
  root.walkComments((comment) => comment.remove());
  root.walkAtRules("import", (atRule) => {
    if (!GOOGLE_FONTS_RE.test(atRule.params)) fail(`unsupported @import ${atRule.params}`);
    atRule.remove();
  });
  // Keyframe names are page-global (the site already defines `marquee`).
  root.walkAtRules(/keyframes$/i, () => {
    fail("keyframes are not scoped yet; rename or add support");
  });
  root.walkDecls(/^(?:-webkit-)?animation(?:-name)?$/i, () => {
    fail("keyframes are not scoped yet; rename or add support");
  });

  const lessonClasses = new Set();
  root.walkRules((rule) => {
    const kept = rule.selectors.filter((selector) => !CHROME_RE.test(selector));
    if (kept.length === 0) {
      rule.remove();
      return;
    }
    for (const name of classNames(kept)) lessonClasses.add(name);

    // The site's body already paints the page background; painting it again on
    // the lesson root would hide the layout's purple glow behind it.
    if (kept.every((selector) => /^(?:html|body)$/.test(selector.trim()))) {
      rule.walkDecls(/^background(?:-color)?$/, (decl) => decl.remove());
    }

    // globals.css sets h3/h4 weight and tracking with !important, so the
    // lesson's own values only apply if they are !important too.
    if (kept.some((selector) => /^h[34](?![\w-])/.test(lastCompound(selector)))) {
      rule.walkDecls(/^(?:font|font-weight|letter-spacing)$/, (decl) => {
        decl.important = true;
      });
    }

    rule.selectors = kept.map(scopeSelector);
  });

  root.walkDecls((decl) => {
    decl.value = replaceFonts(decl.value);
  });
  root.walkAtRules((atRule) => {
    if (atRule.nodes?.length === 0) atRule.remove();
  });

  const leftover = root.toString().match(/["']Geist(?: Mono)?["']/);
  if (leftover) fail(`font token ${leftover[0]} was not replaced with a next/font variable`);

  const collisions = [...lessonClasses].filter((name) => globalClasses.has(name));
  const unhandled = collisions.filter((name) => !(name in GLOBAL_CLASS_RESETS));
  if (unhandled.length > 0) {
    fail(
      `lesson classes also styled by app/globals.css: ${unhandled.join(", ")}. ` +
        "Add an entry to GLOBAL_CLASS_RESETS that undoes the global rule.",
    );
  }
  const classResets = collisions
    .map((name) => `${ROOT} .${name} { ${GLOBAL_CLASS_RESETS[name]} }`)
    .join("\n");

  return `${ELEMENT_RESETS.trim()}\n${classResets}\n${root.toString().trim()}`;
}

function checkStylesheetLinks(page) {
  for (const [tag] of page.matchAll(/<link\b[^>]*>/gi)) {
    if (/\brel=["']?stylesheet\b/i.test(tag) && !GOOGLE_FONTS_RE.test(tag)) {
      fail(`unsupported stylesheet ${tag}; inline it into the <style> block`);
    }
  }
}

function convertBody(page) {
  const mainTag = page.match(/<main\b[^>]*>/)?.[0];
  if (mainTag && mainTag !== "<main>") fail(`${mainTag} has attributes, which the lesson root would drop`);
  const main = extractOne(page, /<main>([\s\S]*?)<\/main>/g, "<main> element");
  const sprite = page.match(/<svg[^>]*>\s*<defs>[\s\S]*?<\/defs>\s*<\/svg>/)?.[0];
  if (sprite && main.includes(sprite)) fail("the <defs> sprite sits inside <main>; expected it outside");
  const content = main
    .trim()
    .replace(/href="https:\/\/hardeep\.cv\/?"/g, 'href="/"')
    .replace(/href="https:\/\/hardeep\.cv(\/[^"]*)"/g, 'href="$1"')
    .replace(/<a href="#">Study<\/a>/g, '<a href="/study">Study</a>');
  return sprite ? `${sprite}\n${content}` : content;
}

// Index of the `)` that closes the call whose `(` sits just before `start`,
// skipping parentheses inside string literals.
function closingParen(source, start) {
  let depth = 1;
  for (let i = start; i < source.length; i++) {
    const ch = source[i];
    if (ch === "'" || ch === '"' || ch === "`") {
      for (i++; i < source.length && source[i] !== ch; i++) if (source[i] === "\\") i++;
    } else if (ch === "(") depth++;
    else if (ch === ")" && --depth === 0) return i;
  }
  fail("unbalanced parentheses after document.getElementById(");
}

// getElementById takes a raw id; querySelector needs it escaped (ids like "a.b" or "1x").
function rewriteGetElementById(source) {
  const call = "document.getElementById(";
  let out = "";
  let rest = source;
  for (let at = rest.indexOf(call); at !== -1; at = rest.indexOf(call)) {
    const close = closingParen(rest, at + call.length);
    const id = rest.slice(at + call.length, close);
    out += `${rest.slice(0, at)}${ROOT_PARAM}.querySelector("#" + CSS.escape(${id}))`;
    rest = rest.slice(close + 1);
  }
  return out + rest;
}

function convertScript(source) {
  if (new RegExp(`\\b${ROOT_PARAM}\\b`).test(source)) {
    fail(`the script already uses the identifier "${ROOT_PARAM}", which the converter reserves`);
  }
  const script = rewriteGetElementById(source)
    .replace(/document\.documentElement\.classList\.add\(/g, `${ROOT_PARAM}.classList.add(`)
    .replace(/document\.querySelectorAll\(/g, `${ROOT_PARAM}.querySelectorAll(`)
    .replace(/document\.querySelector\(/g, `${ROOT_PARAM}.querySelector(`)
    .replace(/(['"])main > \*\1/g, "':scope > *'");
  const stray = script.match(/\bdocument\b(?!\.createElementNS\b).{0,30}/);
  if (stray) fail(`script still references "${stray[0]}" after rewriting to run against the lesson root`);
  return script.trim();
}

export function convertLesson(page, slug, globalClasses) {
  checkStylesheetLinks(page);
  const css = convertCss(
    extractOne(page, /<style[^>]*>([\s\S]*?)<\/style>/g, "<style> block"),
    globalClasses,
  );
  const body = convertBody(page);
  const script = convertScript(
    extractOne(page, /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g, "inline <script>"),
  );
  const banner = `/* Generated from source.html by scripts/study/import-lesson.mjs. Edit source.html, then run: node scripts/study/import-lesson.mjs ${slug} */`;
  return `<style>\n${banner}\n${css}\n</style>\n<div class="${ROOT_CLASS}">\n${body}\n</div>\n<script>\n${script}\n</script>\n`;
}

async function main(args) {
  const usage = "usage: node scripts/study/import-lesson.mjs [<standalone.html>] <slug>";
  if (args.length < 1 || args.length > 2) fail(usage);
  const slug = args.at(-1);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) fail(`slug "${slug}" must be kebab-case. ${usage}`);

  const outDir = path.join(repoRoot, "content/study", slug);
  const sourceFile = path.join(outDir, "source.html");
  await mkdir(outDir, { recursive: true });
  if (args.length === 2) {
    await writeFile(sourceFile, await readFile(args[0], "utf8"));
    console.log(`import-lesson: copied ${args[0]} to ${path.relative(repoRoot, sourceFile)}`);
  }

  const page = await readFile(sourceFile, "utf8");
  const outFile = path.join(outDir, "lesson.html");
  await writeFile(outFile, convertLesson(page, slug, await globalClassNames()));
  console.log(`import-lesson: wrote ${path.relative(repoRoot, outFile)}`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  try {
    await main(process.argv.slice(2));
  } catch (error) {
    if (!(error instanceof ImportError)) throw error;
    console.error(`import-lesson: ${error.message}`);
    process.exit(1);
  }
}
