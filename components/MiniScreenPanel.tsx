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

  const activeExample = props.catalog.examples[clamp(activeExampleIndex, 0, Math.max(0, props.catalog.examples.length - 1))];

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

  const pkgCalc = useMemo(() => calcPackage(props.lang, props.packageDraft, props.pricing), [props.lang, props.packageDraft, props.pricing]);

  if (!props.open) return null;

  const promoVideo = props.catalog.promoVideoUrl || activeExample?.videoUrl || "";
  const promoTitle = (props.catalog.promoVideoTitle?.[props.lang] || activeExample?.title?.[props.lang] || "").trim();
  const promoDesc = (props.catalog.promoVideoDescription?.[props.lang] || activeExample?.description?.[props.lang] || "").trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-6" role="dialog" aria-modal="true">
      <button type="button" aria-label="Close" className="absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={props.onClose} />

      <div
        ref={panelRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={panelStyle}
        className={[
          "relative w-full max-w-5xl rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.08] via-white/[0.06] to-black/50 shadow-2xl",
          "transition-transform duration-300 will-change-transform",
          reducedMotion ? "" : "cc-tilt",
        ].join(" ")}
      >
        <div className="px-4 sm:px-6 pt-5 pb-4 border-b border-white/10">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-xs text-white/55">{props.lang === "he" ? "קטלוג" : "Catalog"}</div>
              <div className="mt-1 text-xl sm:text-2xl font-semibold text-[rgb(var(--blue))] cc-z2">{props.catalog.title[props.lang]}</div>
              <div className="mt-2 text-sm text-white/65 whitespace-pre-line">{props.catalog.longDescription[props.lang]}</div>
            </div>

            <button
              type="button"
              onClick={props.onClose}
              className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/80 hover:bg-white/[0.06] hover:border-white/20"
            >
              {t(props.lang, "close")}
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <Tabs lang={props.lang} value={props.tab} onChange={props.onTabChange} />
            <div className="text-xs text-white/45">
              {props.tab === "examples" ? t(props.lang, "examplesHint") : null}
              {props.tab === "package" ? t(props.lang, "packageHint") : null}
              {props.tab === "reserve" ? t(props.lang, "reserveHint") : null}
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 py-5">
          {props.tab === "examples" ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2">
                <div className="cc-glass rounded-2xl p-3 sm:p-4">
                  <div className="text-sm font-medium text-white/90 cc-z1">{t(props.lang, "tabExamples")}</div>

                  <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={activeExample?.previewImage || props.catalog.examples[0]?.previewImage || "https://picsum.photos/seed/fallback/900/600"}
                        alt={promoTitle || "Preview"}
                        fill
                        sizes="(max-width: 1024px) 100vw, 66vw"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {props.catalog.examples.slice(0, 9).map((ex, idx) => {
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
                          {active ? <div className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[rgb(var(--red))]" /> : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="cc-glass rounded-2xl p-4">
                  <div className="text-sm font-medium text-white/90 cc-z2">{t(props.lang, "breakdownTitle")}</div>

                  <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
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
                          src={activeExample?.previewImage || "https://picsum.photos/seed/fallback/900/600"}
                          alt={promoTitle || "Preview"}
                          fill
                          sizes="420px"
                          className="object-cover"
                        />
                      )}
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-white/80">{promoTitle || "—"}</div>
                  <div className="mt-2 text-sm text-white/65 whitespace-pre-line">{promoDesc || "—"}</div>

                  <div className="mt-4 text-xs text-white/45">Autoplay + loop. (prefers-reduced-motion → controls)</div>
                </div>
              </div>
            </div>
          ) : null}

          {props.tab === "package" ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2">
                <PackageBuilder
                  lang={props.lang}
                  pricing={props.pricing}
                  value={props.packageDraft}
                  onChange={props.onPackageChange}
                  onApply={props.onApplyPackageToReserve}
                />
              </div>

              <div className="lg:col-span-1">
                <div className="cc-glass rounded-2xl p-4">
                  <div className="text-sm font-medium text-white/90 cc-z2">{t(props.lang, "packageSummaryTitle")}</div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-3">
                    <div className="text-xs text-white/55">{props.lang === "he" ? "סיכום" : "Summary"}</div>
                    <div className="mt-2 space-y-1 text-sm text-white/80">
                      {pkgCalc.summaryLines.map((s) => (
                        <div key={s}>{s}</div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 text-xs text-white/45">{t(props.lang, "packageNote")}</div>
                </div>
              </div>
            </div>
          ) : null}

          {props.tab === "reserve" ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2">
                <div className="cc-glass rounded-2xl p-4">
                  <div className="text-sm font-medium text-white/90 cc-z2">{t(props.lang, "reserveTitle")}</div>

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

          {props.tab === "reserve" ? (
            <div className="sticky bottom-0 mt-5 -mx-4 sm:-mx-6 px-4 sm:px-6 pb-4 pt-3 bg-gradient-to-t from-black/65 via-black/35 to-transparent">
              <div className="cc-z3 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={props.onGenerate}
                  className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white/85 hover:bg-white/[0.10]"
                >
                  {t(props.lang, "generate")}
                </button>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={props.onCopy}
                    className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/85 hover:bg-white/[0.06]"
                  >
                    {props.copiedState === "copied" ? t(props.lang, "copied") : t(props.lang, "copy")}
                  </button>

                  <button
                    type="button"
                    onClick={props.onSend}
                    className="rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-4 py-3 text-sm text-white hover:bg-[rgb(var(--red))]/30"
                  >
                    {t(props.lang, "send")}
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
