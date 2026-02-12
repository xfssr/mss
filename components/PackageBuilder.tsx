"use client";

import { useMemo, useState } from "react";
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

type FolderCard = {
  id: string;
  titleHe: string;
  titleEn: string;
  descHe: string;
  descEn: string;
  icon: string;
  badge?: "popular" | "monthly" | "smm";
  draft: Partial<PackageDraft>;
};

const FOLDER_CARDS: FolderCard[] = [
  {
    id: "starter",
    titleHe: "Starter",
    titleEn: "Starter",
    descHe: "4 שעות · 6 רילס · 20 תמונות",
    descEn: "4h · 6 reels · 20 photos",
    icon: "📁",
    badge: "popular",
    draft: { monthlyPlan: "none", duration: "4h", reels: 6, photos: 20, socialManagement: false, targetingSetup: false },
  },
  {
    id: "growth",
    titleHe: "Growth",
    titleEn: "Growth",
    descHe: "יום מלא · 10 רילס · 120 תמונות",
    descEn: "Full day · 10 reels · 120 photos",
    icon: "��",
    badge: "popular",
    draft: { monthlyPlan: "none", duration: "day", reels: 10, photos: 120, socialManagement: false, targetingSetup: false },
  },
  {
    id: "pro",
    titleHe: "Pro",
    titleEn: "Pro",
    descHe: "מנוי חודשי + ניהול סושיאל",
    descEn: "Monthly plan + social mgmt",
    icon: "🗂️",
    badge: "smm",
    draft: { monthlyPlan: "pro", duration: "day", reels: 0, photos: 0, socialManagement: true, targetingSetup: true },
  },
];

function isFolderActive(current: PackageDraft, f: FolderCard) {
  const d = f.draft;
  const keys: Array<keyof PackageDraft> = ["monthlyPlan", "duration", "reels", "photos", "socialManagement", "targetingSetup"];
  return keys.every((k) => (d[k] === undefined ? true : current[k] === d[k]));
}

function isCustomMode(current: PackageDraft) {
  return !FOLDER_CARDS.some((f) => isFolderActive(current, f));
}

function badgeLabel(lang: Lang, b?: FolderCard["badge"]) {
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
  const [showCustom, setShowCustom] = useState(() => isCustomMode(d));

  const customActive = showCustom || isCustomMode(d);

  function selectFolder(f: FolderCard) {
    setShowCustom(false);
    props.onChange({ ...d, ...f.draft });
  }

  function activateCustom() {
    setShowCustom(true);
  }

  return (
    <div className="space-y-4">
      {/* Folder cards */}
      <div className="cc-glass bg-white/[0.06] border border-white/10 rounded-2xl p-3 sm:p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-medium text-white/90">
            {props.lang === "he" ? "בחר חבילה" : "Choose a package"}
          </div>
          <div className="text-xs text-white/55">
            {props.lang === "he" ? "לחץ על תיקייה כדי להתחיל" : "Tap a folder to start"}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {FOLDER_CARDS.map((f) => {
            const active = !customActive && isFolderActive(d, f);
            const badge = badgeLabel(props.lang, f.badge);
            const folderCalc = calcPackage(props.lang, { ...d, ...f.draft }, props.pricing);

            return (
              <button
                key={f.id}
                type="button"
                onClick={() => selectFolder(f)}
                className={[
                  "relative text-left rounded-2xl border overflow-hidden",
                  "bg-black/20 hover:bg-white/[0.06] transition",
                  active ? "border-[rgb(var(--red))]/50 shadow-lg" : "border-white/10 hover:border-white/20",
                ].join(" ")}
              >
                <div className="p-3 sm:p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-lg" aria-hidden="true">{f.icon}</div>
                      <div className="mt-1 text-sm font-semibold text-white/90 truncate">
                        {props.lang === "he" ? f.titleHe : f.titleEn}
                      </div>
                      <div className="mt-1 text-[11px] text-white/55 leading-snug">
                        {props.lang === "he" ? f.descHe : f.descEn}
                      </div>
                    </div>
                    {badge ? (
                      <div className={[
                        "shrink-0 rounded-full px-1.5 py-0.5 text-[9px] border",
                        active ? "border-[rgb(var(--red))]/35 bg-[rgb(var(--red))]/15 text-white" : "border-white/12 bg-white/[0.05] text-white/70",
                      ].join(" ")}>
                        {badge}
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-2 text-xs font-semibold text-white/80">
                    {folderCalc.currency}{folderCalc.total}
                  </div>
                </div>
              </button>
            );
          })}

          {/* Custom card */}
          <button
            type="button"
            onClick={activateCustom}
            className={[
              "relative text-left rounded-2xl border overflow-hidden",
              "bg-black/20 hover:bg-white/[0.06] transition",
              customActive ? "border-[rgb(var(--blue))]/50 shadow-lg" : "border-white/10 hover:border-white/20",
            ].join(" ")}
          >
            <div className="p-3 sm:p-4">
              <div className="text-lg" aria-hidden="true">⚙️</div>
              <div className="mt-1 text-sm font-semibold text-white/90">
                {t(props.lang, "customPresetTitle")}
              </div>
              <div className="mt-1 text-[11px] text-white/55 leading-snug">
                {t(props.lang, "customPresetDesc")}
              </div>
              <div className="mt-2 text-xs font-semibold text-white/80">
                {customActive ? `${calc.currency}${calc.total}` : "—"}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Detailed controls - only for Custom */}
      {customActive ? (
        <div className="cc-glass bg-black/35 rounded-2xl p-4">
          <div className="text-sm font-medium text-white/90">{props.lang === "he" ? "התאמה אישית" : "Customize"}</div>

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
      ) : null}

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
