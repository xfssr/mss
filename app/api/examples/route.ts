import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tierKey = searchParams.get("tierKey");

  if (!tierKey) {
    return NextResponse.json({ error: "tierKey is required" }, { status: 400 });
  }

  const where: Record<string, unknown> = {
    tierKey,
    isPublished: true,
  };

  const examples = await prisma.packageExample.findMany({
    where,
    include: { media: true },
    orderBy: { order: "asc" },
    take: 6,
  });

  const result = examples.map((ex) => ({
    kind: ex.media.kind,
    url: ex.media.url,
    posterUrl: ex.media.posterUrl,
  }));

  return NextResponse.json(result);
}
