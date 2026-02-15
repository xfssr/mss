import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { DEFAULT_CATEGORY_DETAILS, type CategoryDetail } from "@/content/categoryDetails";

const DATA_PATH = join(process.cwd(), "data", "categoryDetails.json");

export function getCategoryDetails(): CategoryDetail[] {
  let stored: CategoryDetail[] = [];
  try {
    if (existsSync(DATA_PATH)) {
      const raw = readFileSync(DATA_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) stored = parsed;
    }
  } catch (err) {
    console.warn("[categoryDetailsStore] Failed to read config, using defaults:", err);
  }

  // Merge: stored entries take priority, append any defaults not present in stored
  const storedSlugs = new Set(stored.map((d) => d.slug));
  const missing = DEFAULT_CATEGORY_DETAILS.filter((d) => !storedSlugs.has(d.slug));
  return [...stored, ...missing];
}

export function getCategoryDetailBySlug(slug: string): CategoryDetail | undefined {
  return getCategoryDetails().find((d) => d.slug === slug);
}

export function saveCategoryDetails(details: CategoryDetail[]): void {
  try {
    const dir = dirname(DATA_PATH);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(DATA_PATH, JSON.stringify(details, null, 2), "utf-8");
  } catch (err) {
    console.warn("[categoryDetailsStore] Failed to save config (read-only fs?):", err);
  }
}
