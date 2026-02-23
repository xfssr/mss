import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { dbCatalogToUi, dbSettingsToUi } from "@/lib/mappers";
import { getCategoryDetails } from "@/lib/categoryDetailsStore";
import { mergeCatalogsWithDefaults } from "@/lib/mergeCatalogs";
import { getDisabledCatalogSlugs } from "@/lib/catalogOverridesStore";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const [dbRows, settingsRow, disabledSlugs] = await Promise.all([
    prisma.catalog.findMany({
      include: { examples: true },
      orderBy: [{ popular: "desc" }, { titleEn: "asc" }],
    }),
    prisma.siteSettings.findFirst({ where: { id: 1 } }),
    getDisabledCatalogSlugs(),
  ]);

  const catalogs = mergeCatalogsWithDefaults(
    dbRows.map(dbCatalogToUi),
    disabledSlugs,
  );

  const categoryDetails = await getCategoryDetails();
  const settings = settingsRow ? dbSettingsToUi(settingsRow) : null;

  return NextResponse.json(
    { catalogs, categoryDetails, settings },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    },
  );
}
