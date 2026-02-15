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
import { getCategoryDetails } from "@/lib/categoryDetailsStore";
import { SAME_AS, SEO, getSiteUrl } from "@/config/constants";
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

  const categoryDetails = getCategoryDetails();

  if (process.env.NODE_ENV === "development") {
    console.log("[page] catalogs:", catalogs.length, "categoryDetails:", categoryDetails.length);
  }

  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SEO.siteName,
    url: siteUrl,
    image: `${siteUrl}/og.jpg`,
    description: SEO.description,
    areaServed: [
      { "@type": "Country", "@id": "#country-il", name: "Israel" },
      {
        "@type": "City",
        name: "Tel Aviv-Yafo",
        containedInPlace: { "@id": "#country-il" },
      },
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
          categoryDetails={categoryDetails}
          settings={dbSettingsToUi(settings)}
          prices={prices.map(dbPriceToUi)}
          heroMedia={heroMedia.map(dbHeroToUi)}
          pricing={dbPricingToUi(pricing)}
        />
      </Suspense>
    </>
  );
}
