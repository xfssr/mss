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
    <Section id="collab" title={t(lang, "collabTitle")} subtitle={t(lang, "collabSubtitle")} className="opacity-90">
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-8 max-w-3xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Left: body + bullets */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white/65 whitespace-pre-line leading-relaxed mb-5">
              {t(lang, "collabBody")}
            </p>

            <ul className="space-y-2">
              {BULLETS.map((key) => (
                <li key={key} className="flex items-start gap-2.5 text-sm text-white/65">
                  <span className="text-[rgb(var(--blue))]/60 mt-0.5 shrink-0 text-xs">●</span>
                  {t(lang, key)}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleCta}
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-medium text-white/80 hover:bg-white/[0.10] hover:border-white/25 transition-all duration-200"
              >
                {t(lang, "collabCta")}
              </button>
              <p className="mt-2.5 text-xs text-white/35">{t(lang, "collabDisclaimer")}</p>
            </div>
          </div>

          {/* Right: rules panel */}
          <div className="lg:w-44 shrink-0 flex flex-row lg:flex-col gap-2.5">
            <div className="flex-1 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-center">
              <span className="block text-sm font-semibold text-white/60">{t(lang, "collabSpots")}</span>
            </div>
            <div className="flex-1 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-center">
              <span className="block text-sm font-semibold text-white/60">{t(lang, "collabApproval")}</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
