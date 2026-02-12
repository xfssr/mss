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
        "group text-left cc-glass rounded-2xl overflow-hidden transition",
        "hover:border-white/20 hover:bg-white/[0.08]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--blue))]",
        selected ? "border-[rgb(var(--red))]/50" : "",
      ].join(" ")}
      aria-label={`Open catalog ${catalog.title[props.lang]}`}
    >
      {cover ? (
        <div className="relative aspect-[16/9]">
          <Image src={cover} alt={catalog.title[props.lang]} fill sizes="360px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          {selected ? <div className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full bg-[rgb(var(--red))]" /> : null}
        </div>
      ) : null}

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-semibold text-white">{catalog.title[props.lang]}</h3>
              {catalog.popular ? (
                <span className="text-[10px] rounded-full border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-2 py-0.5 text-white/80">
                  {t(props.lang, "popular")}
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-sm text-white/65">{catalog.shortDescription[props.lang]}</p>
          </div>

          <span className="shrink-0 rounded-full border border-white/10 px-2 py-1 text-[11px] text-white/60 group-hover:border-white/20 group-hover:text-white/70">
            {t(props.lang, "open")}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {catalog.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[11px] rounded-full border border-white/10 px-2 py-1 text-white/55">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
