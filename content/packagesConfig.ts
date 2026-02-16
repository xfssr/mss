/**
 * Canonical packages configuration — single source of truth for
 * Starter / Business / Monthly used on both /#packages, /solutions,
 * and the HomepageSolutions component.
 *
 * Each solution category can have niche-specific bullet overrides
 * and a recommended package badge.
 */

import type { Lang } from "@/utils/i18n";

export type L10n = { he: string; en: string };

/** Niche-specific bullet points shown under each package within a solution */
export type NicheBullets = {
  starter: L10n[];
  business: L10n[];
  monthly: L10n[];
};

/** Which package is "Recommended" for each solution */
export type RecommendedPackage = "starter" | "business" | "monthly";

export type SolutionNicheConfig = {
  solutionId: string;
  recommended: RecommendedPackage;
  nicheBullets: NicheBullets;
};

/** Niche-specific configurations per solution category */
export const SOLUTION_NICHE_CONFIG: SolutionNicheConfig[] = [
  {
    solutionId: "bars-nightlife",
    recommended: "business",
    nicheBullets: {
      starter: [
        { he: "אווירת בר ותאורת לילה", en: "Bar atmosphere & night lighting" },
        { he: "צילום קוקטיילים", en: "Cocktail photography" },
        { he: "רילס קצרים מהבר", en: "Short bar reels" },
      ],
      business: [
        { he: "צילום אנשים ואווירה", en: "People & atmosphere shots" },
        { he: "קוקטיילים + צליל + תאורה", en: "Cocktails + sound + lighting" },
        { he: "רילס לילה סינמטיים", en: "Cinematic night reels" },
        { he: "תוכן לסושיאל מוכן לעלות", en: "Ready-to-post social content" },
      ],
      monthly: [
        { he: "כיסוי אירועים ולילות מיוחדים", en: "Events & special nights coverage" },
        { he: "תוכן שוטף לסושיאל", en: "Ongoing social content" },
        { he: "ניהול סושיאל מלא", en: "Full social management" },
      ],
    },
  },
  {
    solutionId: "restaurants-food",
    recommended: "monthly",
    nicheBullets: {
      starter: [
        { he: "צילום מנות וטקסטורות", en: "Dish plating & textures" },
        { he: "ידיים של שף בפעולה", en: "Chef hands in action" },
        { he: "ויזואלס לתפריט", en: "Menu visuals" },
      ],
      business: [
        { he: "צילום מטבח ותהליך", en: "Kitchen & process photography" },
        { he: "רילס UGC + דיטיילס סינמטי", en: "UGC reels + cinematic details" },
        { he: "אווירת מסעדה (פנים/חוץ)", en: "Restaurant atmosphere (indoor/outdoor)" },
        { he: "צילום מנות ברמה גבוהה", en: "High-quality dish photography" },
      ],
      monthly: [
        { he: "תוכן שוטף למסעדה", en: "Ongoing restaurant content" },
        { he: "עדכוני תפריט עונתיים", en: "Seasonal menu updates" },
        { he: "ניהול סושיאל מלא", en: "Full social management" },
      ],
    },
  },
  {
    solutionId: "hotels",
    recommended: "business",
    nicheBullets: {
      starter: [
        { he: "צילום לובי וחדרים", en: "Lobby & room photography" },
        { he: "שטחים משותפים ואמניטיז", en: "Common areas & amenities" },
        { he: "רילס אווירה קצרים", en: "Short atmosphere reels" },
      ],
      business: [
        { he: "צילום לייפסטייל ואווירה", en: "Lifestyle & atmosphere shots" },
        { he: "סרטון סיור וירטואלי", en: "Virtual walkthrough video" },
        { he: "רילס חדרים ונופים", en: "Room & view reels" },
        { he: "תוכן מותאם לבוקינג ואתר", en: "Content for booking & website" },
      ],
      monthly: [
        { he: "כיסוי עונתי שוטף", en: "Ongoing seasonal coverage" },
        { he: "אירועים ואטרקציות", en: "Events & attractions" },
        { he: "ניהול סושיאל מלא", en: "Full social management" },
      ],
    },
  },
  {
    solutionId: "events",
    recommended: "business",
    nicheBullets: {
      starter: [
        { he: "הילייטס ורגעי שיא", en: "Highlights & key moments" },
        { he: "צילום קהל ואנרגיה", en: "Crowd & energy shots" },
        { he: "רילס קצרים מהאירוע", en: "Short event reels" },
      ],
      business: [
        { he: "סיכום אירוע מלא", en: "Full event recap" },
        { he: "עריכות סינמטיות", en: "Cinematic recap edits" },
        { he: "צילום מאחורי הקלעים", en: "Behind-the-scenes coverage" },
        { he: "תוכן לשיווק האירוע הבא", en: "Content for next event marketing" },
      ],
      monthly: [
        { he: "כיסוי אירועים חודשי", en: "Monthly event coverage" },
        { he: "תוכן שוטף לסושיאל", en: "Ongoing social content" },
        { he: "ניהול סושיאל מלא", en: "Full social management" },
      ],
    },
  },
  {
    solutionId: "real-estate",
    recommended: "starter",
    nicheBullets: {
      starter: [
        { he: "צילומי רחב של הנכס", en: "Wide property shots" },
        { he: "סרטון סיור קצר", en: "Short walkthrough video" },
        { he: "דגשים על תאורה ופרטים", en: "Light & detail highlights" },
      ],
      business: [
        { he: "סיור וירטואלי מלא", en: "Full virtual walkthrough" },
        { he: "צילום דירה/בניין מקצועי", en: "Professional property photography" },
        { he: "רילס לסושיאל ופלטפורמות", en: "Reels for social & platforms" },
        { he: "תוכן מותאם ל-Airbnb ואתרים", en: "Content for Airbnb & listing sites" },
      ],
      monthly: [
        { he: "כיסוי נכסים שוטף", en: "Ongoing property coverage" },
        { he: "עדכון תמונות ותוכן", en: "Photo & content updates" },
        { he: "ניהול סושיאל מלא", en: "Full social management" },
      ],
    },
  },
  {
    solutionId: "small-services",
    recommended: "starter",
    nicheBullets: {
      starter: [
        { he: "צילום לפני/אחרי", en: "Before/after shots" },
        { he: "פורטרטים וצילום סטודיו", en: "Portraits & studio shots" },
        { he: "פרומו קצר לעסק", en: "Quick business promo" },
      ],
      business: [
        { he: "צילום מקיף לעסק", en: "Comprehensive business photography" },
        { he: "רילס מקצועיים", en: "Professional reels" },
        { he: "צילום מוצרים/שירותים", en: "Product/service photography" },
        { he: "תוכן מותאם לסושיאל", en: "Social-ready content" },
      ],
      monthly: [
        { he: "תוכן שוטף לעסק", en: "Ongoing business content" },
        { he: "ניהול סושיאל מלא", en: "Full social management" },
        { he: "תוכן ופרסום שוטף", en: "Ongoing content & advertising" },
      ],
    },
  },
];

/** Get niche config for a specific solution */
export function getNicheConfig(solutionId: string): SolutionNicheConfig | undefined {
  return SOLUTION_NICHE_CONFIG.find((c) => c.solutionId === solutionId);
}

/** Helper to pick localized string */
export function pickL10n(lang: Lang, v: L10n): string {
  const s = v?.[lang] ?? "";
  return s?.trim() ? s : v.he || v.en;
}
