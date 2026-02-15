// app/page.tsx
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { ClientPage } from "@/components/ClientPage";
import {
  dbCatalogToUi,
  dbHeroToUi,
  dbPricingToUi,
  dbPriceToUi,
  dbSettingsToUi,
} from "@/lib/mappers";
import { SITE_DOMAIN, SAME_AS, SEO } from "@/config/constants";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  const settings = await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });

  const pricing = await prisma.pricingConfig.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });

  const heroMedia = await prisma.heroMedia.findMany({
    orderBy: [{ order: "asc" }, { id: "asc" }],
  });

  const prices = await prisma.priceItem.findMany({
    orderBy: [{ order: "asc" }, { id: "asc" }],
  });

  const catalogs = await prisma.catalog.findMany({
    include: { examples: true },
    orderBy: [{ popular: "desc" }, { titleEn: "asc" }],
  });

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || SITE_DOMAIN;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SEO.siteName,
    url: siteUrl,
    image: `${siteUrl}/og.jpg`,
    description: SEO.description,
    areaServed: [
      { "@type": "Country", name: "Israel" },
      { "@type": "City", name: "Tel Aviv-Yafo" },
    ],
    sameAs: [...SAME_AS],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: settings.email || "nisenem98@gmail.com",
    },
  };

  return (
    <>
      {/* Schema.org: helps platforms like Canva/Meta understand your service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Suspense fallback={null}>
        <ClientPage
          catalogs={catalogs.map(dbCatalogToUi)}
          settings={dbSettingsToUi(settings)}
          prices={prices.map(dbPriceToUi)}
          heroMedia={heroMedia.map(dbHeroToUi)}
          pricing={dbPricingToUi(pricing)}
        />
      </Suspense>
    </>
  );
}
