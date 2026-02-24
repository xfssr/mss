"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";

type ExampleItem = {
  kind: string;
  url: string;
  posterUrl?: string | null;
};

/**
 * Fetches and displays package examples from the /api/examples endpoint.
 * Shown inside the expanded "More/פרטים" section of package cards.
 */
export function PackageExamplesFromApi(props: {
  lang: Lang;
  tierKey: string;
  catalogKey?: string;
}) {
  const { lang, tierKey, catalogKey } = props;
  const [items, setItems] = useState<ExampleItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams({ tierKey });
    if (catalogKey) params.set("catalogKey", catalogKey);
    fetch(`/api/examples?${params}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data: ExampleItem[]) => {
        setItems(data);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [tierKey, catalogKey]);

  if (!loaded) return null;

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

  return (
    <div className="mt-3">
      <p className="text-[10px] font-medium text-white/50 uppercase tracking-wider mb-1.5">
        {t(lang, "pkgExamples")}
      </p>
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {items.map((item, idx) => {
          const isVideo = item.kind === "video";
          const thumbSrc = isVideo ? (item.posterUrl || item.url) : item.url;

          return (
            <div
              key={idx}
              className="group relative shrink-0 w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-white/10 bg-black/30"
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
                  sizes="80px"
                  className="object-cover"
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
