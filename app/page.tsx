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
import { mergeCatalogsWithDefaults } from "@/lib/mergeCatalogs";
import { getDisabledCatalogSlugs, getDiscountConfig } from "@/lib/catalogOverridesStore";
import { getPackageDetails } from "@/lib/packageConfigStore";
import { getActiveSolutions } from "@/lib/solutionsStore";
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
    create: { id: 1, currency: "₪" },
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

  const categoryDetails = await getCategoryDetails();
  const disabledSlugs = await getDisabledCatalogSlugs();
  const discountConfig = await getDiscountConfig();
  const packageDetails = await getPackageDetails();
  const solutions = await getActiveSolutions();

  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}#service`,
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
      },
      ...(packageDetails.length > 0
        ? [
            {
              "@type": "Product",
              "@id": `${siteUrl}#packages`,
              name: "Content Packages",
              brand: { "@type": "Brand", name: SEO.siteName },
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "ILS",
                lowPrice: Math.min(...packageDetails.map((p) => p.priceFrom)),
                highPrice: Math.max(...packageDetails.map((p) => p.priceFrom)),
                offerCount: packageDetails.length,
                offers: packageDetails.map((p) => ({
                  "@type": "Offer",
                  name: p.title.en,
                  description: p.subtitle.en,
                  priceCurrency: "ILS",
                  price: p.priceFrom,
                  availability: "https://schema.org/InStock",
                  url: `${siteUrl}/product/${p.id}`,
                })),
              },
            },
          ]
        : []),
    ],
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
          catalogs={mergeCatalogsWithDefaults(catalogs.map(dbCatalogToUi), disabledSlugs)}
          categoryDetails={categoryDetails}
          solutions={solutions}
          settings={dbSettingsToUi(settings)}
          prices={prices.map(dbPriceToUi)}
          heroMedia={heroMedia.map(dbHeroToUi)}
          pricing={dbPricingToUi(pricing)}
          discountConfig={discountConfig}
          packageDetails={packageDetails}
        />
      </Suspense>
    </>
  );
}
