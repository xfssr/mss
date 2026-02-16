"use client";

import type { Catalog } from "@/types/catalog";
import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";
import { CatalogCard } from "./CatalogCard";

export function CatalogGrid(props: {
  lang: Lang;
  catalogs: Catalog[];
  selectedSlug?: string;
  onSelect: (slug: string) => void;
}) {
  const catalogs = props.catalogs;

  return (
    <div>
      {/* Grid */}
      {catalogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {catalogs.map((c) => (
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
