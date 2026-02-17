"use client";

import Image from "next/image";
import type { Catalog } from "@/types/catalog";
import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";

function pick(lang: Lang, v: { he: string; en: string }) {
  const s = v?.[lang] ?? "";
  return s?.trim() ? s : v.he || v.en;
}

export function CatalogCard(props: {
  lang: Lang;
  catalog: Catalog;
  selected?: boolean;
  onClick: () => void;
}) {
  const { catalog, selected } = props;
  const example0 = catalog.examples?.[0] as unknown as { preview?: string; image?: string; src?: string } | undefined;
  const cover = catalog.coverImage || example0?.preview || example0?.image || example0?.src;

  return (
    <button
      type="button"
      onClick={props.onClick}
      className={[
        "group cc-glass rounded-2xl overflow-hidden transition-all duration-300 text-start w-full",
        "hover:border-white/25 hover:bg-white/[0.10] hover:shadow-2xl hover:-translate-y-1",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--blue))] focus-visible:ring-offset-2 focus-visible:ring-offset-black/50",
        selected ? "border-[rgb(var(--blue))]/60 shadow-xl" : "",
      ].join(" ")}
      aria-label={`${t(props.lang, "catalogOpen")} ${pick(props.lang, catalog.title)}`}
    >
      {/* Cover image */}
      {cover ? (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image src={cover} alt={pick(props.lang, catalog.title)} fill sizes="360px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-90" />
          {selected ? <div className="absolute top-3 right-3 h-3 w-3 rounded-full bg-[rgb(var(--blue))] shadow-lg animate-pulse" /> : null}
        </div>
      ) : null}

      <div className="p-4 sm:p-5">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[rgb(var(--blue))] transition-colors">{pick(props.lang, catalog.title)}</h3>
            {catalog.popular ? (
              <span className="text-[10px] rounded-full border border-[rgb(var(--blue))]/50 bg-[rgb(var(--blue))]/15 px-2.5 py-0.5 text-white/90 font-medium shadow-sm">
                {t(props.lang, "popular")}
              </span>
            ) : null}
          </div>
          <p className="mt-1.5 text-sm text-white/70 leading-relaxed group-hover:text-white/85 transition-colors line-clamp-2">{pick(props.lang, catalog.shortDescription)}</p>
        </div>

        {/* Red CTA button */}
        <div className="mt-4">
          <span className="inline-flex items-center justify-center rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-4 py-2 text-xs font-medium text-white group-hover:bg-[rgb(var(--red))]/35 group-hover:border-[rgb(var(--red))]/60 transition-all">
            {t(props.lang, "catalogOpen")}
          </span>
        </div>
      </div>
    </button>
  );
}
