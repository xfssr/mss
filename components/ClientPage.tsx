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
import type { DiscountConfig } from "@/lib/catalogOverridesStore";
import type { PackageDetail } from "@/lib/packageConfigStore";
import { Navbar } from "@/components/Navbar";
import { Section } from "@/components/Section";
import { CategoryDetailModal } from "@/components/CategoryDetailModal";
import { CatalogGrid } from "@/components/CatalogGrid";
import { MiniScreenPanel } from "@/components/MiniScreenPanel";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { Footer } from "@/components/Footer";
import { HeroSlider } from "@/components/HeroSlider";
import { HowItWorksHero } from "@/components/HowItWorksHero";
import { BookingDrawer } from "@/components/BookingDrawer";
import { QuickPreviewModal } from "@/components/QuickPreviewModal";
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
  discountConfig: DiscountConfig;
  packageDetails: PackageDetail[];
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
  },
  {
    id: "business",
    badge: "popular" as const,
  },
  {
    id: "monthly",
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
  const [bookingDrawerOpen, setBookingDrawerOpen] = useState(false);
  const [bookingPkg, setBookingPkg] = useState("");
  const [expandedPkg, setExpandedPkg] = useState<string | null>(null);
  const [previewSlug, setPreviewSlug] = useState<string | null>(null);

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

  const previewCatalog = useMemo(
    () => (previewSlug ? props.catalogs.find((c) => c.slug === previewSlug) ?? null : null),
    [props.catalogs, previewSlug],
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
    setBookingPkg(pkg || "");
    setBookingDrawerOpen(true);
  }

  function scrollToCatalogAndPreview() {
    const el = document.getElementById("catalog");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Auto-open first category preview after scroll completes
      setTimeout(() => {
        el.focus({ preventScroll: true });
        if (portfolioCatalogs.length > 0) {
          setPreviewSlug(portfolioCatalogs[0].slug);
        }
      }, 600);
    }
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

              {/* Mobile: single primary CTA */}
              <div className="mt-8 sm:hidden">
                <button
                  type="button"
                  onClick={scrollToCatalogAndPreview}
                  className="w-full inline-flex items-center justify-center rounded-xl border border-[rgb(var(--blue))]/30 bg-[rgb(var(--blue))]/10 px-6 py-3.5 text-sm font-medium text-white/90 hover:bg-[rgb(var(--blue))]/20 hover:border-[rgb(var(--blue))]/50 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  {t(lang, "letsStart")}
                </button>
              </div>

              {/* Desktop: full CTA set */}
              <div className="mt-8 hidden sm:flex flex-row gap-3">
                <a
                  href="#catalog"
                  className="inline-flex items-center justify-center rounded-xl border border-[rgb(var(--blue))]/30 bg-[rgb(var(--blue))]/10 px-6 py-3.5 text-sm font-medium text-white/90 hover:bg-[rgb(var(--blue))]/20 hover:border-[rgb(var(--blue))]/50 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  {t(lang, "heroCtaCatalogs")}
                </a>

                <a
                  href="#packages"
                  title={t(lang, "heroCtaSeePricing")}
                  className="inline-flex items-center justify-center rounded-xl border border-[rgb(var(--blue))]/30 bg-[rgb(var(--blue))]/10 px-6 py-3.5 text-sm font-medium text-white/90 hover:bg-[rgb(var(--blue))]/20 hover:border-[rgb(var(--blue))]/50 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  {t(lang, "heroCtaSeePricing")}
                </a>

                <button
                  type="button"
                  onClick={onSendWhatsApp}
                  title="WhatsApp"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-6 py-3.5 text-sm font-medium text-white/90 hover:bg-white/[0.12] hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  WhatsApp
                </button>
              </div>

              <div className="mt-3 text-xs text-white/50">{t(lang, "heroHint")}</div>
            </div>

            <div className="lg:col-span-5">
              <HeroSlider lang={lang} items={props.heroMedia} intervalMs={2400} />
            </div>
          </div>

          {/* Compact 3-step guide */}
          <HowItWorksHero lang={lang} />
        </div>
      </Section>

      <Section id="catalog" title={t(lang, "sectionCatalog")}>
        <CatalogGrid
          lang={lang}
          catalogs={portfolioCatalogs}
          selectedSlug={selectedCatalog?.slug ?? undefined}
          onSelect={(slug) => openCatalog(slug)}
          onPreview={(slug) => setPreviewSlug(slug)}
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
          pricing={props.pricing}
          discountConfig={props.discountConfig}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {PACKAGE_CARDS.map((pkg) => {
            const keyBase = `pkg${pkg.id.charAt(0).toUpperCase() + pkg.id.slice(1)}`;
            const detail = props.packageDetails.find((d) => d.id === pkg.id);
            const price = detail?.priceFrom ?? 0;
            const isExpanded = expandedPkg === pkg.id;
            return (
            <div
              key={pkg.id}
              className="cc-glass rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/25 hover:shadow-2xl"
            >
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{pkgIcon(detail)}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {detail ? pickL10n(lang, detail.title) : t(lang, keyBase)}
                      </h3>
                      {pkg.badge === "popular" ? (
                        <span className="text-[10px] rounded-full border border-[rgb(var(--blue))]/50 bg-[rgb(var(--blue))]/15 px-2.5 py-0.5 text-white/90 font-medium shadow-sm">
                          {t(lang, "popular")}
                        </span>
                      ) : null}
                    </div>
                    {price > 0 && (
                      <p className="mt-1 text-xs text-[rgb(var(--blue))]/80">
                        {t(lang, "fromPrice")}₪{price.toLocaleString()}{" "}
                        <span className="text-white/40">({t(lang, "priceEstimate")})</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Best for + Delivery (always visible) */}
                {detail && (
                  <div className="mt-3 space-y-1">
                    <p className="text-xs text-white/60">
                      <span className="text-[rgb(var(--blue))]/70 font-medium">{t(lang, "pkgBestFor")}:</span>{" "}
                      {pickL10n(lang, detail.bestFor)}
                    </p>
                    <p className="text-xs text-white/60">
                      <span className="text-[rgb(var(--blue))]/70 font-medium">{t(lang, "pkgDelivery")}:</span>{" "}
                      {pickL10n(lang, detail.deliveryTime)}
                    </p>
                  </div>
                )}

                {/* Tag pills */}
                {detail && detail.pills.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
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

                {/* Action buttons */}
                <div className="mt-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onContinueToProduct(pkg.id)}
                    className="inline-flex items-center justify-center rounded-xl border border-[rgb(var(--blue))]/30 bg-[rgb(var(--blue))]/10 px-4 py-2 text-xs font-medium text-white/90 hover:bg-[rgb(var(--blue))]/20 hover:border-[rgb(var(--blue))]/50 transition-all"
                  >
                    {t(lang, "pkgChoose")} →
                  </button>
                  {detail && (
                    <button
                      type="button"
                      onClick={() => setExpandedPkg(isExpanded ? null : pkg.id)}
                      className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-medium text-white/70 hover:bg-white/[0.10] hover:border-white/20 transition-all"
                    >
                      {isExpanded ? t(lang, "less") : t(lang, "more")}
                    </button>
                  )}
                </div>
              </div>

              {/* Expandable accordion */}
              {detail && isExpanded && (
                <div className="border-t border-white/10 px-5 sm:px-6 py-4 space-y-3 text-sm animate-in slide-in-from-top-2 duration-200">
                  {/* What you get */}
                  <div>
                    <h4 className="text-xs font-semibold text-[rgb(var(--blue))] mb-1.5">
                      {t(lang, "sectionWhatYouGet")}
                    </h4>
                    <ul className="space-y-1">
                      {detail.whatYouGet.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-white/75">
                          <span className="text-[rgb(var(--blue))] mt-0.5 shrink-0">✓</span>
                          {pickL10n(lang, item)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                      <div className="text-[10px] text-white/40">{t(lang, "labelShootTime")}</div>
                      <div className="text-xs text-white/80">{pickL10n(lang, detail.shootTime)}</div>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                      <div className="text-[10px] text-white/40">{t(lang, "labelDelivery")}</div>
                      <div className="text-xs text-white/80">{pickL10n(lang, detail.deliveryTime)}</div>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                      <div className="text-[10px] text-white/40">{t(lang, "labelLocations")}</div>
                      <div className="text-xs text-white/80">{pickL10n(lang, detail.locations)}</div>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                      <div className="text-[10px] text-white/40">{t(lang, "labelRevisions")}</div>
                      <div className="text-xs text-white/80">{pickL10n(lang, detail.revisions)}</div>
                    </div>
                  </div>

                  {/* Best for / Target audience */}
                  <div>
                    <h4 className="text-xs font-semibold text-[rgb(var(--blue))] mb-1">
                      {t(lang, "sectionBestFor")}
                    </h4>
                    <p className="text-xs text-white/65">{pickL10n(lang, detail.bestFor)}</p>
                  </div>

                  {/* Add-ons */}
                  {detail.addOns.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-[rgb(var(--blue))] mb-1">
                        {t(lang, "addonsLabel")}
                      </h4>
                      <ul className="space-y-0.5">
                        {detail.addOns.map((addon, i) => (
                          <li key={i} className="text-xs text-white/60">+ {pickL10n(lang, addon)}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* First-order discount in card */}
                  {props.discountConfig.enabled && (
                    <div className="text-[11px] text-green-400/80">
                      🎁 {pickL10n(lang, { he: props.discountConfig.labelHe, en: props.discountConfig.labelEn })} ({props.discountConfig.percent}%)
                    </div>
                  )}
                </div>
              )}

              {/* Collapsed summary when accordion is closed */}
              {detail && !isExpanded && (
                <div className="border-t border-white/10 px-5 sm:px-6 py-2">
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
          <p className="mt-4 text-xs text-[rgb(var(--blue))]/70">
            🎁 {pickL10n(lang, { he: props.discountConfig.labelHe, en: props.discountConfig.labelEn })}
            {" — "}
            {props.discountConfig.percent}%
            {" "}
            <span className="text-white/40">({t(lang, "priceEstimate")})</span>
          </p>
        )}
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

      {/* Quick Preview Modal */}
      {previewCatalog && (
        <QuickPreviewModal
          lang={lang}
          catalog={previewCatalog}
          onClose={() => setPreviewSlug(null)}
          onChoosePackage={() => {
            setPreviewSlug(null);
            onContinueToProduct();
          }}
          onWhatsApp={() => {
            setPreviewSlug(null);
            onSendWhatsApp();
          }}
        />
      )}

      {/* Booking Drawer */}
      <BookingDrawer
        lang={lang}
        open={bookingDrawerOpen}
        onClose={() => setBookingDrawerOpen(false)}
        sourceType="package"
        pkg={bookingPkg}
        pricing={props.pricing}
        discountConfig={props.discountConfig}
        packageDetail={props.packageDetails.find((d) => d.id === bookingPkg)}
      />
    </div>
  );
}
