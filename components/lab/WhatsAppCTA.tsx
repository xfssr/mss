import React from "react";
import type { Lang } from "@/utils/i18n";
import { buildWaMeUrl, WHATSAPP_PHONE } from "@/utils/whatsapp";

export function WhatsAppCTA({ lang, text }: { lang: Lang; text: string }) {
  const href = buildWaMeUrl(
    WHATSAPP_PHONE,
    lang === "he"
      ? "שלום, אני מעוניין/ת לבנות מערכת צמיחה חזותית לעסק."
      : "Hi, I want to build a visual growth system for my business.",
  );

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[color:var(--line)] bg-[color:var(--surface-0)]/95 p-3 backdrop-blur md:hidden">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="lab-btn lab-btn-primary flex w-full items-center justify-center"
        aria-label="WhatsApp CTA"
      >
        {text}
      </a>
    </div>
  );
}
