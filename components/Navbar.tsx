"use client";

import { useState } from "react";
import type { Lang } from "@/utils/i18n";

const NAV = {
  he: [
    { href: "#process", label: "תהליך" },
    { href: "#packages", label: "שירותים" },
    { href: "#portfolio", label: "דוגמאות" },
    { href: "#contact", label: "יצירת קשר" },
  ],
  en: [
    { href: "#process", label: "Process" },
    { href: "#packages", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#contact", label: "Contact" },
  ],
};

export function Navbar(props: { lang: Lang; onSetLang: (l: Lang) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = NAV[props.lang];
  const isHe = props.lang === "he";

  return (
    <header className="sticky top-0 z-30 border-b border-[color:var(--line)] bg-[color:var(--surface-0)]/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="text-sm font-semibold tracking-[0.12em] text-[color:var(--text-primary)]">
          VISUAL GROWTH LAB
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((item) => (
            <a key={item.href} href={item.href} className="rounded-md px-3 py-2 text-sm text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]">
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-md border border-[color:var(--line)] p-1">
            <button
              type="button"
              onClick={() => props.onSetLang("he")}
              className={`rounded px-2 py-1 text-xs ${isHe ? "bg-[color:var(--surface-2)] text-[color:var(--text-primary)]" : "text-[color:var(--text-secondary)]"}`}
            >
              עב
            </button>
            <button
              type="button"
              onClick={() => props.onSetLang("en")}
              className={`rounded px-2 py-1 text-xs ${!isHe ? "bg-[color:var(--surface-2)] text-[color:var(--text-primary)]" : "text-[color:var(--text-secondary)]"}`}
            >
              EN
            </button>
          </div>
          <button
            type="button"
            className="rounded-md border border-[color:var(--line)] p-2 text-[color:var(--text-primary)] md:hidden"
            aria-label="menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            ≡
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[color:var(--line)] p-2 md:hidden">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm text-[color:var(--text-secondary)] hover:bg-[color:var(--surface-2)] hover:text-[color:var(--text-primary)]"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
