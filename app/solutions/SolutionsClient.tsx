"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { SolutionItem } from "@/content/solutions";
import type { PricingConfig } from "@/types/pricing";
import type { DiscountConfig } from "@/lib/catalogOverridesStore";
import type { PackageDetail } from "@/lib/packageConfigStore";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { DEFAULT_LANG, STORAGE_KEY_LANG, t, type Lang } from "@/utils/i18n";
import { getNicheConfig, pickL10n } from "@/content/packagesConfig";
import {
  buildWaMeUrl,
  openWhatsApp,
  WHATSAPP_PHONE,
} from "@/utils/whatsapp";

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

const PACKAGE_IDS = ["starter", "business", "monthly"] as const;

export function SolutionsClient(props: {
  solutions: SolutionItem[];
  pricing?: PricingConfig;
  discountConfig?: DiscountConfig;
  packageDetails: PackageDetail[];
}) {
  const [lang, setLang] = useLocalStorageState<Lang>(STORAGE_KEY_LANG, DEFAULT_LANG);
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  useEffect(() => {
    try {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
    } catch {
      // ignore
    }
  }, [lang]);

  function handleRequestPackage(solution: SolutionItem, pkgTitle?: string) {
    const base = pickL10n(lang, solution.whatsappTemplatePrimary);
    const msg = pkgTitle
      ? `${base}\n${lang === "he" ? "חבילה" : "Package"}: ${pkgTitle}`
      : base;
    const url = buildWaMeUrl(WHATSAPP_PHONE, msg);
    openWhatsApp(url);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f14] via-[#0a0c10] to-[#06070a] text-white">
      <Navbar lang={lang} onSetLang={setLang} />

      <Section id="solutions" title={t(lang, "sectionSolutions")}>
        <div className="mb-4">
          <Link
            href="/#catalog"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
          >
            <span aria-hidden="true">←</span>
            {lang === "he" ? "חזרה לקטלוגים" : "Back to catalogs"}
          </Link>
        </div>
        <p className="text-sm text-white/70 mb-6">{t(lang, "solutionsIntro")}</p>

        <div className="space-y-6">
          {props.solutions.map((item) => {
            const icon = ICON_MAP[item.iconName] ?? "📦";
            const nicheConfig = getNicheConfig(item.slug);
            const isExpanded = expandedSlug === item.slug;

            return (
              <div
                key={item.slug}
                className="cc-glass rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/25 hover:shadow-2xl"
              >
                <div className="p-5 sm:p-6">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl shrink-0">{icon}</span>
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {pickL10n(lang, item.label)}
                      </h3>
                      <p className="mt-0.5 text-xs text-white/60">{pickL10n(lang, item.subtitle)}</p>
                    </div>
                  </div>

                  {/* What you get */}
                  {item.whatYouGet.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-white/60 font-medium mb-1">{t(lang, "solutionWhatYouGet")}:</p>
                      <ul className="space-y-0.5">
                        {item.whatYouGet.slice(0, 4).map((bullet, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-white/70">
                            <span className="text-[rgb(var(--red))] mt-0.5 shrink-0">•</span>
                            {pickL10n(lang, bullet)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Best for */}
                  <p className="text-xs text-white/50 mb-3">
                    <span className="text-[rgb(var(--blue))]/70 font-medium">{t(lang, "solutionBestFor")}:</span>{" "}
                    {pickL10n(lang, item.bestFor)}
                  </p>

                  {/* Toggle packages */}
                  <button
                    type="button"
                    onClick={() => setExpandedSlug(isExpanded ? null : item.slug)}
                    className="inline-flex items-center justify-center rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-4 py-2 text-xs font-medium text-white hover:bg-[rgb(var(--red))]/35 hover:border-[rgb(var(--red))]/60 transition-all"
                  >
                    {isExpanded ? t(lang, "less") : t(lang, "solutionPackages")}
                  </button>
                </div>

                {/* Canonical packages (Starter / Business / Monthly) */}
                {isExpanded && (
                  <div className="border-t border-white/10 px-5 sm:px-6 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
                    <h4 className="text-xs font-semibold text-[rgb(var(--red))] mb-2">
                      {t(lang, "solutionPackages")}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {PACKAGE_IDS.map((pkgId) => {
                        const detail = props.packageDetails.find((d) => d.id === pkgId);
                        if (!detail) return null;

                        const isRecommended = nicheConfig?.recommended === pkgId;
                        const nicheBullets = nicheConfig?.nicheBullets[pkgId];

                        return (
                          <div
                            key={pkgId}
                            className={[
                              "rounded-xl border p-4 transition-all",
                              isRecommended
                                ? "border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/[0.06]"
                                : "border-white/10 bg-white/[0.03]",
                            ].join(" ")}
                          >
                            {/* Package header */}
                            <div className="flex items-center gap-2 flex-wrap mb-2">
                              <span className="text-sm font-bold text-white">{pickL10n(lang, detail.title)}</span>
                              {isRecommended && (
                                <span className="text-[10px] rounded-full border border-[rgb(var(--red))]/50 bg-[rgb(var(--red))]/15 px-2 py-0.5 text-white/90 font-medium">
                                  {t(lang, "solutionRecommended")}
                                </span>
                              )}
                            </div>

                            {/* Price */}
                            {detail.priceFrom > 0 && (
                              <p className="text-xs text-white/50 mb-2">
                                {t(lang, "fromPrice")}₪{detail.priceFrom.toLocaleString()}
                              </p>
                            )}

                            {/* Niche-specific bullets */}
                            {nicheBullets && nicheBullets.length > 0 && (
                              <ul className="space-y-1 mb-3">
                                {nicheBullets.map((bullet, i) => (
                                  <li key={i} className="flex items-start gap-1.5 text-[11px] text-white/70">
                                    <span className="text-[rgb(var(--blue))] mt-0.5 shrink-0">✓</span>
                                    {pickL10n(lang, bullet)}
                                  </li>
                                ))}
                              </ul>
                            )}

                            {/* Delivery + Best for */}
                            <div className="space-y-0.5 mb-3">
                              <p className="text-[11px] text-white/50">
                                <span className="text-white/60 font-medium">{t(lang, "pkgDelivery")}:</span>{" "}
                                {pickL10n(lang, detail.deliveryTime)}
                              </p>
                              <p className="text-[11px] text-white/50">
                                <span className="text-white/60 font-medium">{t(lang, "solutionBestFor")}:</span>{" "}
                                {pickL10n(lang, detail.bestFor)}
                              </p>
                            </div>

                            {/* CTA → WhatsApp */}
                            <button
                              type="button"
                              onClick={() => handleRequestPackage(item, pickL10n(lang, detail.title))}
                              className={[
                                "w-full rounded-lg px-3 py-1.5 text-[11px] font-medium text-white transition-all",
                                isRecommended
                                  ? "border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 hover:bg-[rgb(var(--red))]/35"
                                  : "border border-white/15 bg-white/[0.06] hover:bg-white/[0.12]",
                              ].join(" ")}
                            >
                              {t(lang, "solutionRequestPackage")}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      <Footer lang={lang} />
    </div>
  );
}
