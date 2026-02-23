// components/ClientPage.tsx
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { Catalog, CatalogExample, TierExamplesConfig } from "@/types/catalog";
import type { CategoryDetail } from "@/content/categoryDetails";
import type { SolutionItem } from "@/content/solutions";
import type { HeroMedia } from "@/types/hero";
import type { PricingConfig } from "@/types/pricing";
import type { PriceItem } from "@/types/price";
import type { SiteSettings } from "@/types/settings";
import type { DiscountConfig } from "@/lib/catalogOverridesStore";
import type { PackageDetail } from "@/lib/packageConfigStore";
import { Navbar } from "@/components/Navbar";
import { Section } from "@/components/Section";
import { CategoryDetailModal } from "@/components/CategoryDetailModal";
import { CatalogPreviewModal } from "@/components/CatalogPreviewModal";
import { MiniScreenPanel } from "@/components/MiniScreenPanel";

import { Footer } from "@/components/Footer";
import { HeroSlider } from "@/components/HeroSlider";
import { ExamplesGalleryViewer } from "@/components/ExamplesGalleryViewer";
import { PackageExamples } from "@/components/PackageExamples";
import { CatalogGrid } from "@/components/CatalogGrid";
import { packageIdToTier } from "@/utils/tierExamples";
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
  solutions: SolutionItem[];
  settings: SiteSettings;
  prices: PriceItem[];
  heroMedia: HeroMedia[];
  pricing: PricingConfig;
  discountConfig: DiscountConfig;
  packageDetails: PackageDetail[];
  tierExamplesConfig: TierExamplesConfig;
};

function pickL10n(lang: Lang, v: { he: string; en: string }) {
  const s = v?.[lang] ?? "";
  return s?.trim() ? s : v.he;
}

const ICON_MAP: Record<string, string> = {
  camera: "📷",
  briefcase: "💼",
  calendar: "📅",
  hammer: "🔨",
  star: "⭐",
  zap: "⚡",
};

function pkgIcon(detail?: PackageDetail): string {
  if (!detail?.iconName) return "📁";
  return ICON_MAP[detail.iconName] ?? "📁";
}

const PACKAGE_CARDS = [
  {
    id: "starter",
    badge: "popular" as const,
    defaultCatalogSlug: "bars",
    accent: "neutral",
  },
  {
    id: "business",
    badge: "popular" as const,
    defaultCatalogSlug: "hotels",
    accent: "neutral",
  },
  {
    id: "monthly",
    badge: undefined,
    defaultCatalogSlug: "events",
    accent: "neutral",
  },
] as const;

type PkgAccent = (typeof PACKAGE_CARDS)[number]["accent"];

const PKG_CLASSES: Record<PkgAccent, { card: string; glow: string; accent: string }> = {
  neutral: { card: "pkg-card--neutral", glow: "pkg-glow--neutral", accent: "pkg-accent--neutral" },
};

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

  useEffect(() => {
    const updateVh = () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    };
    updateVh();
    window.addEventListener("resize", updateVh);
    window.addEventListener("orientationchange", updateVh);
    return () => {
      window.removeEventListener("resize", updateVh);
      window.removeEventListener("orientationchange", updateVh);
    };
  }, []);

  const [panelOpen, setPanelOpen] = useState(false);
  const [catalogPreviewSlug, setCatalogPreviewSlug] = useState<string | null>(null);
  const [galleryItems, setGalleryItems] = useState<CatalogExample[]>([]);
  const [galleryStartIdx, setGalleryStartIdx] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const openGallery = useCallback((items: CatalogExample[], startIndex: number) => {
    setGalleryItems(items);
    setGalleryStartIdx(startIndex);
    setGalleryOpen(true);
  }, []);

  const closeGallery = useCallback(() => {
    setGalleryOpen(false);
  }, []);

  const slugFromUrl = searchParams.get("catalog");

  // Exclude "restaurant-menu-website" from homepage portfolio catalog
  const portfolioCatalogs = useMemo(
    () => props.catalogs.filter((c) => c.slug !== "restaurant-menu-website"),
    [props.catalogs],
  );

  const selectedCatalog = useMemo(() => props.catalogs.find((c) => c.slug === slugFromUrl) ?? null, [props.catalogs, slugFromUrl]);

  const selectedCategoryDetail = useMemo(
    () => (slugFromUrl ? props.categoryDetails.find((d) => d.slug === slugFromUrl) ?? null : null),
    [props.categoryDetails, slugFromUrl],
  );

  const catalogPreview = useMemo(
    () => (catalogPreviewSlug ? props.catalogs.find((c) => c.slug === catalogPreviewSlug) ?? null : null),
    [props.catalogs, catalogPreviewSlug],
  );

  const messagePreview = useMemo(() => {
    return buildMessage({ lang, reservation: DEFAULT_RESERVATION });
  }, [lang]);

  function setParams(next: { catalog?: string | null }) {
    const sp = new URLSearchParams(searchParams.toString());
    if (next.catalog === null) sp.delete("catalog");
    else if (typeof next.catalog === "string") sp.set("catalog", next.catalog);

    const qs = sp.toString();
    router.replace(qs ? `/?${qs}` : "/");
  }

  function openCatalog(slug: string) {
    setCatalogPreviewSlug(slug);
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

  return (
    <div className="min-h-dvh-safe bg-gradient-to-b from-[#0b0f14] via-[#0a0c10] to-[#06070a] text-white">
      <Navbar lang={lang} onSetLang={setLang} />

      <Section id="top">
        <div className="hero-glow">
        <div className="relative cc-glass rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7">
              <h1 className="text-[clamp(2rem,6vw,4.25rem)] font-bold text-[rgb(var(--blue))] leading-[1.15] max-w-3xl">{t(lang, "heroHeadline")}</h1>
              <p className="mt-6 text-base sm:text-lg text-white/75 leading-relaxed max-w-xl">{t(lang, "heroSub")}</p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={onSendWhatsApp}
                  className="inline-flex items-center justify-center rounded-xl border border-[rgb(var(--red))]/50 bg-[rgb(var(--red))]/25 px-7 py-4 text-base font-semibold text-white hover:bg-[rgb(var(--red))]/40 hover:border-[rgb(var(--red))]/70 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl hover:shadow-[rgb(var(--red))]/10"
                >
                  {t(lang, "heroCtaWa")}
                </button>
                <a
                  href="#packages"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] px-6 py-4 text-sm font-medium text-white/80 hover:bg-white/[0.12] hover:border-white/25 transition-all duration-200 hover:-translate-y-0.5"
                >
                  {t(lang, "heroCtaAvailability")}
                </a>
              </div>
              <p className="mt-3 text-xs text-white/40">{t(lang, "ctaUrgency")}</p>
            </div>

            <div className="lg:col-span-5">
              <HeroSlider lang={lang} items={props.heroMedia} intervalMs={2400} />
            </div>
          </div>
        </div>
        </div>
      </Section>

      {/* Catalog section hidden from homepage but data kept for admin/media source */}

      {selectedCatalog && panelOpen && selectedCategoryDetail ? (
        <CategoryDetailModal
          lang={lang}
          detail={selectedCategoryDetail}
          catalogTitle={selectedCatalog.title}
          catalogSubtitle={selectedCatalog.shortDescription}
          onClose={closePanel}
          pricing={props.pricing}
          discountConfig={props.discountConfig}
        />
      ) : selectedCatalog ? (
        <MiniScreenPanel
          lang={lang}
          open={panelOpen}
          catalog={selectedCatalog}
          onClose={closePanel}
          onContinueToProduct={() => {
            closePanel();
            setTimeout(() => {
              const el = document.getElementById("packages");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
          }}
        />
      ) : null}


      {/* ===== Package selection section ===== */}
      <div className="pkg-section-bg">
      <Section id="packages" title={t(lang, "choosePackage")}>

        <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PACKAGE_CARDS.map((pkg) => {
            const keyBase = `pkg${pkg.id.charAt(0).toUpperCase() + pkg.id.slice(1)}`;
            const detail = props.packageDetails.find((d) => d.id === pkg.id);
            const price = detail?.priceFrom ?? 0;
            const cls = PKG_CLASSES[pkg.accent];
            return (
            <div
              key={pkg.id}
              className={`pkg-card ${cls.card} overflow-hidden relative`}
            >
              {/* Subtle glow overlay at top */}
              <div className={`${cls.glow} absolute inset-0 pointer-events-none`} />
              <div className="relative p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{pkgIcon(detail)}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className={`text-lg sm:text-xl font-bold ${cls.accent}`}>
                        <Link href={`/product/${pkg.id}`} className="hover:text-white transition-colors">
                          {detail ? pickL10n(lang, detail.title) : t(lang, keyBase)}
                        </Link>
                      </h3>
                      {pkg.badge === "popular" ? (
                        <span className="text-[10px] rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-0.5 text-white/90 font-medium shadow-sm">
                          {t(lang, "popular")}
                        </span>
                      ) : null}
                    </div>
                    {price > 0 && (
                      <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-[rgb(var(--blue))]/80">
                          {t(lang, "fromPrice")}₪{price.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Best for + Delivery (always visible) */}
                {detail && (
                  <div className="mt-4 space-y-1.5 border-t border-white/[0.06] pt-4">
                    <p className="text-[11px] text-white/50">
                      <span className={`${cls.accent} opacity-70 font-medium`}>{t(lang, "pkgBestFor")}:</span>{" "}
                      {pickL10n(lang, detail.bestFor)}
                    </p>
                    <p className="text-[11px] text-white/50">
                      <span className={`${cls.accent} opacity-70 font-medium`}>{t(lang, "pkgDelivery")}:</span>{" "}
                      {pickL10n(lang, detail.deliveryTime)}
                    </p>
                  </div>
                )}

                {/* Tag pills */}
                {detail && detail.pills.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {detail.pills.map((pill, i) => (
                      <span
                        key={i}
                        className={`text-[11px] rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-0.5 text-white/70`}
                      >
                        {pickL10n(lang, pill)}
                      </span>
                    ))}
                  </div>
                )}

                {/* Example thumbnails — controlled by global selector, tier-differentiated */}
                {(() => {
                  const exCatalog = props.catalogs.find((c) => c.slug === pkg.defaultCatalogSlug);
                  if (!exCatalog) return null;
                  const exItems = exCatalog.examples ?? [];
                  return exItems.length > 0 ? (
                    <PackageExamples
                      lang={lang}
                      examples={exItems}
                      catalogs={props.catalogs}
                      businessType={null}
                      tier={packageIdToTier(pkg.id)}
                      tierConfig={props.tierExamplesConfig}
                      catalogSlug={exCatalog.slug}
                      onThumbnailClick={openGallery}
                    />
                  ) : null;
                })()}

                <div className="mt-5 flex items-center">
                  <Link
                    href={`/product/${pkg.id}`}
                    className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-white/80 hover:bg-white/[0.10] hover:border-white/20 transition-all"
                  >
                    {t(lang, "addonDetails")}
                  </Link>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {/* First-time discount note */}
        {props.discountConfig.enabled && (
          <p className="mt-4 text-xs text-[rgb(var(--blue))]/70">
            🎁 {pickL10n(lang, { he: props.discountConfig.labelHe, en: props.discountConfig.labelEn })}
            {" — "}
            {props.discountConfig.percent}%
          </p>
        )}

        </div>
      </Section>
      </div>

      <Section id="how-it-works" title={t(lang, "howItWorksTitle")}>
        <p className="text-sm sm:text-base text-white/70 max-w-2xl">{t(lang, "howItWorksSubtitle")}</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          {(["howStep1", "howStep2", "howStep3"] as const).map((step, idx) => (
            <div key={step} className="cc-glass rounded-2xl p-5 sm:p-6">
              <div className="text-xs font-semibold text-[rgb(var(--blue))]">{idx + 1}</div>
              <h3 className="mt-3 text-lg font-semibold text-white">{t(lang, `${step}Title`)}</h3>
              <p className="mt-2 text-sm text-white/70">{t(lang, `${step}Desc`)}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="trust" title={t(lang, "trustTitle")}>
        <div className="space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6 max-w-4xl">
            {(["trustStat1", "trustStat2", "trustStat3", "trustStat4"] as const).map((key) => (
              <div key={key} className="trust-stat-card p-5 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[rgb(var(--blue))]">{t(lang, `${key}Value`)}</div>
                <div className="mt-2 text-xs sm:text-sm text-white/60">{t(lang, `${key}Label`)}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 max-w-4xl">
            {(["testimonial1", "testimonial2"] as const).map((key) => (
              <div key={key} className="cc-glass rounded-2xl p-5 sm:p-6">
                <p className="text-sm text-white/85">“{t(lang, `${key}Quote`)}”</p>
                <p className="mt-3 text-xs text-white/55">{t(lang, `${key}Author`)}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="examples" title={t(lang, "navExamples")}>
        <p className="text-sm text-white/70 mb-8">{t(lang, "portfolioIntro")}</p>
        <CatalogGrid
          lang={lang}
          catalogs={portfolioCatalogs}
          onSelect={(slug) => openCatalog(slug)}
        />
      </Section>

      <Section id="contact" title={t(lang, "sectionContact")}>
        <div className="cc-glass rounded-3xl p-6 sm:p-10 shadow-lg">
          <div className="text-sm sm:text-base text-white/80 whitespace-pre-line leading-relaxed">{pickL10n(lang, props.settings.contactText)}</div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onSendWhatsApp}
              className="inline-flex items-center justify-center rounded-xl border border-[rgb(var(--red))]/50 bg-[rgb(var(--red))]/25 px-7 py-4 text-base font-semibold text-white hover:bg-[rgb(var(--red))]/40 hover:border-[rgb(var(--red))]/70 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl hover:shadow-[rgb(var(--red))]/10"
            >
              {t(lang, "contactWhatsApp")}
            </button>

            <a
              href={`https://instagram.com/${props.settings.instagramHandle.replace("@", "")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-6 py-4 text-sm font-medium text-white/90 hover:bg-white/[0.12] hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              {t(lang, "contactInstagram")}
            </a>

            <a
              href={`mailto:${props.settings.email}`}
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-6 py-4 text-sm font-medium text-white/90 hover:bg-white/[0.12] hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              {t(lang, "contactEmail")}
            </a>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="text-xs text-white/50">{t(lang, "replyTime")}</div>
            <span className="text-xs text-white/35">·</span>
            <div className="text-xs text-white/40">{t(lang, "ctaUrgency")}</div>
          </div>
        </div>
      </Section>

      <Footer lang={lang} />

      {/* Catalog Preview Modal (booking-style) */}
      {catalogPreview && (
        <CatalogPreviewModal
          lang={lang}
          catalog={catalogPreview}
          onClose={() => setCatalogPreviewSlug(null)}
        />
      )}

      {/* Package examples gallery viewer */}
      <ExamplesGalleryViewer
        lang={lang}
        open={galleryOpen}
        items={galleryItems}
        startIndex={galleryStartIdx}
        onClose={closeGallery}
      />

    </div>
  );
}
