import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("premium token palette exists in globals.css", () => {
  const css = readFileSync("app/globals.css", "utf8");
  ["--surface-0", "--surface-1", "--text-primary", "--accent", "--line"].forEach((token) => {
    assert.match(css, new RegExp(token));
  });
});
