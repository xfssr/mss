import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { DEFAULT_CATEGORY_DETAILS, type CategoryDetail } from "@/content/categoryDetails";

const DATA_PATH = join(process.cwd(), "data", "categoryDetails.json");

export function getCategoryDetails(): CategoryDetail[] {
  try {
    if (existsSync(DATA_PATH)) {
      const raw = readFileSync(DATA_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fall through to defaults
  }
  return DEFAULT_CATEGORY_DETAILS;
}

export function getCategoryDetailBySlug(slug: string): CategoryDetail | undefined {
  return getCategoryDetails().find((d) => d.slug === slug);
}

export function saveCategoryDetails(details: CategoryDetail[]): void {
  try {
    const dir = dirname(DATA_PATH);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(DATA_PATH, JSON.stringify(details, null, 2), "utf-8");
  } catch {
    // read-only filesystem (e.g. Vercel) — silently skip
  }
}
