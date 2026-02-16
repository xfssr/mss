"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { SolutionItem } from "@/content/solutions";
import type { Lang } from "@/utils/i18n";

function pick(lang: Lang, v: { he: string; en: string }) {
  const s = v?.[lang] ?? "";
  return s?.trim() ? s : v.he;
}

export function SolutionDetailModal(props: {
  lang: Lang;
  item: SolutionItem;
  onClose: () => void;
}) {
  const { lang, item, onClose } = props;
  const router = useRouter();
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

  function onPrimary() {
    router.push(`/product?catalog=${encodeURIComponent(item.slug)}&lang=${lang}`);
  }

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
        className="absolute inset-0 bg-black/75 sm:bg-black/65 backdrop-blur-[1px] sm:backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-3xl overflow-hidden border border-white/12 shadow-2xl rounded-2xl sm:rounded-[28px] bg-[#0b0f14]/98 sm:bg-[#0b0f14]/95 flex flex-col min-h-0 h-[calc(100dvh-6.5rem)] sm:h-auto sm:max-h-[calc(100dvh-8rem)]">

        {/* Header */}
        <div className="shrink-0 px-4 sm:px-6 pt-4 sm:pt-5 pb-3 sm:pb-4 border-b border-white/10 bg-[#0b0f14]/97 backdrop-blur">
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
                    className="text-[11px] rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-0.5 text-white/70"
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
              {lang === "he" ? "מה מקבלים" : "What you get"}
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

          {/* Best for */}
          <section>
            <h3 className="text-sm font-semibold text-[rgb(var(--blue))] mb-1">
              {lang === "he" ? "מתאים ל" : "Best for"}
            </h3>
            <p className="text-sm text-white/70">{pick(lang, item.bestFor)}</p>
          </section>

          {/* Process timeline */}
          <section>
            <h3 className="text-sm font-semibold text-[rgb(var(--blue))] mb-3">
              {lang === "he" ? "התהליך" : "Process"}
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
              {lang === "he" ? "טווח מחירים" : "Pricing range"}
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
                {lang === "he" ? "למה זה עובד" : "Why this works"}
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
                {lang === "he" ? "שאלות נפוצות" : "FAQ"}
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
                {lang === "he" ? "הוכחה חברתית" : "Social proof"}
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
        </div>

        {/* Sticky CTA footer */}
        <div className="shrink-0 border-t border-white/10 bg-[#0b0f14]/97 backdrop-blur px-4 sm:px-6 pt-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              type="button"
              onClick={onPrimary}
              className="flex-1 inline-flex items-center justify-center rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-4 py-3 text-sm font-medium text-white hover:bg-[rgb(var(--red))]/35 hover:border-[rgb(var(--red))]/60 transition-all duration-200"
            >
              {pick(lang, item.ctaPrimary)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
