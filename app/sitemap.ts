import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/config/constants";
import { getActiveSolutions } from "@/lib/solutionsStore";

/** Package slugs (static, mirrors app/product/[slug]/page.tsx). */
const PACKAGE_SLUGS = ["starter", "business", "monthly"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const solutions = await getActiveSolutions();

  const productSlugs: string[] = [
    ...PACKAGE_SLUGS,
    ...solutions.map((s) => s.slug),
  ];

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/product`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/solutions`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...productSlugs.map((slug) => ({
      url: `${siteUrl}/product/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
