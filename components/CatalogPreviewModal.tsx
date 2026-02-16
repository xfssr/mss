"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { Catalog, CatalogExample } from "@/types/catalog";
import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";
import { DRAWER_BACKDROP_CLASS } from "@/lib/drawerStyles";

function pick(lang: Lang, v: { he: string; en: string }) {
  const s = v?.[lang] ?? "";
  return s?.trim() ? s : v.he || v.en;
}

type Tab = "photos" | "video";

export function CatalogPreviewModal(props: {
  lang: Lang;
  catalog: Catalog;
  onClose: () => void;
}) {
  const { lang, catalog, onClose } = props;
  const [activeTab, setActiveTab] = useState<Tab>("photos");
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);

  const examples = catalog.examples ?? [];

  const photos = useMemo(
    () => examples.filter((ex) => ex.mediaType === "IMAGE"),
    [examples],
  );
  const videos = useMemo(
    () => examples.filter((ex) => ex.mediaType === "VIDEO"),
    [examples],
  );

  // Default to whichever tab has content
  useEffect(() => {
    if (photos.length === 0 && videos.length > 0) {
      setActiveTab("video");
    } else {
      setActiveTab("photos");
    }
    setActiveVideoIndex(null);
  }, [catalog.slug, photos.length, videos.length]);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function scrollToPackages() {
    onClose();
    // Use setTimeout so the modal is removed from DOM before scrolling
    setTimeout(() => {
      const el = document.getElementById("packages");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  const photoCount = photos.length;
  const videoCount = videos.length;

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
      <div
        className={[
          "relative w-full sm:max-w-2xl overflow-hidden border border-white/12 shadow-2xl",
          "rounded-t-2xl sm:rounded-2xl",
          "bg-[#0b0f14] sm:bg-[#0b0f14]/95 backdrop-blur-xl",
          "flex flex-col",
          "max-h-[100dvh] sm:max-h-[calc(100dvh-4rem)]",
        ].join(" ")}
      >
        {/* Header */}
        <div className="shrink-0 px-4 sm:px-6 pt-4 sm:pt-5 pb-3 border-b border-white/10 bg-white/[0.03] backdrop-blur">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-semibold text-[rgb(var(--blue))] truncate">
                {pick(lang, catalog.title)}
              </h2>
              <p className="mt-0.5 text-xs text-white/60 line-clamp-1">
                {pick(lang, catalog.shortDescription)}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-xl border border-white/12 bg-black/35 px-3 py-2 text-sm text-white/90 hover:bg-white/[0.07] hover:border-white/20 transition-all"
              aria-label={t(lang, "close")}
            >
              ✕
            </button>
          </div>

          {/* Tabs - only show if both types exist */}
          {photoCount > 0 && videoCount > 0 && (
            <div className="mt-3 flex gap-1 rounded-xl bg-white/[0.04] p-1 border border-white/10">
              <button
                type="button"
                onClick={() => { setActiveTab("photos"); setActiveVideoIndex(null); }}
                className={[
                  "flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                  activeTab === "photos"
                    ? "bg-white/[0.10] text-white shadow-sm"
                    : "text-white/60 hover:text-white/80 hover:bg-white/[0.04]",
                ].join(" ")}
              >
                {t(lang, "tabPhotos")} ({photoCount})
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab("video"); setActiveVideoIndex(null); }}
                className={[
                  "flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                  activeTab === "video"
                    ? "bg-white/[0.10] text-white shadow-sm"
                    : "text-white/60 hover:text-white/80 hover:bg-white/[0.04]",
                ].join(" ")}
              >
                {t(lang, "tabVideo")} ({videoCount})
              </button>
            </div>
          )}
        </div>

        {/* Scrollable body */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch] px-4 sm:px-6 py-4">
          {activeTab === "photos" ? (
            <PhotosView lang={lang} items={photos} />
          ) : (
            <VideosView
              lang={lang}
              items={videos}
              activeIndex={activeVideoIndex}
              onSelect={setActiveVideoIndex}
            />
          )}

          {/* Fallback when no examples */}
          {activeTab === "photos" && photoCount === 0 && videoCount > 0 && (
            <p className="text-xs text-white/40 text-center py-6">
              {lang === "he" ? "אין תמונות — עברו לוידאו" : "No photos — switch to video"}
            </p>
          )}
          {activeTab === "video" && videoCount === 0 && photoCount > 0 && (
            <p className="text-xs text-white/40 text-center py-6">
              {lang === "he" ? "אין וידאו — עברו לתמונות" : "No videos — switch to photos"}
            </p>
          )}
          {photoCount === 0 && videoCount === 0 && (
            <div className="flex items-center justify-center py-12 text-white/30 text-3xl">
              📷
            </div>
          )}
        </div>

        {/* Sticky footer CTA */}
        <div className="shrink-0 border-t border-white/10 bg-white/[0.03] backdrop-blur px-4 sm:px-6 pt-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
          <button
            type="button"
            onClick={scrollToPackages}
            className="w-full rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-5 py-3 text-sm font-medium text-white hover:bg-[rgb(var(--red))]/35 hover:border-[rgb(var(--red))]/60 transition-all"
          >
            {t(lang, "choosePackageBtn")}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Photos gallery ─── */

function PhotosView(props: { lang: Lang; items: CatalogExample[] }) {
  const { lang, items } = props;
  const [activeIdx, setActiveIdx] = useState(0);
  const safeIdx = Math.min(activeIdx, Math.max(0, items.length - 1));
  const active = items[safeIdx];

  if (items.length === 0) return null;

  return (
    <div className="space-y-3">
      {/* Main preview */}
      <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/10 bg-black/40">
        {active?.mediaUrl ? (
          <Image
            src={active.mediaUrl}
            alt={pick(lang, active.title) || "Photo"}
            fill
            sizes="(max-width: 640px) 100vw, 640px"
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/20 text-3xl">
            📷
          </div>
        )}
      </div>

      {/* Thumbnails row */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {items.map((ex, idx) => {
          const src = ex.mediaUrl || "";
          const isActive = idx === safeIdx;
          return (
            <button
              key={ex.id}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={[
                "shrink-0 relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border transition-all",
                isActive
                  ? "border-[rgb(var(--red))]/60 ring-1 ring-[rgb(var(--red))]/30"
                  : "border-white/10 hover:border-white/25",
              ].join(" ")}
              aria-label={pick(lang, ex.title) || `Photo ${idx + 1}`}
            >
              {src ? (
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white/20 text-sm">📷</div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Videos view ─── */

function VideosView(props: {
  lang: Lang;
  items: CatalogExample[];
  activeIndex: number | null;
  onSelect: (idx: number | null) => void;
}) {
  const { lang, items, activeIndex, onSelect } = props;

  if (items.length === 0) return null;

  // If a video is selected, show inline player
  if (activeIndex !== null) {
    const video = items[activeIndex];
    return (
      <div className="space-y-3">
        {/* Player */}
        <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/10 bg-black/40">
          <video
            src={video.mediaUrl}
            autoPlay
            playsInline
            controls
            poster={video.posterUrl || undefined}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-white/70 truncate">
            {pick(lang, video.title) || `Video ${activeIndex + 1}`}
          </p>
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="text-xs text-white/50 hover:text-white/80 transition-colors"
          >
            {lang === "he" ? "חזרה" : "Back"}
          </button>
        </div>
      </div>
    );
  }

  // Video thumbnails grid
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {items.map((ex, idx) => {
        const poster = ex.posterUrl || ex.mediaUrl || "";
        return (
          <button
            key={ex.id}
            type="button"
            onClick={() => onSelect(idx)}
            className="group relative aspect-[16/9] rounded-xl overflow-hidden border border-white/10 bg-black/30 hover:border-white/25 transition-all"
            aria-label={pick(lang, ex.title) || `Video ${idx + 1}`}
          >
            {poster ? (
              <Image
                src={poster}
                alt={pick(lang, ex.title) || ""}
                fill
                sizes="(max-width: 640px) 50vw, 200px"
                className="object-cover"
                loading="lazy"
              />
            ) : null}
            {/* Play icon overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
              <div className="rounded-full bg-black/60 border border-white/20 w-10 h-10 flex items-center justify-center">
                <span className="text-white text-sm ml-0.5">▶</span>
              </div>
            </div>
            <p className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-2 pb-1.5 pt-4 text-[10px] text-white/80 truncate">
              {pick(lang, ex.title) || `Video ${idx + 1}`}
            </p>
          </button>
        );
      })}
    </div>
  );
}
