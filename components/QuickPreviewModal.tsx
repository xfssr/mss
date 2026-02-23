"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import type { Catalog, CatalogExample } from "@/types/catalog";
import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";

function pick(lang: Lang, v: { he: string; en: string }) {
  const s = v?.[lang] ?? "";
  return s?.trim() ? s : v.he || v.en;
}

/** Placeholder tiles when catalog has fewer than 6 examples */
function placeholderTiles(count: number, lang: Lang): { id: number; caption: string; src: string }[] {
  return Array.from({ length: count }, (_, i) => ({
    id: -(i + 1),
    caption: t(lang, "previewPlaceholder"),
    src: "",
  }));
}

export function QuickPreviewModal(props: {
  lang: Lang;
  catalog: Catalog;
  onClose: () => void;
  onChoosePackage: () => void;
  onWhatsApp: () => void;
}) {
  const { lang, catalog, onClose, onChoosePackage, onWhatsApp } = props;
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus trap + ESC handler
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;

    const focusable = el.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    }

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose],
  );

  // Build tile data from catalog examples
  const examples = catalog.examples ?? [];
  const MAX_TILES = 9;
  const tiles = examples.slice(0, MAX_TILES).map((ex: CatalogExample) => ({
    id: ex.id,
    caption: pick(lang, ex.title) || pick(lang, ex.description),
    src: ex.posterUrl || ex.mediaUrl || "",
  }));

  // Pad to at least 6 tiles with placeholders
  const MIN_TILES = 6;
  if (tiles.length < MIN_TILES) {
    tiles.push(...placeholderTiles(MIN_TILES - tiles.length, lang));
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${t(lang, "previewTitle")} — ${pick(lang, catalog.title)}`}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/15 bg-[rgb(var(--bg1))] shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-white/10 bg-[rgb(var(--bg1))]/95 backdrop-blur-sm px-5 py-4">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-white truncate">
              {pick(lang, catalog.title)}
            </h2>
            <p className="text-xs text-white/60">{t(lang, "previewTitle")}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg border border-white/10 bg-white/[0.06] p-2 text-white/70 hover:text-white hover:bg-white/[0.12] transition-all"
            aria-label={t(lang, "close")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Preview grid */}
        <div className="p-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {tiles.map((tile) => (
              <div key={tile.id} className="group">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-white/10 bg-black/30">
                  {tile.src ? (
                    <Image
                      src={tile.src}
                      alt={tile.caption}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white/20 text-2xl">
                      📷
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                {tile.caption && (
                  <p className="mt-1.5 text-[11px] text-white/60 line-clamp-1 text-center">
                    {tile.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA buttons */}
        <div className="sticky bottom-0 border-t border-white/10 bg-[rgb(var(--bg1))]/95 backdrop-blur-sm px-5 py-4 flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={onChoosePackage}
            className="flex-1 inline-flex items-center justify-center rounded-xl border border-[rgb(var(--accent))]/40 bg-[rgb(var(--accent))]/20 px-4 py-3 text-sm font-medium text-white hover:bg-[rgb(var(--accent))]/35 hover:border-[rgb(var(--accent))]/60 transition-all"
          >
            {t(lang, "previewChoosePackage")}
          </button>
          <button
            type="button"
            onClick={onWhatsApp}
            className="flex-1 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-medium text-white/90 hover:bg-white/[0.12] hover:border-white/20 transition-all"
          >
            {t(lang, "previewWhatsApp")}
          </button>
        </div>
      </div>
    </div>
  );
}
