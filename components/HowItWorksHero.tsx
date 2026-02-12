"use client";

import type { Lang } from "@/utils/i18n";
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
    <div className="mt-6 sm:mt-8 rounded-2xl border border-white/10 bg-black/35 p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm sm:text-base font-semibold text-white/95">{c.title}</div>
          <div className="mt-1 text-xs sm:text-sm text-white/70">{c.subtitle}</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {c.steps.map((s) => (
            <div
              key={s.n}
              className={[
                "rounded-2xl border border-white/10 bg-black/40 p-3 sm:p-4",
                "hover:border-white/20 hover:bg-white/[0.06] transition",
                reduced ? "" : "motion-safe:hover:-translate-y-0.5",
              ].join(" ")}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 min-w-0">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-black/30 text-xs text-white/85">
                    {s.n}
                  </span>
                  <div className="text-sm font-semibold text-white/90 truncate">{s.title}</div>
                </div>
                <span className="h-2 w-2 rounded-full bg-[rgb(var(--red))]/70" aria-hidden="true" />
              </div>

              <div className="mt-2 text-xs sm:text-sm text-white/70 leading-snug">{s.desc}</div>

              <button
                type="button"
                onClick={() => props.onOpenFlow?.(s.tab)}
                className="mt-3 w-full rounded-xl border border-white/12 bg-white/[0.07] px-3 py-2 text-xs sm:text-sm text-white/90 hover:bg-white/[0.12]"
              >
                {c.btn(s.tab)}
              </button>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-3 sm:p-4">
            <div className="text-sm font-semibold text-white/90">{c.exampleTitle}</div>

            <pre
              dir="auto"
              className="mt-3 whitespace-pre-wrap rounded-xl border border-white/10 bg-black/55 p-3 text-[12px] text-white/80 leading-relaxed"
            >
              {c.example}
            </pre>

            <div className="mt-2 text-[11px] text-white/55">{c.tip}</div>
          </div>
        </div>
      </div>
    </div>
  );
}