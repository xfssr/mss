"use client";

import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function copy(lang: Lang) {
  if (lang === "he") {
    return {
      title: "איך זה עובד",
      subtitle: "צפו בדוגמאות בקטלוג → בחרו חבילה → ממשיכים להזמנה ב-/product.",
      steps: [
        { n: "1", title: "דוגמאות", desc: "גללו בקטלוג וצפו בדוגמאות של עבודות.", href: "#catalog" },
        { n: "2", title: "חבילה", desc: "בחרו חבילה מוכנה או בנו משלכם.", href: "#packages" },
        { n: "3", title: "הזמנה", desc: "המשיכו לעמוד ההזמנה — בחרו תאריך ושלחו ב-WhatsApp.", href: "#packages" },
      ],
      btn: (step: number) => (step === 1 ? "לראות דוגמאות" : step === 2 ? "לבחור חבילה" : "להזמין"),
    };
  }

  return {
    title: "How it works",
    subtitle: "Browse the catalog for examples → pick a package → proceed to order on /product.",
    steps: [
      { n: "1", title: "Examples", desc: "Scroll through the catalog and browse work samples.", href: "#catalog" },
      { n: "2", title: "Package", desc: "Choose a preset or build your own.", href: "#packages" },
      { n: "3", title: "Order", desc: "Continue to the order page — pick a date and send via WhatsApp.", href: "#packages" },
    ],
    btn: (step: number) => (step === 1 ? "View examples" : step === 2 ? "Choose package" : "Order"),
  };
}

export function HowItWorksHero(props: { lang: Lang }) {
  const reduced = usePrefersReducedMotion();
  const c = copy(props.lang);

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-5 sm:p-6 shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-base sm:text-lg font-bold text-white/95">{c.title}</div>
          <div className="mt-1.5 text-xs sm:text-sm text-white/75 leading-relaxed">{c.subtitle}</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {c.steps.map((s, idx) => (
          <div
            key={s.n}
            className={[
              "rounded-2xl border border-white/10 bg-black/45 backdrop-blur-sm p-4 sm:p-5",
              "hover:border-white/20 hover:bg-black/35 hover:shadow-lg transition-all duration-200",
              reduced ? "" : "motion-safe:hover:-translate-y-1",
            ].join(" ")}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2.5 min-w-0">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/40 text-xs font-semibold text-white/90 shadow-sm">
                  {s.n}
                </span>
                <div className="text-sm font-bold text-white/95 truncate">{s.title}</div>
              </div>
              <span className="h-2 w-2 rounded-full bg-[rgb(var(--red))]/80 shadow-sm" aria-hidden="true" />
            </div>

            <div className="mt-3 text-xs sm:text-sm text-white/75 leading-relaxed">{s.desc}</div>

            <a
              href={s.href}
              className="mt-4 w-full rounded-xl border border-white/15 bg-white/[0.08] px-3 py-2.5 text-xs sm:text-sm font-medium text-white/95 hover:bg-white/[0.15] hover:border-white/25 transition-all duration-200 hidden sm:block text-center"
            >
              {c.btn(idx + 1)}
            </a>
          </div>
        ))}
      </div>

      {/* Single mobile CTA at bottom */}
      <a
        href="#catalog"
        className="sm:hidden mt-5 block w-full text-center rounded-xl border border-[rgb(var(--blue))]/30 bg-[rgb(var(--blue))]/10 px-4 py-3 text-sm font-medium text-white/95 hover:bg-[rgb(var(--blue))]/20 hover:border-[rgb(var(--blue))]/50 transition-all duration-200"
      >
        {t(props.lang, "howStartNow")}
      </a>
    </div>
  );
}
