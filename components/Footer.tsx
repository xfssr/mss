"use client";

import type { Lang } from "@/utils/i18n";
import { WHATSAPP_PHONE } from "@/utils/whatsapp";

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="border-t border-[color:var(--line)] bg-[color:var(--surface-1)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-10 pb-24 text-sm text-[color:var(--text-muted)] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8 lg:pb-10">
        <p>© {new Date().getFullYear()} Visual Growth Lab</p>
        <div className="flex items-center gap-4">
          <a href={`https://wa.me/${WHATSAPP_PHONE}`} target="_blank" rel="noreferrer" className="hover:text-[color:var(--text-primary)]">
            WhatsApp
          </a>
          <a href="#packages" className="hover:text-[color:var(--text-primary)]">
            {lang === "he" ? "שכבות שירות" : "Service Layers"}
          </a>
          <a href="#top" className="hover:text-[color:var(--text-primary)]">
            {lang === "he" ? "למעלה" : "Top"}
          </a>
        </div>
      </div>
    </footer>
  );
}
