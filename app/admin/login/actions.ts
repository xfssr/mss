"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, createAdminCookieValue } from "@/utils/adminAuth";

export async function adminLogin(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  const expected = process.env.ADMIN_PASSWORD || "";
  const secret = process.env.ADMIN_COOKIE_SECRET || "";

  if (!expected || !secret || password !== expected) {
    redirect(`/admin/login?error=1&next=${encodeURIComponent(next)}`);
  }

  const token = await createAdminCookieValue(secret);
  cookies().set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  redirect(next);
}

export async function adminLogout() {
  cookies().set(ADMIN_COOKIE_NAME, "", { httpOnly: true, path: "/", maxAge: 0 });
  redirect("/admin/login");
}
