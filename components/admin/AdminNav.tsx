"use client";

import { useState, useEffect, useRef } from "react";

const sections = [
  { id: "homepage", label: "Homepage" },
  { id: "pricing", label: "Pricing" },
  { id: "hero-gallery", label: "Hero" },
  { id: "price-items", label: "Prices" },
  { id: "catalogs", label: "Catalogs" },
  { id: "solutions", label: "Solutions" },
] as const;

const pages = [
  { href: "/admin/case-studies", label: "Case Studies" },
] as const;

export function AdminNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop: inline buttons */}
      <nav className="hidden md:flex items-center gap-1">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="px-3 py-1.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            {s.label}
          </a>
        ))}
        {pages.map((p) => (
          <a
            key={p.href}
            href={p.href}
            className="px-3 py-1.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            {p.label}
          </a>
        ))}
      </nav>

      {/* Mobile: dropdown select */}
      <div className="md:hidden relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm text-white/70"
        >
          Sections
          <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {mobileOpen && (
          <div className="absolute right-0 top-full mt-1 z-50 rounded-xl border border-white/10 bg-[#0b0f14] shadow-xl py-1 min-w-[150px]">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/[0.06]"
              >
                {s.label}
              </a>
            ))}
            {pages.map((p) => (
              <a
                key={p.href}
                href={p.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/[0.06]"
              >
                {p.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
