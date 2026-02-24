import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { ADMIN_COOKIE_NAME, verifyAdminCookieValue } from "@/utils/adminAuth";

export const dynamic = "force-dynamic";

async function isAuthed() {
  const secret = process.env.ADMIN_COOKIE_SECRET || "";
  const cookieStore = await cookies();
  const cookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return secret && (await verifyAdminCookieValue(secret, cookie));
}

export async function GET(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const tierKey = searchParams.get("tierKey") || undefined;

  const where: Record<string, unknown> = {};
  if (tierKey) where.tierKey = tierKey;

  const examples = await prisma.packageExample.findMany({
    where,
    include: { media: true },
    orderBy: { order: "asc" },
  });

  return NextResponse.json(examples);
}

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { tierKey, media } = body as {
    tierKey: string;
    media: { url: string; kind: string; posterUrl?: string };
  };

  if (!tierKey || !media?.url || !media?.kind) {
    return NextResponse.json({ error: "tierKey and media (url, kind) are required" }, { status: 400 });
  }

  const maxOrder = await prisma.packageExample.aggregate({
    _max: { order: true },
    where: { tierKey },
  });
  const nextOrder = (maxOrder._max.order ?? -1) + 1;

  const asset = await prisma.mediaAsset.create({
    data: {
      kind: media.kind,
      url: media.url,
      posterUrl: media.posterUrl || null,
    },
  });

  const example = await prisma.packageExample.create({
    data: {
      tierKey,
      mediaId: asset.id,
      order: nextOrder,
    },
    include: { media: true },
  });

  return NextResponse.json(example, { status: 201 });
}
