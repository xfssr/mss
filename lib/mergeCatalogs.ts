import type { Catalog } from "@/types/catalog";
import { CATALOGS } from "@/content/catalogs";

/** A catalog is valid if it has a slug and at least one non-empty title. */
function isValidCatalog(c: Catalog): boolean {
  return Boolean(c.slug && (c.title.he || c.title.en));
}

/**
 * Merge DB catalogs with static defaults.
 * Static defaults are only used when the DB has no catalogs at all (initial state).
 * Once the DB is in use, only DB catalogs are returned.
 * Invalid entries (missing slug or title) are always filtered out.
 */
export function mergeCatalogsWithDefaults(dbCatalogs: Catalog[]): Catalog[] {
  if (dbCatalogs.length > 0) {
    return dbCatalogs.filter(isValidCatalog);
  }
  return CATALOGS.filter(isValidCatalog);
}
