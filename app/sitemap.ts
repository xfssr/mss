import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/config/constants";
import { DEFAULT_SOLUTIONS } from "@/content/solutions";

/** Package slugs (static, mirrors app/product/[slug]/page.tsx). */
const PACKAGE_SLUGS = ["starter", "business", "monthly"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const productSlugs: string[] = [
    ...PACKAGE_SLUGS,
    ...DEFAULT_SOLUTIONS.filter((s) => s.isActive).map((s) => s.slug),
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
