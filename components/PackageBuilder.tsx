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
      <div className="cc-glass rounded-2xl p-4">
        <div className="text-sm font-medium text-white/90">{t(props.lang, "packageBuildTitle")}</div>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs text-white/55">{props.lang === "he" ? "מנוי חודשי" : "Monthly plan"}</span>
            <select
              value={d.monthlyPlan}
              onChange={(e) => props.onChange({ ...d, monthlyPlan: e.target.value as MonthlyPlan })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-[rgb(var(--blue))]"
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
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-[rgb(var(--blue))]"
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
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-[rgb(var(--blue))]"
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
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-[rgb(var(--blue))]"
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

      <div className="cc-glass rounded-2xl p-4">
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
