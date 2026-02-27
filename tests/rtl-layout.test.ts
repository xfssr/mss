import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("root layout keeps Hebrew RTL defaults", () => {
  const layout = readFileSync("app/layout.tsx", "utf8");
  assert.match(layout, /lang="he"/);
  assert.match(layout, /dir="rtl"/);
});
