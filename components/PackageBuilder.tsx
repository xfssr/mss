"use client";

import { useMemo } from "react";
import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";
import type { PricingConfig } from "@/types/pricing";
import type { MonthlyPlan, PackageDraft, ShootDuration } from "@/utils/packageCalculator";
import { calcPackage } from "@/utils/packageCalculator";

const DURATIONS: Array<{ key: ShootDuration; labelHe: string; labelEn: string }> = [
  { key: "2h", labelHe: "2 שעות", labelEn: "2h" },
  { key: "4h", labelHe: "4 שעות", labelEn: "4h" },
  { key: "8h", labelHe: "8 שעות", labelEn: "8h" },
  { key: "day", labelHe: "יום", labelEn: "Day" },
  { key: "week", labelHe: "שבוע", labelEn: "Week" },
];

const MONTHLY: Array<{ key: MonthlyPlan; labelHe: string; labelEn: string }> = [
  { key: "none", labelHe: "ללא", labelEn: "none" },
  { key: "starter", labelHe: "Starter (15 reels + posts/stories)", labelEn: "Starter (15 reels + posts/stories)" },
  { key: "growth", labelHe: "Growth (25 reels + posts/stories)", labelEn: "Growth (25 reels + posts/stories)" },
  { key: "pro", labelHe: "Pro (40 reels + posts/stories)", labelEn: "Pro (40 reels + posts/stories)" },
];

type Preset = {
  id: string;
  titleHe: string;
  titleEn: string;
  descHe: string;
  descEn: string;
  badge?: "popular" | "monthly" | "smm";
  draft: Partial<PackageDraft>;
};

const PRESETS: Preset[] = [
  {
    id: "reels-4h",
    titleHe: "רילס מהיר",
    titleEn: "Quick Reels",
    descHe: "4 שעות · 6 רילס · 20 תמונות",
    descEn: "4h · 6 reels · 20 photos",
    badge: "popular",
    draft: { monthlyPlan: "none", duration: "4h", reels: 6, photos: 20, socialManagement: false, targetingSetup: false },
  },
  {
    id: "photos-2h",
    titleHe: "תמונות בלבד",
    titleEn: "Photos Only",
    descHe: "2 שעות · 0 רילס · 60 תמונות",
    descEn: "2h · 0 reels · 60 photos",
    draft: { monthlyPlan: "none", duration: "2h", reels: 0, photos: 60, socialManagement: false, targetingSetup: false },
  },
  {
    id: "full-day",
    titleHe: "יום מלא",
    titleEn: "Full Day",
    descHe: "יום · 10 רילס · 120 תמונות",
    descEn: "Day · 10 reels · 120 photos",
    badge: "popular",
    draft: { monthlyPlan: "none", duration: "day", reels: 10, photos: 120, socialManagement: false, targetingSetup: false },
  },
  {
    id: "monthly-starter",
    titleHe: "מנוי Starter",
    titleEn: "Monthly Starter",
    descHe: "15 רילס + פוסטים/סטוריז",
    descEn: "15 reels + posts/stories",
    badge: "monthly",
    draft: { monthlyPlan: "starter", duration: "day", reels: 0, photos: 0, socialManagement: false, targetingSetup: false },
  },
  {
    id: "monthly-growth",
    titleHe: "מנוי Growth",
    titleEn: "Monthly Growth",
    descHe: "25 רילס + פוסטים/סטוריז",
    descEn: "25 reels + posts/stories",
    badge: "monthly",
    draft: { monthlyPlan: "growth", duration: "day", reels: 0, photos: 0, socialManagement: false, targetingSetup: false },
  },
  {
    id: "monthly-pro-smm",
    titleHe: "Pro + ניהול סושיאל",
    titleEn: "Pro + Social Mgmt",
    descHe: "40 רילס + ניהול מלא",
    descEn: "40 reels + full mgmt",
    badge: "smm",
    draft: { monthlyPlan: "pro", duration: "day", reels: 0, photos: 0, socialManagement: true, targetingSetup: true },
  },
];

function isPresetActive(current: PackageDraft, p: Preset) {
  const d = p.draft;
  const keys: Array<keyof PackageDraft> = [
    "monthlyPlan",
    "duration",
    "reels",
    "photos",
    "socialManagement",
    "targetingSetup",
  ];
  return keys.every((k) => (d[k] === undefined ? true : current[k] === d[k]));
}

function badgeLabel(lang: Lang, b?: Preset["badge"]) {
  if (!b) return "";
  if (b === "popular") return lang === "he" ? "פופולרי" : "Popular";
  if (b === "monthly") return lang === "he" ? "מנוי" : "Monthly";
  if (b === "smm") return lang === "he" ? "סושיאל" : "Social";
  return "";
}

export function PackageBuilder(props: {
  lang: Lang;
  pricing: PricingConfig;
  value: PackageDraft;
  onChange: (v: PackageDraft) => void;
  onApply: (summaryLines: string[]) => void;
}) {
  const d = props.value;
  const calc = useMemo(() => calcPackage(props.lang, d, props.pricing), [d, props.lang, props.pricing]);

  return (
    <div className="space-y-4">
      {/* Presets as “folders” */}
      <div className="cc-glass bg-white/[0.06] border border-white/10 rounded-2xl p-3 sm:p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-medium text-white/90">
            {props.lang === "he" ? "בחר חבילה" : "Choose a package"}
          </div>
          <div className="text-xs text-white/55">
            {props.lang === "he" ? "לחץ על “תיקייה” כדי להתחיל" : "Tap a “folder” to start"}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PRESETS.map((p) => {
            const active = isPresetActive(d, p);
            const badge = badgeLabel(props.lang, p.badge);

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => props.onChange({ ...d, ...p.draft })}
                className={[
                  "relative text-left rounded-2xl border overflow-hidden",
                  "bg-black/20 hover:bg-white/[0.06] transition",
                  active ? "border-[rgb(var(--red))]/50" : "border-white/10 hover:border-white/20",
                ].join(" ")}
              >
                {/* folder tab */}
                <div
                  className={[
                    "absolute -top-2 left-4 h-3 w-12 rounded-t-lg border",
                    active ? "border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/15" : "border-white/12 bg-white/[0.06]",
                  ].join(" ")}
                />

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white/90 truncate">
                        {props.lang === "he" ? p.titleHe : p.titleEn}
                      </div>
                      <div className="mt-1 text-xs text-white/60">
                        {props.lang === "he" ? p.descHe : p.descEn}
                      </div>
                    </div>

                    {badge ? (
                      <div
                        className={[
                          "shrink-0 rounded-full px-2 py-1 text-[10px] border",
                          active
                            ? "border-[rgb(var(--red))]/35 bg-[rgb(var(--red))]/15 text-white"
                            : "border-white/12 bg-white/[0.05] text-white/80",
                        ].join(" ")}
                      >
                        {badge}
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-xs text-white/55">{props.lang === "he" ? "מחיר משוער" : "Estimated"}</div>
                    <div className="text-sm font-semibold text-white">
                      {calc.currency}
                      {active ? calc.total : "—"}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Customize */}
      <div className="cc-glass bg-black/35 rounded-2xl p-4">
        <div className="text-sm font-medium text-white/90">{props.lang === "he" ? "התאמה אישית (אופציונלי)" : "Customize (optional)"}</div>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs text-white/55">{props.lang === "he" ? "מנוי חודשי" : "Monthly plan"}</span>
            <select
              value={d.monthlyPlan}
              onChange={(e) => props.onChange({ ...d, monthlyPlan: e.target.value as MonthlyPlan })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-[rgb(var(--blue))]"
            >
              {MONTHLY.map((x) => (
                <option key={x.key} value={x.key}>
                  {props.lang === "he" ? x.labelHe : x.labelEn}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-xs text-white/55">{props.lang === "he" ? "משך צילום" : "Shoot duration"}</span>
            <select
              value={d.duration}
              onChange={(e) => props.onChange({ ...d, duration: e.target.value as ShootDuration })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-[rgb(var(--blue))]"
              disabled={d.monthlyPlan !== "none"}
            >
              {DURATIONS.map((x) => (
                <option key={x.key} value={x.key}>
                  {props.lang === "he" ? x.labelHe : x.labelEn}
                </option>
              ))}
            </select>
            {d.monthlyPlan !== "none" ? (
              <div className="mt-1 text-[11px] text-white/45">{props.lang === "he" ? "במנוי — משך כלול." : "Included in monthly plan."}</div>
            ) : null}
          </label>

          <label className="block">
            <span className="text-xs text-white/55">Reels</span>
            <input
              type="number"
              min={0}
              max={100}
              value={d.reels}
              onChange={(e) => props.onChange({ ...d, reels: Number(e.target.value || 0) })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-[rgb(var(--blue))]"
              disabled={d.monthlyPlan !== "none"}
            />
          </label>

          <label className="block">
            <span className="text-xs text-white/55">{props.lang === "he" ? "תמונות" : "Photos"}</span>
            <input
              type="number"
              min={0}
              max={500}
              value={d.photos}
              onChange={(e) => props.onChange({ ...d, photos: Number(e.target.value || 0) })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-[rgb(var(--blue))]"
              disabled={d.monthlyPlan !== "none"}
            />
          </label>

          <label className="block sm:col-span-2">
            <div className="mt-2 flex items-center gap-3">
              <input
                id="smm"
                type="checkbox"
                checked={d.socialManagement}
                onChange={(e) => props.onChange({ ...d, socialManagement: e.target.checked })}
                className="h-4 w-4"
              />
              <label htmlFor="smm" className="text-sm text-white/70">
                {props.lang === "he" ? "ניהול סושיאל מלא (פוסטים/סטוריז/תכנית)" : "Full social management (posting/stories/plan)"}
              </label>
            </div>

            <div className="mt-2 flex items-center gap-3">
              <input
                id="ads"
                type="checkbox"
                checked={d.targetingSetup}
                onChange={(e) => props.onChange({ ...d, targetingSetup: e.target.checked })}
                className="h-4 w-4"
              />
              <label htmlFor="ads" className="text-sm text-white/70">
                {props.lang === "he" ? "הגדרת טרגוט (Meta Ads) — ללא תקציב" : "Ads targeting setup (Meta) — excluding ad budget"}
              </label>
            </div>
          </label>
        </div>
      </div>

      {/* Calculator */}
      <div className="cc-glass bg-black/35 rounded-2xl p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-medium text-white/90">{t(props.lang, "packageCalcTitle")}</div>
          <div className="text-sm font-semibold text-white">
            {calc.currency}
            {calc.total}
          </div>
        </div>

        <div className="mt-3 space-y-2 text-sm text-white/70">
          {calc.lines.map((x) => (
            <div key={x.label} className="flex items-start justify-between gap-3">
              <div className="text-white/70">{x.label}</div>
              <div className="text-white/90">
                {calc.currency}
                {x.amount}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={() => props.onApply(calc.summaryLines)}
            className="w-full rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-4 py-3 text-sm text-white hover:bg-[rgb(var(--red))]/30"
          >
            {t(props.lang, "packageApply")}
          </button>
        </div>
      </div>
    </div>
  );
}
