import type { Catalog } from "@/types/catalog";
import { CATALOGS } from "@/content/catalogs";

/**
 * Merge DB catalogs with static defaults.
 * DB entries take priority; any default not present in DB is appended.
 */
export function mergeCatalogsWithDefaults(dbCatalogs: Catalog[]): Catalog[] {
  const dbSlugs = new Set(dbCatalogs.map((c) => c.slug));
  const missing = CATALOGS.filter((c) => !dbSlugs.has(c.slug));
  return [...dbCatalogs, ...missing];
}
