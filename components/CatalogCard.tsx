"use client";

import Image from "next/image";
import type { Catalog } from "@/types/catalog";
import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";

export function CatalogCard(props: { lang: Lang; catalog: Catalog; selected?: boolean; onClick: () => void }) {
  const { catalog, selected } = props;
  const example0 = catalog.examples?.[0] as unknown as { preview?: string; image?: string; src?: string } | undefined;
  const cover = catalog.coverImage || example0?.preview || example0?.image || example0?.src;

  return (
    <button
      type="button"
      onClick={props.onClick}
      className={[
        "group text-left cc-glass rounded-2xl overflow-hidden transition-all duration-300",
        "hover:border-white/25 hover:bg-white/[0.10] hover:shadow-2xl hover:-translate-y-1",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--blue))] focus-visible:ring-offset-2 focus-visible:ring-offset-black/50",
        selected ? "border-[rgb(var(--red))]/60 shadow-xl" : "",
      ].join(" ")}
      aria-label={`Open catalog ${catalog.title[props.lang]}`}
    >
      {cover ? (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image src={cover} alt={catalog.title[props.lang]} fill sizes="360px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-90" />
          {selected ? <div className="absolute top-3 right-3 h-3 w-3 rounded-full bg-[rgb(var(--red))] shadow-lg animate-pulse" /> : null}
        </div>
      ) : null}

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-bold text-white group-hover:text-[rgb(var(--blue))] transition-colors">{catalog.title[props.lang]}</h3>
              {catalog.popular ? (
                <span className="text-[10px] rounded-full border border-[rgb(var(--red))]/50 bg-[rgb(var(--red))]/25 px-2.5 py-0.5 text-white/90 font-medium shadow-sm">
                  {t(props.lang, "popular")}
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-sm text-white/70 leading-relaxed group-hover:text-white/85 transition-colors">{catalog.shortDescription[props.lang]}</p>
          </div>

          <span className="shrink-0 rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/60 group-hover:border-white/25 group-hover:text-white/80 group-hover:bg-white/5 transition-all">
            {t(props.lang, "open")}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {catalog.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[11px] rounded-full border border-white/10 px-2.5 py-1 text-white/60 group-hover:border-white/15 group-hover:text-white/70 transition-all">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
