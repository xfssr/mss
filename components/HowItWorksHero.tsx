"use client";

import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";

const STEPS = [
  { icon: "📂", key: "howCompactStep1", href: "#catalog" },
  { icon: "📦", key: "howCompactStep2", href: "#packages" },
  { icon: "💬", key: "howCompactStep3", href: "#contact" },
] as const;

export function HowItWorksHero(props: { lang: Lang }) {
  const lang = props.lang;

  return (
    <div className="mt-6 rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm px-4 py-3">
      <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        {STEPS.map((s, i) => (
          <div key={s.key} className="flex items-center gap-2 sm:gap-4">
            <a
              href={s.href}
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/80 hover:text-white transition-colors"
            >
              <span className="text-base sm:text-lg" aria-hidden="true">{s.icon}</span>
              <span>{t(lang, s.key)}</span>
            </a>
            {i < STEPS.length - 1 && (
              <span className="text-white/30 text-xs" aria-hidden="true">→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
