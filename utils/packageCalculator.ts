import type { Lang } from "@/utils/i18n";
import type { PricingConfig } from "@/types/pricing";

export type ShootDuration = "2h" | "4h" | "8h" | "day" | "week";
export type MonthlyPlan = "none" | "starter" | "growth" | "pro";

export type PackageDraft = {
  duration: ShootDuration;
  reels: number;
  photos: number;
  monthlyPlan: MonthlyPlan;
  socialManagement: boolean;
  targetingSetup: boolean;
};

export const DEFAULT_PACKAGE: PackageDraft = {
  duration: "4h",
  reels: 3,
  photos: 20,
  monthlyPlan: "none",
  socialManagement: false,
  targetingSetup: false,
};

export const STORAGE_KEY_PACKAGE = "cc_package_v2";

type Line = { label: string; amount: number };

function durationLabel(lang: Lang, d: ShootDuration) {
  const he: Record<ShootDuration, string> = { "2h": "2 שעות", "4h": "4 שעות", "8h": "8 שעות", day: "יום", week: "שבוע" };
  const en: Record<ShootDuration, string> = { "2h": "2h", "4h": "4h", "8h": "8h", day: "Day", week: "Week" };
  return lang === "he" ? he[d] : en[d];
}

function monthlyLabel(lang: Lang, m: MonthlyPlan) {
  const he: Record<MonthlyPlan, string> = { none: "ללא", starter: "Starter", growth: "Growth", pro: "Pro" };
  const en: Record<MonthlyPlan, string> = { none: "none", starter: "Starter", growth: "Growth", pro: "Pro" };
  return lang === "he" ? he[m] : en[m];
}

export function calcPackage(lang: Lang, d: PackageDraft, pricing: PricingConfig) {
  const lines: Line[] = [];
  const cur = "₪";

  const add = (label: string, amount: number) => lines.push({ label, amount });

  if (d.monthlyPlan !== "none") {
    const mPrice =
      d.monthlyPlan === "starter"
        ? pricing.monthlyStarter
        : d.monthlyPlan === "growth"
          ? pricing.monthlyGrowth
          : pricing.monthlyPro;

    add(lang === "he" ? `מנוי: ${monthlyLabel(lang, d.monthlyPlan)}` : `Monthly: ${monthlyLabel(lang, d.monthlyPlan)}`, mPrice);

    if (d.socialManagement) add(lang === "he" ? "SMM (ניהול/פוסטים/תכנית)" : "SMM (posting/content plan)", pricing.socialManagement);
    if (d.targetingSetup) add(lang === "he" ? "Targeting (הגדרה)" : "Targeting (setup)", pricing.targetingSetup);
  } else {
    const durPrice =
      d.duration === "2h"
        ? pricing.duration2h
        : d.duration === "4h"
          ? pricing.duration4h
          : d.duration === "8h"
            ? pricing.duration8h
            : d.duration === "day"
              ? pricing.durationDay
              : pricing.durationWeek;

    add(lang === "he" ? `צילום: ${durationLabel(lang, d.duration)}` : `Shoot: ${durationLabel(lang, d.duration)}`, durPrice);
    if (d.reels > 0) add(lang === "he" ? `Reels: ${d.reels}` : `Reels: ${d.reels}`, d.reels * pricing.perReel);
    if (d.photos > 0) add(lang === "he" ? `תמונות: ${d.photos}` : `Photos: ${d.photos}`, d.photos * pricing.perPhoto);

    if (d.socialManagement) add(lang === "he" ? "SMM (ניהול/פוסטים)" : "SMM (management/posting)", pricing.socialManagement);
    if (d.targetingSetup) add(lang === "he" ? "Targeting (הגדרה)" : "Targeting (setup)", pricing.targetingSetup);
  }

  const total = lines.reduce((s, x) => s + x.amount, 0);

  const summaryLines = [
    d.monthlyPlan !== "none"
      ? (lang === "he" ? `מנוי: ${monthlyLabel(lang, d.monthlyPlan)}` : `Monthly: ${monthlyLabel(lang, d.monthlyPlan)}`)
      : (lang === "he"
          ? `צילום: ${durationLabel(lang, d.duration)}, reels: ${d.reels}, תמונות: ${d.photos}`
          : `Shoot: ${durationLabel(lang, d.duration)}, reels: ${d.reels}, photos: ${d.photos}`),
    d.socialManagement ? (lang === "he" ? "SMM: כן" : "SMM: yes") : (lang === "he" ? "SMM: לא" : "SMM: no"),
    d.targetingSetup ? (lang === "he" ? "Targeting: כן" : "Targeting: yes") : (lang === "he" ? "Targeting: לא" : "Targeting: no"),
    lang === "he" ? `סה״כ: ${cur}${total}` : `Total: ${cur}${total}`,
  ];

  return { total, lines, summaryLines, currency: cur };
}
