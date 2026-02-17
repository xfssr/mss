// components/LightboxPreview.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";

type ExampleLike = {
  previewImage: string;
  videoUrl?: string | null;
  title?: Record<Lang, string>;
  description?: Record<Lang, string>;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function LightboxPreview(props: {
  lang: Lang;
  open: boolean;
  items: ExampleLike[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const { open, items } = props;
  const max = Math.max(0, items.length - 1);
  const idx = clamp(props.index, 0, max);
  const item = items[idx];

  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const [dragging, setDragging] = useState(false);

  const title = useMemo(() => (item?.title?.[props.lang] || "").trim(), [item, props.lang]);
  const desc = useMemo(() => (item?.description?.[props.lang] || "").trim(), [item, props.lang]);

  function prev() {
    props.onIndex(clamp(idx - 1, 0, max));
  }
  function next() {
    props.onIndex(clamp(idx + 1, 0, max));
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") props.onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, idx, max]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-3 sm:px-6" role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label="Close preview"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={props.onClose}
      />

      <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f14]/98 shadow-2xl">
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10">
          <div className="min-w-0">
            <div className="text-sm text-white/90 truncate">{title || "Preview"}</div>
            {desc ? <div className="text-xs text-white/55 truncate">{desc}</div> : null}
          </div>

          <button
            type="button"
            onClick={props.onClose}
            className="shrink-0 rounded-xl border border-white/12 bg-black/35 px-3 py-2 text-sm text-white/90 hover:bg-white/[0.07]"
            aria-label={t(props.lang, "close")}
          >
            ✕
          </button>
        </div>

        <div
          className="relative aspect-[16/9] bg-black/40"
          onTouchStart={(e) => {
            const t = e.touches[0];
            startX.current = t.clientX;
            startY.current = t.clientY;
            setDragging(true);
          }}
          onTouchMove={(e) => {
            if (!dragging) return;
            const t = e.touches[0];
            const dx = Math.abs((startX.current ?? t.clientX) - t.clientX);
            const dy = Math.abs((startY.current ?? t.clientY) - t.clientY);
            if (dx > dy) e.preventDefault();
          }}
          onTouchEnd={(e) => {
            setDragging(false);
            const t = e.changedTouches[0];
            const sx = startX.current ?? t.clientX;
            const dx = t.clientX - sx;
            startX.current = null;
            startY.current = null;

            if (Math.abs(dx) > 40) {
              if (dx > 0) prev();
              else next();
            }
          }}
        >
          {item?.videoUrl ? (
            <video
              src={item.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              controls
              poster={item.previewImage}
              className="h-full w-full object-cover"
            />
          ) : item?.previewImage ? (
            <Image src={item.previewImage} alt={title || "Preview"} fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white/20 text-3xl">
              📷
            </div>
          )}

          {/* Arrows (desktop) */}
          {items.length > 1 ? (
            <>
              <button
                type="button"
                aria-label="Previous"
                onClick={prev}
                className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/45 h-10 w-10 items-center justify-center text-white/90 hover:bg-black/65"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={next}
                className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/45 h-10 w-10 items-center justify-center text-white/90 hover:bg-black/65"
              >
                ›
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
