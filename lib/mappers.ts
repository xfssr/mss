import type { Catalog as UiCatalog } from "@/types/catalog";
import type { HeroMedia as UiHeroMedia } from "@/types/hero";
import type { PricingConfig as UiPricing } from "@/types/pricing";
import type { PriceItem as UiPriceItem } from "@/types/price";
import type { SiteSettings as UiSettings } from "@/types/settings";
import type { Catalog, Example, HeroMedia, PriceItem, PricingConfig, SiteSettings } from "@prisma/client";

function parseTags(tagsJson: string): string[] {
  try {
    const v = JSON.parse(tagsJson);
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

// lib/mappers.ts
export function dbExampleToUi(row: any) {
  return {
    id: row.id,
    order: row.order ?? 0,
    title: { he: row.titleHe ?? "", en: row.titleEn ?? "" },
    description: { he: row.descriptionHe ?? "", en: row.descriptionEn ?? "" },
    mediaType: row.mediaType as "IMAGE" | "VIDEO",
    mediaUrl: row.mediaUrl,
    posterUrl: row.posterUrl ?? null,
    link: row.link ?? null,
  };
}



export function dbPricingToUi(p: PricingConfig): UiPricing {
  return {
    currency: p.currency,
    duration2h: p.duration2h,
    duration4h: p.duration4h,
    duration8h: p.duration8h,
    durationDay: p.durationDay,
    durationWeek: p.durationWeek,
    perReel: p.perReel,
    perPhoto: p.perPhoto,
    monthlyStarter: p.monthlyStarter,
    monthlyGrowth: p.monthlyGrowth,
    monthlyPro: p.monthlyPro,
    socialManagement: p.socialManagement,
    targetingSetup: p.targetingSetup,
  };
}

export function dbHeroToUi(h: HeroMedia): UiHeroMedia {
  return {
    id: h.id,
    imageUrl: h.imageUrl,
    title: { he: h.titleHe, en: h.titleEn },
    order: h.order,
  };
}

export function dbPriceToUi(p: PriceItem): UiPriceItem {
  return {
    id: p.id,
    title: { he: p.titleHe, en: p.titleEn },
    price: p.price,
    note: { he: p.noteHe, en: p.noteEn },
    details: { he: p.detailsHe, en: p.detailsEn },
  };
}

export function dbCatalogToUi(db: Catalog & { examples: Example[] }): UiCatalog {
  return {
    slug: db.slug,
    title: { he: db.titleHe, en: db.titleEn },
    shortDescription: { he: db.shortDescriptionHe, en: db.shortDescriptionEn },
    longDescription: { he: db.longDescriptionHe, en: db.longDescriptionEn },
    coverImage: db.coverImage || undefined,
    promoVideoUrl: db.promoVideoUrl || undefined,
    promoVideoTitle: { he: db.promoVideoTitleHe, en: db.promoVideoTitleEn },
    promoVideoDescription: { he: db.promoVideoDescriptionHe, en: db.promoVideoDescriptionEn },
    tags: parseTags(db.tagsJson),
    popular: db.popular,
    examples: [...db.examples]
      .sort((a, b) => (a.order - b.order) || (a.id - b.id))
      .map((e) => dbExampleToUi(e)),
  };
  
}
export function dbSettingsToUi(s: SiteSettings): UiSettings {
  return {
    heroTitle: { he: s.heroTitleHe, en: s.heroTitleEn },
    heroSubtitle: { he: s.heroSubtitleHe, en: s.heroSubtitleEn },
    promoText: { he: s.promoTextHe, en: s.promoTextEn },
    aboutText: { he: s.aboutTextHe, en: s.aboutTextEn },
    contactText: { he: s.contactTextHe, en: s.contactTextEn },
    instagramHandle: s.instagramHandle,
    email: s.email,
  };
}
