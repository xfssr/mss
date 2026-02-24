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

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  const data: Record<string, unknown> = {};
  if (body.isPublished !== undefined) data.isPublished = body.isPublished;
  if (body.order !== undefined) data.order = body.order;
  if (body.tierKey !== undefined) data.tierKey = body.tierKey;
  if (body.catalogKey !== undefined) data.catalogKey = body.catalogKey || null;

  const updated = await prisma.packageExample.update({
    where: { id },
    data,
    include: { media: true },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const deleteAsset = searchParams.get("deleteAsset") === "true";

  const example = await prisma.packageExample.findUnique({ where: { id } });
  if (!example) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  await prisma.packageExample.delete({ where: { id } });

  if (deleteAsset) {
    const otherRefs = await prisma.packageExample.count({ where: { mediaId: example.mediaId } });
    if (otherRefs === 0) {
      await prisma.mediaAsset.delete({ where: { id: example.mediaId } });
    }
  }

  return NextResponse.json({ ok: true });
}
