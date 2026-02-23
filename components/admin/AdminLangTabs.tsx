"use client";

import { useState, type ReactNode } from "react";

export function AdminLangTabs({ heContent, enContent }: { heContent: ReactNode; enContent: ReactNode }) {
  const [lang, setLang] = useState<"he" | "en">("he");

  return (
    <div>
      <div className="flex gap-1 mb-4">
        <button
          type="button"
          onClick={() => setLang("he")}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            lang === "he"
              ? "bg-[rgb(var(--accent))]/20 text-[rgb(var(--accent))] border border-[rgb(var(--accent))]/30"
              : "text-white/50 hover:text-white/70 border border-transparent"
          }`}
        >
          עברית (HE)
        </button>
        <button
          type="button"
          onClick={() => setLang("en")}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            lang === "en"
              ? "bg-[rgb(var(--accent))]/20 text-[rgb(var(--accent))] border border-[rgb(var(--accent))]/30"
              : "text-white/50 hover:text-white/70 border border-transparent"
          }`}
        >
          English (EN)
        </button>
      </div>
      {/* Both tabs always rendered so hidden fields remain in DOM for form submission */}
      <div className={lang === "he" ? "" : "hidden"}>{heContent}</div>
      <div className={lang === "en" ? "" : "hidden"}>{enContent}</div>
    </div>
  );
}
