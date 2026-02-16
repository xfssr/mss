"use client";

import { useEffect, useState } from "react";
import type { SolutionItem } from "@/content/solutions";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SolutionCard } from "@/components/SolutionCard";
import { SolutionDetailModal } from "@/components/SolutionDetailModal";
import { Section } from "@/components/Section";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { DEFAULT_LANG, STORAGE_KEY_LANG, t, type Lang } from "@/utils/i18n";

export function SolutionsClient(props: { solutions: SolutionItem[] }) {
  const [lang, setLang] = useLocalStorageState<Lang>(STORAGE_KEY_LANG, DEFAULT_LANG);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  useEffect(() => {
    try {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
    } catch {
      // ignore
    }
  }, [lang]);

  const selected = selectedSlug ? props.solutions.find((s) => s.slug === selectedSlug) ?? null : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f14] via-[#0a0c10] to-[#06070a] text-white">
      <Navbar lang={lang} onSetLang={setLang} />

      <Section id="solutions" title={t(lang, "sectionSolutions")}>
        <p className="text-sm text-white/70 mb-6">{t(lang, "solutionsIntro")}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {props.solutions.map((item) => (
            <SolutionCard
              key={item.slug}
              lang={lang}
              item={item}
              onSelect={() => setSelectedSlug(item.slug)}
            />
          ))}
        </div>
      </Section>

      {selected && (
        <SolutionDetailModal
          lang={lang}
          item={selected}
          onClose={() => setSelectedSlug(null)}
        />
      )}

      <Footer lang={lang} />
    </div>
  );
}
