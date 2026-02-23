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

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const cases = await prisma.caseStudy.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(cases);
}

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const maxOrder = await prisma.caseStudy.aggregate({ _max: { order: true } });
  const nextOrder = (maxOrder._max.order ?? -1) + 1;

  const cs = await prisma.caseStudy.create({
    data: {
      order: nextOrder,
      category: body.category,
      videoUrl: body.videoUrl,
      titleEn: body.titleEn,
      titleHe: body.titleHe,
      tagsEn: body.tagsEn,
      tagsHe: body.tagsHe,
      views: body.views || "—",
      avgWatch: body.avgWatch || "—",
      fullWatch: body.fullWatch || "—",
      followers: body.followers || "—",
      forYou: body.forYou || null,
      insightEn: body.insightEn,
      insightHe: body.insightHe,
      servicesEn: body.servicesEn,
      servicesHe: body.servicesHe,
      thumbnailUrl: body.thumbnailUrl || "/images/case-placeholder.webp",
      isPublished: body.isPublished ?? true,
    },
  });

  return NextResponse.json(cs, { status: 201 });
}
