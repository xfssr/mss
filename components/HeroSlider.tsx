"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { HeroMedia } from "@/types/hero";
import type { Lang } from "@/utils/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function HeroSlider(props: { lang: Lang; items: HeroMedia[]; intervalMs?: number }) {
  const reduced = usePrefersReducedMotion();
  const intervalMs = props.intervalMs ?? 2400;

  const safeItems = useMemo(() => (props.items ?? []).filter((x) => !!x.imageUrl), [props.items]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduced) return;
    if (safeItems.length <= 1) return;
    const t = window.setInterval(() => setIdx((v) => (v + 1) % safeItems.length), intervalMs);
    return () => window.clearInterval(t);
  }, [intervalMs, reduced, safeItems.length]);

  if (!safeItems.length) return null;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/25 shadow-2xl backdrop-blur-sm">
      <div className="relative aspect-[16/10] sm:aspect-[16/9]">
        {safeItems.map((it, i) => {
          const active = i === idx;
          return (
            <div
              key={it.id}
              className={[
                "absolute inset-0 transition-opacity duration-1000",
                active ? "opacity-100 z-10" : "opacity-0 z-0",
                reduced ? "transition-none" : "",
              ].join(" ")}
            >
              <Image
                src={it.imageUrl}
                alt={it.title?.[props.lang] || "Hero"}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </div>
          );
        })}
      </div>
      
      {/* Индикаторы слайдов */}
      {safeItems.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
          {safeItems.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={[
                "h-1.5 rounded-full transition-all duration-300",
                i === idx ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60",
              ].join(" ")}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
