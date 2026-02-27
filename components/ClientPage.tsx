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

/* ─── FAQ Accordion item ─── */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button
        type="button"
        className="faq-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{question}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 ms-4">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div className={`faq-answer ${open ? "open" : ""}`}>
        <p className="text-sm text-white/60 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

/* ─── Paired data: key + icon to prevent index-mismatch ─── */
const DELIVERABLES = [
  { key: "deliverable1", icon: "🎬" },
  { key: "deliverable2", icon: "📸" },
  { key: "deliverable3", icon: "✂️" },
  { key: "deliverable4", icon: "📝" },
  { key: "deliverable5", icon: "🌐" },
  { key: "deliverable6", icon: "📱" },
  { key: "deliverable7", icon: "📢" },
  { key: "deliverable8", icon: "💬" },
  { key: "deliverable9", icon: "✨" },
] as const;

const INDUSTRIES = [
  { key: "industry1", icon: "🍽️" },
  { key: "industry2", icon: "🍸" },
  { key: "industry3", icon: "☕" },
  { key: "industry4", icon: "👨‍🍳" },
  { key: "industry5", icon: "🌸" },
  { key: "industry6", icon: "💄" },
  { key: "industry7", icon: "✒️" },
  { key: "industry8", icon: "🛍️" },
  { key: "industry9", icon: "🏠" },
  { key: "industry10", icon: "🏪" },
] as const;

const CONTENT_SVCS = [
  { key: "contentSvc1", icon: "📸" },
  { key: "contentSvc2", icon: "🎬" },
  { key: "contentSvc3", icon: "🎭" },
  { key: "contentSvc4", icon: "✂️" },
  { key: "contentSvc5", icon: "📅" },
  { key: "contentSvc6", icon: "🍽️" },
  { key: "contentSvc7", icon: "📱" },
] as const;

const GROWTH_ITEMS = [
  { key: "growth1", icon: "📱" },
  { key: "growth2", icon: "👨‍🍳" },
  { key: "growth3", icon: "🍸" },
  { key: "growth4", icon: "💄" },
  { key: "growth5", icon: "🛍️" },
  { key: "growth6", icon: "⚡" },
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

  return (
    <div className="min-h-dvh-safe bg-gradient-to-b from-[#0b0f14] via-[#0a0c10] to-[#06070a] text-white">
      <Navbar lang={lang} onSetLang={setLang} />

      {/* ═══════════════════════════════════════
          1. HERO SECTION
          ═══════════════════════════════════════ */}
      <Section id="top">
        <div className="hero-glow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Text side */}
            <div className="lg:col-span-7">
              <div className="text-xs sm:text-sm tracking-widest uppercase text-[rgb(var(--blue))]/70 font-medium mb-4">
                {t(lang, "heroTagline")}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight">
                <span className="text-gradient">{pickL10n(lang, props.settings.heroTitle) || t(lang, "heroHeadlineNew")}</span>
              </h1>
              <p className="mt-6 text-base sm:text-lg text-white/65 leading-relaxed max-w-xl">
                {pickL10n(lang, props.settings.heroSubtitle) || t(lang, "heroSubNew")}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={onSendWhatsApp}
                  className="btn-primary text-base"
                >
                  {t(lang, "heroCtaWhatsAppNew")}
                </button>
                <a
                  href="#packages"
                  className="btn-secondary"
                >
                  {t(lang, "heroCtaPricingNew")}
                </a>
              </div>
              <p className="mt-3 text-xs text-white/35">{pickL10n(lang, props.settings.promoText) || t(lang, "ctaUrgency")}</p>
            </div>

            {/* Visual side */}
            <div className="lg:col-span-5">
              <HeroSlider lang={lang} items={props.heroMedia} intervalMs={2400} />
            </div>
          </div>
        </div>
      </Section>

      {/* Catalog modals (kept for URL-based deep links & admin) */}
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

      <div className="section-divider" />

      {/* ═══════════════════════════════════════
          2. ABOUT / STUDIO
          ═══════════════════════════════════════ */}
      <Section id="studio" eyebrow={t(lang, "eyebrowAbout")} title={t(lang, "studioTitle")}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white/90 mb-5 leading-snug">{t(lang, "studioSubtitle")}</h3>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed whitespace-pre-line">
              {pickL10n(lang, props.settings.aboutText) || t(lang, "studioBody")}
            </p>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {(["studioPoint1", "studioPoint2", "studioPoint3", "studioPoint4"] as const).map((key, idx) => (
              <div key={key} className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-200">
                <span className="text-xs font-bold text-[rgb(var(--blue))]/60 mt-0.5 shrink-0 w-5 text-center">0{idx + 1}</span>
                <span className="text-sm sm:text-base text-white/75 leading-snug">{t(lang, key)}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════
          3. HOW IT WORKS — 3 Steps
          ═══════════════════════════════════════ */}
      <section className="section-dark scroll-mt-24 px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <div className="text-xs tracking-wider uppercase text-white/55 font-medium text-center">{t(lang, "eyebrowProcess")}</div>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-[rgb(var(--blue))] tracking-tight text-center">{t(lang, "howTitle")}</h2>
          <p className="mt-3 text-sm sm:text-base text-white/60 text-center max-w-2xl mx-auto">{t(lang, "howSubtitle")}</p>

          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {([
              { num: "howStep1Num", label: "howStep1Label", text: "howStep1Text" },
              { num: "howStep2Num", label: "howStep2Label", text: "howStep2Text" },
              { num: "howStep3Num", label: "howStep3Label", text: "howStep3Text" },
            ] as const).map((step) => (
              <div key={step.num} className="step-card">
                <div className="step-number">{t(lang, step.num)}</div>
                <div className="relative">
                  <h3 className="text-lg font-bold text-white/90 mb-2">{t(lang, step.label)}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{t(lang, step.text)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════
          4. WHAT CLIENTS GET
          ═══════════════════════════════════════ */}
      <Section id="deliverables" eyebrow={t(lang, "eyebrowDeliverables")} title={t(lang, "deliverablesTitle")} centered>
        <p className="text-sm sm:text-base text-white/60 text-center -mt-6 mb-10">{t(lang, "deliverablesSubtitle")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {/* Content Production group */}
          <div>
            <div className="deliverables-group-title deliverables-group-title--content">
              📸 {t(lang, "deliverablesGroupContent")}
            </div>
            <div className="space-y-3">
              {DELIVERABLES.slice(0, 4).map((d) => (
                <div key={d.key} className="deliverable-item">
                  <span className="text-xl shrink-0">{d.icon}</span>
                  <span className="text-sm text-white/75">{t(lang, d.key)}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Digital Systems group */}
          <div>
            <div className="deliverables-group-title deliverables-group-title--systems">
              🌐 {t(lang, "deliverablesGroupSystems")}
            </div>
            <div className="space-y-3">
              {DELIVERABLES.slice(4).map((d) => (
                <div key={d.key} className="deliverable-item">
                  <span className="text-xl shrink-0">{d.icon}</span>
                  <span className="text-sm text-white/75">{t(lang, d.key)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════
          5. CONTENT SERVICES vs GROWTH SOLUTIONS
          ═══════════════════════════════════════ */}
      <section id="services" className="scroll-mt-24 px-4 sm:px-6 lg:px-8 py-20 sm:py-28 section-gradient-overlay">
        <div className="mx-auto w-full max-w-6xl">
          {/* Section header */}
          <div className="text-xs tracking-wider uppercase text-white/55 font-medium">{t(lang, "eyebrowServices")}</div>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">{t(lang, "servicesTitle")}</h2>
          <p className="mt-3 text-sm sm:text-base text-white/55 max-w-2xl mb-12 sm:mb-16">{t(lang, "servicesSubtitle")}</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Content Services */}
            <div className="service-block service-block--content">
              <div className="inline-flex items-center gap-1.5 text-[10px] tracking-wider uppercase font-semibold text-[rgb(var(--blue))]/80 bg-[rgb(var(--blue))]/10 border border-[rgb(var(--blue))]/20 rounded-full px-3 py-1 mb-4">
                {t(lang, "contentSvcForLabel")}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[rgb(var(--blue))] mb-2">{t(lang, "contentSvcTitle")}</h3>
              <p className="text-sm text-white/55 mb-6">{t(lang, "contentSvcSubtitle")}</p>
              <ul className="space-y-3">
                {CONTENT_SVCS.map((svc) => (
                  <li key={svc.key} className="flex items-center gap-3 text-sm text-white/70">
                    <span className="text-lg shrink-0 text-[rgb(var(--blue))]/70">{svc.icon}</span>
                    {t(lang, svc.key)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Growth Solutions */}
            <div className="service-block service-block--growth">
              <div className="inline-flex items-center gap-1.5 text-[10px] tracking-wider uppercase font-semibold text-[rgb(var(--red))]/80 bg-[rgb(var(--red))]/10 border border-[rgb(var(--red))]/20 rounded-full px-3 py-1 mb-4">
                {t(lang, "growthForLabel")}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[rgb(var(--red))]/90 mb-2">{t(lang, "growthTitle")}</h3>
              <p className="text-sm text-white/55 mb-6">{t(lang, "growthSubtitle")}</p>
              <ul className="space-y-3">
                {GROWTH_ITEMS.map((g) => (
                  <li key={g.key} className="flex items-center gap-3 text-sm text-white/70">
                    <span className="text-lg shrink-0 text-[rgb(var(--red))]/70">{g.icon}</span>
                    {t(lang, g.key)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Solutions cards (if any exist in DB) */}
          {props.solutions.length > 0 && (
            <div className="mt-16">
              <h3 className="text-xl sm:text-2xl font-bold text-[rgb(var(--blue))] mb-2">{t(lang, "sectionSolutions")}</h3>
              <p className="text-sm text-white/55 mb-8">{t(lang, "solutionsIntro")}</p>
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
            </div>
          )}
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════
          6. SELECTED WORK / PORTFOLIO
          ═══════════════════════════════════════ */}
      <CaseStudiesSection lang={lang} />

      <div className="section-divider" />

      {/* ═══════════════════════════════════════
          7. PRICING / PACKAGES
          ═══════════════════════════════════════ */}
      <div className="pkg-section-bg">
        <Section id="packages" eyebrow={t(lang, "eyebrowPricing")} title={t(lang, "choosePackage")}>
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
                    className={`pkg-card ${cls.card} overflow-hidden relative`}
                  >
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

                      <PackageExamplesFromApi
                        lang={lang}
                        tierKey={`tier${packageIdToTier(pkg.id)}`}
                        onThumbnailClick={openGallery}
                      />

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

                      {detail && detail.pills.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {detail.pills.map((pill, i) => (
                            <span
                              key={i}
                              className="text-[11px] rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-0.5 text-white/70"
                            >
                              {pickL10n(lang, pill)}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-5 flex items-center gap-3">
                        {!isExpanded && (
                          <button
                            type="button"
                            onClick={handleWhatsApp}
                            className="inline-flex items-center justify-center rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-5 py-2.5 text-sm font-medium text-white hover:bg-[rgb(var(--red))]/35 hover:border-[rgb(var(--red))]/60 transition-all"
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

                        {!isMonthly && (
                          <div>
                            <p className="text-[11px] text-white/40 italic">
                              {t(lang, "addonsAvailableOnlyMonthly")}
                            </p>
                          </div>
                        )}

                        {props.discountConfig.enabled && (
                          <div className="text-[11px] text-green-400/80">
                            🎁 {pickL10n(lang, { he: props.discountConfig.labelHe, en: props.discountConfig.labelEn })} ({props.discountConfig.percent}%)
                          </div>
                        )}

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

                        {isMonthly && (hasDiscount || addonsTotal > 0) && (
                          <div className="rounded-lg border border-[rgb(var(--blue))]/30 bg-[rgb(var(--blue))]/10 px-3 py-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-white/90">{t(lang, "finalTotalLabel")}:</span>
                              <span className={`text-sm font-bold ${cls.accent}`}>₪{(finalPrice + addonsTotal).toLocaleString()}</span>
                            </div>
                          </div>
                        )}

                        <div className="pt-2" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
                          <button
                            type="button"
                            onClick={handleWhatsApp}
                            className="w-full inline-flex items-center justify-center rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-4 py-3 text-sm font-medium text-white hover:bg-[rgb(var(--red))]/35 hover:border-[rgb(var(--red))]/60 transition-all"
                          >
                            {t(lang, "pkgWhatsApp")}
                          </button>
                        </div>
                      </div>
                    )}

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

      <div className="section-divider" />

      {/* ═══════════════════════════════════════
          8. INDUSTRIES / WHO IT'S FOR
          ═══════════════════════════════════════ */}
      <Section id="industries" eyebrow={t(lang, "eyebrowIndustries")} title={t(lang, "industriesTitle")} centered>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {INDUSTRIES.map((ind) => (
            <div key={ind.key} className="industry-pill">
              <span>{ind.icon}</span>
              <span>{t(lang, ind.key)}</span>
            </div>
          ))}
        </div>
      </Section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════
          9. FAQ
          ═══════════════════════════════════════ */}
      <Section id="faq" eyebrow={t(lang, "eyebrowFaq")} title={t(lang, "faqTitle")} centered>
        <div className="cc-glass rounded-3xl p-6 sm:p-10 shadow-lg max-w-3xl mx-auto">
          {([
            { q: "faq1Q", a: "faq1A" },
            { q: "faq2Q", a: "faq2A" },
            { q: "faq3Q", a: "faq3A" },
            { q: "faq4Q", a: "faq4A" },
            { q: "faq5Q", a: "faq5A" },
            { q: "faq6Q", a: "faq6A" },
            { q: "faq7Q", a: "faq7A" },
          ] as const).map((faq) => (
            <FaqItem key={faq.q} question={t(lang, faq.q)} answer={t(lang, faq.a)} />
          ))}
        </div>
      </Section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════
          10. FINAL CTA / CONTACT
          ═══════════════════════════════════════ */}
      <Section id="final-cta">
        <div className="cta-gradient p-8 sm:p-12 lg:p-16 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">{t(lang, "finalCtaTitle")}</h2>
          <p className="mt-4 text-base sm:text-lg text-white/60 max-w-2xl mx-auto">{t(lang, "finalCtaSubtitle")}</p>

          <div className="mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onSendWhatsApp}
              className="btn-primary text-base"
            >
              {t(lang, "finalCtaWa")}
            </button>
            <a href="#packages" className="btn-secondary">
              {t(lang, "finalCtaPackage")}
            </a>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-white/40">
            <span>{t(lang, "finalCtaContent")}</span>
            <span>·</span>
            <span>{t(lang, "finalCtaCustom")}</span>
            <span>·</span>
            <span>{t(lang, "finalCtaSolution")}</span>
          </div>

          {/* Contact info */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href={`https://instagram.com/${props.settings.instagramHandle.replace("@", "")}`}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary text-sm"
            >
              {t(lang, "contactInstagram")}
            </a>
            <a
              href={`mailto:${props.settings.email}`}
              className="btn-secondary text-sm"
            >
              {t(lang, "contactEmail")}
            </a>
          </div>

          <p className="mt-4 text-xs text-white/35">{t(lang, "replyTime")}</p>
        </div>
      </Section>

      {/* ===== Collaboration section ===== */}
      <CollabSection lang={lang} />

      <Footer lang={lang} />

      {/* ─── Modals ─── */}
      {selectedSolution && (
        <SolutionDetailModal
          lang={lang}
          item={selectedSolution}
          onClose={() => setSelectedSolutionSlug(null)}
          pricing={props.pricing}
          discountConfig={props.discountConfig}
        />
      )}

      {catalogPreview && (
        <CatalogPreviewModal
          lang={lang}
          catalog={catalogPreview}
          onClose={() => setCatalogPreviewSlug(null)}
        />
      )}

      <ExamplesGalleryViewer
        lang={lang}
        open={galleryOpen}
        items={galleryItems}
        startIndex={galleryStartIdx}
        onClose={closeGallery}
      />

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
