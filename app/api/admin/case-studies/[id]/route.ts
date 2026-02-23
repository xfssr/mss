import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { ADMIN_COOKIE_NAME, verifyAdminCookieValue } from "@/utils/adminAuth";

async function isAuthed() {
  const secret = process.env.ADMIN_COOKIE_SECRET || "";
  const cookieStore = await cookies();
  const cookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return secret && (await verifyAdminCookieValue(secret, cookie));
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  const cs = await prisma.caseStudy.update({
    where: { id },
    data: {
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
      thumbnailUrl: body.thumbnailUrl,
      isPublished: body.isPublished ?? true,
    },
  });

  return NextResponse.json(cs);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.caseStudy.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
