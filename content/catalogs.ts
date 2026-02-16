import type { Catalog } from "@/types/catalog";

export const CATALOGS: Catalog[] = [
  {
    slug: "bars",
    title: {
      en: "Bars",
      he: "ברים",
    },
    shortDescription: {
      en: "Atmosphere, light, cocktails — shots that sell the mood.",
      he: "אווירה, תאורה, קוקטיילים — תמונות שמוכרות מצב רוח."
    },
    longDescription:
      {
        en: "Bar and cocktail culture photography: interiors, details, people in frame, short clips for Reels.\nGreat for menu updates, launches, and promo events.",
        he: "צילום ברים ותרבות קוקטיילים: אינטריור, פרטים, אנשים בקדר, קליפים קצרים לרילס.\nמתאים לעדכוני תפריט, השקות ואירועי קידום."
      },
    tags: ["Night", "Cocktails", "Reels"],
    examples: Array.from({ length: 9 }).map((_, i) => ({
      id: i,
      order: i,
      title: { en: `Bar shot ${i + 1}`, he: `תמונה ${i + 1}` },
      description: { en: "", he: "" },
      mediaType: "IMAGE" as const,
      mediaUrl: `https://picsum.photos/seed/bars-${i + 1}/960/640`,
    })),
  },
  {
    slug: "hotels",
    title: {
      en: "Hotels",
      he: "מלונות"
    },
    shortDescription: {
      en: "Rooms, lobby, service details — premium, calm tone.",
      he: "חדרים, לובי, פרטי שירות — טון פרימיום ורגוע."
    },
    longDescription:
      {
        en: "Hotel and apartment photography: rooms, common areas, details, morning/evening.\nGreat for websites, OTA listings, and brand communications.",
        he: "צילום מלונות ודירות: חדרים, אזורים משותפים, פרטים, בוקר/ערב.\nמתאים לאתרים, כרטיסי OTA ותקשורת מותג."
      },
    tags: ["Hospitality", "Interior", "Premium"],
    examples: Array.from({ length: 9 }).map((_, i) => ({
      id: i,
      order: i,
      title: { en: `Hotel scene ${i + 1}`, he: `תמונה ${i + 1}` },
      description: { en: "", he: "" },
      mediaType: "IMAGE" as const,
      mediaUrl: `https://picsum.photos/seed/hotels-${i + 1}/960/640`,
    })),
  },
  {
    slug: "events",
    title: {
      en: "Events",
      he: "אירועים"
    },
    shortDescription: {
      en: "Reportage + highlights — dynamic without chaos.",
      he: "ריפורטאז׳ + היילייטס — דינמיקה בלי כאוס."
    },
    longDescription:
      {
        en: "Event photography: reportage, brand zones, speakers, emotions, aftermovie approach.\nFormats: photo + short vertical videos.",
        he: "צילום אירועים: ריפורטאז׳, אזורי מותג, דוברים, רגשות, גישת aftermovie.\nפורמטים: צילום + סרטונים קצרים אנכיים."
      },
    tags: ["Report", "Highlights", "People"],
    examples: Array.from({ length: 9 }).map((_, i) => ({
      id: i,
      order: i,
      title: { en: `Event moment ${i + 1}`, he: `תמונה ${i + 1}` },
      description: { en: "", he: "" },
      mediaType: "IMAGE" as const,
      mediaUrl: `https://picsum.photos/seed/events-${i + 1}/960/640`,
    })),
  },
];
