import { prisma } from "@/lib/prisma";
import { DEFAULT_SOLUTIONS, type SolutionItem } from "@/content/solutions";

async function readOverrides(): Promise<SolutionItem[]> {
  try {
    const row = await prisma.siteSettings.findFirst({ where: { id: 1 } });
    if (!row?.contentOverridesJson) return [];
    const parsed = JSON.parse(row.contentOverridesJson);
    const arr = parsed?.solutions;
    return Array.isArray(arr) ? arr : [];
  } catch (err) {
    console.warn("[solutionsStore] Failed to read overrides:", err);
    return [];
  }
}

export async function getSolutions(): Promise<SolutionItem[]> {
  const stored = await readOverrides();
  const storedSlugs = new Set(stored.map((d) => d.slug));
  const missing = DEFAULT_SOLUTIONS.filter((d) => !storedSlugs.has(d.slug));
  return [...stored, ...missing];
}

export async function getActiveSolutions(): Promise<SolutionItem[]> {
  const all = await getSolutions();
  return all.filter((s) => s.isActive);
}

export async function saveSolutions(solutions: SolutionItem[]): Promise<void> {
  try {
    const row = await prisma.siteSettings.findFirst({ where: { id: 1 } });
    let overrides: Record<string, unknown> = {};
    try {
      if (row?.contentOverridesJson) {
        overrides = JSON.parse(row.contentOverridesJson) ?? {};
      }
    } catch { /* parse error, use empty overrides */ }

    overrides.solutions = solutions;

    await prisma.siteSettings.upsert({
      where: { id: 1 },
      update: { contentOverridesJson: JSON.stringify(overrides) },
      create: { id: 1, contentOverridesJson: JSON.stringify(overrides) },
    });
  } catch (err) {
    console.warn("[solutionsStore] Failed to save overrides:", err);
  }
}
