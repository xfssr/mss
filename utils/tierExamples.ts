import type { CatalogExample, TierExamplesConfig } from "@/types/catalog";
import { DEFAULT_TIER_EXAMPLES_CONFIG } from "@/config/defaultTierExamples";

export type TieredExamples = {
  tier1: CatalogExample[];
  tier2: CatalogExample[];
  tier3: CatalogExample[];
};

/**
 * Build tiered examples from explicit tier config.
 *
 * Uses the stored tier ID lists to partition the given examples.
 * When no DB config entry exists for a catalog, falls back to
 * DEFAULT_TIER_EXAMPLES_CONFIG so static catalogs show distinct
 * examples per package tier without any manual admin setup.
 * If neither config has an entry, all examples go to tier1 as a
 * safety net so nothing is silently dropped.
 */
export function buildTieredFromConfig(
  examples: CatalogExample[],
  catalogSlug: string,
  config: TierExamplesConfig,
): TieredExamples {
  const entry = config[catalogSlug] ?? DEFAULT_TIER_EXAMPLES_CONFIG[catalogSlug];

  if (!entry) {
    // No explicit config — all examples go to tier1
    return { tier1: [...examples], tier2: [], tier3: [] };
  }

  const idSet1 = new Set(entry.tier1);
  const idSet2 = new Set(entry.tier2);
  const idSet3 = new Set(entry.tier3);

  const tier1: CatalogExample[] = [];
  const tier2: CatalogExample[] = [];
  const tier3: CatalogExample[] = [];

  for (const ex of examples) {
    if (idSet3.has(ex.id)) tier3.push(ex);
    else if (idSet2.has(ex.id)) tier2.push(ex);
    else tier1.push(ex); // default bucket
  }

  return { tier1, tier2, tier3 };
}

/**
 * Get examples for a specific package tier with fallback.
 * tier 1 = Starter, tier 2 = Business, tier 3 = Monthly
 *
 * Fallback:
 *  - tier2 empty → tier1
 *  - tier3 empty → tier2, then tier1
 */
export function getExamplesForTier(
  tiered: TieredExamples,
  tier: 1 | 2 | 3,
  maxItems = 4,
): CatalogExample[] {
  let items: CatalogExample[];

  if (tier === 1) {
    items = tiered.tier1;
  } else if (tier === 2) {
    items = tiered.tier2.length > 0 ? tiered.tier2 : tiered.tier1;
  } else {
    items =
      tiered.tier3.length > 0
        ? tiered.tier3
        : tiered.tier2.length > 0
          ? tiered.tier2
          : tiered.tier1;
  }

  return items.slice(0, maxItems);
}

/** Map package card id to tier number */
export function packageIdToTier(pkgId: string): 1 | 2 | 3 {
  switch (pkgId) {
    case "starter":
      return 1;
    case "business":
      return 2;
    case "monthly":
      return 3;
    default:
      return 1;
  }
}
