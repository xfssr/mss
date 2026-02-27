import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { WhatsAppCTA } from "@/components/lab/WhatsAppCTA";

test("sticky WhatsApp CTA renders action link", () => {
  const html = renderToStaticMarkup(<WhatsAppCTA lang="he" text="Start" />);
  assert.match(html, /wa\.me/);
  assert.match(html, /aria-label="WhatsApp CTA"/);
});
