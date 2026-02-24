"use client";

import Image from "next/image";
import type { CatalogExample, Catalog, TierExamplesConfig } from "@/types/catalog";
import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";
import { buildTieredFromConfig, getExamplesForTier } from "@/utils/tierExamples";

export type BusinessTypeKey = string;

/** Resolve which catalog slug to use for a given business type key.
 *  When no exact catalog exists for a type, we fall back to the
 *  most thematically similar catalog available in the data. */
function catalogSlugForType(key: BusinessTypeKey): string {
  switch (key) {
    case "bars":
      return "bars";
    case "restaurants":
      return "bars"; // food & drink share similar visual style
    case "hotels":
      return "hotels";
    case "events":
      return "events";
    case "real-estate":
      return "hotels"; // interior/property photography style
    case "services":
      return "events"; // people & action shots style
    default:
      return key; // use slug directly for catalog-derived types
  }
}

/** Skeleton placeholder for a single thumbnail slot. */
function ThumbSkeleton() {
  return (
    <div className="shrink-0 aspect-[9/16] w-[56px] sm:w-[64px] rounded-lg border border-white/10 bg-white/[0.04] animate-pulse" />
  );
}

/** Thumbnail for a single example — handles both image and video items. */
function ExampleThumb(props: {
  ex: CatalogExample;
  lang: Lang;
  onClick: () => void;
}) {
  const { ex, lang, onClick } = props;
  const isVideo = ex.mediaType === "VIDEO";
  const hasPoster = isVideo && !!ex.posterUrl;
  const thumbSrc = isVideo ? ex.posterUrl : ex.mediaUrl;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative shrink-0 aspect-[9/16] w-[56px] sm:w-[64px] rounded-lg overflow-hidden border border-white/10 bg-black/30 hover:border-white/25 transition-all"
      aria-label={t(lang, "pkgExamples")}
    >
      {isVideo && !hasPoster ? (
        <video
          src={`${ex.mediaUrl}#t=0.001`}
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="metadata"
        />
      ) : thumbSrc ? (
        <Image
          src={thumbSrc}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="64px"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-white/20 text-lg">
          📷
        </div>
      )}
      {/* Play overlay for video items */}
      {isVideo && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="rounded-full bg-black/50 border border-white/15 w-6 h-6 flex items-center justify-center">
            <span className="text-white text-[9px]">▶</span>
          </div>
        </div>
      )}
    </button>
  );
}

/**
 * Compact example thumbnails strip for package cards.
 * Shows up to 4 thumbnails from the tier-appropriate example set.
 * No per-card selector — controlled by the global business type selector.
 *
 * tier: 1 = Starter, 2 = Business, 3 = Monthly
 */
export function PackageExamples(props: {
  lang: Lang;
  examples: CatalogExample[];
  catalogs: Catalog[];
  businessType: BusinessTypeKey | null;
  tier: 1 | 2 | 3;
  tierConfig: TierExamplesConfig;
  catalogSlug?: string;
  loading?: boolean;
  onThumbnailClick: (examples: CatalogExample[], startIndex: number) => void;
}) {
  const { lang, examples, catalogs, businessType, tier, tierConfig, onThumbnailClick } = props;

  // Skeleton placeholders while loading
  if (props.loading) {
    return (
      <div className="mt-3">
        <p className="text-[10px] font-medium text-white/50 uppercase tracking-wider mb-1.5">
          {t(lang, "pkgExamples")}
        </p>
        <div className="flex gap-1.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <ThumbSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  // Resolve displayed examples: if a business type is selected, pick from matching catalog
  let sourceExamples = examples;
  let sourceSlug = props.catalogSlug ?? "";

  if (businessType) {
    // First try direct slug match, then use the mapping
    const slug = catalogs.find((c) => c.slug === businessType) ? businessType : catalogSlugForType(businessType);
    const matched = catalogs.find((c) => c.slug === slug);
    if (matched && matched.examples.length > 0) {
      sourceExamples = matched.examples;
      sourceSlug = matched.slug;
    }
  }

  // Build tiered examples from explicit config and pick the appropriate tier
  const tiered = buildTieredFromConfig(sourceExamples, sourceSlug, tierConfig);
  const displayExamples = getExamplesForTier(tiered, tier, 4);

  // Empty state — subtle message instead of rendering nothing
  if (displayExamples.length === 0) {
    return (
      <div className="mt-3">
        <p className="text-[10px] font-medium text-white/50 uppercase tracking-wider mb-1.5">
          {t(lang, "pkgExamples")}
        </p>
        <p className="text-xs text-white/30 italic">
          {t(lang, "pkgNoExamples")}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-3">
      <p className="text-[10px] font-medium text-white/50 uppercase tracking-wider mb-1.5">
        {t(lang, "pkgExamples")}
      </p>
      {/* 2-3 on mobile, 3-4 on desktop via hidden classes */}
      <div className="flex gap-1.5">
        {displayExamples.map((ex, idx) => (
          <ExampleThumb
            key={ex.id}
            ex={ex}
            lang={lang}
            onClick={() => onThumbnailClick(displayExamples, idx)}
          />
        ))}
      </div>
    </div>
  );
}
