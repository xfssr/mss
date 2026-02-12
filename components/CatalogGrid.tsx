"use client";

import type { Catalog } from "@/types/catalog";
import type { Lang } from "@/utils/i18n";
import { CatalogCard } from "./CatalogCard";

export function CatalogGrid(props: { lang: Lang; catalogs: Catalog[]; selectedSlug?: string; onSelect: (slug: string) => void; fromPrice?: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {props.catalogs.map((c) => (
        <CatalogCard key={c.slug} lang={props.lang} catalog={c} selected={props.selectedSlug === c.slug} fromPrice={props.fromPrice} onClick={() => props.onSelect(c.slug)} />
      ))}
    </div>
  );
}
