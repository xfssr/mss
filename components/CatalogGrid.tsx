"use client";

import { useMemo, useState } from "react";
import type { Catalog } from "@/types/catalog";
import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";
import { CatalogCard } from "./CatalogCard";

const FILTER_KEYS = [
  "filterAll",
  "filterFood",
  "filterBar",
  "filterBeauty",
  "filterFlowers",
  "filterTattoo",
  "filterRealEstate",
] as const;

const FILTER_TAG_MAP: Record<string, string[]> = {
  filterFood: ["food", "restaurant", "chef", "kitchen", "מסעדה", "שף", "מטבח"],
  filterBar: ["bar", "bartender", "cocktail", "בר", "ברמן"],
  filterBeauty: ["beauty", "nails", "cosmetics", "makeup", "ביוטי", "ציפורניים", "קוסמטיקה", "איפור"],
  filterFlowers: ["flowers", "retail", "shop", "פרחים", "קמעונאות", "חנות"],
  filterTattoo: ["tattoo", "services", "קעקוע", "שירותים"],
  filterRealEstate: ["real estate", "apartment", "rent", "נדלן", "דירה", "השכרה"],
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

export function CatalogGrid(props: { lang: Lang; catalogs: Catalog[]; selectedSlug?: string; onSelect: (slug: string) => void; fromPrice?: string }) {
  const [activeFilter, setActiveFilter] = useState("filterAll");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return props.catalogs.filter(
      (c) => matchesFilter(c, activeFilter) && matchesSearch(c, searchQuery)
    );
  }, [props.catalogs, activeFilter, searchQuery]);

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
          aria-label={t(props.lang, "searchPlaceholder")}
        />
      </div>

      {/* Filter chips */}
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Category filters">
        {FILTER_KEYS.map((key) => {
          const active = activeFilter === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveFilter(key)}
              className={[
                "rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--blue))] focus-visible:ring-offset-2 focus-visible:ring-offset-black/50",
                active
                  ? "bg-[rgb(var(--red))]/25 border border-[rgb(var(--red))]/50 text-white shadow-sm"
                  : "border border-white/10 bg-white/[0.06] text-white/70 hover:bg-white/[0.10] hover:border-white/20 hover:text-white",
              ].join(" ")}
              aria-pressed={active}
            >
              {t(props.lang, key)}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {filtered.map((c) => (
            <CatalogCard key={c.slug} lang={props.lang} catalog={c} selected={props.selectedSlug === c.slug} fromPrice={props.fromPrice} onClick={() => props.onSelect(c.slug)} />
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
