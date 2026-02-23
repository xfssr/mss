import { prisma } from "@/lib/prisma";
import { DEFAULT_CATEGORY_DETAILS, type CategoryDetail } from "@/content/categoryDetails";

/**
 * Read overrides from DB (SiteSettings.contentOverridesJson).
 * Returns the parsed categoryDetails array stored in the overrides, or [].
 */
async function readOverrides(): Promise<CategoryDetail[]> {
  try {
    const row = await prisma.siteSettings.findFirst({ where: { id: 1 } });
    if (!row?.contentOverridesJson) return [];
    const parsed = JSON.parse(row.contentOverridesJson);
    const arr = parsed?.categoryDetails;
    return Array.isArray(arr) ? arr : [];
  } catch (err) {
    console.warn("[categoryDetailsStore] Failed to read overrides:", err);
    return [];
  }
}

export async function getCategoryDetails(): Promise<CategoryDetail[]> {
  const stored = await readOverrides();

  // Merge: stored entries take priority, append any defaults not present in stored
  const storedSlugs = new Set(stored.map((d) => d.slug));
  const missing = DEFAULT_CATEGORY_DETAILS.filter((d) => !storedSlugs.has(d.slug));
  return [...stored, ...missing];
}

export async function getCategoryDetailBySlug(slug: string): Promise<CategoryDetail | undefined> {
  const all = await getCategoryDetails();
  return all.find((d) => d.slug === slug);
}

export async function saveCategoryDetails(details: CategoryDetail[]): Promise<void> {
  try {
    const row = await prisma.siteSettings.findFirst({ where: { id: 1 } });
    let overrides: Record<string, unknown> = {};
    try {
      if (row?.contentOverridesJson) {
        overrides = JSON.parse(row.contentOverridesJson) ?? {};
      }
    } catch { /* ignore parse errors */ }

    overrides.categoryDetails = details;

    await prisma.siteSettings.upsert({
      where: { id: 1 },
      update: { contentOverridesJson: JSON.stringify(overrides) },
      create: { id: 1, contentOverridesJson: JSON.stringify(overrides) },
    });
  } catch (err) {
    console.warn("[categoryDetailsStore] Failed to save overrides:", err);
  }
}
