/**
 * Monthly add-on packages configuration.
 * These are independent from base package prices and only available for the Monthly plan.
 */

export type AddonConfig = {
  id: string;
  titleKey: string;
  price: number;
  bullets: { he: string; en: string }[];
  notIncluded: { he: string; en: string };
};

export const MONTHLY_ADDONS: AddonConfig[] = [
  {
    id: "smm-lite",
    titleKey: "addonSmmLite",
    price: 379,
    bullets: [
      { he: "תכנית תוכן שבועית (מה לפרסם ומתי)", en: "Weekly content plan (what to post and when)" },
      { he: "כתיבה קצרה לפוסטים/רילסים (HE/EN)", en: "Short copy for posts/reels (HE/EN)" },
      { he: "העלאה לפי לוח זמנים", en: "Scheduled uploads" },
      { he: "סדר בפרופיל + היילייטים בסיסיים", en: "Profile organization + basic highlights" },
      { he: 'דו״ח שבועי קצר: מה עבד ומה לשפר', en: "Short weekly report: what worked and what to improve" },
    ],
    notIncluded: { he: "צילום חדש, מענה 24/7, תקציב פרסום", en: "New photography, 24/7 support, ad budget" },
  },
  {
    id: "ads-meta",
    titleKey: "addonAdsMeta",
    price: 249,
    bullets: [
      { he: "הקמת קמפיין אינסטגרם/פייסבוק (Meta)", en: "Instagram/Facebook campaign setup (Meta)" },
      { he: "יעד: הודעות WhatsApp / לידים / קליקים", en: "Goal: WhatsApp messages / leads / clicks" },
      { he: "קהלים + אזור + ניסויים (A/B)", en: "Audiences + location + A/B experiments" },
      { he: "אופטימיזציה 1–2 פעמים בשבוע", en: "Optimization 1–2 times per week" },
      { he: "דו״ח חודשי: עלות תוצאה ותובנות", en: "Monthly report: cost per result and insights" },
    ],
    notIncluded: { he: "תקציב מודעות (משולם למטא)", en: "Ad budget (paid to Meta)" },
  },
];
