// components/MiniScreenPanel.tsx
"use client";

import Image from "next/image";
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

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function pickSecondaryExample(examples: Catalog["examples"], activeIndex: number) {
  if (!examples.length) return undefined;
  const active = examples[clamp(activeIndex, 0, examples.length - 1)];
  const second =
    examples.find((e, i) => i !== activeIndex && e.previewImage && e.previewImage !== active?.previewImage) ||
    examples.find((e, i) => i !== activeIndex) ||
    examples[0];
  return second;
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

  const examples = props.catalog.examples || [];
  const activeExample = examples[clamp(activeExampleIndex, 0, Math.max(0, examples.length - 1))];
  const secondaryExample = useMemo(
    () => pickSecondaryExample(examples, activeExampleIndex),
    [examples, activeExampleIndex],
  );

  useEffect(() => {
    if (!props.open) return;
    setActiveExampleIndex(0);
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

  const pkgCalc = useMemo(
    () => calcPackage(props.lang, props.packageDraft, props.pricing),
    [props.lang, props.packageDraft, props.pricing],
  );

  const ORDER: TabKey[] = ["examples", "package", "reserve"];
  const tabIndex = Math.max(0, ORDER.indexOf(props.tab));
  const prevTab = tabIndex > 0 ? ORDER[tabIndex - 1] : null;
  const nextTab = tabIndex < ORDER.length - 1 ? ORDER[tabIndex + 1] : null;

  function goPrev() {
    if (prevTab) props.onTabChange(prevTab);
  }
  function goNext() {
    if (nextTab) props.onTabChange(nextTab);
  }

  if (!props.open) return null;

  const promoVideo = props.catalog.promoVideoUrl || activeExample?.videoUrl || "";
  const promoTitle = (props.catalog.promoVideoTitle?.[props.lang] || activeExample?.title?.[props.lang] || "").trim();
  const promoDesc = (props.catalog.promoVideoDescription?.[props.lang] || activeExample?.description?.[props.lang] || "").trim();

  const step = props.tab === "examples" ? 1 : props.tab === "package" ? 2 : 3;

  return (
    <div
      className={[
        "fixed inset-0 z-50",
        "flex items-start sm:items-center justify-center",
        "px-3 sm:px-6",
        "pt-[calc(env(safe-area-inset-top)+0.5rem)]",
        "pb-[calc(env(safe-area-inset-bottom)+0.5rem)]",
      ].join(" ")}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/80 sm:bg-black/65 backdrop-blur-0 sm:backdrop-blur-sm"
        onClick={props.onClose}
      />

      <div
        ref={panelRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={panelStyle}
        className={[
          "relative w-full max-w-5xl overflow-hidden border border-white/12 shadow-2xl",
          "rounded-2xl sm:rounded-[28px]",
          "bg-[#0b0f14]/98 sm:bg-[#0b0f14]/96",
          "flex flex-col min-h-0",
          "max-h-[calc(100vh-2.5rem)]",
          "supports-[height:100dvh]:max-h-[calc(100dvh-2.5rem)]",
          "transition-transform duration-300 will-change-transform",
          reducedMotion ? "" : "sm:cc-tilt",
        ].join(" ")}
      >
        {/* Header */}
        <div className="shrink-0 px-3 sm:px-6 pt-3 sm:pt-5 pb-2.5 sm:pb-4 border-b border-white/10 bg-[#0b0f14]/98 backdrop-blur">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[11px] sm:text-xs text-white/55">{props.lang === "he" ? "קטלוג" : "Catalog"}</div>

              <div className="mt-1 text-base sm:text-2xl font-semibold text-[rgb(var(--blue))] truncate">
                {props.catalog.title[props.lang]}
              </div>

              <div className="mt-1 text-xs sm:text-sm text-white/70 leading-snug sm:whitespace-pre-line max-h-[2.4rem] overflow-hidden sm:max-h-none">
                {props.catalog.longDescription[props.lang]}
              </div>
            </div>

            <button
              type="button"
              onClick={props.onClose}
              className="rounded-xl border border-white/12 bg-black/40 px-3 py-2 text-xs sm:text-sm text-white/90 hover:bg-white/[0.07]"
            >
              {t(props.lang, "close")}
            </button>
          </div>

          {/* Stepper: desktop only, mobile = compact line */}
          <div className="mt-2.5 flex items-center justify-between gap-3">
            <div className="text-xs text-white/60 sm:hidden">
              {props.lang === "he" ? "שלב" : "Step"} {step}/3
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-white/70">
              <span className={step === 1 ? "text-white" : "text-white/50"}>1) {t(props.lang, "tabExamples")}</span>
              <span className="text-white/30">→</span>
              <span className={step === 2 ? "text-white" : "text-white/50"}>2) {t(props.lang, "tabPackage")}</span>
              <span className="text-white/30">→</span>
              <span className={step === 3 ? "text-white" : "text-white/50"}>3) {t(props.lang, "tabReserve")}</span>
            </div>

            <div className="min-w-0 flex-1 overflow-x-auto [-webkit-overflow-scrolling:touch]">
              <div className="inline-block min-w-max">
                <Tabs lang={props.lang} value={props.tab} onChange={props.onTabChange} />
              </div>
            </div>
          </div>
        </div>

        {/* Body (scrollable) */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch] px-3 sm:px-6 py-3 sm:py-5">
          {props.tab === "examples" ? (
            <div className="space-y-4">
              <div className="cc-glass bg-black/55 rounded-2xl p-3 sm:p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium text-white/90">{t(props.lang, "tabExamples")}</div>
                </div>

                <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-black/55">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={activeExample?.previewImage || examples[0]?.previewImage || "https://picsum.photos/seed/fallback/900/600"}
                      alt={promoTitle || "Preview"}
                      fill
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Mobile: promo block inside (no second big column) */}
                <div className="mt-3 lg:hidden">
                  <div className="rounded-2xl border border-white/10 bg-black/55 overflow-hidden">
                    <div className="relative aspect-[16/9]">
                      {promoVideo ? (
                        <video
                          src={promoVideo}
                          autoPlay={!reducedMotion}
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          controls={reducedMotion}
                          poster={activeExample?.previewImage}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Image
                          src={secondaryExample?.previewImage || activeExample?.previewImage || "https://picsum.photos/seed/fallback/900/600"}
                          alt={promoTitle || "Preview"}
                          fill
                          sizes="100vw"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="p-3">
                      <div className="text-sm text-white/90">{promoTitle || "—"}</div>
                      <div className="mt-1 text-sm text-white/70 whitespace-pre-line">{promoDesc || "—"}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {examples.slice(0, 9).map((ex, idx) => {
                    const active = idx === activeExampleIndex;
                    return (
                      <button
                        key={`${ex.previewImage}-${idx}`}
                        type="button"
                        onClick={() => setActiveExampleIndex(idx)}
                        className={[
                          "relative aspect-[16/9] overflow-hidden rounded-xl border",
                          active ? "border-[rgb(var(--red))]/60" : "border-white/10 hover:border-white/20",
                        ].join(" ")}
                        aria-label={ex.title[props.lang]}
                      >
                        <Image src={ex.previewImage} alt={ex.title[props.lang]} fill sizes="180px" className="object-cover" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Desktop: right promo panel */}
              <div className="hidden lg:block">
                <div className="cc-glass bg-black/55 rounded-2xl p-4">
                  <div className="text-sm font-medium text-white/90">{t(props.lang, "breakdownTitle")}</div>

                  <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-black/55">
                    <div className="relative aspect-[16/9]">
                      {promoVideo ? (
                        <video
                          src={promoVideo}
                          autoPlay={!reducedMotion}
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          controls={reducedMotion}
                          poster={activeExample?.previewImage}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Image
                          src={secondaryExample?.previewImage || activeExample?.previewImage || "https://picsum.photos/seed/fallback/900/600"}
                          alt={promoTitle || "Preview"}
                          fill
                          sizes="420px"
                          className="object-cover"
                        />
                      )}
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-white/90">{promoTitle || "—"}</div>
                  <div className="mt-2 text-sm text-white/75 whitespace-pre-line">{promoDesc || "—"}</div>
                </div>
              </div>
            </div>
          ) : null}

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
              </div>

              {/* Desktop summary only (mobile = too much) */}
              <div className="hidden lg:block lg:col-span-1">
                <div className="cc-glass bg-black/55 rounded-2xl p-4">
                  <div className="text-sm font-medium text-white/90">{t(props.lang, "packageSummaryTitle")}</div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/55 p-3">
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

          {props.tab === "reserve" ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
              <div className="lg:col-span-2">
                <div className="cc-glass bg-black/55 rounded-2xl p-4">
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
          <div className="shrink-0 border-t border-white/10 bg-[#0b0f14]/98 backdrop-blur px-3 sm:px-6 pt-3 pb-[calc(env(safe-area-inset-bottom)+0.65rem)]">
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={props.onClose}
                className="rounded-xl border border-white/12 bg-black/45 px-3 py-2 text-sm text-white/90 hover:bg-white/[0.07]"
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
                    className="rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/24 px-4 py-2 text-sm text-white hover:bg-[rgb(var(--red))]/34"
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
          <div className="shrink-0 border-t border-white/10 bg-[#0b0f14]/98 backdrop-blur px-3 sm:px-6 pt-3 pb-[calc(env(safe-area-inset-bottom)+0.65rem)]">
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={goPrev}
                className="rounded-xl border border-white/12 bg-black/45 px-4 py-3 text-sm text-white/95 hover:bg-white/[0.07]"
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
                  className="rounded-xl border border-white/12 bg-black/45 px-4 py-3 text-sm text-white/95 hover:bg-white/[0.07]"
                >
                  {props.copiedState === "copied" ? t(props.lang, "copied") : t(props.lang, "copy")}
                </button>

                <button
                  type="button"
                  onClick={props.onSend}
                  className="rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/30 px-4 py-3 text-sm text-white hover:bg-[rgb(var(--red))]/40"
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
