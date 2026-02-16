"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Catalog } from "@/types/catalog";
import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";
import { CatalogCard } from "./CatalogCard";

const FILTER_KEYS = [
  "filterAll",
  "filterBar",
  "filterEvents",
  "filterHotels",
  "filterRestaurants",
  "filterRealEstate",
  "filterBeauty",
  "filterTattoo",
  "filterFlowers",
  "filterRetail",
  "filterServices",
  "filterFood",
] as const;

/** URL query key → filter key mapping */
const FILTER_SLUG_MAP: Record<string, string> = {
  bars: "filterBar",
  events: "filterEvents",
  hotels: "filterHotels",
  restaurants: "filterRestaurants",
  "real-estate": "filterRealEstate",
  beauty: "filterBeauty",
  tattoo: "filterTattoo",
  flowers: "filterFlowers",
  retail: "filterRetail",
  services: "filterServices",
  food: "filterFood",
};

const SLUG_BY_FILTER: Record<string, string> = Object.fromEntries(
  Object.entries(FILTER_SLUG_MAP).map(([slug, key]) => [key, slug]),
);

const FILTER_TAG_MAP: Record<string, string[]> = {
  filterFood: ["food", "restaurant", "chef", "kitchen", "מסעדה", "שף", "מטבח"],
  filterBar: ["bar", "bartender", "cocktail", "בר", "ברמן"],
  filterBeauty: ["beauty", "nails", "cosmetics", "makeup", "ביוטי", "ציפורניים", "קוסמטיקה", "איפור"],
  filterFlowers: ["flowers", "פרחים"],
  filterTattoo: ["tattoo", "קעקוע"],
  filterRealEstate: ["real estate", "apartment", "rent", "נדלן", "דירה", "השכרה"],
  filterEvents: ["event", "wedding", "party", "אירוע", "חתונה", "מסיבה"],
  filterHotels: ["hotel", "zimmer", "accommodation", "מלון", "צימר"],
  filterRestaurants: ["restaurant", "מסעדה"],
  filterRetail: ["retail", "online", "shop", "ecommerce", "קמעונאות", "חנות", "אונליין"],
  filterServices: ["services", "שירותים"],
};

function matchesFilter(catalog: Catalog, filterKey: string): boolean {
  if (filterKey === "filterAll") return true;
  const tagKeywords = FILTER_TAG_MAP[filterKey] || [];
  const catalogTags = catalog.tags.map((tag) => tag.toLowerCase());
  const titleHe = catalog.title.he.toLowerCase();
  const titleEn = catalog.title.en.toLowerCase();
  const descHe = catalog.shortDescription.he.toLowerCase();
  const descEn = catalog.shortDescription.en.toLowerCase();
  const searchIn = [...catalogTags, titleHe, titleEn, descHe, descEn].join(" ");
  return tagKeywords.some((kw) => searchIn.includes(kw));
}

export function CatalogGrid(props: {
  lang: Lang;
  catalogs: Catalog[];
  selectedSlug?: string;
  onSelect: (slug: string) => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read filter from URL query ?cat=
  const catFromUrl = searchParams.get("cat") ?? "";
  const initialFilter = FILTER_SLUG_MAP[catFromUrl] ?? "filterAll";

  const [activeFilter, setActiveFilter] = useState(initialFilter);

  // Sync filter state when URL changes
  useEffect(() => {
    const cat = searchParams.get("cat") ?? "";
    const mapped = FILTER_SLUG_MAP[cat] ?? "filterAll";
    setActiveFilter(mapped);
  }, [searchParams]);

  const changeFilter = useCallback(
    (filterKey: string) => {
      setActiveFilter(filterKey);
      const sp = new URLSearchParams(searchParams.toString());
      if (filterKey === "filterAll") {
        sp.delete("cat");
      } else {
        const slug = SLUG_BY_FILTER[filterKey];
        if (slug) sp.set("cat", slug);
      }
      const qs = sp.toString();
      router.replace(qs ? `/?${qs}#catalog` : "/#catalog", { scroll: false });
    },
    [router, searchParams],
  );

  const clearFilters = useCallback(() => {
    changeFilter("filterAll");
  }, [changeFilter]);

  // Only show filter tabs that have at least one matching catalog
  const visibleFilterKeys = useMemo(() => {
    return FILTER_KEYS.filter(
      (key) => key === "filterAll" || props.catalogs.some((c) => matchesFilter(c, key)),
    );
  }, [props.catalogs]);

  const filtered = useMemo(() => {
    return props.catalogs.filter(
      (c) => matchesFilter(c, activeFilter)
    );
  }, [props.catalogs, activeFilter]);

  const hasActiveFilters = activeFilter !== "filterAll";

  return (
    <div>
      {/* Filter chips + Clear filters */}
      <div className="mb-6 flex flex-wrap items-center gap-2" role="group" aria-label="Category filters">
        {visibleFilterKeys.map((key) => {
          const active = activeFilter === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => changeFilter(key)}
              className={[
                "rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--red))] focus-visible:ring-offset-2 focus-visible:ring-offset-black/50",
                active
                  ? "bg-[rgb(var(--red))]/20 border border-[rgb(var(--red))]/50 text-white shadow-sm"
                  : "border border-white/10 bg-white/[0.06] text-white/70 hover:bg-white/[0.10] hover:border-white/20 hover:text-white",
              ].join(" ")}
              aria-pressed={active}
            >
              {t(props.lang, key)}
            </button>
          );
        })}

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-full px-3 py-2 text-xs text-white/50 hover:text-white/80 transition-colors"
          >
            ✕ {t(props.lang, "clearFilters")}
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {filtered.map((c) => (
            <CatalogCard
              key={c.slug}
              lang={props.lang}
              catalog={c}
              selected={props.selectedSlug === c.slug}
              onClick={() => props.onSelect(c.slug)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-black/25 p-8 text-center">
          <p className="text-sm text-white/60">{t(props.lang, "noResults")}</p>
        </div>
      )}
    </div>
  );
}
