"use client";

import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";
import { SOCIAL_LINKS } from "@/config/constants";

export function Footer(props: { lang: Lang }) {
  return (
    <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 text-sm text-white/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="font-medium">© {new Date().getFullYear()} Micro-Screen Studio</div>
          <div className="flex items-center gap-4">
            {/* Social icons */}
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-white/80 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"/>
              </svg>
            </a>
            <a
              href={SOCIAL_LINKS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="hover:text-white/80 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16.6 5.82A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48Z"/>
              </svg>
            </a>
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-white/80 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z"/>
              </svg>
            </a>
            <a
              className="hover:text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--blue))] focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 rounded-lg px-3 py-2 transition-all hover:bg-white/5"
              href="#top"
            >
              {t(props.lang, "footerTop")}
            </a>
            <a
              className="hover:text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--blue))] focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 rounded-lg px-3 py-2 transition-all hover:bg-white/5"
              href="#packages"
            >
              {t(props.lang, "footerCatalog")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
