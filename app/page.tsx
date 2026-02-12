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
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://studioscreen.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Micro-Screen Studio",
    url: siteUrl,
    areaServed: "IL",
    sameAs: ["https://instagram.com/emil_edition"],
    description:
      "Content for businesses: reels, photos, shoots and social media management. Choose catalog → package → date/city → send via WhatsApp.",
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
