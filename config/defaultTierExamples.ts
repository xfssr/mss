import type { TierExamplesConfig } from "@/types/catalog";

/**
 * Default explicit tier assignments for static catalog examples.
 *
 * Static catalogs (bars, hotels, events) each have 9 examples (IDs 0–8).
 * This config explicitly splits them into three equal groups so each
 * package card (Starter/Business/Monthly) shows a distinct set of examples
 * even before any admin has configured per-tier assignments in the database.
 *
 * Starter  (tier 1) → examples 0, 1, 2
 * Business (tier 2) → examples 3, 4, 5
 * Monthly  (tier 3) → examples 6, 7, 8
 */
export const DEFAULT_TIER_EXAMPLES_CONFIG: TierExamplesConfig = {
  bars: { tier1: [0, 1, 2], tier2: [3, 4, 5], tier3: [6, 7, 8] },
  hotels: { tier1: [0, 1, 2], tier2: [3, 4, 5], tier3: [6, 7, 8] },
  events: { tier1: [0, 1, 2], tier2: [3, 4, 5], tier3: [6, 7, 8] },
};
