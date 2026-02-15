"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { CatalogExample, Catalog } from "@/types/catalog";
import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";
import { DescriptionClamp } from "./DescriptionClamp";

function useIsMobile() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    function check() {
      setMobile(window.innerWidth < 640);
    }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return mobile;
}

export function ExamplesTab(props: {
  lang: Lang;
  examples: CatalogExample[];
  activeExampleIndex: number;
  safeIndex: number;
  activeExample: CatalogExample | undefined;
  catalog: Catalog;
  reducedMotion: boolean;
  onSelectExample: (idx: number) => void;
  onOpenLightbox: () => void;
  onNextTab: () => void;
  onOrderSimilar?: () => void;
  onContinueToProduct?: () => void;
}) {
  const { lang, examples, activeExample, reducedMotion } = props;

  const hasVideo = useMemo(
    () => !!(activeExample?.mediaType === "VIDEO" && activeExample?.mediaUrl),
    [activeExample],
  );

  const heroSrc = useMemo(() => {
    if (hasVideo) return activeExample?.posterUrl || activeExample?.mediaUrl || "";
    return activeExample?.mediaUrl || "";
  }, [hasVideo, activeExample]);

  const isMobile = useIsMobile();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
      {/* Hero preview */}
      <div className="lg:col-span-2 space-y-3">
        <div className="cc-glass bg-black/45 rounded-2xl p-3 sm:p-4">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/45">
            <button
              type="button"
              onClick={props.onOpenLightbox}
              className="relative aspect-[16/9] w-full block"
            >
              {hasVideo ? (
                <video
                  src={activeExample!.mediaUrl}
                  autoPlay={!reducedMotion && !isMobile}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  controls={reducedMotion || isMobile}
                  poster={activeExample!.posterUrl || undefined}
                  className="h-full w-full object-cover"
                />
              ) : heroSrc ? (
                <Image
                  src={heroSrc}
                  alt={activeExample?.title?.[lang] || "Preview"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                  priority={props.safeIndex === 0}
                />
              ) : null}
              {!hasVideo && heroSrc ? (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
                  <span className="rounded-full bg-black/50 border border-white/20 px-3 py-1.5 text-xs text-white/90">
                    {lang === "he" ? "הגדל" : "Enlarge"}
                  </span>
                </div>
              ) : null}
            </button>
          </div>

          {/* Thumbnails strip */}
          <div className="mt-3 grid grid-cols-4 sm:grid-cols-6 gap-2">
            {examples.slice(0, 9).map((ex, idx) => {
              const active = idx === props.activeExampleIndex;
              const thumbSrc =
                ex.mediaType === "VIDEO"
                  ? (ex.posterUrl || ex.mediaUrl)
                  : ex.mediaUrl;

              if (!thumbSrc) return null;

              return (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() => props.onSelectExample(idx)}
                  className={[
                    "relative aspect-[16/9] overflow-hidden rounded-xl border",
                    active ? "border-[rgb(var(--red))]/60 ring-1 ring-[rgb(var(--red))]/30" : "border-white/10 hover:border-white/20",
                  ].join(" ")}
                  aria-label={ex.title?.[lang] || `Example ${idx + 1}`}
                >
                  <Image src={thumbSrc} alt="" fill sizes="120px" className="object-cover" />
                  {ex.mediaType === "VIDEO" ? (
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="rounded-full bg-black/50 border border-white/15 px-1.5 py-0.5 text-[9px] text-white/90">
                        ▶
                      </div>
                    </div>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Info card + CTA */}
      <div className="lg:col-span-1">
        <div className="cc-glass bg-black/45 rounded-2xl p-4 space-y-4">
          <div className="text-sm font-medium text-white/90">
            {activeExample?.title?.[lang]?.trim() || props.catalog.title[lang]}
          </div>

          {activeExample?.description?.[lang]?.trim() ? (
            <DescriptionClamp
              lang={lang}
              text={activeExample.description[lang]}
              className="text-xs text-white/60"
            />
          ) : null}

          <div className="text-sm text-white/80">
            {lang === "he"
              ? "צפו בדוגמאות וגלו סגנונות שונים."
              : "Browse examples and discover different styles."}
          </div>
        </div>
      </div>
    </div>
  );
}
