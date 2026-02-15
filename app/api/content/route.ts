import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { dbCatalogToUi, dbSettingsToUi } from "@/lib/mappers";
import { getCategoryDetails } from "@/lib/categoryDetailsStore";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const [catalogs, settingsRow] = await Promise.all([
    prisma.catalog
      .findMany({
        include: { examples: true },
        orderBy: [{ popular: "desc" }, { titleEn: "asc" }],
      })
      .then((rows) => rows.map(dbCatalogToUi)),
    prisma.siteSettings.findFirst({ where: { id: 1 } }),
  ]);

  const categoryDetails = getCategoryDetails();
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
