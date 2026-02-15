// components/MiniScreenPanel.tsx
"use client";

import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import type { Catalog } from "@/types/catalog";
import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";
import type { ReservationDraft } from "@/utils/whatsapp";
import { Tabs, type TabKey } from "./Tabs";
import { ReservationForm } from "./ReservationForm";
import { MessagePreview } from "./MessagePreview";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { CopiedState } from "./useCopiedState";
import { PackageBuilder } from "./PackageBuilder";
import type { PackageDraft } from "@/utils/packageCalculator";
import { calcPackage } from "@/utils/packageCalculator";
import type { PricingConfig } from "@/types/pricing";
import { LightboxPreview } from "./LightboxPreview";
import { ExamplesTab } from "./ExamplesTab";
import { DescriptionClamp } from "./DescriptionClamp";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function MiniScreenPanel(props: {
  lang: Lang;
  pricing: PricingConfig;

  open: boolean;
  catalog: Catalog;
  tab: TabKey;
  onTabChange: (t: TabKey) => void;
  onClose: () => void;

  reservation: ReservationDraft;
  onReservationChange: (v: ReservationDraft) => void;
  softErrors: Partial<Record<keyof ReservationDraft, string>>;

  packageDraft: PackageDraft;
  onPackageChange: (v: PackageDraft) => void;
  onApplyPackageToReserve: (summaryLines: string[]) => void;

  messagePreview: string;
  onGenerate: () => void;
  onSend: () => void;
  onCopy: () => void;

  copiedState: CopiedState;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const panelRef = useRef<HTMLDivElement | null>(null);

  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [activeExampleIndex, setActiveExampleIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const examples = props.catalog.examples || [];
  const maxIdx = Math.max(0, examples.length - 1);
  const safeIndex = clamp(activeExampleIndex, 0, maxIdx);
  const activeExample = examples[safeIndex];

  useEffect(() => {
    if (!props.open) return;
    setActiveExampleIndex(0);
    setLightboxOpen(false);
    setTilt({ rx: 0, ry: 0 });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") props.onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [props.open, props.onClose]);

  const panelStyle = useMemo(() => {
    if (reducedMotion) return {};
    return { transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)` } as const;
  }, [reducedMotion, tilt.rx, tilt.ry]);

  function onMouseMove(e: MouseEvent) {
    if (reducedMotion) return;
    const el = panelRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5;
    const dy = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: clamp(-dy * 6, -6, 6), ry: clamp(dx * 8, -8, 8) });
  }

  function onMouseLeave() {
    if (reducedMotion) return;
    setTilt({ rx: 0, ry: 0 });
  }

  const pkgCalc = useMemo(() => calcPackage(props.lang, props.packageDraft, props.pricing), [props.lang, props.packageDraft, props.pricing]);

  const ORDER: TabKey[] = ["examples", "package", "reserve"];
  const tabIndex = ORDER.indexOf(props.tab);
  const prevTab = tabIndex > 0 ? ORDER[tabIndex - 1] : null;
  const nextTab = tabIndex < ORDER.length - 1 ? ORDER[tabIndex + 1] : null;

  function goPrev() {
    if (prevTab) props.onTabChange(prevTab);
  }
  function goNext() {
    if (nextTab) props.onTabChange(nextTab);
  }

  if (!props.open) return null;

  const step = props.tab === "examples" ? 1 : props.tab === "package" ? 2 : 3;

  return (
    <div
      className={[
        "fixed inset-0 z-50",
        "flex items-start sm:items-center justify-center",
        "px-3 sm:px-6",
        "pt-[calc(env(safe-area-inset-top)+0.75rem)]",
        "pb-[calc(env(safe-area-inset-bottom)+0.75rem)]",
      ].join(" ")}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/75 sm:bg-black/65 backdrop-blur-[1px] sm:backdrop-blur-sm"
        onClick={props.onClose}
      />

      {/* Lightbox */}
      <LightboxPreview
        lang={props.lang}
        open={lightboxOpen}
        items={examples.map(ex => ({ 
          ...ex, 
          previewImage: ex.mediaType === "VIDEO" ? (ex.posterUrl || ex.mediaUrl) : ex.mediaUrl 
        }))}
        index={safeIndex}
        onIndex={setActiveExampleIndex}
        onClose={() => setLightboxOpen(false)}
      />

      <div
        ref={panelRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={panelStyle}
        className={[
          "relative w-full max-w-5xl overflow-hidden border border-white/12 shadow-2xl",
          "rounded-2xl sm:rounded-[28px]",
          "bg-[#0b0f14]/98 sm:bg-[#0b0f14]/95",
          "flex flex-col min-h-0",
          "h-[calc(100dvh-6.5rem)] sm:h-auto sm:max-h-[calc(100dvh-8rem)]",
          "transition-transform duration-300 will-change-transform",
          reducedMotion ? "" : "sm:cc-tilt",
        ].join(" ")}
      >
        {/* Header */}
        <div className="shrink-0 px-3 sm:px-6 pt-3.5 sm:pt-5 pb-3 sm:pb-4 border-b border-white/10 bg-[#0b0f14]/97 backdrop-blur">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-xs text-white/55">{props.lang === "he" ? "קטלוג" : "Catalog"}</div>
              <div className="mt-1 text-lg sm:text-2xl font-semibold text-[rgb(var(--blue))]">{props.catalog.title[props.lang]}</div>
              <DescriptionClamp
                lang={props.lang}
                text={props.catalog.longDescription[props.lang]}
                className="mt-1.5 text-sm text-white/70 leading-snug"
              />
            </div>

            <button
              type="button"
              onClick={props.onClose}
              className="rounded-xl border border-white/12 bg-black/35 px-3 py-2 text-sm text-white/90 hover:bg-white/[0.07] hover:border-white/20"
            >
              {t(props.lang, "close")}
            </button>
          </div>

          {/* Stepper + Help */}
          <div className="mt-3 flex items-center gap-2 text-xs text-white/70">
            <span className={step === 1 ? "text-white" : "text-white/50"}>1) {t(props.lang, "tabExamples")}</span>
            <span className="text-white/30">→</span>
            <span className={step === 2 ? "text-white" : "text-white/50"}>2) {t(props.lang, "tabPackage")}</span>
            <span className="text-white/30">→</span>
            <span className={step === 3 ? "text-white" : "text-white/50"}>3) {t(props.lang, "tabReserve")}</span>

            <button
              type="button"
              onClick={() => setHelpOpen((v) => !v)}
              className="ml-auto inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-white/[0.08] text-[10px] font-bold text-white/80 hover:bg-white/[0.15] hover:text-white transition-all"
              aria-label={t(props.lang, "helpTitle")}
            >
              ?
            </button>
          </div>

          {helpOpen ? (
            <div className="mt-2 rounded-xl border border-white/10 bg-black/60 backdrop-blur-sm p-3 text-xs text-white/75 leading-relaxed">
              <div className="font-semibold text-white/90 mb-1">{t(props.lang, "helpTitle")}</div>
              {t(props.lang, "helpDesc")}
            </div>
          ) : null}

          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1 overflow-x-auto [-webkit-overflow-scrolling:touch]">
              <div className="inline-block min-w-max">
                <Tabs lang={props.lang} value={props.tab} onChange={props.onTabChange} />
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              {props.tab === "examples" ? (
                <button
                  type="button"
                  onClick={() => props.onTabChange("package")}
                  className="rounded-xl border border-white/12 bg-white/[0.08] px-3 py-2 text-sm text-white/90 hover:bg-white/[0.12]"
                >
                  {props.lang === "he" ? "הבא: חבילה" : "Next: package"}
                </button>
              ) : null}
              {props.tab === "package" ? (
                <button
                  type="button"
                  onClick={() => props.onTabChange("reserve")}
                  className="rounded-xl border border-[rgb(var(--red))]/35 bg-[rgb(var(--red))]/20 px-3 py-2 text-sm text-white hover:bg-[rgb(var(--red))]/28"
                >
                  {props.lang === "he" ? "הבא: הזמנה" : "Next: reserve"}
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch] px-3 sm:px-6 py-3 sm:py-5">
          {/* ===== Examples: BOOKING STYLE ===== */}
          {props.tab === "examples" ? (
  <ExamplesTab
    lang={props.lang}
    examples={examples}
    activeExampleIndex={activeExampleIndex}
    safeIndex={safeIndex}
    activeExample={activeExample}
    catalog={props.catalog}
    reducedMotion={reducedMotion}
    onSelectExample={setActiveExampleIndex}
    onOpenLightbox={() => setLightboxOpen(true)}
    onNextTab={() => props.onTabChange("package")}
    onOrderSimilar={() => props.onTabChange("reserve")}
  />
) : null}


          {/* ===== Package ===== */}
          {props.tab === "package" ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
              <div className="lg:col-span-2">
                <PackageBuilder
                  lang={props.lang}
                  pricing={props.pricing}
                  value={props.packageDraft}
                  onChange={props.onPackageChange}
                  onApply={props.onApplyPackageToReserve}
                />
                <div className="mt-4 sm:hidden">
                  <button
                    type="button"
                    onClick={() => props.onTabChange("reserve")}
                    className="w-full rounded-xl border border-[rgb(var(--red))]/35 bg-[rgb(var(--red))]/20 px-4 py-3 text-sm text-white"
                  >
                    {props.lang === "he" ? "הבא: הזמנה" : "Next: reserve"}
                  </button>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="cc-glass bg-black/45 rounded-2xl p-4">
                  <div className="text-sm font-medium text-white/90">{t(props.lang, "packageSummaryTitle")}</div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/45 p-3">
                    <div className="text-xs text-white/60">{props.lang === "he" ? "סיכום" : "Summary"}</div>
                    <div className="mt-2 space-y-1 text-sm text-white/90">
                      {pkgCalc.summaryLines.map((s) => (
                        <div key={s}>{s}</div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 text-xs text-white/55">{t(props.lang, "packageNote")}</div>
                </div>
              </div>
            </div>
          ) : null}

          {/* ===== Reserve ===== */}
          {props.tab === "reserve" ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
              <div className="lg:col-span-2">
                <div className="cc-glass bg-black/45 rounded-2xl p-4">
                  <div className="text-sm font-medium text-white/90">{t(props.lang, "reserveTitle")}</div>

                  <div className="mt-4">
                    <ReservationForm
                      lang={props.lang}
                      value={props.reservation}
                      onChange={props.onReservationChange}
                      softErrors={props.softErrors}
                      showBusiness={props.catalog.slug === "other"}
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <MessagePreview title={t(props.lang, "messagePreview")} text={props.messagePreview} />
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer actions */}
        {props.tab !== "reserve" ? (
          <div className="shrink-0 border-t border-white/10 bg-[#0b0f14]/97 backdrop-blur px-3 sm:px-6 pt-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={props.onClose}
                className="rounded-xl border border-white/12 bg-black/35 px-3 py-2 text-sm text-white/90 hover:bg-white/[0.07]"
              >
                {t(props.lang, "close")}
              </button>

              <div className="flex items-center gap-2">
                {prevTab ? (
                  <button
                    type="button"
                    onClick={goPrev}
                    className="rounded-xl border border-white/12 bg-white/[0.06] px-3 py-2 text-sm text-white/90 hover:bg-white/[0.10]"
                  >
                    {props.lang === "he" ? "חזרה" : "Back"}
                  </button>
                ) : null}

                {nextTab ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/22 px-4 py-2 text-sm text-white hover:bg-[rgb(var(--red))]/32"
                  >
                    {props.tab === "examples"
                      ? props.lang === "he"
                        ? "הבא: חבילה"
                        : "Next: package"
                      : props.lang === "he"
                        ? "הבא: הזמנה"
                        : "Next: reserve"}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <div className="shrink-0 border-t border-white/10 bg-[#0b0f14]/97 backdrop-blur px-3 sm:px-6 pt-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={goPrev}
                className="rounded-xl border border-white/12 bg-black/35 px-4 py-3 text-sm text-white/95 hover:bg-white/[0.07]"
              >
                {props.lang === "he" ? "חזרה לחבילה" : "Back to package"}
              </button>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={props.onGenerate}
                  className="rounded-xl border border-white/12 bg-white/[0.08] px-4 py-3 text-sm text-white/95 hover:bg-white/[0.12]"
                >
                  {t(props.lang, "generate")}
                </button>

                <button
                  type="button"
                  onClick={props.onCopy}
                  className="rounded-xl border border-white/12 bg-black/35 px-4 py-3 text-sm text-white/95 hover:bg-white/[0.07]"
                >
                  {props.copiedState === "copied" ? t(props.lang, "copied") : t(props.lang, "copy")}
                </button>

                <button
                  type="button"
                  onClick={props.onSend}
                  className="rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/28 px-4 py-3 text-sm text-white hover:bg-[rgb(var(--red))]/38"
                >
                  {t(props.lang, "send")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
