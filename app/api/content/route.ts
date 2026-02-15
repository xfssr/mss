import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { dbCatalogToUi, dbSettingsToUi } from "@/lib/mappers";
import { getCategoryDetails } from "@/lib/categoryDetailsStore";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const [catalogs, settings, categoryDetails] = await Promise.all([
    prisma.catalog
      .findMany({
        include: { examples: true },
        orderBy: [{ popular: "desc" }, { titleEn: "asc" }],
      })
      .then((rows) => rows.map(dbCatalogToUi)),
    prisma.siteSettings
      .upsert({ where: { id: 1 }, update: {}, create: { id: 1 } })
      .then(dbSettingsToUi),
    Promise.resolve(getCategoryDetails()),
  ]);

  return NextResponse.json(
    { catalogs, categoryDetails, settings },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    },
  );
}
