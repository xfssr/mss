import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { ADMIN_COOKIE_NAME, verifyAdminCookieValue } from "@/utils/adminAuth";

export const runtime = "nodejs";

const MAX_BYTES_IMAGE = 8 * 1024 * 1024;
const MAX_BYTES_VIDEO = 60 * 1024 * 1024;

const ALLOWED_IMAGE = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);
const ALLOWED_VIDEO = new Set(["video/mp4", "video/quicktime", "video/webm"]);

function safeExt(fileName: string, mime: string) {
  const ext = path.extname(fileName || "").toLowerCase();
  if (ext && ext.length <= 8) return ext;

  if (mime === "image/png") return ".png";
  if (mime === "image/jpeg") return ".jpg";
  if (mime === "image/webp") return ".webp";
  if (mime === "image/gif") return ".gif";

  if (mime === "video/mp4") return ".mp4";
  if (mime === "video/quicktime") return ".mov";
  if (mime === "video/webm") return ".webm";

  return "";
}

function cloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );
}

async function uploadToCloudinary(file: File) {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME!;
  const apiKey = process.env.CLOUDINARY_API_KEY!;
  const apiSecret = process.env.CLOUDINARY_API_SECRET!;
  const folder = process.env.CLOUDINARY_FOLDER || "micro-screen-studio";

  const isVideo = file.type.startsWith("video/");
  const resourceType = isVideo ? "video" : "image";

  const timestamp = Math.floor(Date.now() / 1000);
  const toSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash("sha1").update(toSign).digest("hex");

  const fd = new FormData();
  fd.append("file", file);
  fd.append("api_key", apiKey);
  fd.append("timestamp", String(timestamp));
  fd.append("folder", folder);
  fd.append("signature", signature);

  const endpoint = `https://api.cloudinary.com/v1_1/${cloud}/${resourceType}/upload`;

  const res = await fetch(endpoint, { method: "POST", body: fd });
  const json = (await res.json().catch(() => ({}))) as { secure_url?: string; error?: { message?: string } };

  if (!res.ok || !json.secure_url) {
    const msg = json?.error?.message || `Cloudinary upload failed (${res.status})`;
    throw new Error(msg);
  }

  return json.secure_url;
}

async function uploadToLocal(file: File) {
  const isVideo = file.type.startsWith("video/");
  const max = isVideo ? MAX_BYTES_VIDEO : MAX_BYTES_IMAGE;

  if (file.size > max) throw new Error(`file too large (max ${Math.floor(max / (1024 * 1024))}MB)`);
  if (isVideo ? !ALLOWED_VIDEO.has(file.type) : !ALLOWED_IMAGE.has(file.type)) {
    throw new Error(`unsupported type: ${file.type}`);
  }

  const ext = safeExt(file.name, file.type);
  if (!ext) throw new Error("cannot detect extension");

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${ext}`;
  const abs = path.join(uploadDir, filename);

  const buf = Buffer.from(await file.arrayBuffer());
  await writeFile(abs, buf);

  return `/uploads/${filename}`;
}

export async function POST(req: Request) {
  const secret = process.env.ADMIN_COOKIE_SECRET || "";
  const cookie = cookies().get(ADMIN_COOKIE_NAME)?.value;

  if (!secret || !(await verifyAdminCookieValue(secret, cookie))) {
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

  try {
    if (cloudinaryConfigured()) {
      const url = await uploadToCloudinary(file);
      return NextResponse.json({ url });
    }

    const url = await uploadToLocal(file);
    return NextResponse.json({ url });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "upload failed" }, { status: 400 });
  }
}
