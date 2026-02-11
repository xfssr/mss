// app/page.tsx
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import {
  dbCatalogToUi,
  dbHeroToUi,
  dbPricingToUi,
  dbPriceToUi,
  dbSettingsToUi,
} from "@/lib/mappers";
import { ClientPage } from "@/components/ClientPage";

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

  const heroMedia = await prisma.heroMedia.findMany({ orderBy: [{ order: "asc" }, { id: "asc" }] });
  const prices = await prisma.priceItem.findMany({ orderBy: [{ order: "asc" }, { id: "asc" }] });

  const catalogs = await prisma.catalog.findMany({
    include: { examples: true },
    orderBy: [{ popular: "desc" }, { titleEn: "asc" }],
  });

  return (
    <Suspense fallback={null}>
      <ClientPage
        catalogs={catalogs.map(dbCatalogToUi)}
        settings={dbSettingsToUi(settings)}
        prices={prices.map(dbPriceToUi)}
        heroMedia={heroMedia.map(dbHeroToUi)}
        pricing={dbPricingToUi(pricing)}
      />
    </Suspense>
  );
}
