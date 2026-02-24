"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { CatalogExample } from "@/types/catalog";
import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";

type ExampleItem = {
  kind: string;
  url: string;
  posterUrl?: string | null;
};

/** Convert API items to CatalogExample[] so the gallery viewer can consume them. */
function toCatalogExamples(items: ExampleItem[]): CatalogExample[] {
  return items.map((item, idx) => ({
    id: idx,
    order: idx,
    title: { he: "", en: "" },
    description: { he: "", en: "" },
    mediaType: item.kind === "video" ? "VIDEO" : "IMAGE",
    mediaUrl: item.url,
    posterUrl: item.posterUrl ?? null,
  }));
}

/**
 * Fetches and displays package examples from the /api/examples endpoint.
 * Shown in the always-visible top area of package cards.
 */
export function PackageExamplesFromApi(props: {
  lang: Lang;
  tierKey: string;
  onThumbnailClick?: (examples: CatalogExample[], startIndex: number) => void;
}) {
  const { lang, tierKey, onThumbnailClick } = props;
  const [items, setItems] = useState<ExampleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    const params = new URLSearchParams({ tierKey });
    fetch(`/api/examples?${params}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("fetch failed"))))
      .then((data) => {
        // Support both { ok, items } and raw array responses
        const arr: ExampleItem[] = Array.isArray(data) ? data : (data?.items ?? []);
        console.log("[examples]", { tierKey, data });
        setItems(arr);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [tierKey]);

  if (loading) {
    return (
      <div className="mt-3">
        <p className="text-[10px] font-medium text-white/50 uppercase tracking-wider mb-1.5">
          {t(lang, "pkgExamples")}
        </p>
        <div className="flex gap-1.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="shrink-0 aspect-[9/16] w-[56px] sm:w-[64px] rounded-lg border border-white/10 bg-white/[0.04] animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-3">
        <p className="text-[10px] font-medium text-white/50 uppercase tracking-wider mb-1.5">
          {t(lang, "pkgExamples")}
        </p>
        <p className="text-xs text-red-400/70 italic">
          {lang === "he" ? "שגיאה בטעינת דוגמאות." : "Error loading examples."}
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mt-3">
        <p className="text-[10px] font-medium text-white/50 uppercase tracking-wider mb-1.5">
          {t(lang, "pkgExamples")}
        </p>
        <p className="text-xs text-white/30 italic">
          {lang === "he" ? "דוגמאות יופיעו כאן בקרוב." : "Examples will appear here soon."}
        </p>
      </div>
    );
  }

  const catalogExamples = toCatalogExamples(items);

  return (
    <div className="mt-3">
      <p className="text-[10px] font-medium text-white/50 uppercase tracking-wider mb-1.5">
        {t(lang, "pkgExamples")} ({items.length})
      </p>
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {items.map((item, idx) => {
          const isVideo = item.kind === "video";
          const thumbSrc = isVideo ? (item.posterUrl || item.url) : item.url;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onThumbnailClick?.(catalogExamples, idx)}
              className="group relative shrink-0 aspect-[9/16] w-[56px] sm:w-[64px] rounded-lg overflow-hidden border border-white/10 bg-black/30 hover:border-white/25 transition-all"
              aria-label={t(lang, "pkgExamples")}
            >
              {isVideo && !item.posterUrl ? (
                <video
                  src={item.url}
                  className="w-full h-full object-cover"
                  muted
                  preload="metadata"
                />
              ) : thumbSrc ? (
                <Image
                  src={thumbSrc}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white/20 text-lg">
                  📷
                </div>
              )}
              {isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-black/50 border border-white/15 w-6 h-6 flex items-center justify-center">
                    <span className="text-white text-[9px]">▶</span>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
