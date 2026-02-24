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

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as { items: { id: string; order: number }[] };

  if (!Array.isArray(body.items)) {
    return NextResponse.json({ error: "items array is required" }, { status: 400 });
  }

  await prisma.$transaction(
    body.items.map((item) =>
      prisma.packageExample.update({
        where: { id: item.id },
        data: { order: item.order },
      }),
    ),
  );

  return NextResponse.json({ ok: true });
}
