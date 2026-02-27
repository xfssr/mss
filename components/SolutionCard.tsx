"use client";

import Image from "next/image";
import Link from "next/link";
import type { SolutionItem } from "@/content/solutions";
import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";

function pick(lang: Lang, v: { he: string; en: string }) {
  const s = v?.[lang] ?? "";
  return s?.trim() ? s : v.he;
}

const ICON_MAP: Record<string, string> = {
  utensils: "🍽️",
  flame: "🔥",
  wine: "🍷",
  flower: "🌸",
  "pen-tool": "✒️",
  sparkles: "✨",
  "shopping-bag": "🛍️",
  home: "🏠",
  zap: "⚡",
  hammer: "🔨",
};

export function SolutionCard(props: {
  lang: Lang;
  item: SolutionItem;
  onSelect: () => void;
}) {
  const { lang, item, onSelect } = props;
  const icon = ICON_MAP[item.iconName] ?? "📦";

  return (
    <button
      type="button"
      onClick={onSelect}
      className="group text-start cc-glass rounded-card overflow-hidden transition-all duration-300 hover:border-white/[0.16] hover:bg-white/[0.06] hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--blue))] focus-visible:ring-offset-2 focus-visible:ring-offset-black/50"
    >
      {item.cover && (
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={item.cover}
            alt={pick(lang, item.label)}
            fill
            sizes="360px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl shrink-0">{icon}</span>
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[rgb(var(--blue))] transition-colors">
              <Link
                href={`/product/${item.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="hover:underline"
              >
                {pick(lang, item.label)}
              </Link>
            </h3>
            <p className="mt-1 text-xs text-white/60 line-clamp-2">{pick(lang, item.subtitle)}</p>
          </div>
        </div>

        {/* Pills */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.pills.map((pill, i) => (
            <span
              key={i}
              className="text-[11px] rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-white/60"
            >
              {pick(lang, pill)}
            </span>
          ))}
        </div>

        {/* Price range hint */}
        {item.pricingTiers.length > 0 && (
          <div className="mt-2 text-[11px] text-[rgb(var(--blue))]/60">
            {t(lang, "fromPrice")}{pick(lang, item.pricingTiers[0].range)}
          </div>
        )}

        <div className="mt-4">
          <span className="inline-flex items-center justify-center rounded-xl border border-[rgb(var(--red))]/25 bg-[rgb(var(--red))]/8 px-4 py-2 text-xs font-medium text-white/80 group-hover:bg-[rgb(var(--red))]/15 group-hover:border-[rgb(var(--red))]/40 transition-all">
            {t(lang, "solutionView")} →
          </span>
        </div>
      </div>
    </button>
  );
}
