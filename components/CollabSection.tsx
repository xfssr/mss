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
    <Section id="collab" title={t(lang, "collabTitle")}>
      <p className="text-sm text-white/60 -mt-6 mb-8">{t(lang, "collabSubtitle")}</p>

      <div className="cc-glass rounded-3xl p-6 sm:p-10 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left: body + bullets */}
          <div className="flex-1 min-w-0">
            <p className="text-sm sm:text-base text-white/80 whitespace-pre-line leading-relaxed mb-6">
              {t(lang, "collabBody")}
            </p>

            <ul className="space-y-3">
              {BULLETS.map((key) => (
                <li key={key} className="flex items-start gap-3 text-sm sm:text-base text-white/80">
                  <span className="text-[rgb(var(--blue))] mt-0.5 shrink-0">●</span>
                  {t(lang, key)}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <button
                type="button"
                onClick={handleCta}
                className="inline-flex items-center justify-center rounded-xl border border-[rgb(var(--red))]/50 bg-[rgb(var(--red))]/25 px-7 py-4 text-base font-semibold text-white hover:bg-[rgb(var(--red))]/40 hover:border-[rgb(var(--red))]/70 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl hover:shadow-[rgb(var(--red))]/10"
              >
                {t(lang, "collabCta")}
              </button>
              <p className="mt-3 text-xs text-white/40">{t(lang, "collabDisclaimer")}</p>
            </div>
          </div>

          {/* Right: rules panel */}
          <div className="lg:w-56 shrink-0 flex flex-row lg:flex-col gap-3">
            <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-center">
              <span className="block text-lg font-bold text-[rgb(var(--blue))]">{t(lang, "collabSpots")}</span>
            </div>
            <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-center">
              <span className="block text-lg font-bold text-[rgb(var(--blue))]">{t(lang, "collabApproval")}</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
