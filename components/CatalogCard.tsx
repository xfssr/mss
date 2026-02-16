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
  onPreview?: () => void;
}) {
  const { catalog, selected } = props;
  const example0 = catalog.examples?.[0] as unknown as { preview?: string; image?: string; src?: string } | undefined;
  const cover = catalog.coverImage || example0?.preview || example0?.image || example0?.src;

  return (
    <div
      className={[
        "group cc-glass rounded-2xl overflow-hidden transition-all duration-300",
        "hover:border-white/25 hover:bg-white/[0.10] hover:shadow-2xl hover:-translate-y-1",
        selected ? "border-[rgb(var(--blue))]/60 shadow-xl" : "",
      ].join(" ")}
    >
      {/* Clickable image area */}
      <button
        type="button"
        onClick={props.onClick}
        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--blue))] focus-visible:ring-inset"
        aria-label={`Open catalog ${pick(props.lang, catalog.title)}`}
      >
        {cover ? (
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image src={cover} alt={pick(props.lang, catalog.title)} fill sizes="360px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-90" />
            {selected ? <div className="absolute top-3 right-3 h-3 w-3 rounded-full bg-[rgb(var(--blue))] shadow-lg animate-pulse" /> : null}
          </div>
        ) : null}
      </button>

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
          <p className="mt-1 text-xs text-[rgb(var(--blue))]/80">{t(props.lang, "catalogBenefit")}</p>
          <p className="mt-1.5 text-sm text-white/70 leading-relaxed group-hover:text-white/85 transition-colors line-clamp-2">{pick(props.lang, catalog.shortDescription)}</p>
        </div>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {catalog.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[11px] rounded-full border border-white/10 px-2 py-0.5 text-white/60 group-hover:border-white/15 group-hover:text-white/70 transition-all">
              {tag}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={props.onClick}
            className="shrink-0 rounded-xl border border-[rgb(var(--blue))]/30 bg-[rgb(var(--blue))]/10 px-3 py-1.5 text-xs font-medium text-white/90 group-hover:bg-[rgb(var(--blue))]/20 group-hover:border-[rgb(var(--blue))]/50 transition-all"
          >
            {catalog.microCta?.[props.lang] || t(props.lang, "openArrow")}
          </button>

          {props.onPreview && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                props.onPreview?.();
              }}
              className="shrink-0 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-white/70 hover:bg-white/[0.10] hover:border-white/20 hover:text-white transition-all"
            >
              {t(props.lang, "previewBtn")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

