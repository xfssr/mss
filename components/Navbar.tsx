"use client";

import { useState } from "react";
import Link from "next/link";
import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";
import { Logo } from "@/components/Logo";

/** Single source of truth for navigation items (used by both desktop and mobile). */
export const NAV_ITEMS: { labelKey: string; href: string; useLink?: boolean }[] = [
  { labelKey: "navExamples", href: "/#catalog", useLink: true },
  { labelKey: "navSolutions", href: "/#solutions", useLink: true },
  { labelKey: "navPricing", href: "/#packages" },
  { labelKey: "navContact", href: "#contact" },
];

const navLinkClass =
  "px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--blue))]";

export function Navbar(props: { lang: Lang; onSetLang: (l: Lang) => void }) {
  const isHe = props.lang === "he";
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/30 backdrop-blur-lg">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="flex items-center min-w-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--blue))] focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 rounded-lg px-2 py-1 transition-opacity hover:opacity-90"
          aria-label="Micro-Screen Studio"
        >
          <Logo variant="lockup" className="min-w-0" />
        </a>

        <nav className="flex items-center gap-2" aria-label="Main navigation">
          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) =>
              item.useLink ? (
                <Link key={item.labelKey} className={navLinkClass} href={item.href}>
                  {t(props.lang, item.labelKey)}
                </Link>
              ) : (
                <a key={item.labelKey} className={navLinkClass} href={item.href}>
                  {t(props.lang, item.labelKey)}
                </a>
              ),
            )}
          </div>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--blue))]"
            aria-label={t(props.lang, mobileOpen ? "menuClose" : "menuOpen")}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            )}
          </button>

          {/* Language switcher (always visible) */}
          <div className="ml-2 inline-flex rounded-xl border border-white/10 bg-black/30 p-1 backdrop-blur-sm" role="group" aria-label="Language">
            <button
              type="button"
              onClick={() => props.onSetLang("he")}
              aria-label="עברית"
              className={[
                "px-3 py-1.5 text-xs rounded-lg transition-all duration-200",
                isHe ? "bg-white/10 text-white shadow-sm" : "text-white/60 hover:text-white hover:bg-white/[0.06]",
              ].join(" ")}
            >
              עברית
            </button>
            <button
              type="button"
              onClick={() => props.onSetLang("en")}
              aria-label="English"
              className={[
                "px-3 py-1.5 text-xs rounded-lg transition-all duration-200",
                !isHe ? "bg-white/10 text-white shadow-sm" : "text-white/60 hover:text-white hover:bg-white/[0.06]",
              ].join(" ")}
            >
              EN
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/50 backdrop-blur-lg">
          <div className="flex flex-col px-4 py-2">
            {NAV_ITEMS.map((item) =>
              item.useLink ? (
                <Link
                  key={item.labelKey}
                  className="px-3 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                >
                  {t(props.lang, item.labelKey)}
                </Link>
              ) : (
                <a
                  key={item.labelKey}
                  className="px-3 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                >
                  {t(props.lang, item.labelKey)}
                </a>
              ),
            )}
          </div>
        </div>
      )}
    </header>
  );
}
