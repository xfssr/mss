"use client";

import { useState } from "react";
import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";

const CLAMP_LENGTH = 120;

export function DescriptionClamp(props: { lang: Lang; text: string; className?: string }) {
  const [expanded, setExpanded] = useState(false);
  const text = (props.text || "").trim();

  if (!text) return null;

  const needsClamp = text.length > CLAMP_LENGTH;
  const display = needsClamp && !expanded ? text.slice(0, CLAMP_LENGTH) + "…" : text;

  return (
    <div className={props.className}>
      <span className="whitespace-pre-line">{display}</span>
      {needsClamp ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="ml-1 text-[rgb(var(--blue))] hover:underline text-xs"
        >
          {expanded ? t(props.lang, "showLess") : t(props.lang, "showMore")}
        </button>
      ) : null}
    </div>
  );
}
