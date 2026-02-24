"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { CatalogExample } from "@/types/catalog";
import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/**
 * Centered modal gallery viewer for package examples.
 *
 * Features:
 *  - dark backdrop, centered modal (responsive)
 *  - swipe left/right on mobile (touch)
 *  - arrow keys + arrow buttons on desktop
 *  - smooth CSS transitions between slides
 *  - slide indicator ("3 / 8")
 *  - video playback inside viewer
 *  - single close ✕ button
 *  - safe-area padding on mobile
 */
export function ExamplesGalleryViewer(props: {
  lang: Lang;
  open: boolean;
  items: CatalogExample[];
  startIndex: number;
  onClose: () => void;
}) {
  const { open, items, lang, onClose } = props;
  const [idx, setIdx] = useState(props.startIndex);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [animating, setAnimating] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const max = Math.max(0, items.length - 1);
  const safeIdx = clamp(idx, 0, max);
  const item = items[safeIdx];

  // Reset index when items/startIndex change
  useEffect(() => {
    setIdx(props.startIndex);
    setDirection(null);
  }, [props.startIndex, items]);

  // Prevent body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const navigate = useCallback(
    (next: number, dir: "left" | "right") => {
      const clamped = clamp(next, 0, max);
      if (clamped === safeIdx) return;
      setDirection(dir);
      setAnimating(true);
      // Small delay to let CSS transition trigger
      requestAnimationFrame(() => {
        setIdx(clamped);
        setTimeout(() => setAnimating(false), 300);
      });
    },
    [max, safeIdx],
  );

  const prev = useCallback(() => navigate(safeIdx - 1, "right"), [navigate, safeIdx]);
  const next = useCallback(() => navigate(safeIdx + 1, "left"), [navigate, safeIdx]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, prev, next, onClose]);

  if (!open || items.length === 0) return null;

  const isVideo = item?.mediaType === "VIDEO";
  const mediaSrc = item?.mediaUrl || "";
  const posterSrc = item?.posterUrl || "";
  const title = item?.title?.[lang]?.trim() || "";

  // Slide transition classes
  const slideClass = animating
    ? direction === "left"
      ? "translate-x-[-4%] opacity-80"
      : "translate-x-[4%] opacity-80"
    : "translate-x-0 opacity-100";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center px-3 sm:px-6"
      role="dialog"
      aria-modal="true"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* Dark backdrop */}
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-4xl max-h-[90dvh] overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f14]/98 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10">
          <div className="min-w-0 flex items-center gap-3">
            {title && (
              <div className="text-sm text-white/90 truncate">{title}</div>
            )}
            {/* Slide indicator */}
            {items.length > 1 && (
              <div className="shrink-0 text-xs text-white/50 tabular-nums">
                {safeIdx + 1} / {items.length}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-xl border border-white/12 bg-black/35 px-3 py-2 text-sm text-white/90 hover:bg-white/[0.07] transition-colors"
            aria-label={t(lang, "close")}
          >
            ✕
          </button>
        </div>

        {/* Media area with transitions — portrait-friendly aspect ratio */}
        <div
          className="relative aspect-[9/16] sm:aspect-[3/4] lg:aspect-[16/9] min-h-0 flex-1 bg-black/40 overflow-hidden"
          onTouchStart={(e) => {
            const touch = e.touches[0];
            touchStartX.current = touch.clientX;
            touchStartY.current = touch.clientY;
          }}
          onTouchMove={(e) => {
            if (touchStartX.current === null) return;
            const touch = e.touches[0];
            const dx = Math.abs(touchStartX.current - touch.clientX);
            const dy = Math.abs((touchStartY.current ?? touch.clientY) - touch.clientY);
            // Prevent vertical scroll when swiping horizontally
            if (dx > dy && e.cancelable) e.preventDefault();
          }}
          onTouchEnd={(e) => {
            const touch = e.changedTouches[0];
            const sx = touchStartX.current ?? touch.clientX;
            const dx = touch.clientX - sx;
            touchStartX.current = null;
            touchStartY.current = null;
            if (Math.abs(dx) > 40) {
              if (dx > 0) prev();
              else next();
            }
          }}
        >
          <div
            className={`h-full w-full transition-all duration-300 ease-in-out ${slideClass}`}
            key={safeIdx}
          >
            {isVideo && mediaSrc ? (
              <video
                src={mediaSrc}
                autoPlay={!reducedMotion}
                muted
                loop
                playsInline
                controls
                poster={posterSrc || undefined}
                className="h-full w-full object-contain bg-black"
              />
            ) : mediaSrc ? (
              <Image
                src={mediaSrc}
                alt={title || "Preview"}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-contain"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white/20 text-3xl">
                📷
              </div>
            )}
          </div>

          {/* Navigation arrows (desktop) */}
          {items.length > 1 && (
            <>
              {safeIdx > 0 && (
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={prev}
                  className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/50 h-10 w-10 items-center justify-center text-white/90 hover:bg-black/70 transition-colors"
                >
                  ‹
                </button>
              )}
              {safeIdx < max && (
                <button
                  type="button"
                  aria-label="Next"
                  onClick={next}
                  className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/50 h-10 w-10 items-center justify-center text-white/90 hover:bg-black/70 transition-colors"
                >
                  ›
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
