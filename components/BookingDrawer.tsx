"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";
import type { PricingConfig } from "@/types/pricing";
import type { DiscountConfig } from "@/lib/catalogOverridesStore";
import type { PackageDetail } from "@/lib/packageConfigStore";
import { WHATSAPP_PHONE } from "@/utils/whatsapp";
import {
  DRAWER_BACKDROP_CLASS,
  DRAWER_PANEL_CLASS,
  DRAWER_HEADER_CLASS,
  DRAWER_FOOTER_CLASS,
} from "@/lib/drawerStyles";

type SourcePackage = {
  sourceType: "package";
  pkg: string;
};

type SourceSolution = {
  sourceType: "solution";
  solutionSlug: string;
  businessType?: string;
  languages?: string;
  goal?: string;
};

type BookingDrawerProps = {
  lang: Lang;
  open: boolean;
  onClose: () => void;
  pricing?: PricingConfig;
  discountConfig?: DiscountConfig;
  categoryLabel?: string;
  packageDetail?: PackageDetail;
} & (SourcePackage | SourceSolution);

type AvailStatus =
  | { kind: "idle" }
  | { kind: "checking" }
  | { kind: "available" }
  | { kind: "unavailable"; reason: string; suggested?: string }
  | { kind: "error"; message: string };

type HoldStatus =
  | { kind: "idle" }
  | { kind: "holding" }
  | { kind: "held"; holdId: string; expiresAt?: string }
  | { kind: "error"; message: string };

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

const FIRST_ORDER_KEY = "mss_firstOrderUsed";

const L: Record<Lang, Record<string, string>> = {
  he: {
    title: "בדיקת זמינות והזמנה",
    date: "תאריך",
    time: "שעה",
    city: "עיר",
    comment: "הערות (אופציונלי)",
    checkBtn: "בדוק זמינות",
    checking: "בודק…",
    statusFree: "פנוי ✓",
    statusTaken: "תפוס",
    holdBtn: "שמור שעה ופתח WhatsApp",
    holding: "שומר…",
    calendarDown: "לא ניתן לבדוק זמינות כרגע",
    holdSuccess: "השעה נשמרה!",
    fillDateTime: "נא למלא תאריך ושעה בפורמט תקין",
    close: "סגור",
    step1: "תאריך ושעה",
    step2: "זמינות",
    step3: "שמירה ושליחה",
  },
  en: {
    title: "Check availability & book",
    date: "Date",
    time: "Time",
    city: "City",
    comment: "Comment (optional)",
    checkBtn: "Check availability",
    checking: "Checking…",
    statusFree: "Available ✓",
    statusTaken: "Taken",
    holdBtn: "Hold slot & open WhatsApp",
    holding: "Holding…",
    calendarDown: "Cannot check availability right now",
    holdSuccess: "Slot held!",
    fillDateTime: "Please fill date and time in the correct format",
    close: "Close",
    step1: "Date & time",
    step2: "Availability",
    step3: "Hold & send",
  },
};

const PKG_LABELS: Record<string, Record<Lang, string>> = {
  starter: { he: "Starter", en: "Starter" },
  business: { he: "Business", en: "Business" },
  monthly: { he: "Monthly", en: "Monthly" },
};

function getBasePrice(pkg: string, pricing?: PricingConfig, packageDetail?: PackageDetail): number {
  if (packageDetail?.priceFrom && packageDetail.priceFrom > 0) return packageDetail.priceFrom;
  if (!pricing) return 0;
  // Fallback: map new package IDs to existing PricingConfig DB fields (schema unchanged)
  switch (pkg) {
    case "starter": return pricing.monthlyStarter;
    case "business": return pricing.monthlyGrowth;
    case "monthly": return pricing.monthlyPro;
    default: return 0;
  }
}

function pickL10n(lang: Lang, v: { he: string; en: string }) {
  const s = v?.[lang] ?? "";
  return s?.trim() ? s : v.he;
}

export function BookingDrawer(props: BookingDrawerProps) {
  const { lang, open, onClose, pricing, discountConfig, categoryLabel, packageDetail } = props;
  const s = L[lang];

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [city, setCity] = useState("");
  const [comment, setComment] = useState("");
  const [smmOn, setSmmOn] = useState(false);
  const [targetOn, setTargetOn] = useState(false);

  const [avail, setAvail] = useState<AvailStatus>({ kind: "idle" });
  const [hold, setHold] = useState<HoldStatus>({ kind: "idle" });

  const validInput = DATE_RE.test(date) && TIME_RE.test(time);

  // First-time discount
  const [firstOrderUsed, setFirstOrderUsed] = useState(true);
  useEffect(() => {
    try {
      setFirstOrderUsed(localStorage.getItem(FIRST_ORDER_KEY) === "true");
    } catch { /* SSR fallback */ }
  }, []); // Read once on mount

  const showDiscount = !!(discountConfig?.enabled && !firstOrderUsed);

  // Pricing calculation
  const priceSummary = useMemo(() => {
    if (!pricing) return null;
    const pkgKey = props.sourceType === "package" ? props.pkg : "";
    const base = getBasePrice(pkgKey, pricing, packageDetail);
    if (base <= 0) return null;

    const lines: { label: string; amount: number }[] = [];
    const pkgLabel = PKG_LABELS[pkgKey]?.[lang] ?? pkgKey;
    lines.push({ label: `${t(lang, "packageLabel")}: ${pkgLabel}`, amount: base });

    if (smmOn) lines.push({ label: t(lang, "smmAddon"), amount: pricing.socialManagement });
    if (targetOn) lines.push({ label: t(lang, "targetAddon"), amount: pricing.targetingSetup });

    let subtotal = lines.reduce((s, x) => s + x.amount, 0);
    let discountAmount = 0;
    if (showDiscount && discountConfig) {
      discountAmount = Math.floor(subtotal * discountConfig.percent / 100);
    }
    const total = subtotal - discountAmount;

    return { lines, subtotal, discountAmount, total, discountPercent: discountConfig?.percent ?? 0 };
  }, [pricing, props, lang, smmOn, targetOn, showDiscount, discountConfig]);

  // Selected tags
  const selectedTags = useMemo(() => {
    const tags: string[] = [];
    if (categoryLabel) {
      tags.push(categoryLabel);
    }
    if (props.sourceType === "package" && props.pkg) {
      tags.push(PKG_LABELS[props.pkg]?.[lang] ?? props.pkg);
    }
    if (props.sourceType === "solution") {
      tags.push(props.solutionSlug);
    }
    if (smmOn) tags.push("SMM");
    if (targetOn) tags.push("Target Ads");
    return tags;
  }, [props, lang, smmOn, targetOn, categoryLabel]);

  // Reset state when drawer opens
  useEffect(() => {
    if (open) {
      setDate("");
      setTime("");
      setCity("");
      setComment("");
      setSmmOn(false);
      setTargetOn(false);
      setAvail({ kind: "idle" });
      setHold({ kind: "idle" });
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const onCheck = useCallback(async () => {
    if (!validInput) {
      setAvail({ kind: "error", message: s.fillDateTime });
      return;
    }
    setAvail({ kind: "checking" });
    setHold({ kind: "idle" });

    try {
      const res = await fetch(
        `/api/availability?date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}&durationMinutes=120&timezone=Asia/Jerusalem`
      );
      if (!res.ok) {
        setAvail({ kind: "error", message: s.calendarDown });
        return;
      }
      const json = await res.json();
      if (!json.ok && json.error === "calendar_unavailable") {
        setAvail({ kind: "error", message: s.calendarDown });
        return;
      }
      if (json.available) {
        setAvail({ kind: "available" });
      } else {
        setAvail({
          kind: "unavailable",
          reason: json.reason ?? s.statusTaken,
          suggested: json.suggested,
        });
      }
    } catch {
      setAvail({ kind: "error", message: s.calendarDown });
    }
  }, [date, time, validInput, s]);

  const markFirstOrderUsed = useCallback(() => {
    try {
      localStorage.setItem(FIRST_ORDER_KEY, "true");
      setFirstOrderUsed(true);
    } catch { /* ignore */ }
  }, []);

  const onHold = useCallback(async () => {
    if (avail.kind !== "available") return;
    setHold({ kind: "holding" });

    const payload: Record<string, string> = {
      city,
      date,
      time,
      lang,
      comment,
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
    };

    if (props.sourceType === "package") {
      payload.pkg = props.pkg;
    } else {
      payload.catalog = props.solutionSlug;
      if (props.businessType) payload.business = props.businessType;
      if (props.languages) payload.languages = props.languages;
      if (props.goal) payload.goal = props.goal;
    }

    try {
      const res = await fetch("/api/hold", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        setHold({ kind: "error", message: s.calendarDown });
        return;
      }

      const json = await res.json();

      if (!json.ok && json.error === "calendar_unavailable") {
        setHold({ kind: "error", message: s.calendarDown });
        return;
      }

      if (json.ok) {
        const holdId = json.holdId ?? "";
        setHold({ kind: "held", holdId, expiresAt: json.expiresAt });
        markFirstOrderUsed();

        const label =
          props.sourceType === "package"
            ? props.pkg
            : props.solutionSlug;

        const lines = [
          lang === "he" ? "היי! שמרתי שעה 🗓" : "Hi! I held a slot 🗓",
          lang === "he" ? `תאריך: ${date}` : `Date: ${date}`,
          lang === "he" ? `שעה: ${time}` : `Time: ${time}`,
          city ? (lang === "he" ? `עיר: ${city}` : `City: ${city}`) : "",
          label ? (lang === "he" ? `חבילה: ${label}` : `Package: ${label}`) : "",
          holdId ? (lang === "he" ? `מזהה הזמנה: ${holdId}` : `Booking ID: ${holdId}`) : "",
          comment ? (lang === "he" ? `הערות: ${comment}` : `Comment: ${comment}`) : "",
          "",
          lang === "he" ? "תודה!" : "Thanks!",
        ].filter(Boolean);

        const text = encodeURIComponent(lines.join("\n"));
        window.open(
          `https://wa.me/${WHATSAPP_PHONE}?text=${text}`,
          "_blank",
          "noopener,noreferrer"
        );
      } else {
        setHold({ kind: "error", message: json.reason ?? "hold_failed" });
      }
    } catch {
      setHold({ kind: "error", message: s.calendarDown });
    }
  }, [avail, city, date, time, lang, comment, props, s, markFirstOrderUsed]);

  const onDateChange = (v: string) => {
    setDate(v);
    setAvail({ kind: "idle" });
    setHold({ kind: "idle" });
  };
  const onTimeChange = (v: string) => {
    setTime(v);
    setAvail({ kind: "idle" });
    setHold({ kind: "idle" });
  };

  if (!open) return null;

  const inputCls =
    "mt-1.5 w-full rounded-xl border border-white/10 bg-black/35 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-[rgb(var(--blue))] focus:border-[rgb(var(--blue))]/50 transition-all";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      dir={lang === "he" ? "rtl" : "ltr"}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        className={DRAWER_BACKDROP_CLASS}
        onClick={onClose}
      />

      {/* Panel: bottom sheet on mobile, centered modal on desktop */}
      <div className={DRAWER_PANEL_CLASS}>
        {/* Header */}
        <div className={DRAWER_HEADER_CLASS}>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base sm:text-lg font-semibold text-[rgb(var(--blue))]">
              {s.title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-xl border border-white/12 bg-black/35 px-3 py-2 text-sm text-white/90 hover:bg-white/[0.07] hover:border-white/20"
            >
              ✕
            </button>
          </div>

          {/* Selected tags badges */}
          {selectedTags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              <span className="text-[10px] text-white/50 self-center">{t(lang, "selectedLabel")}:</span>
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] rounded-full border border-[rgb(var(--blue))]/30 bg-[rgb(var(--blue))]/10 px-2.5 py-0.5 text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Stepper */}
        {(() => {
          let currentStep = 1;
          if (hold.kind === "held") currentStep = 3;
          else if (avail.kind === "available" || avail.kind === "unavailable") currentStep = 2;
          const stepLabels = [s.step1, s.step2, s.step3];
          return (
            <div className="flex items-center justify-between px-4 sm:px-6 py-2" dir="ltr">
              {stepLabels.map((label, i) => {
                const step = i + 1;
                const isActive = step <= currentStep;
                return (
                  <div key={step} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center gap-0.5">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold border transition-colors ${
                          isActive
                            ? "border-[rgb(var(--blue))] bg-[rgb(var(--blue))]/25 text-[rgb(var(--blue))]"
                            : "border-white/15 bg-white/[0.04] text-white/30"
                        }`}
                      >
                        {step}
                      </div>
                      <span className={`text-[9px] leading-tight ${isActive ? "text-white/80" : "text-white/30"}`}>
                        {label}
                      </span>
                    </div>
                    {step < 3 && (
                      <div
                        className={`flex-1 h-px mx-1.5 transition-colors ${
                          step < currentStep ? "bg-[rgb(var(--blue))]/40" : "bg-white/10"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          );
        })()}

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 py-4 space-y-3">
          {/* Compact package summary */}
          {packageDetail && props.sourceType === "package" && (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 space-y-2">
              <div className="text-xs font-semibold text-[rgb(var(--blue))]">
                {pickL10n(lang, packageDetail.title)}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {packageDetail.pills.map((pill, i) => (
                  <span key={i} className="text-[10px] rounded-full border border-white/15 bg-white/[0.06] px-2 py-0.5 text-white/60">
                    {pickL10n(lang, pill)}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                <div className="text-white/40">{t(lang, "labelShoot")}: <span className="text-white/70">{pickL10n(lang, packageDetail.shootTime)}</span></div>
                <div className="text-white/40">{t(lang, "labelDeliveryShort")}: <span className="text-white/70">{pickL10n(lang, packageDetail.deliveryTime)}</span></div>
              </div>
              {showDiscount && discountConfig && (
                <div className="text-[10px] text-green-400">
                  🎁 {lang === "he" ? discountConfig.labelHe : discountConfig.labelEn} ({discountConfig.percent}%)
                </div>
              )}
            </div>
          )}

          {/* Add-on toggles (only for package source with pricing) */}
          {props.sourceType === "package" && pricing && (
            <div className="space-y-2">
              <div className="text-xs font-medium text-white/50">{t(lang, "addonsLabel")}</div>
              <label className="flex items-center gap-2 text-sm text-white/80 cursor-pointer">
                <input
                  type="checkbox"
                  checked={smmOn}
                  onChange={(e) => setSmmOn(e.target.checked)}
                  className="accent-[rgb(var(--blue))]"
                />
                {t(lang, "smmAddon")} — ₪{pricing.socialManagement.toLocaleString()}
              </label>
              <label className="flex items-center gap-2 text-sm text-white/80 cursor-pointer">
                <input
                  type="checkbox"
                  checked={targetOn}
                  onChange={(e) => setTargetOn(e.target.checked)}
                  className="accent-[rgb(var(--blue))]"
                />
                {t(lang, "targetAddon")} — ₪{pricing.targetingSetup.toLocaleString()}
              </label>
            </div>
          )}

          {/* Price summary */}
          {priceSummary && (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 space-y-1.5">
              {priceSummary.lines.map((line, i) => (
                <div key={i} className="flex items-center justify-between text-xs text-white/70">
                  <span>{line.label}</span>
                  <span>₪{line.amount.toLocaleString()}</span>
                </div>
              ))}
              {priceSummary.discountAmount > 0 && (
                <div className="flex items-center justify-between text-xs text-green-400">
                  <span>🎁 {discountConfig ? (lang === "he" ? discountConfig.labelHe : discountConfig.labelEn) : t(lang, "discountLabel")} ({priceSummary.discountPercent}%)</span>
                  <span>-₪{priceSummary.discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="border-t border-white/10 pt-1.5 flex items-center justify-between text-sm font-semibold text-white">
                <span>{t(lang, "totalLabel")}</span>
                <span>₪{priceSummary.total.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-white/40">{t(lang, "estimateNote")}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="text-xs font-medium text-white/60">{s.date}</span>
              <input type="date" dir="ltr" value={date} onChange={(e) => onDateChange(e.target.value)} className={inputCls} />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-white/60">{s.time}</span>
              <input type="time" dir="ltr" value={time} onChange={(e) => onTimeChange(e.target.value)} className={inputCls} />
            </label>
          </div>

          <label className="block">
            <span className="text-xs font-medium text-white/60">{s.city}</span>
            <input value={city} onChange={(e) => setCity(e.target.value)} className={inputCls} />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-white/60">{s.comment}</span>
            <input value={comment} onChange={(e) => setComment(e.target.value)} className={inputCls} />
          </label>

          {/* Availability status */}
          {avail.kind === "available" && (
            <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-2.5 text-sm text-green-300">
              {s.statusFree}
            </div>
          )}
          {avail.kind === "unavailable" && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
              {s.statusTaken} — {avail.reason}
              <div className="mt-1 text-xs text-white/60">
                {lang === "he" ? "בחרו תאריך אחר" : "Choose another date"}
              </div>
              {avail.suggested && (
                <div className="mt-1 text-xs text-white/60">
                  {lang === "he" ? "הצעה:" : "Suggested:"} {avail.suggested}
                </div>
              )}
            </div>
          )}
          {avail.kind === "error" && (
            <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-2.5 text-sm text-yellow-300">
              {avail.message}
            </div>
          )}

          {/* Hold status */}
          {hold.kind === "held" && (
            <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-2.5 text-sm text-green-300">
              {s.holdSuccess} (ID: {hold.holdId})
            </div>
          )}
          {hold.kind === "error" && (
            <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-2.5 text-sm text-yellow-300">
              {hold.message}
            </div>
          )}
        </div>

        {/* Sticky footer CTA */}
        <div className={DRAWER_FOOTER_CLASS}>
          {/* Check availability button */}
          {avail.kind !== "available" && (
            <button
              type="button"
              onClick={onCheck}
              disabled={avail.kind === "checking"}
              className="w-full rounded-xl border border-[rgb(var(--blue))]/40 bg-[rgb(var(--blue))]/20 px-5 py-3 text-sm text-white hover:bg-[rgb(var(--blue))]/30 disabled:opacity-50 transition-all"
            >
              {avail.kind === "checking" ? s.checking : s.checkBtn}
            </button>
          )}

          {/* Hold & WhatsApp button (only if available) */}
          {avail.kind === "available" && hold.kind !== "held" && (
            <button
              type="button"
              onClick={onHold}
              disabled={hold.kind === "holding"}
              className="w-full rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-5 py-3 text-sm text-white hover:bg-[rgb(var(--red))]/30 disabled:opacity-50 transition-all"
            >
              {hold.kind === "holding" ? s.holding : s.holdBtn}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
