"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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

/* ─── types ─── */
type DbCaseStudy = {
  id: string;
  category: string;
  videoUrl: string;
  titleEn: string;
  titleHe: string;
  tagsEn: string;
  tagsHe: string;
  views: string;
  avgWatch: string;
  fullWatch: string;
  followers: string;
  forYou: string | null;
  insightEn: string;
  insightHe: string;
  servicesEn: string;
  servicesHe: string;
  thumbnailUrl: string;
};

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
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

/* ─── component ─── */
export function CaseStudiesSection({ lang }: { lang: Lang }) {
  const [selected, setSelected] = useState<FilterKey>("all");
  const [cases, setCases] = useState<DbCaseStudy[]>([]);
  const tx = L[lang];
  const isRtl = lang === "he";

  useEffect(() => {
    fetch("/api/case-studies")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: DbCaseStudy[]) => setCases(data))
      .catch((err) => { console.error("Failed to load case studies:", err); });
  }, []);

  const filtered =
    selected === "all"
      ? cases
      : cases.filter((c) => c.category === selected);

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
              {/* cinematic preview */}
              <a
                href={cs.videoUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${tx.cta} — ${lang === "he" ? cs.titleHe : cs.titleEn}`}
                className="relative block aspect-video rounded-2xl overflow-hidden border border-white/10"
              >
                {/* blurred background */}
                {cs.thumbnailUrl && (
                  <Image
                    src={cs.thumbnailUrl}
                    alt=""
                    fill
                    className="object-cover blur-xl scale-110 opacity-55"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
                {/* centered phone frame */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative aspect-[9/16] h-[85%] rounded-2xl border border-white/15 shadow-lg overflow-hidden">
                    {cs.thumbnailUrl && (
                      <Image
                        src={cs.thumbnailUrl}
                        alt={lang === "he" ? cs.titleHe : cs.titleEn}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                    )}
                  </div>
                </div>
                {/* play button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex items-center justify-center w-11 h-11 rounded-full bg-black/55 border border-white/20 text-white/90">
                    <IconPlay />
                  </div>
                </div>
                {/* For You badge */}
                {cs.forYou && (
                  <div className="absolute top-3 end-3 rounded-full bg-green-500/20 border border-green-400/30 px-2.5 py-0.5 text-[10px] font-medium text-green-400 backdrop-blur-sm">
                    {tx.forYouBadge} {cs.forYou}
                  </div>
                )}
              </a>

              {/* content */}
              <div className="p-5">
                {/* title + tags */}
                <h3 className="text-sm font-bold text-white/90">
                  {lang === "he" ? cs.titleHe : cs.titleEn}
                </h3>
                <p className="mt-1 text-[11px] text-white/40">{lang === "he" ? cs.tagsHe : cs.tagsEn}</p>

                {/* metrics 2×2 grid */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <MetricCell icon={<IconEye />} label={tx.views} value={cs.views} />
                  <MetricCell icon={<IconClock />} label={tx.avgWatch} value={cs.avgWatch} />
                  <MetricCell icon={<IconTarget />} label={tx.fullWatch} value={cs.fullWatch} />
                  <MetricCell icon={<IconUsers />} label={tx.followers} value={cs.followers} />
                </div>

                {/* insight */}
                <p className="mt-4 text-xs text-white/50 italic border-s-2 border-[rgb(var(--blue))]/30 ps-3">
                  {lang === "he" ? cs.insightHe : cs.insightEn}
                </p>

                {/* services */}
                <p className="mt-2 text-[10px] text-white/35">
                  {lang === "he" ? cs.servicesHe : cs.servicesEn}
                </p>

                {/* CTA */}
                <a
                  href={cs.videoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${tx.cta} — ${lang === "he" ? cs.titleHe : cs.titleEn}`}
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
