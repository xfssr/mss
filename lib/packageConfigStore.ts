import { prisma } from "@/lib/prisma";

export type PackageDetail = {
  id: string;
  title: { he: string; en: string };
  subtitle: { he: string; en: string };
  priceFrom: number;
  pills: { he: string; en: string }[];
  shootTime: { he: string; en: string };
  deliveryTime: { he: string; en: string };
  locations: { he: string; en: string };
  revisions: { he: string; en: string };
  bestFor: { he: string; en: string };
  whatYouGet: { he: string; en: string }[];
  addOns: { he: string; en: string }[];
};

const DEFAULT_PACKAGES: PackageDetail[] = [
  {
    id: "starter",
    title: { he: "Starter", en: "Starter" },
    subtitle: { he: "חבילת התחלה לעסקים", en: "Starter package for businesses" },
    priceFrom: 0,
    pills: [
      { he: "4 שעות צילום", en: "4h shoot" },
      { he: "6 רילס", en: "6 reels" },
      { he: "20 תמונות", en: "20 photos" },
    ],
    shootTime: { he: "60–90 דקות", en: "60–90 min" },
    deliveryTime: { he: "3–5 ימי עסקים", en: "3–5 business days" },
    locations: { he: "מיקום אחד", en: "1 location" },
    revisions: { he: "2 סבבי תיקונים", en: "2 revision rounds" },
    bestFor: { he: "עסקים קטנים שרוצים לבדוק את הפורמט", en: "Small businesses wanting to test the format" },
    whatYouGet: [
      { he: "4 שעות צילום באיכות גבוהה", en: "4 hours of high-quality shooting" },
      { he: "6 רילס ערוכים", en: "6 edited reels" },
      { he: "20 תמונות מעובדות", en: "20 edited photos" },
      { he: "קבצים בפורמט מותאם לסושיאל", en: "Files formatted for social media" },
    ],
    addOns: [
      { he: "SMM (ניהול סושיאל)", en: "SMM (social management)" },
      { he: "Target Ads (הגדרה)", en: "Target Ads (setup)" },
    ],
  },
  {
    id: "growth",
    title: { he: "Growth", en: "Growth" },
    subtitle: { he: "חבילה ליום צילום מלא", en: "Full-day shooting package" },
    priceFrom: 0,
    pills: [
      { he: "יום מלא", en: "Full day" },
      { he: "10 רילס", en: "10 reels" },
      { he: "120 תמונות", en: "120 photos" },
    ],
    shootTime: { he: "יום מלא (6–8 שעות)", en: "Full day (6–8 hours)" },
    deliveryTime: { he: "5–7 ימי עסקים", en: "5–7 business days" },
    locations: { he: "עד 2 מיקומים", en: "Up to 2 locations" },
    revisions: { he: "3 סבבי תיקונים", en: "3 revision rounds" },
    bestFor: { he: "עסקים בצמיחה שצריכים תוכן קבוע", en: "Growing businesses needing regular content" },
    whatYouGet: [
      { he: "יום צילום מלא (6–8 שעות)", en: "Full day shoot (6–8 hours)" },
      { he: "10 רילס ערוכים", en: "10 edited reels" },
      { he: "120 תמונות מעובדות", en: "120 edited photos" },
      { he: "קבצים בפורמט מותאם לסושיאל", en: "Files formatted for social media" },
      { he: "תכנון צילום מראש", en: "Pre-shoot planning" },
    ],
    addOns: [
      { he: "SMM (ניהול סושיאל)", en: "SMM (social management)" },
      { he: "Target Ads (הגדרה)", en: "Target Ads (setup)" },
    ],
  },
  {
    id: "pro",
    title: { he: "Pro", en: "Pro" },
    subtitle: { he: "מנוי חודשי + ניהול סושיאל", en: "Monthly plan + social management" },
    priceFrom: 0,
    pills: [
      { he: "מנוי חודשי", en: "Monthly" },
      { he: "ניהול סושיאל", en: "Social mgmt" },
      { he: "תוכן שוטף", en: "Ongoing content" },
    ],
    shootTime: { he: "2–3 ימי צילום בחודש", en: "2–3 shoot days per month" },
    deliveryTime: { he: "שוטף", en: "Ongoing" },
    locations: { he: "ללא הגבלה", en: "Unlimited" },
    revisions: { he: "ללא הגבלה", en: "Unlimited" },
    bestFor: { he: "עסקים שצריכים תוכן שוטף וניהול סושיאל", en: "Businesses needing ongoing content + social management" },
    whatYouGet: [
      { he: "2–3 ימי צילום בחודש", en: "2–3 shoot days per month" },
      { he: "רילס + תמונות ללא הגבלה", en: "Unlimited reels + photos" },
      { he: "ניהול סושיאל מלא", en: "Full social media management" },
      { he: "תכנון אסטרטגי חודשי", en: "Monthly strategic planning" },
      { he: "דוחות ביצועים", en: "Performance reports" },
    ],
    addOns: [
      { he: "Target Ads (הגדרה)", en: "Target Ads (setup)" },
    ],
  },
];

async function readOverrides(): Promise<Record<string, unknown>> {
  try {
    const row = await prisma.siteSettings.findFirst({ where: { id: 1 } });
    if (!row?.contentOverridesJson) return {};
    return JSON.parse(row.contentOverridesJson) ?? {};
  } catch (err) {
    console.warn("[packageConfigStore] Failed to read overrides:", err);
    return {};
  }
}

function mergePackage(defaults: PackageDetail, overrides: Partial<PackageDetail>): PackageDetail {
  return {
    ...defaults,
    ...overrides,
    id: defaults.id,
  };
}

export async function getPackageDetails(): Promise<PackageDetail[]> {
  const overrides = await readOverrides();
  const stored = overrides.packageDetails as Partial<PackageDetail>[] | undefined;
  if (!Array.isArray(stored)) return DEFAULT_PACKAGES;

  return DEFAULT_PACKAGES.map((def) => {
    const override = stored.find((s) => s.id === def.id);
    return override ? mergePackage(def, override) : def;
  });
}

export async function savePackageDetails(packages: PackageDetail[]): Promise<void> {
  const overrides = await readOverrides();
  overrides.packageDetails = packages;
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: { contentOverridesJson: JSON.stringify(overrides) },
    create: { id: 1, contentOverridesJson: JSON.stringify(overrides) },
  });
}
