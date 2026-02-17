"use client";

import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";

const STEPS = [
  { icon: "📂", key: "howCompactStep1", href: "#catalog", step: "1" },
  { icon: "📦", key: "howCompactStep2", href: "#packages", step: "2" },
  { icon: "💬", key: "howCompactStep3", href: "#contact", step: "3" },
] as const;

export function HowItWorksHero(props: { lang: Lang }) {
  const lang = props.lang;

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {STEPS.map((s, i) => (
          <a
            key={s.key}
            href={s.href}
            className="group relative flex items-center gap-3 sm:flex-col sm:items-center sm:text-center rounded-xl border border-white/10 bg-white/[0.04] p-4 hover:bg-white/[0.08] hover:border-white/20 hover:shadow-lg transition-all duration-200"
          >
            {/* Step number badge */}
            <div className="shrink-0 w-10 h-10 rounded-full border border-[rgb(var(--red))]/30 bg-[rgb(var(--red))]/10 flex items-center justify-center text-lg group-hover:bg-[rgb(var(--red))]/20 group-hover:border-[rgb(var(--red))]/50 transition-all">
              {s.icon}
            </div>
            <div className="min-w-0 sm:mt-1">
              <span className="text-[10px] font-bold text-[rgb(var(--red))]/60 uppercase tracking-wider">
                {lang === "he" ? `שלב ${s.step}` : `Step ${s.step}`}
              </span>
              <p className="text-sm text-white/80 font-medium group-hover:text-white transition-colors">
                {t(lang, s.key)}
              </p>
            </div>
            {/* Arrow connector (desktop only, not on last item) */}
            {i < STEPS.length - 1 && (
              <span className="hidden sm:block absolute -right-[0.85rem] top-1/2 -translate-y-1/2 text-white/25 text-xs z-10" aria-hidden="true">
                →
              </span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
