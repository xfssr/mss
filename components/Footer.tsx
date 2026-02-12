"use client";

import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";

export function Footer(props: { lang: Lang }) {
  return (
    <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 text-sm text-white/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="font-medium">© {new Date().getFullYear()} Micro-Screen Studio</div>
          <div className="flex items-center gap-4">
            <a
              className="hover:text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--blue))] focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 rounded-lg px-3 py-2 transition-all hover:bg-white/5"
              href="#top"
            >
              {t(props.lang, "footerTop")}
            </a>
            <a
              className="hover:text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--blue))] focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 rounded-lg px-3 py-2 transition-all hover:bg-white/5"
              href="#catalog"
            >
              {t(props.lang, "footerCatalog")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
