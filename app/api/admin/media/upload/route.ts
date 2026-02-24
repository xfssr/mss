import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { put } from "@vercel/blob";
import { ADMIN_COOKIE_NAME, verifyAdminCookieValue } from "@/utils/adminAuth";

export const runtime = "nodejs";

const MAX_BYTES_IMAGE = 8 * 1024 * 1024;
const MAX_BYTES_VIDEO = 60 * 1024 * 1024;

const ALLOWED_IMAGE = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);
const ALLOWED_VIDEO = new Set(["video/mp4", "video/quicktime", "video/webm"]);

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

  const form = await req.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file is required" }, { status: 400 });
  }

  const isVideo = file.type.startsWith("video/");
  const allowed = isVideo ? ALLOWED_VIDEO : ALLOWED_IMAGE;

  if (!allowed.has(file.type)) {
    return NextResponse.json({ error: `unsupported type: ${file.type}` }, { status: 400 });
  }

  const max = isVideo ? MAX_BYTES_VIDEO : MAX_BYTES_IMAGE;
  if (file.size > max) {
    return NextResponse.json({ error: `file too large (max ${Math.floor(max / (1024 * 1024))}MB)` }, { status: 400 });
  }

  const kind = isVideo ? "video" : "image";

  try {
    const blob = await put(file.name, file, { access: "public" });
    return NextResponse.json({ url: blob.url, kind });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "upload failed";
    console.error("[media/upload]", msg);
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
