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
 * When a DB catalog has zero examples, fill in fallback examples from
 * the matching static catalog so package cards are never empty.
 * Invalid entries (missing slug or title) are always filtered out.
 * Disabled slugs are excluded from the result.
 */
export function mergeCatalogsWithDefaults(
  dbCatalogs: Catalog[],
  disabledSlugs?: Set<string>,
): Catalog[] {
  const staticBySlug = new Map(CATALOGS.map((c) => [c.slug, c]));

  const valid = dbCatalogs.filter(isValidCatalog).map((c) => {
    if (c.examples.length === 0) {
      const fallback = staticBySlug.get(c.slug);
      if (fallback && fallback.examples.length > 0) {
        return { ...c, examples: fallback.examples };
      }
    }
    return c;
  });

  const dbSlugs = new Set(valid.map((c) => c.slug));
  const missing = CATALOGS.filter(
    (c) => !dbSlugs.has(c.slug) && isValidCatalog(c) && !(disabledSlugs && disabledSlugs.has(c.slug)),
  );
  const merged = [...valid, ...missing];
  if (disabledSlugs && disabledSlugs.size > 0) {
    return merged.filter((c) => !disabledSlugs.has(c.slug));
  }
  return merged;
}
