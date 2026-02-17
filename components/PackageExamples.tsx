"use client";

import Image from "next/image";
import type { CatalogExample, Catalog } from "@/types/catalog";
import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";

/** Maps business type selector values to catalog slugs for filtering. */
export const BUSINESS_TYPES = [
  { key: "bars", i18nKey: "bizTypeBars" },
  { key: "restaurants", i18nKey: "bizTypeRestaurants" },
  { key: "hotels", i18nKey: "bizTypeHotels" },
  { key: "events", i18nKey: "bizTypeEvents" },
  { key: "real-estate", i18nKey: "bizTypeRealEstate" },
  { key: "services", i18nKey: "bizTypeServices" },
] as const;

export type BusinessTypeKey = (typeof BUSINESS_TYPES)[number]["key"];

/** Resolve which catalog slug to use for a given business type key. */
function catalogSlugForType(key: BusinessTypeKey): string {
  switch (key) {
    case "bars":
      return "bars";
    case "restaurants":
      return "bars"; // closest available catalog
    case "hotels":
      return "hotels";
    case "events":
      return "events";
    case "real-estate":
      return "hotels"; // closest available catalog
    case "services":
      return "events"; // closest available catalog
  }
}

/**
 * Compact example thumbnails strip for package cards.
 * Shows 1 main thumbnail + up to 3 small thumbnails.
 * Includes a compact business-type selector to filter examples.
 */
export function PackageExamples(props: {
  lang: Lang;
  examples: CatalogExample[];
  catalogs: Catalog[];
  businessType: BusinessTypeKey | null;
  onBusinessTypeChange: (bt: BusinessTypeKey | null) => void;
  onThumbnailClick: (catalogSlug: string) => void;
}) {
  const { lang, examples, catalogs, businessType, onBusinessTypeChange, onThumbnailClick } = props;

  // Resolve displayed examples: if a business type is selected, pick from matching catalog
  let displayExamples = examples;
  let activeCatalogSlug: string | undefined;

  if (businessType) {
    const slug = catalogSlugForType(businessType);
    const matched = catalogs.find((c) => c.slug === slug);
    if (matched && matched.examples.length > 0) {
      displayExamples = matched.examples.slice(0, 4);
      activeCatalogSlug = matched.slug;
    }
  }

  if (!activeCatalogSlug) {
    // Find the catalog that contains the default examples
    activeCatalogSlug = catalogs.find((c) =>
      c.examples.some((ex) => examples.some((e) => e.id === ex.id && e.mediaUrl === ex.mediaUrl)),
    )?.slug;
  }

  if (displayExamples.length === 0) return null;

  const main = displayExamples[0];
  const rest = displayExamples.slice(1, 4);

  function handleClick() {
    if (activeCatalogSlug) {
      onThumbnailClick(activeCatalogSlug);
    }
  }

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <p className="text-[10px] font-medium text-white/50 uppercase tracking-wider">
          {t(lang, "pkgExamples")}
        </p>
        <select
          value={businessType ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            onBusinessTypeChange(val ? (val as BusinessTypeKey) : null);
          }}
          className="text-[10px] rounded-lg border border-white/10 bg-black/35 px-2 py-1 text-white/70 outline-none focus:ring-1 focus:ring-[rgb(var(--blue))] max-w-[130px] truncate"
          aria-label={t(lang, "bizTypeLabel")}
        >
          <option value="">{t(lang, "bizTypeLabel")}</option>
          {BUSINESS_TYPES.map((bt) => (
            <option key={bt.key} value={bt.key}>
              {t(lang, bt.i18nKey)}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-1.5">
        {/* Main thumbnail */}
        <button
          type="button"
          onClick={handleClick}
          className="group relative shrink-0 w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-white/10 bg-black/30 hover:border-white/25 transition-all"
          aria-label={t(lang, "pkgExamples")}
        >
          {main.mediaUrl ? (
            <Image
              src={main.mediaUrl}
              alt=""
              fill
              sizes="80px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white/20 text-lg">
              📷
            </div>
          )}
        </button>

        {/* Small thumbnails */}
        {rest.map((ex) => (
          <button
            key={ex.id}
            type="button"
            onClick={handleClick}
            className="group relative shrink-0 w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-white/10 bg-black/30 hover:border-white/25 transition-all"
            aria-label={t(lang, "pkgExamples")}
          >
            {ex.mediaUrl ? (
              <Image
                src={ex.mediaUrl}
                alt=""
                fill
                sizes="80px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white/20 text-lg">
                📷
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
