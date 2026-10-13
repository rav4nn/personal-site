// app/lib/navActive.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { isNavLinkActive } from "./navActive";

test("Home is active only on /", () => {
  assert.equal(isNavLinkActive("/", "/"), true);
  assert.equal(isNavLinkActive("/blog", "/"), false);
  assert.equal(isNavLinkActive("/projects", "/"), false);
});

test("Blog is active on /blog and on a post", () => {
  assert.equal(isNavLinkActive("/blog", "/blog"), true);
  assert.equal(isNavLinkActive("/blog/anything", "/blog"), true);
  assert.equal(isNavLinkActive("/", "/blog"), false);
});

test("a shared prefix does not match", () => {
  assert.equal(isNavLinkActive("/blogroll", "/blog"), false);
  assert.equal(isNavLinkActive("/projects-old", "/projects"), false);
});

test("a null path matches nothing", () => {
  assert.equal(isNavLinkActive(null, "/"), false);
});
