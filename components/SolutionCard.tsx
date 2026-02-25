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
      className="group text-start cc-glass card-shine silver-accent-line rounded-2xl overflow-hidden transition-all duration-300 hover:border-[rgb(var(--silver))]/25 hover:bg-white/[0.10] hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--silver))] focus-visible:ring-offset-2 focus-visible:ring-offset-black/50"
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
          {/* Multi-layer gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      )}
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-3">
          {/* Icon glow box */}
          <span className="text-2xl shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-[rgb(var(--silver))]/[0.08] border border-[rgb(var(--silver))]/15 shadow-[0_0_10px_rgba(var(--silver)/0.1)] group-hover:shadow-[0_0_20px_rgba(var(--silver)/0.2)] transition-shadow duration-300">{icon}</span>
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[rgb(var(--silver-bright))] transition-colors">
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
              className="text-[11px] rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-0.5 text-white/70"
            >
              {pick(lang, pill)}
            </span>
          ))}
        </div>

        {/* Price range hint */}
        {item.pricingTiers.length > 0 && (
          <div className="mt-2 text-[11px] text-[rgb(var(--silver))]/70">
            {t(lang, "fromPrice")}{pick(lang, item.pricingTiers[0].range)}
          </div>
        )}

        <div className="mt-4">
          <span className="inline-flex items-center justify-center rounded-xl border border-[rgb(var(--silver))]/30 bg-[rgb(var(--silver))]/10 px-4 py-2 text-xs font-medium text-[rgb(var(--silver-bright))] group-hover:bg-[rgb(var(--silver))]/20 group-hover:border-[rgb(var(--silver))]/50 transition-all uppercase tracking-wider">
            {t(lang, "solutionView")} →
          </span>
        </div>
      </div>
    </button>
  );
}
