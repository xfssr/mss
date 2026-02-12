// components/ClientPage.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Catalog } from "@/types/catalog";
import type { HeroMedia } from "@/types/hero";
import type { PricingConfig } from "@/types/pricing";
import type { PriceItem } from "@/types/price";
import type { SiteSettings } from "@/types/settings";
import { Navbar } from "@/components/Navbar";
import { Section } from "@/components/Section";
import { CatalogGrid } from "@/components/CatalogGrid";
import { MiniScreenPanel } from "@/components/MiniScreenPanel";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { Footer } from "@/components/Footer";
import { HeroSlider } from "@/components/HeroSlider";
import { HowItWorksHero } from "@/components/HowItWorksHero";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { useCopiedState } from "@/components/useCopiedState";
import type { TabKey } from "@/components/Tabs";
import { DEFAULT_PACKAGE, STORAGE_KEY_PACKAGE, type PackageDraft, calcPackage } from "@/utils/packageCalculator";
import { DEFAULT_LANG, STORAGE_KEY_LANG, t, type Lang } from "@/utils/i18n";
import {
  buildMessage,
  buildWaMeUrl,
  copyToClipboard,
  DEFAULT_RESERVATION,
  openWhatsApp,
  STORAGE_KEY_RESERVATION,
  WHATSAPP_PHONE,
  type ReservationDraft,
} from "@/utils/whatsapp";

type Props = {
  catalogs: Catalog[];
  settings: SiteSettings;
  prices: PriceItem[];
  heroMedia: HeroMedia[];
  pricing: PricingConfig;
};

function normalizeTab(t0: string | null): TabKey {
  if (t0 === "reserve" || t0 === "examples" || t0 === "package") return t0;
  return "examples";
}

function pickL10n(lang: Lang, v: { he: string; en: string }) {
  const s = v?.[lang] ?? "";
  return s?.trim() ? s : v.he;
}

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

  const [reservationRaw, setReservationRaw] = useLocalStorageState<ReservationDraft>(STORAGE_KEY_RESERVATION, DEFAULT_RESERVATION);
  const reservation = useMemo(() => ({ ...DEFAULT_RESERVATION, ...reservationRaw }), [reservationRaw]);

  const [packageRaw, setPackageRaw] = useLocalStorageState<PackageDraft>(STORAGE_KEY_PACKAGE, DEFAULT_PACKAGE);
  const packageDraft = useMemo(() => ({ ...DEFAULT_PACKAGE, ...packageRaw }), [packageRaw]);

  const [includePackageInMessage, setIncludePackageInMessage] = useState(false);

  const packageSummary = useMemo(
    () => (includePackageInMessage ? calcPackage(lang, packageDraft, props.pricing).summaryLines : []),
    [includePackageInMessage, lang, packageDraft, props.pricing],
  );

  const [panelOpen, setPanelOpen] = useState(false);

  const slugFromUrl = searchParams.get("catalog");
  const tabFromUrl = normalizeTab(searchParams.get("tab"));

  const selectedCatalog = useMemo(() => props.catalogs.find((c) => c.slug === slugFromUrl) ?? null, [props.catalogs, slugFromUrl]);

  const [tab, setTab] = useState<TabKey>("examples");
  useEffect(() => setTab(tabFromUrl), [tabFromUrl]);

  const copied = useCopiedState();

  const softErrors = useMemo(() => {
    const e: Partial<Record<keyof ReservationDraft, string>> = {};
    if ((reservation.comment || "").trim().length > 0 && reservation.comment.trim().length < 4) {
      e.comment = lang === "he" ? "ההערה קצרה מדי — כמה מילים מספיק 🙂" : "Comment is too short — a couple words is enough 🙂";
    }
    return e;
  }, [lang, reservation.comment]);

  const messagePreview = useMemo(() => {
    const catalogTitle = selectedCatalog ? pickL10n(lang, selectedCatalog.title) : undefined;
    return buildMessage({
      lang,
      catalogTitle,
      reservation,
      packageSummary: packageSummary.length ? packageSummary : undefined,
    });
  }, [lang, packageSummary, reservation, selectedCatalog]);

  function setParams(next: { catalog?: string | null; tab?: TabKey | null }) {
    const sp = new URLSearchParams(searchParams.toString());
    if (next.catalog === null) sp.delete("catalog");
    else if (typeof next.catalog === "string") sp.set("catalog", next.catalog);
    if (next.tab === null) sp.delete("tab");
    else if (typeof next.tab === "string") sp.set("tab", next.tab);

    const qs = sp.toString();
    router.replace(qs ? `/?${qs}#catalog` : "/#catalog");
  }

  function openCatalog(slug: string, nextTab: TabKey = "examples") {
    setPanelOpen(true);
    setTab(nextTab);
    setParams({ catalog: slug, tab: nextTab });
  }

  const defaultCatalogSlug = useMemo(() => {
    const popular = props.catalogs.find((c) => "popular" in c && Boolean((c as any).popular));
    return popular?.slug ?? props.catalogs[0]?.slug ?? null;
  }, [props.catalogs]);

  function openFlow(nextTab: TabKey) {
    if (!defaultCatalogSlug) return;
    openCatalog(defaultCatalogSlug, nextTab);
  }

  useEffect(() => {
    if (slugFromUrl && selectedCatalog) setPanelOpen(true);
  }, [selectedCatalog, slugFromUrl]);

  function closePanel() {
    setPanelOpen(false);
    setParams({ catalog: null, tab: null });
  }

  function onSendWhatsApp() {
    const url = buildWaMeUrl(WHATSAPP_PHONE, messagePreview);
    openWhatsApp(url);
  }

  async function onCopyText() {
    const ok = await copyToClipboard(messagePreview);
    copied.set(ok ? "copied" : "error");
  }

  function onGenerate() {
    copied.set("idle");
  }

  function onApplyPackageToReserve(_summaryLines: string[]) {
    setIncludePackageInMessage(true);
    setTab("reserve");
    setParams({ catalog: selectedCatalog?.slug ?? slugFromUrl ?? null, tab: "reserve" });
  }

  const [expandedPrice, setExpandedPrice] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f14] via-[#0a0c10] to-[#06070a] text-white">
      <Navbar lang={lang} onSetLang={setLang} />

      <FloatingWhatsAppButton onClick={onSendWhatsApp} />

      <Section id="top">
        <div className="cc-glass rounded-3xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <h1 className="text-3xl sm:text-4xl font-semibold text-[rgb(var(--blue))]">{pickL10n(lang, props.settings.heroTitle)}</h1>
              <p className="mt-3 text-base sm:text-lg text-white/70">{pickL10n(lang, props.settings.heroSubtitle)}</p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href="#catalog"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm text-white/85 hover:bg-white/[0.10]"
                >
                  {t(lang, "heroCtaPick")}
                </a>

                <button
                  type="button"
                  onClick={onSendWhatsApp}
                  className="inline-flex items-center justify-center rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-5 py-3 text-sm text-white hover:bg-[rgb(var(--red))]/30"
                >
                  {t(lang, "heroCtaWhatsApp")}
                </button>
              </div>

              <div className="mt-4 text-sm text-white/70 whitespace-pre-line">{pickL10n(lang, props.settings.promoText)}</div>
              <div className="mt-3 text-xs text-white/45">{t(lang, "heroHint")}</div>
            </div>

            <div className="lg:col-span-5">
              <HeroSlider lang={lang} items={props.heroMedia} intervalMs={2400} />
            </div>
          </div>

          {/* ✅ UX mini-instruction (guided flow) */}
          <HowItWorksHero lang={lang} onOpenFlow={openFlow} />
        </div>
      </Section>

      <Section id="catalog" title={t(lang, "sectionCatalog")}>
        <CatalogGrid
          lang={lang}
          catalogs={props.catalogs}
          selectedSlug={selectedCatalog?.slug ?? undefined}
          onSelect={(slug) => openCatalog(slug, "examples")}
        />
        <div className="mt-4 text-xs text-white/45">{t(lang, "flowHint")}</div>
      </Section>

      {selectedCatalog ? (
        <MiniScreenPanel
          lang={lang}
          pricing={props.pricing}
          open={panelOpen}
          catalog={selectedCatalog}
          tab={tab}
          onTabChange={(next) => {
            setTab(next);
            setParams({ catalog: selectedCatalog.slug, tab: next });
          }}
          onClose={closePanel}
          reservation={reservation}
          onReservationChange={setReservationRaw}
          softErrors={softErrors}
          packageDraft={packageDraft}
          onPackageChange={setPackageRaw}
          onApplyPackageToReserve={onApplyPackageToReserve}
          messagePreview={messagePreview}
          onGenerate={onGenerate}
          onSend={onSendWhatsApp}
          onCopy={onCopyText}
          copiedState={copied.state}
        />
      ) : null}

      <Section id="about" title={t(lang, "sectionAbout")}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 cc-glass rounded-3xl p-6">
            <div className="text-sm text-white/70 whitespace-pre-line">{pickL10n(lang, props.settings.aboutText)}</div>
          </div>

          <div className="cc-glass rounded-3xl p-6">
            <div className="text-sm font-medium text-white/90">{t(lang, "packagesTitle")}</div>
            <div className="mt-3 space-y-3">
              {props.prices.map((p) => {
                const open = expandedPrice === p.id;
                return (
                  <div key={p.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-medium text-white/90">{pickL10n(lang, p.title)}</div>
                        <div className="mt-1 text-xs text-white/55">{pickL10n(lang, p.note)}</div>
                      </div>
                      <div className="text-sm font-semibold text-white">{p.price}</div>
                    </div>

                    {pickL10n(lang, p.details).trim() ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setExpandedPrice(open ? null : p.id)}
                          className="mt-3 text-sm text-[rgb(var(--blue))] hover:underline"
                        >
                          {open ? t(lang, "less") : t(lang, "more")}
                        </button>
                        {open ? <div className="mt-3 text-sm text-white/70 whitespace-pre-line">{pickL10n(lang, p.details)}</div> : null}
                      </>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => document.querySelector("#catalog")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-4 w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white/85 hover:bg-white/[0.10]"
            >
              {t(lang, "openCatalog")}
            </button>
          </div>
        </div>
      </Section>

      <Section id="contact" title={t(lang, "sectionContact")}>
        <div className="cc-glass rounded-3xl p-6">
          <div className="text-sm text-white/70 whitespace-pre-line">{pickL10n(lang, props.settings.contactText)}</div>

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onSendWhatsApp}
              className="inline-flex items-center justify-center rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-5 py-3 text-sm text-white hover:bg-[rgb(var(--red))]/30"
            >
              {t(lang, "contactWhatsApp")}
            </button>

            <a
              href={`https://instagram.com/${props.settings.instagramHandle.replace("@", "")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm text-white/85 hover:bg-white/[0.10]"
            >
              {t(lang, "contactInstagram")}
            </a>

            <a
              href={`mailto:${props.settings.email}`}
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm text-white/85 hover:bg-white/[0.10]"
            >
              {t(lang, "contactEmail")}
            </a>
          </div>

          <div className="mt-4 text-xs text-white/45">{t(lang, "replyTime")}</div>
        </div>
      </Section>

      <Footer lang={lang} />
    </div>
  );
}
