"use client";

import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";

export type TabKey = "examples" | "package" | "reserve";

export function Tabs(props: { lang: Lang; value: TabKey; onChange: (v: TabKey) => void }) {
  const items: Array<{ key: TabKey; label: string }> = [
    { key: "examples", label: t(props.lang, "tabExamples") },
    { key: "package", label: t(props.lang, "tabPackage") },
    { key: "reserve", label: t(props.lang, "tabReserve") },
  ];

  return (
    <div className="inline-flex rounded-xl border border-white/10 bg-black/20 p-1 cc-z1">
      {items.map((it) => {
        const active = it.key === props.value;
        return (
          <button
            key={it.key}
            type="button"
            onClick={() => props.onChange(it.key)}
            className={[
              "px-3 py-2 text-sm rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--blue))]",
              active ? "bg-white/10 text-white border border-white/10" : "text-white/65 hover:text-white hover:bg-white/[0.06]",
            ].join(" ")}
            aria-pressed={active}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
