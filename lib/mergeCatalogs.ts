import type { Catalog } from "@/types/catalog";
import { CATALOGS } from "@/content/catalogs";

/** A catalog is valid if it has a slug and at least one non-empty title. */
function isValidCatalog(c: Catalog): boolean {
  return Boolean(c.slug && (c.title.he || c.title.en));
}

/**
 * Merge DB catalogs with static defaults.
 * DB catalogs take priority; any static defaults whose slug is not
 * present in the DB are appended so new categories are always visible.
 * Invalid entries (missing slug or title) are always filtered out.
 * Disabled slugs are excluded from the result.
 */
export function mergeCatalogsWithDefaults(
  dbCatalogs: Catalog[],
  disabledSlugs?: Set<string>,
): Catalog[] {
  const valid = dbCatalogs.filter(isValidCatalog);
  const dbSlugs = new Set(valid.map((c) => c.slug));
  const missing = CATALOGS.filter((c) => !dbSlugs.has(c.slug) && isValidCatalog(c));
  const merged = [...valid, ...missing];
  if (disabledSlugs && disabledSlugs.size > 0) {
    return merged.filter((c) => !disabledSlugs.has(c.slug));
  }
  return merged;
}
