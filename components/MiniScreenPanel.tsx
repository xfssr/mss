// components/MiniScreenPanel.tsx
"use client";

import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import type { Catalog } from "@/types/catalog";
import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { LightboxPreview } from "./LightboxPreview";
import { ExamplesTab } from "./ExamplesTab";
import { DescriptionClamp } from "./DescriptionClamp";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function MiniScreenPanel(props: {
  lang: Lang;

  open: boolean;
  catalog: Catalog;
  onClose: () => void;

  onContinueToProduct?: () => void;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const panelRef = useRef<HTMLDivElement | null>(null);

  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [activeExampleIndex, setActiveExampleIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (!props.open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [props.open]);

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

  if (!props.open) return null;

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
          "bg-[#0b0f14] sm:bg-[#0b0f14]/95",
          "flex flex-col min-h-0",
          "h-[calc(100dvh-3rem)] sm:h-auto sm:max-h-[calc(100dvh-8rem)]",
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
        </div>

        {/* Body — examples only */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch] px-3 sm:px-6 py-3 sm:py-5">
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
            onNextTab={() => {}}
            onContinueToProduct={props.onContinueToProduct}
          />
        </div>

        {/* Footer - removed duplicate close button */}
      </div>
    </div>
  );
}
