"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCategoryDetails, saveCategoryDetails } from "@/lib/categoryDetailsStore";
import { getSolutions, saveSolutions } from "@/lib/solutionsStore";
import { savePackageDetails, type PackageDetail } from "@/lib/packageConfigStore";
import { disableCatalogSlug, enableCatalogSlug, saveDiscountConfig, type DiscountConfig } from "@/lib/catalogOverridesStore";
import { getTierExamplesConfig, saveTierExamplesConfig } from "@/lib/tierExamplesStore";
import type { TierExamplesConfig } from "@/types/catalog";
import type { CategoryDetail } from "@/content/categoryDetails";
import type { SolutionItem } from "@/content/solutions";

function s(v: FormDataEntryValue | null, fallback = "") {
  return String(v ?? fallback);
}

function i(v: FormDataEntryValue | null, fallback = 0) {
  const n = Number(v ?? "");
  return Number.isFinite(n) ? n : fallback;
}

function b(v: FormDataEntryValue | null) {
  return v === "on" || v === "true" || v === "1";
}

function tagsToJson(csv: string) {
  const tags = csv
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean)
    .slice(0, 12);
  return JSON.stringify(tags);
}

export async function updateSettings(formData: FormData) {
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {
      heroTitleHe: s(formData.get("heroTitleHe")),
      heroTitleEn: s(formData.get("heroTitleEn")),
      heroSubtitleHe: s(formData.get("heroSubtitleHe")),
      heroSubtitleEn: s(formData.get("heroSubtitleEn")),
      promoTextHe: s(formData.get("promoTextHe")),
      promoTextEn: s(formData.get("promoTextEn")),
      aboutTextHe: s(formData.get("aboutTextHe")),
      aboutTextEn: s(formData.get("aboutTextEn")),
      contactTextHe: s(formData.get("contactTextHe")),
      contactTextEn: s(formData.get("contactTextEn")),
      instagramHandle: s(formData.get("instagramHandle")),
      email: s(formData.get("email")),
    },
    create: { id: 1 },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/product");
  revalidatePath("/solutions");
}

export async function updatePricingConfig(formData: FormData) {
  await prisma.pricingConfig.upsert({
    where: { id: 1 },
    update: {
      currency: s(formData.get("currency")),
      duration2h: i(formData.get("duration2h")),
      duration4h: i(formData.get("duration4h")),
      duration8h: i(formData.get("duration8h")),
      durationDay: i(formData.get("durationDay")),
      durationWeek: i(formData.get("durationWeek")),
      perReel: i(formData.get("perReel")),
      perPhoto: i(formData.get("perPhoto")),
      monthlyStarter: i(formData.get("monthlyStarter")),
      monthlyGrowth: i(formData.get("monthlyGrowth")),
      monthlyPro: i(formData.get("monthlyPro")),
      socialManagement: i(formData.get("socialManagement")),
      targetingSetup: i(formData.get("targetingSetup")),
    },
    create: { id: 1 },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/product");
  revalidatePath("/solutions");
}

export async function createHeroMedia(formData: FormData) {
  await prisma.heroMedia.create({
    data: {
      imageUrl: s(formData.get("imageUrl")),
      titleHe: s(formData.get("titleHe")),
      titleEn: s(formData.get("titleEn")),
      order: i(formData.get("order")),
    },
  });
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/product");
  revalidatePath("/solutions");
}

export async function updateHeroMedia(id: number, formData: FormData) {
  await prisma.heroMedia.update({
    where: { id },
    data: {
      imageUrl: s(formData.get("imageUrl")),
      titleHe: s(formData.get("titleHe")),
      titleEn: s(formData.get("titleEn")),
      order: i(formData.get("order")),
    },
  });
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/product");
  revalidatePath("/solutions");
}

export async function deleteHeroMedia(id: number) {
  try {
    const { count } = await prisma.heroMedia.deleteMany({ where: { id } });
    if (count === 0 && process.env.NODE_ENV === "development") {
      console.warn(`[admin] heroMedia id=${id} already deleted`);
    }
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "code" in err && (err as { code: string }).code === "P2025") {
      console.warn("[deleteHeroMedia] Record already deleted (P2025), id:", id);
    } else {
      throw err;
    }
  }
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/product");
  revalidatePath("/solutions");
}

export async function createPriceItem(formData: FormData) {
  await prisma.priceItem.create({
    data: {
      titleHe: s(formData.get("titleHe")),
      titleEn: s(formData.get("titleEn")),
      price: s(formData.get("price")),
      noteHe: s(formData.get("noteHe")),
      noteEn: s(formData.get("noteEn")),
      detailsHe: s(formData.get("detailsHe")),
      detailsEn: s(formData.get("detailsEn")),
      order: i(formData.get("order")),
    },
  });
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/product");
  revalidatePath("/solutions");
}

export async function updatePriceItem(id: number, formData: FormData) {
  await prisma.priceItem.update({
    where: { id },
    data: {
      titleHe: s(formData.get("titleHe")),
      titleEn: s(formData.get("titleEn")),
      price: s(formData.get("price")),
      noteHe: s(formData.get("noteHe")),
      noteEn: s(formData.get("noteEn")),
      detailsHe: s(formData.get("detailsHe")),
      detailsEn: s(formData.get("detailsEn")),
      order: i(formData.get("order")),
    },
  });
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/product");
  revalidatePath("/solutions");
}

export async function deletePriceItem(id: number) {
  try {
    const { count } = await prisma.priceItem.deleteMany({ where: { id } });
    if (count === 0 && process.env.NODE_ENV === "development") {
      console.warn(`[admin] priceItem id=${id} already deleted`);
    }
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "code" in err && (err as { code: string }).code === "P2025") {
      console.warn("[deletePriceItem] Record already deleted (P2025), id:", id);
    } else {
      throw err;
    }
  }
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/product");
  revalidatePath("/solutions");
}

export async function createCatalog(formData: FormData) {
  const slug = s(formData.get("slug")).trim().toLowerCase();
  await prisma.catalog.create({
    data: {
      slug,
      popular: b(formData.get("popular")),
      coverImage: s(formData.get("coverImage")),
      titleHe: s(formData.get("titleHe")),
      titleEn: s(formData.get("titleEn")),
      shortDescriptionHe: s(formData.get("shortHe")),
      shortDescriptionEn: s(formData.get("shortEn")),
      longDescriptionHe: s(formData.get("longHe")),
      longDescriptionEn: s(formData.get("longEn")),
      tagsJson: tagsToJson(s(formData.get("tagsCsv"))),
      promoVideoUrl: s(formData.get("promoVideoUrl")),
      promoVideoTitleHe: s(formData.get("promoVideoTitleHe")),
      promoVideoTitleEn: s(formData.get("promoVideoTitleEn")),
      promoVideoDescriptionHe: s(formData.get("promoVideoDescriptionHe")),
      promoVideoDescriptionEn: s(formData.get("promoVideoDescriptionEn")),
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/product");
  revalidatePath("/solutions");
}

export async function updateCatalog(id: number, formData: FormData) {
  await prisma.catalog.update({
    where: { id },
    data: {
      popular: b(formData.get("popular")),
      coverImage: s(formData.get("coverImage")),
      titleHe: s(formData.get("titleHe")),
      titleEn: s(formData.get("titleEn")),
      shortDescriptionHe: s(formData.get("shortHe")),
      shortDescriptionEn: s(formData.get("shortEn")),
      longDescriptionHe: s(formData.get("longHe")),
      longDescriptionEn: s(formData.get("longEn")),
      tagsJson: tagsToJson(s(formData.get("tagsCsv"))),
      promoVideoUrl: s(formData.get("promoVideoUrl")),
      promoVideoTitleHe: s(formData.get("promoVideoTitleHe")),
      promoVideoTitleEn: s(formData.get("promoVideoTitleEn")),
      promoVideoDescriptionHe: s(formData.get("promoVideoDescriptionHe")),
      promoVideoDescriptionEn: s(formData.get("promoVideoDescriptionEn")),
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/product");
  revalidatePath("/solutions");
}

export async function deleteCatalog(id: number) {
  // Look up the slug before deleting so we can store a disable override
  try {
    const catalog = await prisma.catalog.findUnique({ where: { id }, select: { slug: true } });
    if (catalog?.slug) {
      await disableCatalogSlug(catalog.slug);
    }
    await prisma.catalog.deleteMany({ where: { id } });
  } catch (err: unknown) {
    // P2025: record not found — already deleted, treat as success
    if (typeof err === "object" && err !== null && "code" in err && (err as { code: string }).code === "P2025") {
      console.warn("[deleteCatalog] Record already deleted (P2025), id:", id);
    } else {
      throw err;
    }
  }
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/product");
  revalidatePath("/solutions");
}

export async function toggleCatalogActive(slug: string, isCurrentlyDisabled: boolean) {
  if (isCurrentlyDisabled) {
    await enableCatalogSlug(slug);
  } else {
    await disableCatalogSlug(slug);
  }
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/product");
  revalidatePath("/solutions");
}

export async function updateDiscountConfig(formData: FormData) {
  const config: DiscountConfig = {
    enabled: b(formData.get("discountEnabled")),
    percent: i(formData.get("discountPercent"), 10),
    labelHe: s(formData.get("discountLabelHe"), "הנחת הזמנה ראשונה"),
    labelEn: s(formData.get("discountLabelEn"), "First-order discount"),
  };
  await saveDiscountConfig(config);
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/product");
  revalidatePath("/solutions");
}

export async function createExample(catalogId: number, formData: FormData) {
  await prisma.example.create({
    data: {
      catalogId,
      titleHe: s(formData.get("titleHe")),
      titleEn: s(formData.get("titleEn")),
      mediaType: s(formData.get("videoUrl")) ? "VIDEO" : "IMAGE",
      mediaUrl: s(formData.get("videoUrl")) || s(formData.get("previewImage")) || s(formData.get("imageUrl")) || "",
      posterUrl: s(formData.get("videoUrl")) ? (s(formData.get("previewImage")) || s(formData.get("imageUrl"))) : null,
      descriptionHe: s(formData.get("descriptionHe")),
      descriptionEn: s(formData.get("descriptionEn")),
      link: s(formData.get("link")),
      order: i(formData.get("order")),
    },
  });
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/product");
  revalidatePath("/solutions");
}

export async function updateExample(id: number, formData: FormData) {
  await prisma.example.update({
    where: { id },
    data: {
      titleHe: s(formData.get("titleHe")),
      titleEn: s(formData.get("titleEn")),
      mediaType: s(formData.get("videoUrl")) ? "VIDEO" : "IMAGE",
      mediaUrl: s(formData.get("videoUrl")) || s(formData.get("previewImage")) || "",
      posterUrl: s(formData.get("videoUrl")) ? s(formData.get("previewImage")) : null,
      descriptionHe: s(formData.get("descriptionHe")),
      descriptionEn: s(formData.get("descriptionEn")),
      link: s(formData.get("link")),
      order: i(formData.get("order")),
    },
  });
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/product");
  revalidatePath("/solutions");
}

export async function deleteExample(id: number) {
  try {
    const { count } = await prisma.example.deleteMany({ where: { id } });
    if (count === 0 && process.env.NODE_ENV === "development") {
      console.warn(`[admin] example id=${id} already deleted`);
    }
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "code" in err && (err as { code: string }).code === "P2025") {
      console.warn("[deleteExample] Record already deleted (P2025), id:", id);
    } else {
      throw err;
    }
  }
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/product");
  revalidatePath("/solutions");
}

export async function updateCategoryDetailAction(jsonStr: string) {
  const parsed: CategoryDetail = JSON.parse(jsonStr);
  const all = await getCategoryDetails();
  const idx = all.findIndex((d) => d.slug === parsed.slug);
  if (idx >= 0) {
    all[idx] = parsed;
  } else {
    all.push(parsed);
  }
  await saveCategoryDetails(all);
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/product");
  revalidatePath("/solutions");
}

export async function updateSolutionAction(jsonStr: string) {
  const parsed: SolutionItem = JSON.parse(jsonStr);
  const all = await getSolutions();
  const idx = all.findIndex((d) => d.slug === parsed.slug);
  if (idx >= 0) {
    all[idx] = parsed;
  } else {
    all.push(parsed);
  }
  await saveSolutions(all);
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/solutions");
  revalidatePath("/product");
}

export async function updatePackageDetails(jsonStr: string) {
  const packages: PackageDetail[] = JSON.parse(jsonStr);
  await savePackageDetails(packages);
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/product");
  revalidatePath("/solutions");
}

export async function saveTierExamplesAction(catalogSlug: string, jsonStr: string) {
  let tiers: { tier1: number[]; tier2: number[]; tier3: number[] };
  try {
    tiers = JSON.parse(jsonStr);
  } catch {
    throw new Error("Invalid tier data");
  }
  if (
    !Array.isArray(tiers.tier1) ||
    !Array.isArray(tiers.tier2) ||
    !Array.isArray(tiers.tier3)
  ) {
    throw new Error("Invalid tier structure");
  }
  const config = await getTierExamplesConfig();
  config[catalogSlug] = tiers;
  await saveTierExamplesConfig(config);
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/product");
  revalidatePath("/solutions");
}
