"use client";

import Image from "next/image";
import type { CatalogExample, Catalog } from "@/types/catalog";
import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";

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

/** Derive business type options from catalog data (single source of truth). */
export function getBusinessTypesFromCatalogs(catalogs: Catalog[]): { key: string; label: { he: string; en: string } }[] {
  return catalogs
    .filter((c) => c.slug !== "restaurant-menu-website")
    .map((c) => ({
      key: c.slug,
      label: c.title,
    }));
}

/**
 * Compact example thumbnails strip for package cards.
 * Shows 1 main thumbnail + up to 3 small thumbnails.
 * No per-card selector — controlled by the global business type selector.
 */
export function PackageExamples(props: {
  lang: Lang;
  examples: CatalogExample[];
  catalogs: Catalog[];
  businessType: BusinessTypeKey | null;
  onThumbnailClick: (catalogSlug: string) => void;
}) {
  const { lang, examples, catalogs, businessType, onThumbnailClick } = props;

  // Resolve displayed examples: if a business type is selected, pick from matching catalog
  let displayExamples = examples;
  let activeCatalogSlug: string | undefined;

  if (businessType) {
    // First try direct slug match, then use the mapping
    const slug = catalogs.find((c) => c.slug === businessType) ? businessType : catalogSlugForType(businessType);
    const matched = catalogs.find((c) => c.slug === slug);
    if (matched && matched.examples.length > 0) {
      displayExamples = matched.examples.slice(0, 4);
      activeCatalogSlug = matched.slug;
    }
  }

  if (!activeCatalogSlug) {
    // Find the catalog that contains the default examples
    const exampleKeys = new Set(examples.map((e) => `${e.id}:${e.mediaUrl}`));
    activeCatalogSlug = catalogs.find((c) =>
      c.examples.some((ex) => exampleKeys.has(`${ex.id}:${ex.mediaUrl}`)),
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
      <p className="text-[10px] font-medium text-white/50 uppercase tracking-wider mb-1.5">
        {t(lang, "pkgExamples")}
      </p>
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
