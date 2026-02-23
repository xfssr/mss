"use client";

import { useState, type ReactNode } from "react";

export function AdminAccordion({
  title,
  id,
  defaultOpen = false,
  count,
  children,
}: {
  title: string;
  id: string;
  defaultOpen?: boolean;
  count?: number;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section id={id} className="cc-glass rounded-3xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/[0.03] transition-colors"
      >
        <span className="text-xl font-semibold text-[rgb(var(--accent))] flex items-center gap-2">
          {title}
          {count !== undefined && (
            <span className="text-xs font-normal text-white/40 bg-white/[0.06] rounded-full px-2 py-0.5">
              {count}
            </span>
          )}
        </span>
        <svg
          aria-hidden="true"
          className={`w-5 h-5 text-white/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-6 pb-6">{children}</div>}
    </section>
  );
}
