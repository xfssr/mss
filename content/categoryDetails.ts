import type { L10n } from "@/types/l10n";

export type CategoryDetailFaq = { q: L10n; a: L10n };

export type CategoryDetailPricingTier = {
  label: string;
  range: L10n;
};

export type CategoryDetailProcessStep = {
  title: L10n;
};

export type CategoryDetailSocialProof = {
  title: L10n;
};

export type CategoryDetail = {
  slug: string;
  label: L10n;
  pills: L10n[];
  whatYouGet: L10n[];
  bestFor: L10n;
  process: CategoryDetailProcessStep[];
  pricingTiers: CategoryDetailPricingTier[];
  pricingNote: L10n;
  whyThisWorks: L10n[];
  faq: CategoryDetailFaq[];
  socialProof: CategoryDetailSocialProof[];
  ctaPrimary: L10n;
  ctaSecondary: L10n;
  whatsappTemplatePrimary: L10n;
  whatsappTemplateSecondary: L10n;
};

export const DEFAULT_CATEGORY_DETAILS: CategoryDetail[] = [
  {
    slug: "restaurant-menu-website",
    label: {
      he: "תפריט QR + מיני אתר למסעדות",
      en: "QR Menu + Mini Website for Restaurants",
    },
    pills: [
      { he: "UGC רילס", en: "UGC Reels" },
      { he: "עיצוב תפריט (QR/PDF)", en: "Menu Design (QR/PDF)" },
      { he: "מיני אתר", en: "Mini Website" },
      { he: "צילום + וידאו", en: "Photo + Video" },
      { he: "הקמת סושיאל", en: "Social Setup" },
    ],
    whatYouGet: [
      { he: "צילום אוכל/קוקטיילים + אווירה (פנים/חוץ)", en: "Food/cocktail + atmosphere photos (indoor/outdoor)" },
      { he: "6–12 רילס (UGC + דיטיילס סינמטי)", en: "6–12 reels (UGC + cinematic details)" },
      { he: "תפריט QR: PDF + גרסה להדפסה", en: "QR menu: PDF + print-ready version" },
      { he: "מיני אתר/לנדינג: תפריט, מפה, WhatsApp, כפתור הזמנה", en: "Mini website/landing: menu, map, WhatsApp, booking button" },
      { he: "סט בסיסי לסושיאל: ביו, היילייטס, תבנית סטוריז", en: "Basic social setup: bio, highlights, story template" },
    ],
    bestFor: {
      he: "בתי קפה, ברים, מסעדות, שפים, מקומות חדשים, תפריט עונתי, אירועים",
      en: "Cafes, bars, restaurants, chefs, new openings, seasonal menus, events",
    },
    process: [
      { title: { he: "בריף + קונספט", en: "Brief + concept" } },
      { title: { he: "צילום + עיצוב", en: "Shoot + design" } },
      { title: { he: "השקה + מסירה", en: "Launch + deliverables" } },
    ],
    pricingTiers: [
      { label: "Mini", range: { he: "2,500–5,000 ₪", en: "₪2,500–5,000" } },
      { label: "Standard", range: { he: "6,000–12,000 ₪", en: "₪6,000–12,000" } },
      { label: "Premium", range: { he: "15,000–30,000 ₪+", en: "₪15,000–30,000+" } },
    ],
    pricingNote: {
      he: "המחיר הסופי נקבע לפי היקף העבודה",
      en: "Final quote depends on scope",
    },
    whyThisWorks: [
      { he: "אנשים מחליטים עם העיניים", en: "People decide with their eyes" },
      { he: "תפריט חייב להיות קל לבחור ממנו", en: "Menu must be effortless to choose" },
      { he: "QR/אתר חייב לסגור את הפעולה", en: "QR/website must close the action" },
    ],
    faq: [
      {
        q: { he: "אפשר לעשות רק תפריט / רק אתר / רק תוכן?", en: "Can you do only menu / only site / only content?" },
        a: { he: "כן. אפשר לבחור מודול אחד או לשלב, לפי צורך ותקציב.", en: "Yes. Pick one module or combine them based on scope." },
      },
      {
        q: { he: "כמה סבבי תיקונים כלולים?", en: "How many revision rounds?" },
        a: { he: "בדרך כלל סבב תיקונים אחד כלול. יותר לפי היקף.", en: "Usually 1 revision round included. More depends on scope." },
      },
      {
        q: { he: "אתם עובדים בכמה שפות?", en: "Do you work in multiple languages?" },
        a: { he: "כן. עברית/אנגלית ועוד שפות בתוספת לפי צורך.", en: "Yes. Hebrew/English plus more as needed (extra)." },
      },
      {
        q: { he: "כמה מהר אפשר לעלות לאוויר?", en: "How fast can we launch?" },
        a: { he: "בדרך כלל 3–7 ימים, תלוי בהיקף ובזמינות.", en: "Usually 3–7 days depending on scope and availability." },
      },
      {
        q: { he: "אתם מספקים קבצים גולמיים?", en: "Do you provide raw files?" },
        a: { he: "אפשר בתיאום מראש. ברירת מחדל: תוצרים מוכנים לפרסום.", en: "Possible by request. Default is publish-ready deliverables." },
      },
    ],
    socialProof: [
      { title: { he: "לפני / אחרי (מקום שמרגיש יוקרתי)", en: "Before/After (premium look)" } },
      { title: { he: "יותר צפיות (סלוט לטסטימוניאל)", en: "More views (testimonial slot)" } },
      { title: { he: "יותר הזמנות (סלוט לקייס)", en: "More bookings (case slot)" } },
    ],
    ctaPrimary: { he: "בקשו את החבילה", en: "Request this package" },
    ctaSecondary: { he: "שאלה מהירה ב-WhatsApp", en: "Quick question on WhatsApp" },
    whatsappTemplatePrimary: {
      he: "היי, אני מעוניין/ת בחבילת תוכן+תפריט+אתר למסעדה. אשמח לפרטים!",
      en: "Hi, I'm interested in the content+menu+website package for a restaurant. Please share details!",
    },
    whatsappTemplateSecondary: {
      he: "היי, יש לי שאלה לגבי החבילה למסעדות",
      en: "Hi, I have a question about the restaurant package",
    },
  },
];
