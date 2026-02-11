"use client";

import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";
import { Logo } from "@/components/Logo";

export function Navbar(props: { lang: Lang; onSetLang: (l: Lang) => void }) {
  const isHe = props.lang === "he";

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/25 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="flex items-center min-w-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--blue))] rounded-md px-2 py-1"
          aria-label="Micro-Screen Studio"
        >
          <Logo variant="lockup" className="min-w-0" />
        </a>

        <nav className="flex items-center gap-2">
          {/* Desktop links only */}
          <div className="hidden md:flex items-center gap-2">
            <a className="px-3 py-2 text-sm text-white/75 hover:text-white rounded-md" href="#catalog">
              {t(props.lang, "navCatalog")}
            </a>
            <a className="px-3 py-2 text-sm text-white/75 hover:text-white rounded-md" href="#about">
              {t(props.lang, "navAbout")}
            </a>
            <a className="px-3 py-2 text-sm text-white/75 hover:text-white rounded-md" href="#contact">
              {t(props.lang, "navContact")}
            </a>
          </div>

          {/* Language switcher (always visible) */}
          <div className="ml-2 inline-flex rounded-xl border border-white/10 bg-black/20 p-1">
            <button
              type="button"
              onClick={() => props.onSetLang("he")}
              className={[
                "px-3 py-1.5 text-xs rounded-lg",
                isHe ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/[0.06]",
              ].join(" ")}
            >
              עברית
            </button>
            <button
              type="button"
              onClick={() => props.onSetLang("en")}
              className={[
                "px-3 py-1.5 text-xs rounded-lg",
                !isHe ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/[0.06]",
              ].join(" ")}
            >
              EN
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
