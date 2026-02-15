// components/ClientPage.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Catalog } from "@/types/catalog";
import type { CategoryDetail } from "@/content/categoryDetails";
import type { HeroMedia } from "@/types/hero";
import type { PricingConfig } from "@/types/pricing";
import type { PriceItem } from "@/types/price";
import type { SiteSettings } from "@/types/settings";
import { Navbar } from "@/components/Navbar";
import { Section } from "@/components/Section";
import { CategoryDetailModal } from "@/components/CategoryDetailModal";
import { CatalogGrid } from "@/components/CatalogGrid";
import { MiniScreenPanel } from "@/components/MiniScreenPanel";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { Footer } from "@/components/Footer";
import { HeroSlider } from "@/components/HeroSlider";
import { HowItWorksHero } from "@/components/HowItWorksHero";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { DEFAULT_LANG, STORAGE_KEY_LANG, t, type Lang } from "@/utils/i18n";
import {
  buildMessage,
  buildWaMeUrl,
  DEFAULT_RESERVATION,
  openWhatsApp,
  WHATSAPP_PHONE,
} from "@/utils/whatsapp";

type Props = {
  catalogs: Catalog[];
  categoryDetails: CategoryDetail[];
  settings: SiteSettings;
  prices: PriceItem[];
  heroMedia: HeroMedia[];
  pricing: PricingConfig;
};

function pickL10n(lang: Lang, v: { he: string; en: string }) {
  const s = v?.[lang] ?? "";
  return s?.trim() ? s : v.he;
}

const PACKAGE_CARDS = [
  {
    id: "starter",
    icon: "📁",
    badge: "popular" as const,
  },
  {
    id: "growth",
    icon: "🚀",
    badge: "popular" as const,
  },
  {
    id: "pro",
    icon: "⭐",
    badge: undefined,
  },
  {
    id: "custom",
    icon: "🛠",
    badge: undefined,
  },
] as const;

export function ClientPage(props: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [lang, setLang] = useLocalStorageState<Lang>(STORAGE_KEY_LANG, DEFAULT_LANG);

  useEffect(() => {
    try {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
    } catch {
      // ignore
    }
  }, [lang]);

  const [panelOpen, setPanelOpen] = useState(false);

  const enrichedCatalogs = useMemo(() => {
    return props.catalogs.map((c) => {
      const detail = props.categoryDetails.find((d) => d.slug === c.slug);
      if (detail && c.microCta == null) {
        return { ...c, microCta: detail.ctaPrimary };
      }
      return c;
    });
  }, [props.catalogs, props.categoryDetails]);

  const slugFromUrl = searchParams.get("catalog");

  const selectedCatalog = useMemo(() => enrichedCatalogs.find((c) => c.slug === slugFromUrl) ?? null, [enrichedCatalogs, slugFromUrl]);

  const selectedCategoryDetail = useMemo(
    () => (slugFromUrl ? props.categoryDetails.find((d) => d.slug === slugFromUrl) ?? null : null),
    [props.categoryDetails, slugFromUrl],
  );

  const messagePreview = useMemo(() => {
    return buildMessage({ lang, reservation: DEFAULT_RESERVATION });
  }, [lang]);

  function setParams(next: { catalog?: string | null }) {
    const sp = new URLSearchParams(searchParams.toString());
    if (next.catalog === null) sp.delete("catalog");
    else if (typeof next.catalog === "string") sp.set("catalog", next.catalog);

    const qs = sp.toString();
    router.replace(qs ? `/?${qs}#catalog` : "/#catalog");
  }

  function openCatalog(slug: string) {
    setPanelOpen(true);
    setParams({ catalog: slug });
  }

  useEffect(() => {
    if (slugFromUrl && selectedCatalog) setPanelOpen(true);
  }, [selectedCatalog, slugFromUrl]);

  function closePanel() {
    setPanelOpen(false);
    setParams({ catalog: null });
  }

  function onSendWhatsApp() {
    const url = buildWaMeUrl(WHATSAPP_PHONE, messagePreview);
    openWhatsApp(url);
  }

  function onContinueToProduct(pkg?: string) {
    router.push(`/product?lang=${lang}${pkg ? `&pkg=${encodeURIComponent(pkg)}` : ""}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f14] via-[#0a0c10] to-[#06070a] text-white">
      <Navbar lang={lang} onSetLang={setLang} />

      <FloatingWhatsAppButton onClick={onSendWhatsApp} />

      <Section id="top">
        <div className="cc-glass rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-7">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[rgb(var(--blue))] leading-tight">{pickL10n(lang, props.settings.heroTitle)}</h1>
              <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed">{pickL10n(lang, props.settings.heroSubtitle)}</p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#catalog"
                  className="inline-flex items-center justify-center rounded-xl border border-[rgb(var(--blue))]/30 bg-[rgb(var(--blue))]/10 px-6 py-3.5 text-sm font-medium text-white/90 hover:bg-[rgb(var(--blue))]/20 hover:border-[rgb(var(--blue))]/50 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  {t(lang, "heroCtaCatalogs")}
                </a>

                <a
                  href="#packages"
                  className="hidden sm:inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-6 py-3.5 text-sm font-medium text-white/90 hover:bg-white/[0.12] hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  {t(lang, "heroCtaPricing")}
                </a>

                <button
                  type="button"
                  onClick={onSendWhatsApp}
                  className="hidden sm:inline-flex items-center justify-center rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-6 py-3.5 text-sm font-medium text-white hover:bg-[rgb(var(--red))]/35 hover:border-[rgb(var(--red))]/60 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  {t(lang, "heroCtaOrder")}
                </button>
              </div>

              <div className="mt-5 text-sm text-white/75 whitespace-pre-line leading-relaxed">{pickL10n(lang, props.settings.promoText)}</div>
              <div className="mt-3 text-xs text-white/50">{t(lang, "heroHint")}</div>
              <p className="mt-2 text-xs text-white/40">{t(lang, "seoHeroDescription")}</p>
            </div>

            <div className="lg:col-span-5">
              <HeroSlider lang={lang} items={props.heroMedia} intervalMs={2400} />
            </div>
          </div>

          {/* ✅ UX mini-instruction (guided flow) */}
          <HowItWorksHero lang={lang} />
        </div>
      </Section>

      <Section id="catalog" title={t(lang, "sectionCatalog")}>
        <CatalogGrid
          lang={lang}
          catalogs={enrichedCatalogs}
          selectedSlug={selectedCatalog?.slug ?? undefined}
          onSelect={(slug) => openCatalog(slug)}
        />
        <div className="mt-4 text-xs text-white/45">{t(lang, "flowHint")}</div>
      </Section>

      {selectedCatalog && panelOpen && selectedCategoryDetail ? (
        <CategoryDetailModal
          lang={lang}
          detail={selectedCategoryDetail}
          catalogTitle={selectedCatalog.title}
          catalogSubtitle={selectedCatalog.shortDescription}
          onClose={closePanel}
        />
      ) : selectedCatalog ? (
        <MiniScreenPanel
          lang={lang}
          open={panelOpen}
          catalog={selectedCatalog}
          onClose={closePanel}
          onContinueToProduct={() => onContinueToProduct()}
        />
      ) : null}

      {/* ===== Package selection section ===== */}
      <Section id="packages" title={t(lang, "choosePackage")}>
        <p className="text-sm text-white/70 mb-6">{t(lang, "choosePackageSubtitle")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {PACKAGE_CARDS.map((pkg) => {
            const keyBase = `pkg${pkg.id.charAt(0).toUpperCase() + pkg.id.slice(1)}`;
            return (
            <button
              key={pkg.id}
              type="button"
              onClick={() => onContinueToProduct(pkg.id)}
              className="group text-left cc-glass rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/25 hover:bg-white/[0.10] hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--blue))] focus-visible:ring-offset-2 focus-visible:ring-offset-black/50"
            >
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{pkg.icon}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[rgb(var(--blue))] transition-colors">
                        {t(lang, keyBase)}
                      </h3>
                      {pkg.badge === "popular" ? (
                        <span className="text-[10px] rounded-full border border-[rgb(var(--red))]/50 bg-[rgb(var(--red))]/25 px-2.5 py-0.5 text-white/90 font-medium shadow-sm">
                          {t(lang, "popular")}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-xs text-white/60">
                      {t(lang, `${keyBase}Desc`)}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <span className="inline-flex items-center justify-center rounded-xl border border-[rgb(var(--red))]/30 bg-[rgb(var(--red))]/10 px-4 py-2 text-xs font-medium text-white/90 group-hover:bg-[rgb(var(--red))]/20 group-hover:border-[rgb(var(--red))]/50 transition-all">
                    {t(lang, "pkgChoose")} →
                  </span>
                </div>
              </div>
            </button>
            );
          })}
        </div>
      </Section>

      <Section id="about" title={t(lang, "sectionAbout")}>
        <div className="cc-glass rounded-3xl p-6 sm:p-8 shadow-lg">
          <div className="text-sm sm:text-base text-white/80 whitespace-pre-line leading-relaxed">{pickL10n(lang, props.settings.aboutText)}</div>
        </div>
      </Section>

      <Section id="contact" title={t(lang, "sectionContact")}>
        <div className="cc-glass rounded-3xl p-6 sm:p-8 shadow-lg">
          <div className="text-sm sm:text-base text-white/80 whitespace-pre-line leading-relaxed">{pickL10n(lang, props.settings.contactText)}</div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onSendWhatsApp}
              className="inline-flex items-center justify-center rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-6 py-3.5 text-sm font-medium text-white hover:bg-[rgb(var(--red))]/35 hover:border-[rgb(var(--red))]/60 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              {t(lang, "contactWhatsApp")}
            </button>

            <a
              href={`https://instagram.com/${props.settings.instagramHandle.replace("@", "")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-6 py-3.5 text-sm font-medium text-white/90 hover:bg-white/[0.12] hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              {t(lang, "contactInstagram")}
            </a>

            <a
              href={`mailto:${props.settings.email}`}
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-6 py-3.5 text-sm font-medium text-white/90 hover:bg-white/[0.12] hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              {t(lang, "contactEmail")}
            </a>
          </div>

          <div className="mt-5 text-xs text-white/50">{t(lang, "replyTime")}</div>
        </div>
      </Section>

      <Footer lang={lang} />

      {/* Sticky mobile CTA bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden border-t border-white/10 bg-[#0b0f14]/95 backdrop-blur-lg px-4 py-3 safe-area-pb">
        <a
          href="#packages"
          className="w-full inline-flex items-center justify-center rounded-xl border border-[rgb(var(--blue))]/30 bg-[rgb(var(--blue))]/10 px-4 py-3 text-sm font-medium text-white/90 hover:bg-[rgb(var(--blue))]/20 hover:border-[rgb(var(--blue))]/50 transition-all duration-200"
        >
          {t(lang, "choosePackage")}
        </a>
      </div>
    </div>
  );
}
