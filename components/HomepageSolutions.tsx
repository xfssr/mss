"use client";

import { useState } from "react";
import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";
import type { PackageDetail } from "@/lib/packageConfigStore";
import { Section } from "@/components/Section";
import {
  buildWaMeUrl,
  openWhatsApp,
  WHATSAPP_PHONE,
} from "@/utils/whatsapp";

function pick(lang: Lang, v: { he: string; en: string }) {
  const s = v?.[lang] ?? "";
  return s?.trim() ? s : v.he || v.en;
}

type SolutionBlock = {
  id: string;
  icon: string;
  title: { he: string; en: string };
  problem: { he: string; en: string };
  whatWeShoot: { he: string; en: string }[];
  result: { he: string; en: string };
  whatsappMessage: { he: string; en: string };
};

const SOLUTION_BLOCKS: SolutionBlock[] = [
  {
    id: "bars-nightlife",
    icon: "🍷",
    title: { he: "ברים ומועדונים", en: "Bars & Nightlife" },
    problem: {
      he: "בר בלי תוכן ויזואלי לא מושך קהל חדש",
      en: "A bar without visual content can't attract new customers",
    },
    whatWeShoot: [
      { he: "צילום קוקטיילים ואווירת בר", en: "Cocktail & bar atmosphere photography" },
      { he: "רילס מאחורי הבר", en: "Behind-the-bar reels" },
      { he: "אירועים ולילות מיוחדים", en: "Events & special nights" },
    ],
    result: {
      he: "תוכן מוכן לסושיאל שמביא לקוחות חדשים",
      en: "Social-ready content that brings new customers",
    },
    whatsappMessage: {
      he: "היי, אני מעוניין בחבילת תוכן לבר. פרטים?",
      en: "Hi, interested in content package for a bar. Details?",
    },
  },
  {
    id: "restaurants-food",
    icon: "🍽️",
    title: { he: "מסעדות ואוכל", en: "Restaurants & Food" },
    problem: {
      he: "תפריט בלי תמונות מקצועיות מפספס הזמנות",
      en: "A menu without professional photos misses orders",
    },
    whatWeShoot: [
      { he: "צילום מנות ואוכל", en: "Dish & food photography" },
      { he: "רילס UGC + דיטיילס סינמטי", en: "UGC reels + cinematic details" },
      { he: "אווירת מסעדה (פנים/חוץ)", en: "Restaurant atmosphere (indoor/outdoor)" },
    ],
    result: {
      he: "תמונות ורילס שמגדילים הזמנות",
      en: "Photos & reels that increase orders",
    },
    whatsappMessage: {
      he: "היי, אני מעוניין בחבילת תוכן למסעדה. פרטים?",
      en: "Hi, interested in content package for a restaurant. Details?",
    },
  },
  {
    id: "hotels",
    icon: "🏨",
    title: { he: "מלונות וצימרים", en: "Hotels & Accommodation" },
    problem: {
      he: "נכס בלי תמונות מקצועיות לא מקבל הזמנות",
      en: "A property without professional photos doesn't get bookings",
    },
    whatWeShoot: [
      { he: "צילום חדרים ושטחים משותפים", en: "Room & common area photography" },
      { he: "סרטון סיור וירטואלי", en: "Virtual tour video" },
      { he: "רילס אווירה", en: "Atmosphere reels" },
    ],
    result: {
      he: "תוכן שמגדיל הזמנות ומעלה מחירים",
      en: "Content that increases bookings and raises rates",
    },
    whatsappMessage: {
      he: "היי, אני מעוניין בחבילת צילום למלון/צימר. פרטים?",
      en: "Hi, interested in hotel/accommodation photography package. Details?",
    },
  },
  {
    id: "events",
    icon: "🎉",
    title: { he: "אירועים", en: "Events" },
    problem: {
      he: "אירוע בלי תיעוד מקצועי מפספס חשיפה",
      en: "An event without professional coverage misses exposure",
    },
    whatWeShoot: [
      { he: "צילום אירועים וחתונות", en: "Event & wedding photography" },
      { he: "רילס מאחורי הקלעים", en: "Behind-the-scenes reels" },
      { he: "סיכומי אירוע לסושיאל", en: "Event recap for social media" },
    ],
    result: {
      he: "תוכן לשיווק האירוע הבא",
      en: "Content for marketing the next event",
    },
    whatsappMessage: {
      he: "היי, אני מעוניין בצילום אירוע. פרטים?",
      en: "Hi, interested in event photography. Details?",
    },
  },
  {
    id: "real-estate",
    icon: "🏠",
    title: { he: "נדל״ן", en: "Real Estate" },
    problem: {
      he: "דירה בלי תמונות טובות נשארת ריקה",
      en: "An apartment without good photos stays empty",
    },
    whatWeShoot: [
      { he: "צילום מקצועי של הנכס", en: "Professional property photography" },
      { he: "סרטון סיור", en: "Tour video" },
      { he: "רילס לסושיאל", en: "Social media reels" },
    ],
    result: {
      he: "דירה מושכרת מהר יותר ובמחיר גבוה יותר",
      en: "Property rented faster and at a higher price",
    },
    whatsappMessage: {
      he: "היי, אני מעוניין בצילום דירה/נכס. פרטים?",
      en: "Hi, interested in property photography. Details?",
    },
  },
  {
    id: "small-services",
    icon: "⚡",
    title: { he: "עסקים קטנים ושירותים", en: "Small Businesses & Services" },
    problem: {
      he: "עסק חדש בלי נוכחות דיגיטלית לא מתפתח",
      en: "A new business without digital presence doesn't grow",
    },
    whatWeShoot: [
      { he: "צילום בסיסי לעסק", en: "Basic business photography" },
      { he: "רילס קצרים", en: "Short reels" },
      { he: "הקמת סושיאל", en: "Social media setup" },
    ],
    result: {
      he: "נוכחות מקצועית מהיום הראשון",
      en: "Professional presence from day one",
    },
    whatsappMessage: {
      he: "היי, אני צריך חבילת תוכן לעסק קטן. פרטים?",
      en: "Hi, I need a content package for a small business. Details?",
    },
  },
];

const PACKAGE_IDS = ["starter", "business", "monthly"] as const;

export function HomepageSolutions(props: {
  lang: Lang;
  packageDetails: PackageDetail[];
}) {
  const { lang, packageDetails } = props;
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function handleRequestPackage(solution: SolutionBlock, pkgTitle?: string) {
    const base = pick(lang, solution.whatsappMessage);
    const msg = pkgTitle ? `${base}\n${lang === "he" ? "חבילה" : "Package"}: ${pkgTitle}` : base;
    const url = buildWaMeUrl(WHATSAPP_PHONE, msg);
    openWhatsApp(url);
  }

  return (
    <Section id="solutions" title={t(lang, "sectionSolutions")}>
      <p className="text-sm text-white/70 mb-8 -mt-4">{t(lang, "solutionsIntro")}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {SOLUTION_BLOCKS.map((solution) => {
          const isExpanded = expandedId === solution.id;
          return (
            <div
              key={solution.id}
              className="cc-glass rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/25 hover:shadow-2xl"
            >
              <div className="p-5 sm:p-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl shrink-0">{solution.icon}</span>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {pick(lang, solution.title)}
                  </h3>
                </div>

                {/* Problem */}
                <p className="text-xs text-white/50 mb-2">
                  <span className="text-[rgb(var(--red))]/80 font-medium">{t(lang, "solutionProblem")}:</span>{" "}
                  {pick(lang, solution.problem)}
                </p>

                {/* What we shoot */}
                <div className="mb-2">
                  <p className="text-xs text-white/60 font-medium mb-1">{t(lang, "solutionWhatWeShoot")}:</p>
                  <ul className="space-y-0.5">
                    {solution.whatWeShoot.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-white/70">
                        <span className="text-[rgb(var(--red))] mt-0.5 shrink-0">•</span>
                        {pick(lang, item)}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Result */}
                <p className="text-xs text-white/50 mb-3">
                  <span className="text-green-400/80 font-medium">{t(lang, "solutionWhatYouGet")}:</span>{" "}
                  {pick(lang, solution.result)}
                </p>

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleRequestPackage(solution)}
                    className="inline-flex items-center justify-center rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-4 py-2 text-xs font-medium text-white hover:bg-[rgb(var(--red))]/35 hover:border-[rgb(var(--red))]/60 transition-all"
                  >
                    {t(lang, "solutionRequestPackage")}
                  </button>
                  {packageDetails.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : solution.id)}
                      className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-medium text-white/70 hover:bg-white/[0.10] hover:border-white/20 transition-all"
                    >
                      {isExpanded ? t(lang, "less") : t(lang, "solutionPackages")}
                    </button>
                  )}
                </div>
              </div>

              {/* Expanded packages inside the solution */}
              {isExpanded && packageDetails.length > 0 && (
                <div className="border-t border-white/10 px-5 sm:px-6 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
                  <h4 className="text-xs font-semibold text-[rgb(var(--red))] mb-2">
                    {t(lang, "solutionPackages")}
                  </h4>
                  {PACKAGE_IDS.map((pkgId) => {
                    const detail = packageDetails.find((d) => d.id === pkgId);
                    if (!detail) return null;
                    return (
                      <div
                        key={pkgId}
                        className="rounded-lg border border-white/10 bg-white/[0.03] p-3"
                      >
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div>
                            <span className="text-sm font-bold text-white">{pick(lang, detail.title)}</span>
                            {detail.priceFrom > 0 && (
                              <span className="text-xs text-white/50 ml-2">
                                {t(lang, "fromPrice")}₪{detail.priceFrom.toLocaleString()}
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRequestPackage(solution, pick(lang, detail.title))}
                            className="shrink-0 rounded-lg border border-[rgb(var(--red))]/30 bg-[rgb(var(--red))]/10 px-3 py-1 text-[11px] font-medium text-white hover:bg-[rgb(var(--red))]/25 transition-all"
                          >
                            {t(lang, "solutionRequestPackage")}
                          </button>
                        </div>
                        <p className="text-[11px] text-white/50 mt-1">
                          <span className="text-white/60 font-medium">{t(lang, "solutionBestFor")}:</span>{" "}
                          {pick(lang, detail.bestFor)}
                        </p>
                        {detail.pills.length > 0 && (
                          <div className="mt-1.5 flex flex-wrap gap-1">
                            {detail.pills.slice(0, 4).map((pill, i) => (
                              <span
                                key={i}
                                className="text-[10px] rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-white/55"
                              >
                                {pick(lang, pill)}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
