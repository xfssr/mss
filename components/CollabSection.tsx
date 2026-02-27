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
      <div className="rounded-card border border-white/[0.06] bg-white/[0.02] p-5 sm:p-8 max-w-3xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Left: body + bullets */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white/55 whitespace-pre-line leading-relaxed mb-5">
              {t(lang, "collabBody")}
            </p>

            <ul className="space-y-2">
              {BULLETS.map((key) => (
                <li key={key} className="flex items-start gap-2.5 text-sm text-white/55">
                  <span className="text-[rgb(var(--blue))]/50 mt-0.5 shrink-0 text-xs">●</span>
                  {t(lang, key)}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleCta}
                className="btn-secondary"
              >
                {t(lang, "collabCta")}
              </button>
              <p className="mt-2.5 text-xs text-white/30">{t(lang, "collabDisclaimer")}</p>
            </div>
          </div>

          {/* Right: rules panel */}
          <div className="lg:w-44 shrink-0 flex flex-row lg:flex-col gap-2.5">
            <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-center">
              <span className="block text-sm font-semibold text-white/55">{t(lang, "collabSpots")}</span>
            </div>
            <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-center">
              <span className="block text-sm font-semibold text-white/55">{t(lang, "collabApproval")}</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
