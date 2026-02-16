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
  filterFood: ["food", "chef", "kitchen", "שף", "מטבח"],
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

function matchesSearch(catalog: Catalog, query: string): boolean {
  if (!query.trim()) return true;
  const q = query.toLowerCase().trim();
  const searchIn = [
    catalog.title.he,
    catalog.title.en,
    catalog.shortDescription.he,
    catalog.shortDescription.en,
    ...catalog.tags,
  ]
    .join(" ")
    .toLowerCase();
  return searchIn.includes(q);
}

export function CatalogGrid(props: {
  lang: Lang;
  catalogs: Catalog[];
  selectedSlug?: string;
  onSelect: (slug: string) => void;
  onPreview?: (slug: string) => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read filter from URL query ?cat=
  const catFromUrl = searchParams.get("cat") ?? "";
  const initialFilter = FILTER_SLUG_MAP[catFromUrl] ?? "filterAll";

  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [searchQuery, setSearchQuery] = useState("");

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
    setSearchQuery("");
  }, [changeFilter]);

  // Only show filter tabs that have at least one matching catalog
  const visibleFilterKeys = useMemo(() => {
    return FILTER_KEYS.filter(
      (key) => key === "filterAll" || props.catalogs.some((c) => matchesFilter(c, key)),
    );
  }, [props.catalogs]);

  const filtered = useMemo(() => {
    return props.catalogs.filter(
      (c) => matchesFilter(c, activeFilter) && matchesSearch(c, searchQuery)
    );
  }, [props.catalogs, activeFilter, searchQuery]);

  const hasActiveFilters = activeFilter !== "filterAll" || searchQuery.trim().length > 0;

  return (
    <div>
      {/* Search input */}
      <div className="mb-4">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t(props.lang, "searchPlaceholder")}
          className="w-full rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-[rgb(var(--blue))] focus:border-[rgb(var(--blue))]/50 transition-all"
          aria-label={props.lang === "he" ? "חיפוש בפורטפוליו לפי קטגוריה או מילת מפתח" : "Search portfolio by category or keyword"}
        />
      </div>

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
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--blue))] focus-visible:ring-offset-2 focus-visible:ring-offset-black/50",
                active
                  ? "bg-[rgb(var(--blue))]/20 border border-[rgb(var(--blue))]/50 text-white shadow-sm"
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
              onPreview={props.onPreview ? () => props.onPreview!(c.slug) : undefined}
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
