import { test } from "node:test";
import assert from "node:assert/strict";
import { convertLesson } from "./import-lesson.mjs";

function page({ head = "", css = ".card { color: red; }", main = "<main><p class=\"card\">hi</p></main>", script = "run();" } = {}) {
  return `<!doctype html><html><head>${head}<style>${css}</style></head><body>${main}<script>${script}</script></body></html>`;
}

const convert = (parts) => convertLesson(page(parts), "demo", new Set());
const scriptOf = (output) => output.match(/<script>\n([\s\S]*)\n<\/script>/)[1];

test("a plain page converts to scoped css, the main content and the script", () => {
  const output = convert();
  assert.match(output, /\.study-lesson \.card \{ color: red; \}/);
  assert.match(output, /<div class="study-lesson">\n<p class="card">hi<\/p>\n<\/div>/);
  assert.match(output, /node scripts\/study\/import-lesson\.mjs demo/);
  assert.equal(scriptOf(output), "run();");
});

test("getElementById becomes an escaped querySelector for any argument expression", () => {
  const script = scriptOf(
    convert({
      script: `document.getElementById('a.b'); document.getElementById(ids[k] + f(")")).focus();`,
    }),
  );
  assert.equal(
    script,
    `lessonRoot.querySelector("#" + CSS.escape('a.b')); lessonRoot.querySelector("#" + CSS.escape(ids[k] + f(")"))).focus();`,
  );
});

test("Google Fonts imports and links are dropped, other stylesheets fail the import", () => {
  const fonts = "https://fonts.googleapis.com/css2?family=Geist";
  assert.doesNotMatch(convert({ css: `@import url("${fonts}"); .card { color: red; }` }), /@import/);
  convert({ head: `<link href="${fonts}" rel="stylesheet">` });
  assert.throws(
    () => convert({ css: `@import url("https://example.com/x.css"); .card {}` }),
    /unsupported @import/,
  );
  assert.throws(
    () => convert({ head: `<link rel="stylesheet" href="/theme.css">` }),
    /unsupported stylesheet <link rel="stylesheet" href="\/theme\.css">/,
  );
});

test("keyframes and animations fail the import until their names are scoped", () => {
  for (const css of [
    "@keyframes marquee { from { opacity: 0 } to { opacity: 1 } }",
    ".card { animation: marquee 1s; }",
    ".card { animation-name: marquee; }",
  ]) {
    assert.throws(() => convert({ css }), /keyframes are not scoped yet/, css);
  }
});

test("a <main> with attributes fails the import", () => {
  assert.throws(
    () => convert({ main: `<main class="wide"><p>hi</p></main>` }),
    /<main class="wide"> has attributes/,
  );
});

test("any document reference other than createElementNS fails the import", () => {
  convert({ script: "document.createElementNS(ns, 'rect');" });
  for (const script of [
    "document['body'].append(x);",
    "window.document.title = 'x';",
    "const sel = 'document.querySelector';",
    "const d = document;",
  ]) {
    assert.throws(() => convert({ script }), /script still references "document/, script);
  }
});
