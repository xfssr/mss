"use client";

import { useEffect } from "react";
import { DEFAULT_LANG, DIR_BY_LANG, STORAGE_KEY_LANG, type Lang } from "@/utils/i18n";

function safeReadLang(): Lang {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LANG);
    if (raw === "he" || raw === "en") return raw;
  } catch {
    // ignore
  }
  return DEFAULT_LANG;
}

export function LangProvider(props: { children: React.ReactNode }) {
  useEffect(() => {
    const apply = () => {
      const lang = safeReadLang();
      const dir = DIR_BY_LANG[lang];
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
    };

    apply();

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY_LANG) apply();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return <>{props.children}</>;
}
