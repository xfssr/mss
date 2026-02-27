"use client";

import { useEffect, useState } from "react";
import type { SolutionItem } from "@/content/solutions";
import type { Lang } from "@/utils/i18n";
import type { PricingConfig } from "@/types/pricing";
import type { DiscountConfig } from "@/lib/catalogOverridesStore";
import { t } from "@/utils/i18n";
import { WHATSAPP_PHONE, openWhatsApp } from "@/utils/whatsapp";
import { DRAWER_BACKDROP_CLASS, MODAL_PANEL_CLASS, MODAL_HEADER_CLASS, MODAL_FOOTER_CLASS } from "@/lib/drawerStyles";

function pick(lang: Lang, v: { he: string; en: string }) {
  const s = v?.[lang] ?? "";
  return s?.trim() ? s : v.he;
}

export function SolutionDetailModal(props: {
  lang: Lang;
  item: SolutionItem;
  onClose: () => void;
  pricing?: PricingConfig;
  discountConfig?: DiscountConfig;
}) {
  const { lang, item, onClose } = props;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const isRtl = lang === "he";
  const dir = isRtl ? "rtl" : "ltr";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function onPrimary() {
    const primaryWaUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(pick(lang, item.whatsappTemplatePrimary))}`;
    openWhatsApp(primaryWaUrl);
  }

  const secondaryWaUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(pick(lang, item.whatsappTemplateSecondary))}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center px-3 sm:px-6 pt-[calc(env(safe-area-inset-top)+0.75rem)] pb-[calc(env(safe-area-inset-bottom)+0.75rem)]"
      role="dialog"
      aria-modal="true"
      dir={dir}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        className={DRAWER_BACKDROP_CLASS}
        onClick={onClose}
      />

      {/* Panel */}
      <div className={MODAL_PANEL_CLASS}>

        {/* Header */}
        <div className={MODAL_HEADER_CLASS}>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-lg sm:text-2xl font-semibold text-[rgb(var(--blue))]">
                {pick(lang, item.label)}
              </h2>
              <p className="mt-1 text-sm text-white/70">{pick(lang, item.subtitle)}</p>

              {/* Pills */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.pills.map((pill, i) => (
                  <span
                    key={i}
                    className="text-[11px] rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-white/60"
                  >
                    {pick(lang, pill)}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-xl border border-white/12 bg-black/35 px-3 py-2 text-sm text-white/90 hover:bg-white/[0.07] hover:border-white/20"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch] px-4 sm:px-6 py-4 sm:py-5 space-y-6">

          {/* What you get */}
          <section>
            <h3 className="text-sm font-semibold text-[rgb(var(--blue))] mb-2">
              {t(lang, "sectionWhatYouGet")}
            </h3>
            <ul className="space-y-1.5">
              {item.whatYouGet.map((bullet, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                  <span className="text-[rgb(var(--blue))] mt-0.5 shrink-0">✓</span>
                  {pick(lang, bullet)}
                </li>
              ))}
            </ul>
          </section>

          {/* Outcome */}
          {item.outcome && (pick(lang, item.outcome)) && (
            <section>
              <h3 className="text-sm font-semibold text-[rgb(var(--blue))] mb-1">
                {t(lang, "sectionOutcome")}
              </h3>
              <p className="text-sm text-white/70">{pick(lang, item.outcome)}</p>
            </section>
          )}

          {/* Best for */}
          <section>
            <h3 className="text-sm font-semibold text-[rgb(var(--blue))] mb-1">
              {t(lang, "sectionBestFor")}
            </h3>
            <p className="text-sm text-white/70">{pick(lang, item.bestFor)}</p>
          </section>

          {/* Process timeline */}
          <section>
            <h3 className="text-sm font-semibold text-[rgb(var(--blue))] mb-3">
              {t(lang, "sectionProcess")}
            </h3>
            <div className="flex items-start gap-2 sm:gap-4">
              {item.process.map((step, i) => (
                <div key={i} className="flex-1 text-center">
                  <div className="mx-auto w-8 h-8 rounded-full bg-[rgb(var(--blue))]/15 border border-[rgb(var(--blue))]/30 flex items-center justify-center text-sm font-bold text-[rgb(var(--blue))]">
                    {i + 1}
                  </div>
                  <div className="mt-1.5 text-xs text-white/70">{pick(lang, step.title)}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing range */}
          <section>
            <h3 className="text-sm font-semibold text-[rgb(var(--blue))] mb-2">
              {t(lang, "sectionPricingRange")}
            </h3>
            <div className={`grid gap-2 ${item.pricingTiers.length <= 2 ? "grid-cols-2" : "grid-cols-3"}`}>
              {item.pricingTiers.map((tier, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center">
                  <div className="text-xs text-white/50 font-medium">{tier.label}</div>
                  <div className="mt-1 text-sm font-semibold text-white">{pick(lang, tier.range)}</div>
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-white/45">{pick(lang, item.pricingNote)}</p>
          </section>

          {/* Why this works */}
          {item.whyThisWorks.length > 0 && (
            <section>
              <h3 className="text-sm font-semibold text-[rgb(var(--blue))] mb-2">
                {t(lang, "sectionWhyThisWorks")}
              </h3>
              <ul className="space-y-1">
                {item.whyThisWorks.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/75">
                    <span className="text-[rgb(var(--red))] mt-0.5 shrink-0">→</span>
                    {pick(lang, bullet)}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* FAQ */}
          {item.faq.length > 0 && (
            <section>
              <h3 className="text-sm font-semibold text-[rgb(var(--blue))] mb-2">
                {t(lang, "sectionFaq")}
              </h3>
              <div className="space-y-1">
                {item.faq.map((faqItem, i) => (
                  <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between gap-2 px-3 py-2.5 text-sm text-white/85 hover:bg-white/[0.04] transition-colors text-start"
                    >
                      <span>{pick(lang, faqItem.q)}</span>
                      <span className="shrink-0 text-white/40 text-xs">{openFaq === i ? "−" : "+"}</span>
                    </button>
                    {openFaq === i && (
                      <div className="px-3 pb-3 text-sm text-white/60 leading-relaxed">{pick(lang, faqItem.a)}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Social proof placeholders */}
          {item.socialProof.length > 0 && (
            <section>
              <h3 className="text-sm font-semibold text-[rgb(var(--blue))] mb-2">
                {t(lang, "sectionSocialProof")}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {item.socialProof.map((card, i) => (
                  <div key={i} className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center">
                    <div className="text-xs text-white/60">{pick(lang, card.title)}</div>
                    <div className="mt-1 text-[10px] text-white/30 italic">Placeholder</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Examples */}
          {item.examples && item.examples.length > 0 && item.examples.some(ex => ex.photo) && (
            <section>
              <h3 className="text-sm font-semibold text-[rgb(var(--blue))] mb-2">
                {t(lang, "sectionExamples")}
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {item.examples.filter(ex => ex.photo).map((ex, i) => (
                  <div key={i} className="rounded-xl border border-white/10 bg-white/[0.04] overflow-hidden aspect-square">
                    <img src={ex.photo} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sticky CTA footer */}
        <div className={MODAL_FOOTER_CLASS}>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              type="button"
              onClick={onPrimary}
              className="flex-1 btn-primary text-sm py-3"
            >
              {pick(lang, item.ctaPrimary)}
            </button>
            <a
              href={secondaryWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 btn-secondary text-sm py-3"
            >
              {pick(lang, item.ctaSecondary)}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
