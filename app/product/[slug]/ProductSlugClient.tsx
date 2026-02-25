// app/product/[slug]/ProductSlugClient.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { PackageDetail } from "@/lib/packageConfigStore";
import type { SolutionItem } from "@/content/solutions";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";

import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { DEFAULT_LANG, STORAGE_KEY_LANG, t, type Lang } from "@/utils/i18n";
import {
  buildWaMeUrl,
  openWhatsApp,
  WHATSAPP_PHONE,
} from "@/utils/whatsapp";

function pick(lang: Lang, v: { he: string; en: string }) {
  const s = v?.[lang] ?? "";
  return s?.trim() ? s : v.he;
}

const PKG_ICON_MAP: Record<string, string> = {
  camera: "📷",
  briefcase: "💼",
  calendar: "📅",
  hammer: "🔨",
  star: "⭐",
  zap: "⚡",
};

const SOL_ICON_MAP: Record<string, string> = {
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

export function ProductSlugClient(props: {
  kind: "package" | "solution";
  packageData: PackageDetail | null;
  solutionData: SolutionItem | null;
  initialLang: Lang;
}) {
  const [lang, setLang] = useLocalStorageState<Lang>(
    STORAGE_KEY_LANG,
    props.initialLang,
  );
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    try {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
    } catch {
      // ignore
    }
  }, [lang]);

  const onWhatsApp = () => {
    const msg =
      lang === "he"
        ? "היי, אני מעוניין לשמוע על חבילות תוכן"
        : "Hi, I'd like to learn about content packages";
    openWhatsApp(buildWaMeUrl(WHATSAPP_PHONE, msg));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f14] via-[#0a0c10] to-[#06070a] text-white">
      <Navbar lang={lang} onSetLang={setLang} />
      {/* Breadcrumb */}
      <div className="mx-auto max-w-4xl px-4 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
        >
          <span aria-hidden="true">←</span>
          {t(lang, "backToHome")}
        </Link>
      </div>

      {props.kind === "package" && props.packageData && (
        <PackagePage lang={lang} pkg={props.packageData} />
      )}

      {props.kind === "solution" && props.solutionData && (
        <SolutionPage
          lang={lang}
          sol={props.solutionData}
          openFaq={openFaq}
          setOpenFaq={setOpenFaq}
        />
      )}

      <Footer lang={lang} />
    </div>
  );
}

/* ── Package product page ── */

function PackagePage(props: { lang: Lang; pkg: PackageDetail }) {
  const { lang, pkg } = props;
  const icon = PKG_ICON_MAP[pkg.iconName] ?? "📁";

  const handleWhatsApp = () => {
    const msg =
      lang === "he"
        ? `היי, אני מעוניין/ת בחבילת ${pick(lang, pkg.title)}. אשמח לפרטים!`
        : `Hi, I'm interested in the ${pick(lang, pkg.title)} package. Please share details!`;
    openWhatsApp(buildWaMeUrl(WHATSAPP_PHONE, msg));
  };

  return (
    <Section id="product">
      <div className="cc-glass rounded-3xl p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-4xl">{icon}</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[rgb(var(--blue))]">
              {pick(lang, pkg.title)}
            </h1>
            <p className="mt-1 text-sm text-white/70">
              {pick(lang, pkg.subtitle)}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <span className="text-sm text-white/50">{t(lang, "fromPrice")}</span>
          <span className="text-2xl font-bold text-white ms-1">
            ₪{pkg.priceFrom.toLocaleString()}
          </span>
        </div>

        {/* Pills */}
        {pkg.pills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {pkg.pills.map((pill, i) => (
              <span
                key={i}
                className="text-xs rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-white/70"
              >
                {pick(lang, pill)}
              </span>
            ))}
          </div>
        )}

        {/* What you get */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[rgb(var(--blue))] mb-2">
            {t(lang, "sectionWhatYouGet")}
          </h2>
          <ul className="space-y-1.5">
            {pkg.whatYouGet.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-white/80"
              >
                <span className="text-[rgb(var(--blue))] mt-0.5 shrink-0">
                  ✓
                </span>
                {pick(lang, item)}
              </li>
            ))}
          </ul>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="text-xs text-white/40">{t(lang, "labelShootTime")}</div>
            <div className="text-sm text-white/80 mt-1">
              {pick(lang, pkg.shootTime)}
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="text-xs text-white/40">{t(lang, "labelDelivery")}</div>
            <div className="text-sm text-white/80 mt-1">
              {pick(lang, pkg.deliveryTime)}
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="text-xs text-white/40">{t(lang, "labelLocations")}</div>
            <div className="text-sm text-white/80 mt-1">
              {pick(lang, pkg.locations)}
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="text-xs text-white/40">{t(lang, "labelRevisions")}</div>
            <div className="text-sm text-white/80 mt-1">
              {pick(lang, pkg.revisions)}
            </div>
          </div>
        </div>

        {/* Best for */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[rgb(var(--blue))] mb-1">
            {t(lang, "sectionBestFor")}
          </h2>
          <p className="text-sm text-white/70">{pick(lang, pkg.bestFor)}</p>
        </div>

        {/* Add-ons */}
        {pkg.addOns.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-[rgb(var(--blue))] mb-1">
              {t(lang, "addonsLabel")}
            </h2>
            <ul className="space-y-0.5">
              {pkg.addOns.map((addon, i) => (
                <li key={i} className="text-sm text-white/60">
                  + {pick(lang, addon)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Target audience */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[rgb(var(--blue))] mb-1">
            {t(lang, "labelTargetAudience")}
          </h2>
          <p className="text-sm text-white/70">
            {pick(lang, pkg.targetAudience)}
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleWhatsApp}
            className="flex-1 inline-flex items-center justify-center rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-5 py-3.5 text-sm font-medium text-white hover:bg-[rgb(var(--red))]/35 hover:border-[rgb(var(--red))]/60 transition-all"
          >
            {t(lang, "pkgWhatsApp")}
          </button>
          <Link
            href="/#packages"
            className="flex-1 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-5 py-3.5 text-sm font-medium text-white/90 hover:bg-white/[0.12] hover:border-white/20 transition-all"
          >
            {t(lang, "choosePackage")}
          </Link>
        </div>
      </div>
    </Section>
  );
}

/* ── Solution product page ── */

function SolutionPage(props: {
  lang: Lang;
  sol: SolutionItem;
  openFaq: number | null;
  setOpenFaq: (v: number | null) => void;
}) {
  const { lang, sol, openFaq, setOpenFaq } = props;
  const icon = SOL_ICON_MAP[sol.iconName] ?? "📦";

  const handlePrimary = () => {
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(pick(lang, sol.whatsappTemplatePrimary))}`;
    openWhatsApp(url);
  };

  const secondaryUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(pick(lang, sol.whatsappTemplateSecondary))}`;

  return (
    <Section id="product">
      <div className="cc-glass rounded-3xl p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">{icon}</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[rgb(var(--blue))]">
              {pick(lang, sol.label)}
            </h1>
            <p className="mt-1 text-sm text-white/70">
              {pick(lang, sol.subtitle)}
            </p>
          </div>
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {sol.pills.map((pill, i) => (
            <span
              key={i}
              className="text-xs rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-white/70"
            >
              {pick(lang, pill)}
            </span>
          ))}
        </div>

        {/* What you get */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[rgb(var(--blue))] mb-2">
            {t(lang, "sectionWhatYouGet")}
          </h2>
          <ul className="space-y-1.5">
            {sol.whatYouGet.map((bullet, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-white/80"
              >
                <span className="text-[rgb(var(--blue))] mt-0.5 shrink-0">
                  ✓
                </span>
                {pick(lang, bullet)}
              </li>
            ))}
          </ul>
        </div>

        {/* Outcome */}
        {sol.outcome && pick(lang, sol.outcome) && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-[rgb(var(--blue))] mb-1">
              {t(lang, "sectionOutcome")}
            </h2>
            <p className="text-sm text-white/70">{pick(lang, sol.outcome)}</p>
          </div>
        )}

        {/* Best for */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[rgb(var(--blue))] mb-1">
            {t(lang, "sectionBestFor")}
          </h2>
          <p className="text-sm text-white/70">{pick(lang, sol.bestFor)}</p>
        </div>

        {/* Process */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[rgb(var(--blue))] mb-3">
            {t(lang, "sectionProcess")}
          </h2>
          <div className="flex items-start gap-2 sm:gap-4">
            {sol.process.map((step, i) => (
              <div key={i} className="flex-1 text-center">
                <div className="mx-auto w-8 h-8 rounded-full bg-[rgb(var(--blue))]/15 border border-[rgb(var(--blue))]/30 flex items-center justify-center text-sm font-bold text-[rgb(var(--blue))]">
                  {i + 1}
                </div>
                <div className="mt-1.5 text-xs text-white/70">
                  {pick(lang, step.title)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing range */}
        {sol.pricingTiers.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-[rgb(var(--blue))] mb-2">
              {t(lang, "sectionPricingRange")}
            </h2>
            <div
              className={`grid gap-2 ${sol.pricingTiers.length <= 2 ? "grid-cols-2" : "grid-cols-3"}`}
            >
              {sol.pricingTiers.map((tier, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center"
                >
                  <div className="text-xs text-white/50 font-medium">
                    {tier.label}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white">
                    {pick(lang, tier.range)}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-white/45">
              {pick(lang, sol.pricingNote)}
            </p>
          </div>
        )}

        {/* Why this works */}
        {sol.whyThisWorks.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-[rgb(var(--blue))] mb-2">
              {t(lang, "sectionWhyThisWorks")}
            </h2>
            <ul className="space-y-1">
              {sol.whyThisWorks.map((bullet, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-white/75"
                >
                  <span className="text-[rgb(var(--red))] mt-0.5 shrink-0">
                    →
                  </span>
                  {pick(lang, bullet)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* FAQ */}
        {sol.faq.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-[rgb(var(--blue))] mb-2">
              {t(lang, "sectionFaq")}
            </h2>
            <div className="space-y-1">
              {sol.faq.map((faqItem, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-2 px-3 py-2.5 text-sm text-white/85 hover:bg-white/[0.04] transition-colors text-start"
                  >
                    <span>{pick(lang, faqItem.q)}</span>
                    <span className="shrink-0 text-white/40 text-xs">
                      {openFaq === i ? "−" : "+"}
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="px-3 pb-3 text-sm text-white/60 leading-relaxed">
                      {pick(lang, faqItem.a)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Social proof */}
        {sol.socialProof.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-[rgb(var(--blue))] mb-2">
              {t(lang, "sectionSocialProof")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {sol.socialProof.map((card, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center"
                >
                  <div className="text-xs text-white/60">
                    {pick(lang, card.title)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Examples */}
        {sol.examples && sol.examples.length > 0 && sol.examples.some(ex => ex.photo) && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-[rgb(var(--blue))] mb-2">
              {t(lang, "sectionExamples")}
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {sol.examples.filter(ex => ex.photo).map((ex, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/[0.04] overflow-hidden aspect-square"
                >
                  <img src={ex.photo} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handlePrimary}
            className="flex-1 inline-flex items-center justify-center rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-5 py-3.5 text-sm font-medium text-white hover:bg-[rgb(var(--red))]/35 hover:border-[rgb(var(--red))]/60 transition-all"
          >
            {pick(lang, sol.ctaPrimary)}
          </button>
          <a
            href={secondaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-5 py-3.5 text-sm font-medium text-white/90 hover:bg-white/[0.12] hover:border-white/20 transition-all"
          >
            {pick(lang, sol.ctaSecondary)}
          </a>
        </div>
      </div>
    </Section>
  );
}
