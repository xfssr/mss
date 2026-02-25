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
import { SolutionCard } from "@/components/SolutionCard";
import { SolutionDetailModal } from "@/components/SolutionDetailModal";
import { AddOnDetailModal } from "@/components/AddOnDetailModal";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { CollabSection } from "@/components/CollabSection";
import { ExamplesGalleryViewer } from "@/components/ExamplesGalleryViewer";
import { PackageExamples } from "@/components/PackageExamples";
import { PackageExamplesFromApi } from "@/components/PackageExamplesFromApi";
import { packageIdToTier } from "@/utils/tierExamples";
import { MONTHLY_ADDONS, type AddonConfig } from "@/config/addons";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { DEFAULT_LANG, STORAGE_KEY_LANG, t, type Lang } from "@/utils/i18n";
import {
  buildMessage,
  buildWhatsAppMessage,
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

const PKG_LABELS: Record<string, Record<Lang, string>> = {
  starter: { he: "Starter", en: "Starter" },
  business: { he: "Business", en: "Business" },
  monthly: { he: "Monthly", en: "Monthly" },
};

type PkgAccent = (typeof PACKAGE_CARDS)[number]["accent"];

const PKG_CLASSES: Record<PkgAccent, { card: string; glow: string; accent: string; border: string }> = {
  neutral: { card: "pkg-card--neutral", glow: "pkg-glow--neutral", accent: "pkg-accent--neutral", border: "pkg-border--neutral" },
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

  const [panelOpen, setPanelOpen] = useState(false);
  const [expandedPkg, setExpandedPkg] = useState<string | null>(null);
  const [selectedSolutionSlug, setSelectedSolutionSlug] = useState<string | null>(null);
  const [catalogPreviewSlug, setCatalogPreviewSlug] = useState<string | null>(null);
  const [galleryItems, setGalleryItems] = useState<CatalogExample[]>([]);
  const [galleryStartIdx, setGalleryStartIdx] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({});
  const [addonDetailModal, setAddonDetailModal] = useState<AddonConfig | null>(null);

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

  const selectedSolution = useMemo(
    () => (selectedSolutionSlug ? props.solutions.find((s) => s.slug === selectedSolutionSlug) ?? null : null),
    [props.solutions, selectedSolutionSlug],
  );

  const catalogPreview = useMemo(
    () => (catalogPreviewSlug ? props.catalogs.find((c) => c.slug === catalogPreviewSlug) ?? null : null),
    [props.catalogs, catalogPreviewSlug],
  );

  const messagePreview = useMemo(() => {
    return buildMessage({ lang, reservation: DEFAULT_RESERVATION });
  }, [lang]);

  const addonsTotal = useMemo(() => {
    return MONTHLY_ADDONS.reduce((sum, a) => sum + (selectedAddons[a.id] ? a.price : 0), 0);
  }, [selectedAddons]);

  function toggleAddon(id: string) {
    setSelectedAddons((prev) => ({ ...prev, [id]: !prev[id] }));
  }

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

  function SectionCta() {
    return (
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
        <button
          type="button"
          onClick={onSendWhatsApp}
          className="btn-silver inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
        >
          {t(lang, "sectionCtaWa")}
        </button>
        <span className="text-xs text-white/40">{t(lang, "ctaUrgency")}</span>
      </div>
    );
  }

  return (
    <div className="min-h-dvh-safe bg-gradient-to-b from-[#0a0c14] via-[#080a10] to-[#060710] text-[rgb(var(--text))] grain-overlay">
      <Navbar lang={lang} onSetLang={setLang} />

      <Section id="top">
        <div className="hero-glow section-glow relative">
        {/* Rotating ring orbits */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <div className="silver-ring-orbit absolute w-[500px] h-[500px] opacity-20" />
          <div className="silver-ring-orbit absolute w-[700px] h-[700px] opacity-10" style={{ animationDirection: "reverse", animationDuration: "35s" }} />
        </div>
        {/* Floating pulse dots */}
        <div className="absolute top-20 left-[15%] w-2 h-2 rounded-full bg-[rgb(var(--blue))] opacity-30" style={{ animation: "pulse-silver 3s ease-in-out infinite, float 6s ease-in-out infinite" }} aria-hidden="true" />
        <div className="absolute top-40 right-[10%] w-1.5 h-1.5 rounded-full bg-[rgb(var(--blueBright))] opacity-20" style={{ animation: "pulse-silver 4s ease-in-out infinite 1s, float 8s ease-in-out infinite 2s" }} aria-hidden="true" />
        <div className="absolute bottom-32 left-[25%] w-1 h-1 rounded-full bg-[rgb(var(--blue))] opacity-15" style={{ animation: "pulse-silver 5s ease-in-out infinite 2s, float 7s ease-in-out infinite 1s" }} aria-hidden="true" />
        <div className="relative glass-ultra rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl ornament-corner">
          {/* Multi-layer overlays */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative">
            <div className="lg:col-span-7">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-silver-gradient">{pickL10n(lang, props.settings.heroTitle) || t(lang, "heroHeadline")}</h1>
              <p className="mt-6 text-base sm:text-lg text-[rgb(var(--text))]/80 leading-relaxed max-w-xl">{pickL10n(lang, props.settings.heroSubtitle) || t(lang, "heroSupporting")}</p>

              {/* Glass-pill trust bullets */}
              <div className="mt-5 flex flex-wrap gap-2">
                {["⚡ Premium Quality", "🎯 Fast Delivery", "✨ Creative Direction"].map((bullet) => (
                  <span key={bullet} className="inline-flex items-center gap-1.5 rounded-full border border-[rgb(var(--border))]/10 bg-white/[0.04] backdrop-blur-sm px-3 py-1 text-[11px] text-[rgb(var(--text))]/70">
                    {bullet}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={onSendWhatsApp}
                  className="btn-silver inline-flex items-center justify-center rounded-xl px-7 py-4 text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  {t(lang, "heroCtaWa")}
                </button>
                <a
                  href="#packages"
                  className="btn-secondary inline-flex items-center justify-center rounded-xl px-6 py-4 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                >
                  {t(lang, "heroCtaAvailability")}
                </a>
              </div>
              <p className="mt-3 text-xs text-[rgb(var(--muted))]/60">{pickL10n(lang, props.settings.promoText) || t(lang, "ctaUrgency")}</p>
            </div>

            <div className="lg:col-span-5">
              <HeroSlider lang={lang} items={props.heroMedia} intervalMs={2400} />
            </div>
          </div>
          {/* Bottom fade-to-black */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#080a10] to-transparent rounded-b-3xl pointer-events-none" />
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
      <div className="pkg-section-bg luxury-bg-alt">
      <Section id="packages" title={t(lang, "choosePackage")}>

        <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PACKAGE_CARDS.map((pkg) => {
            const keyBase = `pkg${pkg.id.charAt(0).toUpperCase() + pkg.id.slice(1)}`;
            const detail = props.packageDetails.find((d) => d.id === pkg.id);
            const price = detail?.priceFrom ?? 0;
            const isExpanded = expandedPkg === pkg.id;
            const hasDiscount = props.discountConfig.enabled && price > 0;
            const discountPercent = props.discountConfig.percent;
            const finalPrice = hasDiscount ? Math.round(price * (1 - discountPercent / 100)) : price;
            const isMonthly = pkg.id === "monthly";
            const handleWhatsApp = () => {
              const pkgLabel = detail ? pickL10n(lang, detail.title) : (PKG_LABELS[pkg.id]?.[lang] ?? pkg.id);
              const icon = pkgIcon(detail);
              const addonNames: string[] = [];
              if (isMonthly) {
                MONTHLY_ADDONS.forEach((a) => {
                  if (selectedAddons[a.id]) {
                    addonNames.push(t(lang, a.titleKey));
                  }
                });
              }
              const msg = buildWhatsAppMessage({
                packageName: pkgLabel,
                packageIcon: icon,
                discountedPrice: hasDiscount ? finalPrice : undefined,
                basePrice: price > 0 ? price : undefined,
                selectedAddons: addonNames.length > 0 ? addonNames : undefined,
                lang,
              });
              openWhatsApp(buildWaMeUrl(WHATSAPP_PHONE, msg));
            };
            const cls = PKG_CLASSES[pkg.accent];
            return (
            <div
              key={pkg.id}
              className={`pkg-card ${cls.card} card-shine overflow-hidden relative silver-border-glow`}
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
                        <span className="text-sm font-bold text-[rgb(var(--blueBright))]">
                          {t(lang, "fromPrice")}₪{price.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Example thumbnails — always visible, before pills/details */}
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

                {/* API-fetched examples — always visible */}
                <PackageExamplesFromApi
                  lang={lang}
                  tierKey={`tier${packageIdToTier(pkg.id)}`}
                  onThumbnailClick={openGallery}
                />

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

                {/* Action buttons — CTA position depends on expand state */}
                <div className="mt-5 flex items-center gap-3">
                  {!isExpanded && (
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="btn-silver inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition-all"
                    >
                      {t(lang, "pkgWhatsApp")}
                    </button>
                  )}
                  {detail && (
                    <button
                      type="button"
                      onClick={() => setExpandedPkg(isExpanded ? null : pkg.id)}
                      className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-white/70 hover:bg-white/[0.10] hover:border-white/20 transition-all"
                    >
                      {isExpanded ? t(lang, "less") : t(lang, "more")}
                    </button>
                  )}
                </div>
              </div>

              {/* Expandable accordion */}
              {detail && isExpanded && (
                <div className="border-t border-white/15 px-6 sm:px-8 py-5 space-y-4 text-sm animate-in slide-in-from-top-2 duration-200">
                  {/* What you get */}
                  <div>
                    <h4 className={`text-xs font-semibold ${cls.accent} mb-1.5`}>
                      {t(lang, "sectionWhatYouGet")}
                    </h4>
                    <ul className="space-y-1">
                      {detail.whatYouGet.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-white/75">
                          <span className={`${cls.accent} mt-0.5 shrink-0`}>✓</span>
                          {pickL10n(lang, item)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Details grid — only shoot time + delivery */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                      <div className="text-[10px] text-white/40">{t(lang, "labelShootTime")}</div>
                      <div className="text-xs text-white/80">{pickL10n(lang, detail.shootTime)}</div>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                      <div className="text-[10px] text-white/40">{t(lang, "labelDelivery")}</div>
                      <div className="text-xs text-white/80">{pickL10n(lang, detail.deliveryTime)}</div>
                    </div>
                  </div>

                  {/* Add-ons */}
                  {detail.addOns.length > 0 && (
                    <div>
                      <h4 className={`text-xs font-semibold ${cls.accent} mb-1`}>
                        {t(lang, "addonsLabel")}
                      </h4>
                      <ul className="space-y-0.5">
                        {detail.addOns.map((addon, i) => (
                          <li key={i} className="text-xs text-white/60">+ {pickL10n(lang, addon)}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Monthly: selectable add-ons (only in expanded details) */}
                  {isMonthly && (
                    <div>
                      <h4 className={`text-xs font-semibold ${cls.accent} mb-0.5`}>
                        {t(lang, "monthlyAddonsTitle")}
                      </h4>
                      <p className="text-[10px] text-white/40 mb-2">{t(lang, "monthlyAddonsHelper")}</p>
                      <div className="space-y-2">
                        {MONTHLY_ADDONS.map((addon) => (
                          <div key={addon.id} className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <input
                                type="checkbox"
                                checked={!!selectedAddons[addon.id]}
                                onChange={() => toggleAddon(addon.id)}
                                className="accent-[rgb(var(--blue))] w-4 h-4 shrink-0"
                              />
                              <div className="min-w-0">
                                <span className="text-xs text-white/80 font-medium">{t(lang, addon.titleKey)}</span>
                                <span className="text-[10px] text-white/50 ms-2">— ₪{addon.price} {t(lang, "addonPerMonth")}</span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => setAddonDetailModal(addon)}
                              className="shrink-0 text-[10px] rounded-lg border border-white/10 bg-white/[0.05] px-2 py-1 text-white/60 hover:bg-white/[0.10] hover:text-white/80 transition-all"
                            >
                              {t(lang, "addonDetails")}
                            </button>
                          </div>
                        ))}
                      </div>
                      {addonsTotal > 0 && (
                        <p className={`mt-2 text-xs font-medium ${cls.accent}`}>
                          {t(lang, "addonsTotal")}: ₪{addonsTotal.toLocaleString()}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Starter/Business: add-ons availability note */}
                  {!isMonthly && (
                    <div>
                      <p className="text-[11px] text-white/40 italic">
                        {t(lang, "addonsAvailableOnlyMonthly")}
                      </p>
                    </div>
                  )}

                  {/* First-order discount in card */}
                  {props.discountConfig.enabled && (
                    <div className="text-[11px] text-green-400/80">
                      🎁 {pickL10n(lang, { he: props.discountConfig.labelHe, en: props.discountConfig.labelEn })} ({props.discountConfig.percent}%)
                    </div>
                  )}

                  {/* Price after discount — shown only in expanded details */}
                  {hasDiscount && (
                    <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                      <div className="text-[10px] text-white/40 mb-1">{t(lang, "priceAfterDiscount")}</div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-white/40 line-through">₪{price.toLocaleString()}</span>
                        <span className={`text-sm font-bold ${cls.accent}`}>₪{finalPrice.toLocaleString()}</span>
                        <span className="text-[10px] rounded-full bg-green-500/20 border border-green-400/30 px-2 py-0.5 text-green-400 font-medium">
                          -{discountPercent}%
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Final total line for Monthly (package after discount + add-ons) */}
                  {isMonthly && (hasDiscount || addonsTotal > 0) && (
                    <div className="rounded-lg border border-[rgb(var(--blue))]/20 bg-[rgb(var(--blue))]/[0.06] px-3 py-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white/90">{t(lang, "finalTotalLabel")}:</span>
                        <span className={`text-sm font-bold ${cls.accent}`}>₪{(finalPrice + addonsTotal).toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  {/* WhatsApp CTA — shown at bottom when details are expanded */}
                  <div className="pt-2" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="w-full btn-silver inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-medium transition-all"
                    >
                      {t(lang, "pkgWhatsApp")}
                    </button>
                  </div>
                </div>
              )}

              {/* Collapsed summary when accordion is closed */}
              {detail && !isExpanded && (
                <div className="border-t border-white/10 px-6 sm:px-8 py-3">
                  <p className="text-[11px] text-white/45">
                    {t(lang, "pkgCollapsedSummary")}: {detail.pills.map((p) => pickL10n(lang, p)).join(", ")}
                  </p>
                </div>
              )}
            </div>
            );
          })}
        </div>

        {/* First-time discount note */}
        {props.discountConfig.enabled && (
          <p className="mt-4 text-xs text-[rgb(var(--blueBright))]/70">
            🎁 {pickL10n(lang, { he: props.discountConfig.labelHe, en: props.discountConfig.labelEn })}
            {" — "}
            {props.discountConfig.percent}%
          </p>
        )}

        {/* Section CTA */}
        <SectionCta />
        </div>
      </Section>
      </div>

      <div className="section-divider" />

      {/* ===== Who Is This For section ===== */}
      <Section id="who-is-this-for" title={t(lang, "whoIsThisForTitle")} centered>
        <div className="relative">
          {/* Side ambient glows */}
          <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-40 h-80 bg-[rgb(var(--blue))]/[0.02] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-40 h-80 bg-[rgb(var(--blue))]/[0.02] rounded-full blur-3xl pointer-events-none" />
          <div className="glass-ultra rounded-3xl p-6 sm:p-10 shadow-lg max-w-3xl mx-auto ornament-corner">
            <ul className="space-y-4">
              {(["whoIsThisFor1", "whoIsThisFor2", "whoIsThisFor3", "whoIsThisFor4", "whoIsThisFor5", "whoIsThisFor6", "whoIsThisFor7"] as const).map((key) => (
                <li key={key} className="flex items-start gap-3 text-sm sm:text-base text-white/80">
                  <span className="text-[rgb(var(--blue))] mt-0.5 shrink-0">●</span>
                  {t(lang, key)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ===== Case Studies section ===== */}
      <CaseStudiesSection lang={lang} />

      <div className="section-divider" />

      {/* ===== Why Work With Me section ===== */}
      <Section id="why-me" title={t(lang, "whyMeTitle")} centered>
        <div className="relative">
          <div className="absolute -left-16 top-1/3 w-32 h-64 bg-[rgb(var(--blue))]/[0.02] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -right-16 top-1/3 w-32 h-64 bg-[rgb(var(--blue))]/[0.02] rounded-full blur-3xl pointer-events-none" />
          <div className="glass-ultra rounded-3xl p-6 sm:p-10 shadow-lg max-w-3xl mx-auto ornament-corner">
            <p className="text-sm sm:text-base text-white/70 whitespace-pre-line leading-relaxed mb-6">{pickL10n(lang, props.settings.aboutText) || t(lang, "whyMeIntro")}</p>
            <ul className="space-y-4">
              {(["whyMePoint1", "whyMePoint2", "whyMePoint3", "whyMePoint4", "whyMePoint5"] as const).map((key) => (
                <li key={key} className="flex items-start gap-3 text-sm sm:text-base text-white/80">
                  <span className="text-[rgb(var(--blue))] mt-0.5 shrink-0">✔</span>
                  {t(lang, key)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* Ready Solutions section - reusing existing /solutions data */}
      {props.solutions.length > 0 && (
        <Section id="solutions" title={t(lang, "sectionSolutions")} subtitle={t(lang, "solutionsIntro")}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {props.solutions.map((item) => (
              <SolutionCard
                key={item.slug}
                lang={lang}
                item={item}
                onSelect={() => setSelectedSolutionSlug(item.slug)}
              />
            ))}
          </div>
        </Section>
      )}

      {/* ===== Collaboration section ===== */}
      <CollabSection lang={lang} />

      <div className="section-divider" />

      <Section id="contact" title={t(lang, "sectionContact")}>
        <div className="relative">
          {/* Ambient radial glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <div className="w-[500px] h-[300px] bg-[rgb(var(--blue))]/[0.02] rounded-full blur-3xl" />
          </div>
          <div className="glass-ultra rounded-3xl p-6 sm:p-10 shadow-lg ornament-corner relative">
            <div className="text-sm sm:text-base text-white/80 whitespace-pre-line leading-relaxed">{pickL10n(lang, props.settings.contactText)}</div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onSendWhatsApp}
                className="btn-silver inline-flex items-center justify-center rounded-xl px-7 py-4 text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              >
                {t(lang, "contactWhatsApp")}
              </button>

              <a
                href={`https://instagram.com/${props.settings.instagramHandle.replace("@", "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-6 py-4 text-sm font-medium text-white/90 hover:bg-white/[0.12] hover:border-[rgb(var(--blue))]/20 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              >
                {t(lang, "contactInstagram")}
              </a>

              <a
                href={`mailto:${props.settings.email}`}
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-6 py-4 text-sm font-medium text-white/90 hover:bg-white/[0.12] hover:border-[rgb(var(--blue))]/20 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              >
                {t(lang, "contactEmail")}
              </a>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="text-xs text-white/50">{t(lang, "replyTime")}</div>
              <span className="text-xs text-[rgb(var(--blue))]/30">◆</span>
              <div className="text-xs text-white/40">{t(lang, "ctaUrgency")}</div>
            </div>
          </div>
        </div>
      </Section>

      <Footer lang={lang} />

      {/* Solution Detail Modal */}
      {selectedSolution && (
        <SolutionDetailModal
          lang={lang}
          item={selectedSolution}
          onClose={() => setSelectedSolutionSlug(null)}
          pricing={props.pricing}
          discountConfig={props.discountConfig}
        />
      )}

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

      {/* Add-on detail modal */}
      {addonDetailModal && (
        <AddOnDetailModal
          lang={lang}
          addon={addonDetailModal}
          onClose={() => setAddonDetailModal(null)}
        />
      )}
    </div>
  );
}
