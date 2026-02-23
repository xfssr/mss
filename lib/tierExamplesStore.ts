import { prisma } from "@/lib/prisma";
import type { TierExamplesConfig } from "@/types/catalog";

async function readOverrides(): Promise<Record<string, unknown>> {
  try {
    const row = await prisma.siteSettings.findFirst({ where: { id: 1 } });
    if (!row?.contentOverridesJson) return {};
    return JSON.parse(row.contentOverridesJson) ?? {};
  } catch (err) {
    console.warn("[tierExamplesStore] Failed to read overrides:", err);
    return {};
  }
}

export async function getTierExamplesConfig(): Promise<TierExamplesConfig> {
  const overrides = await readOverrides();
  const stored = overrides.tierExamples;
  if (stored && typeof stored === "object" && !Array.isArray(stored)) {
    return stored as TierExamplesConfig;
  }
  return {};
}

export async function saveTierExamplesConfig(config: TierExamplesConfig): Promise<void> {
  const overrides = await readOverrides();
  overrides.tierExamples = config;
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: { contentOverridesJson: JSON.stringify(overrides) },
    create: { id: 1, contentOverridesJson: JSON.stringify(overrides) },
  });
}
