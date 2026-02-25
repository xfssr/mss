"use client";

import { Section } from "@/components/Section";
import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";
import { buildWaMeUrl, openWhatsApp, WHATSAPP_PHONE } from "@/utils/whatsapp";

const BULLETS = ["collabBullet1", "collabBullet2", "collabBullet3", "collabBullet4"] as const;

export function CollabSection({ lang }: { lang: Lang }) {
  const handleCta = () => {
    const url = buildWaMeUrl(WHATSAPP_PHONE, t(lang, "collabWaMessage"));
    openWhatsApp(url);
  };

  return (
    <Section id="collab" title={t(lang, "collabTitle")} subtitle={t(lang, "collabSubtitle")}>
      <div className="glass-ultra rounded-3xl p-6 sm:p-10 shadow-lg ornament-corner">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left: body + bullets */}
          <div className="flex-1 min-w-0">
            <p className="text-sm sm:text-base text-white/80 whitespace-pre-line leading-relaxed mb-6">
              {t(lang, "collabBody")}
            </p>

            <ul className="space-y-3">
              {BULLETS.map((key) => (
                <li key={key} className="flex items-start gap-3 text-sm sm:text-base text-white/80">
                  <span className="text-[rgb(var(--gold))] mt-0.5 shrink-0">●</span>
                  {t(lang, key)}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <button
                type="button"
                onClick={handleCta}
                className="btn-gold inline-flex items-center justify-center rounded-xl px-7 py-4 text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              >
                {t(lang, "collabCta")}
              </button>
              {/* Glass-pill response note */}
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[rgb(var(--gold))]/15 bg-white/[0.04] backdrop-blur-sm px-3 py-1 text-xs text-white/40">
                {t(lang, "collabDisclaimer")}
              </p>
            </div>
          </div>

          {/* Right: rules panel with glow rings */}
          <div className="lg:w-56 shrink-0 flex flex-row lg:flex-col gap-3">
            <div className="flex-1 rounded-2xl border border-[rgb(var(--gold))]/15 bg-white/[0.04] px-5 py-4 text-center glow-ring">
              <span className="block text-lg font-bold text-[rgb(var(--gold-bright))]">{t(lang, "collabSpots")}</span>
            </div>
            <div className="flex-1 rounded-2xl border border-[rgb(var(--gold))]/15 bg-white/[0.04] px-5 py-4 text-center glow-ring" style={{ animationDelay: "1.5s" }}>
              <span className="block text-lg font-bold text-[rgb(var(--gold-bright))]">{t(lang, "collabApproval")}</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
