"use client";

import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";

export type TabKey = "examples" | "package" | "reserve";

export function Tabs(props: { lang: Lang; value: TabKey; onChange: (v: TabKey) => void }) {
  const items: Array<{ key: TabKey; label: string; step: number }> = [
    { key: "examples", label: t(props.lang, "tabExamples"), step: 1 },
    { key: "package", label: t(props.lang, "tabPackage"), step: 2 },
    { key: "reserve", label: t(props.lang, "tabReserve"), step: 3 },
  ];

  return (
    <div
      className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-black/30 p-1 cc-z1 whitespace-nowrap"
      role="tablist"
      aria-label="Steps"
    >
      {items.map((it) => {
        const active = it.key === props.value;
        return (
          <button
            key={it.key}
            type="button"
            onClick={() => props.onChange(it.key)}
            role="tab"
            aria-selected={active}
            className={[
              "flex items-center gap-2 rounded-lg transition",
              "px-2.5 sm:px-3 py-1.5 sm:py-2",
              "text-xs sm:text-sm",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--blue))]",
              active
                ? "bg-[rgb(var(--red))]/18 text-white border border-[rgb(var(--red))]/35"
                : "text-white/70 hover:text-white hover:bg-white/[0.06] border border-transparent",
            ].join(" ")}
          >
            <span
              className={[
                "inline-flex h-5 w-5 items-center justify-center rounded-full border text-[11px]",
                active ? "border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/15" : "border-white/15 bg-black/20",
              ].join(" ")}
            >
              {it.step}
            </span>

            {/* На мобиле оставим только цифры, чтобы не переносилось */}
            <span className="hidden sm:inline">{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}
