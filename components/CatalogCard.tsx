"use client";

import { useState } from "react";
import Image from "next/image";
import type { Catalog, CatalogExample } from "@/types/catalog";
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
  const [expanded, setExpanded] = useState(false);
  const example0 = catalog.examples?.[0] as unknown as { preview?: string; image?: string; src?: string } | undefined;
  const cover = catalog.coverImage || example0?.preview || example0?.image || example0?.src;

  const examples = catalog.examples ?? [];
  const thumbs = examples.slice(0, 9);

  return (
    <div
      className={[
        "group cc-glass rounded-2xl overflow-hidden transition-all duration-300",
        "hover:border-white/25 hover:bg-white/[0.10] hover:shadow-2xl hover:-translate-y-1",
        selected ? "border-[rgb(var(--blue))]/60 shadow-xl" : "",
      ].join(" ")}
    >
      {/* Clickable image area */}
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

        {/* Single red CTA button */}
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="shrink-0 rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-4 py-2 text-xs font-medium text-white hover:bg-[rgb(var(--red))]/35 hover:border-[rgb(var(--red))]/60 transition-all"
          >
            {t(props.lang, "catalogOpen")}
          </button>
        </div>
      </div>

      {/* Inline accordion with thumbnails */}
      {expanded && (
        <div className="border-t border-white/10 px-4 sm:px-5 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
          {thumbs.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {thumbs.map((ex: CatalogExample) => {
                const src = ex.posterUrl || ex.mediaUrl || "";
                const caption = pick(props.lang, ex.title) || pick(props.lang, ex.description);
                return (
                  <div key={ex.id} className="group/thumb">
                    <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-white/10 bg-black/30">
                      {src ? (
                        <Image
                          src={src}
                          alt={caption}
                          fill
                          sizes="(max-width: 640px) 33vw, 20vw"
                          className="object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-white/20 text-xl">
                          📷
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-white/40 text-center py-2">📷</p>
          )}
          <a
            href="#packages"
            className="inline-flex items-center gap-1 text-xs text-[rgb(var(--red))]/80 hover:text-[rgb(var(--red))] transition-colors"
          >
            {t(props.lang, "goToPackages")} →
          </a>
        </div>
      )}
    </div>
  );
}
