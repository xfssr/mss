"use client";

import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";

export function Footer(props: { lang: Lang }) {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-white/45">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Micro-Screen Studio</div>
          <div className="flex items-center gap-4">
            <a
              className="hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--blue))] rounded-md px-2 py-1"
              href="#top"
            >
              {t(props.lang, "footerTop")}
            </a>
            <a
              className="hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--blue))] rounded-md px-2 py-1"
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
