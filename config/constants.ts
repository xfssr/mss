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
    "Micro-Screen Studio | סרטוני רילס לעסקים, צילום וידאו ותוכן",
  description:
    "יוצר תוכן לעסקים בישראל: צילום, וידאו, רילס, סטוריז ועריכה. בחרו קטגוריה → חבילה → תאריך/עיר → שולחים ב-WhatsApp.",
  locale: "he_IL",
  siteName: "Micro-Screen Studio",
} as const;
