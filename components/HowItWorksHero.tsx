"use client";

import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";

const STEPS = [
  { icon: "📦", key: "howCompactStep2", href: "#packages", step: "1" },
  { icon: "💬", key: "howCompactStep3", href: "#contact", step: "2" },
] as const;

export function HowItWorksHero(props: { lang: Lang }) {
  const lang = props.lang;

  return (
    <div className="mt-8">
      <h3 className="text-sm font-semibold text-white/70 text-center mb-4">
        {t(lang, "howItWorksTitle")}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {STEPS.map((s) => (
          <a
            key={s.key}
            href={s.href}
            className="group flex items-center gap-3 sm:flex-col sm:items-center sm:text-center rounded-xl border border-white/10 bg-white/[0.04] p-4 hover:bg-white/[0.08] hover:border-white/20 hover:shadow-lg transition-all duration-200"
          >
            {/* Step number badge */}
            <div className="shrink-0 w-10 h-10 rounded-full border border-[rgb(var(--accent))]/30 bg-[rgb(var(--accent))]/10 flex items-center justify-center text-lg group-hover:bg-[rgb(var(--accent))]/20 group-hover:border-[rgb(var(--accent))]/50 transition-all">
              {s.icon}
            </div>
            <div className="min-w-0 sm:mt-1">
              <span className="text-[10px] font-bold text-[rgb(var(--accent))]/60 uppercase tracking-wider">
                {lang === "he" ? `שלב ${s.step}` : `Step ${s.step}`}
              </span>
              <p className="text-sm text-white/80 font-medium group-hover:text-white transition-colors">
                {t(lang, s.key)}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* CTA at bottom of How it works */}
      <div className="mt-6 text-center">
        <a
          href="#packages"
          className="inline-flex items-center justify-center rounded-xl bg-[#FF8C42] px-8 py-3.5 text-sm font-medium text-white hover:bg-[#E85D2A] transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
        >
          {t(lang, "letsStart")}
        </a>
      </div>
    </div>
  );
}
