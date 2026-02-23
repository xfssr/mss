"use client";

import { useState } from "react";
import type { Lang } from "@/utils/i18n";

/* ─── local translations ─── */
const L = {
  en: {
    title: "Case Studies — Real Performance",
    subtitle: "Authentic UGC content. Measurable business impact.",
    desc: "Videos that made people stop scrolling.",
    cta: "Watch on TikTok",
    views: "VIEWS",
    avgWatch: "AVG WATCH",
    fullWatch: "FULL WATCH",
    followers: "NEW FOLLOWERS",
    forYouBadge: "For You",
    insightLabel: "Insight",
    servicesLabel: "Services",
    filters: {
      all: "All",
      food: "Food",
      restaurant: "Restaurant",
      street: "Street",
      kitchen: "Kitchen POV",
      bar: "Bar",
    },
  },
  he: {
    title: "תיקי עבודות — ביצועים אמיתיים",
    subtitle: "תוכן UGC אותנטי. השפעה מדידה לעסק.",
    desc: "סרטונים שגרמו לאנשים לעצור.",
    cta: "צפה בטיקטוק",
    views: "צפיות",
    avgWatch: "זמן צפייה ממוצע",
    fullWatch: "אחוז צפייה מלאה",
    followers: "עוקבים חדשים",
    forYouBadge: "For You",
    insightLabel: "תובנה",
    servicesLabel: "שירותים",
    filters: {
      all: "הכל",
      food: "אוכל",
      restaurant: "מסעדה",
      street: "רחוב",
      kitchen: "מטבח POV",
      bar: "בר",
    },
  },
} as const;

/* ─── data ─── */
type CaseStudy = {
  id: string;
  category: "food" | "restaurant" | "street" | "kitchen" | "bar";
  title: { en: string; he: string };
  tags: { en: string; he: string };
  videoUrl: string;
  thumbnail: string;
  metrics: {
    views: string;
    avgWatch: string;
    fullWatch: string;
    followers: string;
    forYou?: string;
  };
  insight: { en: string; he: string };
  services: { en: string; he: string };
};

const caseStudies: CaseStudy[] = [
  {
    id: "cs-1",
    category: "street",
    title: { en: "Street Food — Viral Reach", he: "אוכל רחוב — חשיפה ויראלית" },
    tags: { en: "UGC • Street • TikTok", he: "UGC • רחוב • טיקטוק" },
    videoUrl: "https://www.tiktok.com/@emilnisenblatt/video/7368112073059978497",
    thumbnail: "/images/case-placeholder.webp",
    metrics: { views: "244K", avgWatch: "32.5s", fullWatch: "12.8%", followers: "+624" },
    insight: { en: "High reach driven by organic street food appeal", he: "חשיפה גבוהה בזכות תוכן אוכל רחוב אותנטי" },
    services: { en: "Concept • Filming • Editing • Captions", he: "קונספט • צילום • עריכה • כתוביות" },
  },
  {
    id: "cs-2",
    category: "restaurant",
    title: { en: "Restaurant Spotlight — Strong Retention", he: "מסעדה בזרקור — ריטנשן חזק" },
    tags: { en: "UGC • Backstage • TikTok", he: "UGC • מאחורי הקלעים • טיקטוק" },
    videoUrl: "https://www.tiktok.com/@emilnisenblatt/video/7437403806054370568",
    thumbnail: "/images/case-placeholder.webp",
    metrics: { views: "49K", avgWatch: "12.99s", fullWatch: "23.1%", followers: "+31", forYou: "87.2%" },
    insight: { en: "For You page drove 87% of views — proof of algorithmic fit", he: "87% מהצפיות הגיעו מדף ה-For You — התאמה אלגוריתמית מוכחת" },
    services: { en: "Concept • Filming • Editing • Captions", he: "קונספט • צילום • עריכה • כתוביות" },
  },
  {
    id: "cs-3",
    category: "food",
    title: { en: "Food Close-Up — Appetite Appeal", he: "צילום אוכל — משיכה חזותית" },
    tags: { en: "UGC • POV • TikTok", he: "UGC • POV • טיקטוק" },
    videoUrl: "https://www.tiktok.com/@emilnisenblatt/video/7367327238452382993",
    thumbnail: "/images/case-placeholder.webp",
    metrics: { views: "—", avgWatch: "—", fullWatch: "—", followers: "—" },
    insight: { en: "Close-up food visuals drive emotional engagement", he: "צילומי תקריב של אוכל מעוררים מעורבות רגשית" },
    services: { en: "Concept • Filming • Editing • Captions", he: "קונספט • צילום • עריכה • כתוביות" },
  },
  {
    id: "cs-4",
    category: "kitchen",
    title: { en: "Kitchen POV — Fast Retention", he: "מטבח POV — ריטנשן גבוה" },
    tags: { en: "UGC • POV • TikTok", he: "UGC • POV • טיקטוק" },
    videoUrl: "https://www.tiktok.com/@emilnisenblatt/video/7367299135583669505",
    thumbnail: "/images/case-placeholder.webp",
    metrics: { views: "—", avgWatch: "—", fullWatch: "—", followers: "—" },
    insight: { en: "Behind-the-scenes kitchen content keeps viewers watching", he: "תוכן מאחורי הקלעים מהמטבח שומר על הצופים" },
    services: { en: "Concept • Filming • Editing • Captions", he: "קונספט • צילום • עריכה • כתוביות" },
  },
  {
    id: "cs-5",
    category: "bar",
    title: { en: "Bar Vibes — Night Energy", he: "אווירת בר — אנרגיה לילית" },
    tags: { en: "UGC • Nightlife • TikTok", he: "UGC • חיי לילה • טיקטוק" },
    videoUrl: "https://www.tiktok.com/@emilnisenblatt/video/7453474459144523026",
    thumbnail: "/images/case-placeholder.webp",
    metrics: { views: "—", avgWatch: "—", fullWatch: "—", followers: "—" },
    insight: { en: "Nightlife energy captured to attract younger audiences", he: "אנרגיית חיי לילה שמושכת קהל צעיר" },
    services: { en: "Concept • Filming • Editing • Captions", he: "קונספט • צילום • עריכה • כתוביות" },
  },
  {
    id: "cs-6",
    category: "restaurant",
    title: { en: "Fine Dining — Premium Feel", he: "מסעדה — תחושת פרימיום" },
    tags: { en: "UGC • Cinematic • TikTok", he: "UGC • קולנועי • טיקטוק" },
    videoUrl: "https://www.tiktok.com/@emilnisenblatt/video/7466110123199581458",
    thumbnail: "/images/case-placeholder.webp",
    metrics: { views: "—", avgWatch: "—", fullWatch: "—", followers: "—" },
    insight: { en: "Cinematic framing elevates brand positioning", he: "מסגור קולנועי מעלה את מיצוב המותג" },
    services: { en: "Concept • Filming • Editing • Captions", he: "קונספט • צילום • עריכה • כתוביות" },
  },
  {
    id: "cs-7",
    category: "street",
    title: { en: "Street Food — High Reach", he: "אוכל רחוב — חשיפה גבוהה" },
    tags: { en: "UGC • Street • TikTok", he: "UGC • רחוב • טיקטוק" },
    videoUrl: "https://www.tiktok.com/@emilnisenblatt/video/7569940567610658066",
    thumbnail: "/images/case-placeholder.webp",
    metrics: { views: "—", avgWatch: "—", fullWatch: "—", followers: "—" },
    insight: { en: "Authentic street food content performs well organically", he: "תוכן אוכל רחוב אותנטי עובד מצוין אורגנית" },
    services: { en: "Concept • Filming • Editing • Captions", he: "קונספט • צילום • עריכה • כתוביות" },
  },
  {
    id: "cs-8",
    category: "food",
    title: { en: "Food Styling — Visual Impact", he: "סטיילינג אוכל — אימפקט חזותי" },
    tags: { en: "UGC • Styling • TikTok", he: "UGC • סטיילינג • טיקטוק" },
    videoUrl: "https://www.tiktok.com/@emilnisenblatt/video/7287123791048625426",
    thumbnail: "/images/case-placeholder.webp",
    metrics: { views: "—", avgWatch: "—", fullWatch: "—", followers: "—" },
    insight: { en: "Styled food content drives saves and shares", he: "תוכן אוכל מעוצב מניע שמירות ושיתופים" },
    services: { en: "Concept • Filming • Editing • Captions", he: "קונספט • צילום • עריכה • כתוביות" },
  },
  {
    id: "cs-9",
    category: "kitchen",
    title: { en: "Kitchen Action — Behind the Scenes", he: "מטבח בפעולה — מאחורי הקלעים" },
    tags: { en: "UGC • Backstage • TikTok", he: "UGC • מאחורי הקלעים • טיקטוק" },
    videoUrl: "https://www.tiktok.com/@emilnisenblatt/video/7451286146975370503",
    thumbnail: "/images/case-placeholder.webp",
    metrics: { views: "—", avgWatch: "—", fullWatch: "—", followers: "—" },
    insight: { en: "Raw kitchen footage builds trust and authenticity", he: "צילומי מטבח גולמיים בונים אמון ואותנטיות" },
    services: { en: "Concept • Filming • Editing • Captions", he: "קונספט • צילום • עריכה • כתוביות" },
  },
];

const FILTER_KEYS = ["all", "food", "restaurant", "street", "kitchen", "bar"] as const;
type FilterKey = (typeof FILTER_KEYS)[number];

/* ─── icons (inline SVG to avoid dependencies) ─── */
function IconEye() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function IconTarget() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconPlay() {
  return (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

/* ─── component ─── */
export function CaseStudiesSection({ lang }: { lang: Lang }) {
  const [selected, setSelected] = useState<FilterKey>("all");
  const tx = L[lang];
  const isRtl = lang === "he";

  const filtered =
    selected === "all"
      ? caseStudies
      : caseStudies.filter((c) => c.category === selected);

  return (
    <section
      id="case-studies"
      dir={isRtl ? "rtl" : "ltr"}
      className="scroll-mt-24 px-4 sm:px-6 lg:px-8 py-20 sm:py-28 section-gradient-overlay"
    >
      <div className="relative mx-auto w-full max-w-6xl">
        {/* header */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[rgb(var(--blue))] tracking-tight">
          {tx.title}
        </h2>
        <p className="mt-3 text-base sm:text-lg text-white/75">{tx.subtitle}</p>
        <p className="mt-1 text-sm text-white/50">{tx.desc}</p>

        {/* filter chips */}
        <div className="mt-8 flex flex-wrap gap-2">
          {FILTER_KEYS.map((key) => {
            const active = selected === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelected(key)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 border ${
                  active
                    ? "border-[rgb(var(--blue))]/60 bg-[rgb(var(--blue))]/20 text-white"
                    : "border-white/10 bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:border-white/20"
                }`}
              >
                {tx.filters[key]}
              </button>
            );
          })}
        </div>

        {/* cards grid */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((cs) => (
            <div
              key={cs.id}
              className="group relative rounded-2xl border border-white/10 bg-[rgba(11,15,20,0.55)] backdrop-blur-xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-white/20 hover:shadow-2xl"
            >
              {/* video preview (9:16 frame) */}
              <div className="relative aspect-[9/16] max-h-[280px] bg-gradient-to-b from-white/[0.03] to-transparent overflow-hidden" aria-hidden="true">
                <div className="absolute inset-0 flex items-center justify-center text-white/30 group-hover:text-white/60 transition-colors duration-300">
                  <div className="rounded-full bg-white/10 p-3 backdrop-blur-sm border border-white/10 group-hover:bg-white/20 transition-all duration-300">
                    <IconPlay />
                  </div>
                </div>
                {/* For You badge */}
                {cs.metrics.forYou && (
                  <div className="absolute top-3 end-3 rounded-full bg-green-500/20 border border-green-400/30 px-2.5 py-0.5 text-[10px] font-medium text-green-400 backdrop-blur-sm">
                    {tx.forYouBadge} {cs.metrics.forYou}
                  </div>
                )}
              </div>

              {/* content */}
              <div className="p-5">
                {/* title + tags */}
                <h3 className="text-sm font-bold text-white/90">
                  {cs.title[lang]}
                </h3>
                <p className="mt-1 text-[11px] text-white/40">{cs.tags[lang]}</p>

                {/* metrics 2×2 grid */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <MetricCell icon={<IconEye />} label={tx.views} value={cs.metrics.views} />
                  <MetricCell icon={<IconClock />} label={tx.avgWatch} value={cs.metrics.avgWatch} />
                  <MetricCell icon={<IconTarget />} label={tx.fullWatch} value={cs.metrics.fullWatch} />
                  <MetricCell icon={<IconUsers />} label={tx.followers} value={cs.metrics.followers} />
                </div>

                {/* insight */}
                <p className="mt-4 text-xs text-white/50 italic border-s-2 border-[rgb(var(--blue))]/30 ps-3">
                  {cs.insight[lang]}
                </p>

                {/* services */}
                <p className="mt-2 text-[10px] text-white/35">
                  {cs.services[lang]}
                </p>

                {/* CTA */}
                <a
                  href={cs.videoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${tx.cta} — ${cs.title[lang]}`}
                  className="mt-4 inline-flex items-center justify-center rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-5 py-2.5 text-sm font-medium text-white hover:bg-[rgb(var(--red))]/35 hover:border-[rgb(var(--red))]/60 transition-all duration-200 w-full"
                >
                  {tx.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── metric cell sub-component ─── */
function MetricCell({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-white/40">
        {icon}
        <span className="text-[9px] uppercase tracking-wider">{label}</span>
      </div>
      <div className="mt-1 text-sm font-bold text-white/85">{value}</div>
    </div>
  );
}
