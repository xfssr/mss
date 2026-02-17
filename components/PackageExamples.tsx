"use client";

import Image from "next/image";
import type { CatalogExample } from "@/types/catalog";
import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";

/**
 * Compact example thumbnails strip for package cards.
 * Shows 1 main thumbnail + up to 3 small thumbnails.
 * Clicking any thumbnail calls `onThumbnailClick`.
 */
export function PackageExamples(props: {
  lang: Lang;
  examples: CatalogExample[];
  onThumbnailClick: () => void;
}) {
  const { lang, examples, onThumbnailClick } = props;

  if (examples.length === 0) return null;

  const main = examples[0];
  const rest = examples.slice(1, 4);

  return (
    <div className="mt-3">
      <p className="text-[10px] font-medium text-white/50 uppercase tracking-wider mb-1.5">
        {t(lang, "pkgExamples")}
      </p>
      <div className="flex gap-1.5">
        {/* Main thumbnail */}
        <button
          type="button"
          onClick={onThumbnailClick}
          className="group relative shrink-0 w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-white/10 bg-black/30 hover:border-white/25 transition-all"
          aria-label={t(lang, "pkgExamples")}
        >
          {main.mediaUrl ? (
            <Image
              src={main.mediaUrl}
              alt=""
              fill
              sizes="80px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white/20 text-lg">
              📷
            </div>
          )}
        </button>

        {/* Small thumbnails */}
        {rest.map((ex) => (
          <button
            key={ex.id}
            type="button"
            onClick={onThumbnailClick}
            className="group relative shrink-0 w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-white/10 bg-black/30 hover:border-white/25 transition-all"
            aria-label={t(lang, "pkgExamples")}
          >
            {ex.mediaUrl ? (
              <Image
                src={ex.mediaUrl}
                alt=""
                fill
                sizes="80px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white/20 text-lg">
                📷
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
