/** Site-wide constants: domain, social links, SEO defaults */

export const SITE_DOMAIN = "https://www.mscreenstudio.online";

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/emil_nisenblatt/",
  tiktok: "https://www.tiktok.com/@emilnisenblatt",
  facebook: "https://www.facebook.com/validus.emm/",
} as const;

export const SAME_AS = [
  SOCIAL_LINKS.instagram,
  SOCIAL_LINKS.tiktok,
  SOCIAL_LINKS.facebook,
] as const;

export const SEO = {
  title:
    "Micro-Screen Studio | Food Marketing & Restaurant Video Content Israel",
  description:
    "Short-form video content for restaurants, bars, coffee shops, bakeries, catering, event venues and food brands in Israel. Instagram reels for restaurants. Hospitality marketing Israel.",
  locale: "he_IL",
  siteName: "Micro-Screen Studio",
} as const;

/** Resolve the canonical site URL from env vars with a safe fallback. */
export function getSiteUrl(): string {
  const env =
    process.env.SITE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (env) return env.replace(/\/+$/, "");
  return SITE_DOMAIN;
}

/** Canonical site URL resolved once. */
export const SITE_URL = getSiteUrl();
