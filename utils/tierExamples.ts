import type { CatalogExample } from "@/types/catalog";

export type TieredExamples = {
  tier1: CatalogExample[];
  tier2: CatalogExample[];
  tier3: CatalogExample[];
};

/**
 * Split a catalog's examples into 3 tier groups.
 * tier1 → Starter, tier2 → Business, tier3 → Monthly
 *
 * Distributes examples round-robin across tiers so each gets
 * a roughly equal share while preserving order.
 *
 * Fallback rules:
 *  - tier2 empty → fallback to tier1
 *  - tier3 empty → fallback to tier2, then tier1
 */
export function splitExamplesIntoTiers(examples: CatalogExample[]): TieredExamples {
  const tier1: CatalogExample[] = [];
  const tier2: CatalogExample[] = [];
  const tier3: CatalogExample[] = [];

  const buckets = [tier1, tier2, tier3];

  examples.forEach((ex, i) => {
    buckets[i % 3].push(ex);
  });

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
