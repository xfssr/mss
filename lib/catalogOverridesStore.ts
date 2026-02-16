import { prisma } from "@/lib/prisma";

export type CatalogOverride = {
  slug: string;
  active: boolean;
};

async function readOverrides(): Promise<Record<string, unknown>> {
  try {
    const row = await prisma.siteSettings.findFirst({ where: { id: 1 } });
    if (!row?.contentOverridesJson) return {};
    return JSON.parse(row.contentOverridesJson) ?? {};
  } catch {
    return {};
  }
}

export async function getDisabledCatalogSlugs(): Promise<Set<string>> {
  const overrides = await readOverrides();
  const arr = overrides.disabledCatalogs;
  if (!Array.isArray(arr)) return new Set();
  return new Set(
    arr.filter(
      (o: unknown): o is CatalogOverride =>
        typeof o === "object" && o !== null && "slug" in o && (o as CatalogOverride).active === false,
    ).map((o) => o.slug),
  );
}

export async function setDisabledCatalogSlugs(slugs: string[]): Promise<void> {
  const overrides = await readOverrides();
  overrides.disabledCatalogs = slugs.map((slug) => ({ slug, active: false }));
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: { contentOverridesJson: JSON.stringify(overrides) },
    create: { id: 1, contentOverridesJson: JSON.stringify(overrides) },
  });
}

export async function disableCatalogSlug(slug: string): Promise<void> {
  const disabled = await getDisabledCatalogSlugs();
  disabled.add(slug);
  await setDisabledCatalogSlugs([...disabled]);
}

export async function enableCatalogSlug(slug: string): Promise<void> {
  const disabled = await getDisabledCatalogSlugs();
  disabled.delete(slug);
  await setDisabledCatalogSlugs([...disabled]);
}

export type DiscountConfig = {
  enabled: boolean;
  percent: number;
  labelHe: string;
  labelEn: string;
};

const DEFAULT_DISCOUNT: DiscountConfig = {
  enabled: true,
  percent: 10,
  labelHe: "הנחת הזמנה ראשונה",
  labelEn: "First-order discount",
};

export async function getDiscountConfig(): Promise<DiscountConfig> {
  const overrides = await readOverrides();
  const d = overrides.firstTimeDiscount as Partial<DiscountConfig> | undefined;
  if (!d || typeof d !== "object") return DEFAULT_DISCOUNT;
  return {
    enabled: typeof d.enabled === "boolean" ? d.enabled : DEFAULT_DISCOUNT.enabled,
    percent: typeof d.percent === "number" ? d.percent : DEFAULT_DISCOUNT.percent,
    labelHe: typeof d.labelHe === "string" ? d.labelHe : DEFAULT_DISCOUNT.labelHe,
    labelEn: typeof d.labelEn === "string" ? d.labelEn : DEFAULT_DISCOUNT.labelEn,
  };
}

export async function saveDiscountConfig(config: DiscountConfig): Promise<void> {
  const overrides = await readOverrides();
  overrides.firstTimeDiscount = config;
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: { contentOverridesJson: JSON.stringify(overrides) },
    create: { id: 1, contentOverridesJson: JSON.stringify(overrides) },
  });
}
