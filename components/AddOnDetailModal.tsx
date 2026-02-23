"use client";

import { useEffect } from "react";
import type { Lang } from "@/utils/i18n";
import type { AddonConfig } from "@/config/addons";
import { t } from "@/utils/i18n";

function pick(lang: Lang, v: { he: string; en: string }) {
  const s = v?.[lang] ?? "";
  return s?.trim() ? s : v.he;
}

export function AddOnDetailModal(props: {
  lang: Lang;
  addon: AddonConfig;
  onClose: () => void;
}) {
  const { lang, addon, onClose } = props;
  const dir = lang === "he" ? "rtl" : "ltr";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ height: "100dvh" }}
      role="dialog"
      aria-modal="true"
      dir={dir}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/75 sm:bg-black/65 backdrop-blur-[1px] sm:backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full sm:max-w-md overflow-hidden border border-white/12 shadow-2xl rounded-t-2xl sm:rounded-2xl bg-[#0b0f14]/95 backdrop-blur-xl flex flex-col max-h-[80dvh] sm:max-h-[calc(100dvh-8rem)]">
        {/* Header with close button */}
        <div className="shrink-0 px-4 sm:px-6 pt-4 sm:pt-5 pb-3 border-b border-white/10 bg-white/[0.03] backdrop-blur">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-[rgb(var(--accent))]">
                {t(lang, addon.titleKey)}
              </h2>
              <p className="mt-1 text-sm text-white/70">
                ₪{addon.price} {t(lang, "addonPerMonth")}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-xl border border-white/12 bg-black/35 px-3 py-2 text-sm text-white/90 hover:bg-white/[0.07] hover:border-white/20"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch] px-4 sm:px-6 py-4 sm:py-5 space-y-4">
          {/* What's included */}
          <section>
            <h3 className="text-sm font-semibold text-[rgb(var(--accent))] mb-2">
              {t(lang, "addonWhatsIncluded")}
            </h3>
            <ul className="space-y-1.5">
              {addon.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                  <span className="text-[rgb(var(--accent))] mt-0.5 shrink-0">✓</span>
                  {pick(lang, bullet)}
                </li>
              ))}
            </ul>
          </section>

          {/* Not included */}
          <section>
            <h3 className="text-xs font-medium text-white/40 mb-1">
              {t(lang, "addonNotIncluded")}
            </h3>
            <p className="text-xs text-white/50">
              {pick(lang, addon.notIncluded)}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
