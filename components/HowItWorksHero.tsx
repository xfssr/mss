"use client";

import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";
import type { TabKey } from "@/components/Tabs";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function copy(lang: Lang) {
  if (lang === "he") {
    return {
      title: "איך זה עובד",
      subtitle: "בוחרים קטלוג → רואים דוגמאות → בונים חבילה → בוחרים עיר/זמן → שולחים ב-WhatsApp.",
      steps: [
        { tab: "examples" as const, n: "1", title: "דוגמאות", desc: "פתח קטלוג וצפה בדוגמאות בתוך המיני-מסך." },
        { tab: "package" as const, n: "2", title: "חבילה", desc: "בחר חבילה מוכנה או התאם ידנית — המחיר מתעדכן." },
        { tab: "reserve" as const, n: "3", title: "הזמנה", desc: "עיר + תאריך/שעה + הערה → הודעה מוכנה." },
      ],
      btn: (tab: TabKey) => (tab === "examples" ? "לראות דוגמאות" : tab === "package" ? "לבנות חבילה" : "להזמין"),
      exampleTitle: "דוגמה להודעה",
      example:
        "היי Emil 👋\n" +
        "רוצה להזמין צילום תוכן.\n" +
        "קטלוג: Restaurants\n" +
        "עיר: Tel Aviv\n" +
        "תאריך/שעה: 12.03 · 18:30\n" +
        "הערה: צריך גם 6 רילס ו־20 תמונות.\n",
      tip: "טיפ: אם WhatsApp לא נפתח — אפשר להעתיק טקסט.",
    };
  }

  return {
    title: "How it works",
    subtitle: "Pick a catalog → view examples → build a package → set city/time → send via WhatsApp.",
    steps: [
      { tab: "examples" as const, n: "1", title: "Examples", desc: "Open a catalog and browse examples in the mini-screen." },
      { tab: "package" as const, n: "2", title: "Package", desc: "Choose a preset or customize — price updates live." },
      { tab: "reserve" as const, n: "3", title: "Reserve", desc: "City + date/time + note → message is ready." },
    ],
    btn: (tab: TabKey) => (tab === "examples" ? "View examples" : tab === "package" ? "Build package" : "Reserve"),
    exampleTitle: "Message example",
    example:
      "Hi Emil 👋\n" +
      "I’d like to book a content shoot.\n" +
      "Catalog: Restaurants\n" +
      "City: Tel Aviv\n" +
      "Date/Time: Mar 12 · 18:30\n" +
      "Note: Need 6 reels + 20 photos.\n",
    tip: "Tip: if WhatsApp doesn’t open, you can copy the text.",
  };
}

export function HowItWorksHero(props: { lang: Lang; onOpenFlow?: (tab: TabKey) => void }) {
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

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {c.steps.map((s) => (
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

              <button
                type="button"
                onClick={() => props.onOpenFlow?.(s.tab)}
                className="hidden sm:block mt-4 w-full rounded-xl border border-white/15 bg-white/[0.08] px-3 py-2.5 text-xs sm:text-sm font-medium text-white/95 hover:bg-white/[0.15] hover:border-white/25 transition-all duration-200"
              >
                {c.btn(s.tab)}
              </button>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-white/10 bg-black/45 backdrop-blur-sm p-4 sm:p-5 h-full">
            <div className="text-sm font-bold text-white/95">{c.exampleTitle}</div>

            <pre
              dir="auto"
              className="mt-4 whitespace-pre-wrap rounded-xl border border-white/10 bg-black/60 p-3.5 text-[12px] text-white/85 leading-relaxed shadow-inner"
            >
              {c.example}
            </pre>

            <div className="mt-3 text-[11px] text-white/60 leading-relaxed">{c.tip}</div>
          </div>
        </div>
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