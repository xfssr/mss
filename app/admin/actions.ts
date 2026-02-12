"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

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
}

export async function deleteHeroMedia(id: number) {
  await prisma.heroMedia.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
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
}

export async function deletePriceItem(id: number) {
  await prisma.priceItem.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
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
}

export async function deleteCatalog(id: number) {
  await prisma.catalog.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function createExample(catalogId: number, formData: FormData) {
  await prisma.example.create({
    data: {
      catalogId,
      titleHe: s(formData.get("titleHe")),
      titleEn: s(formData.get("titleEn")),
      previewImage: s(formData.get("previewImage")) || s(formData.get("imageUrl")),
      videoUrl: s(formData.get("videoUrl")),
      descriptionHe: s(formData.get("descriptionHe")),
      descriptionEn: s(formData.get("descriptionEn")),
      link: s(formData.get("link")),
      order: i(formData.get("order")),
    },
  });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateExample(id: number, formData: FormData) {
  await prisma.example.update({
    where: { id },
    data: {
      titleHe: s(formData.get("titleHe")),
      titleEn: s(formData.get("titleEn")),
      previewImage: s(formData.get("previewImage")),
      videoUrl: s(formData.get("videoUrl")),
      descriptionHe: s(formData.get("descriptionHe")),
      descriptionEn: s(formData.get("descriptionEn")),
      link: s(formData.get("link")),
      order: i(formData.get("order")),
    },
  });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteExample(id: number) {
  await prisma.example.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}
