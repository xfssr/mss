import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { ADMIN_COOKIE_NAME, verifyAdminCookieValue } from "@/utils/adminAuth";

export const runtime = "nodejs";

const MAX_BYTES = 6 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);

async function isAuthed() {
  const secret = process.env.ADMIN_COOKIE_SECRET || "";
  const cookieStore = await cookies();
  const cookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return secret && (await verifyAdminCookieValue(secret, cookie));
}

function cloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );
}

async function uploadToCloudinary(file: File) {
  const crypto = await import("crypto");
  const cloud = process.env.CLOUDINARY_CLOUD_NAME!;
  const apiKey = process.env.CLOUDINARY_API_KEY!;
  const apiSecret = process.env.CLOUDINARY_API_SECRET!;
  const folder = process.env.CLOUDINARY_FOLDER || "micro-screen-studio";

  const timestamp = Math.floor(Date.now() / 1000);
  const toSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash("sha1").update(toSign).digest("hex");

  const fd = new FormData();
  fd.append("file", file);
  fd.append("api_key", apiKey);
  fd.append("timestamp", String(timestamp));
  fd.append("folder", folder);
  fd.append("signature", signature);

  const endpoint = `https://api.cloudinary.com/v1_1/${cloud}/image/upload`;
  const res = await fetch(endpoint, { method: "POST", body: fd });
  const json = (await res.json().catch(() => ({}))) as { secure_url?: string; error?: { message?: string } };

  if (!res.ok || !json.secure_url) {
    const msg = json?.error?.message || `Cloudinary upload failed (${res.status})`;
    throw new Error(msg);
  }
  return json.secure_url;
}

async function uploadToLocal(file: File) {
  const ext = file.type === "image/png" ? ".png" : file.type === "image/webp" ? ".webp" : file.type === "image/jpeg" ? ".jpg" : ".jpg";
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const filename = `cs-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  const abs = path.join(uploadDir, filename);

  const buf = Buffer.from(await file.arrayBuffer());
  await writeFile(abs, buf);

  return `/uploads/${filename}`;
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

  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "Only jpg, png, webp allowed" }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Max 6MB" }, { status: 400 });
  }

  try {
    const url = cloudinaryConfigured()
      ? await uploadToCloudinary(file)
      : await uploadToLocal(file);
    return NextResponse.json({ url });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "upload failed" }, { status: 400 });
  }
}
