import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });

  await prisma.pricingConfig.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, currency: "₪" },
  });

  const heroCount = await prisma.heroMedia.count();
  if (heroCount === 0) {
    await prisma.heroMedia.createMany({
      data: [
        { imageUrl: "https://picsum.photos/seed/hero1/1400/900", titleHe: "Social media", titleEn: "Social media", order: 1 },
        { imageUrl: "https://picsum.photos/seed/hero2/1400/900", titleHe: "Reels", titleEn: "Reels", order: 2 },
        { imageUrl: "https://picsum.photos/seed/hero3/1400/900", titleHe: "Content day", titleEn: "Content day", order: 3 },
      ],
    });
  }

  const priceSeed = [
    {
      titleHe: "Starter (חבילת תוכן)",
      titleEn: "Starter (content pack)",
      price: "מ-₪450",
      noteHe: "10 תמונות + 2 reels",
      noteEn: "10 photos + 2 reels",
      detailsHe: "מתאים לעסק קטן. לוקיישן אחד, עריכה בסיסית.\nמסירה: 3–5 ימים.",
      detailsEn: "Great for small business. 1 location, basic edit.\nDelivery: 3–5 days.",
      order: 1,
    },
    {
      titleHe: "Business (יום צילום)",
      titleEn: "Business (shoot day)",
      price: "מ-₪800",
      noteHe: "תמונות + וידאו + reels",
      noteEn: "Photos + video + reels",
      detailsHe: "יום מלא, 2–3 לוקיישנים, שוט-ליסט.\nמעולה למסעדות/מלונות/נדל״ן.",
      detailsEn: "Full day, 2–3 locations, shot list.\nGreat for restaurants/hotels/real estate.",
      order: 2,
    },
    {
      titleHe: "Monthly (מנוי)",
      titleEn: "Monthly (subscription)",
      price: "מ-₪2400",
      noteHe: "15 reels + stories + posts",
      noteEn: "15 reels + stories + posts",
      detailsHe: "תכנית חודשית, יצירת תוכן קבועה.\nאופציונלי: ניהול סושיאל וטרגוט.",
      detailsEn: "Monthly plan, recurring shoots.\nOptional: social management + ads setup.",
      order: 3,
    },
    {
      titleHe: "Restaurant-Web (חבילת מסעדה)",
      titleEn: "Restaurant-Web (restaurant package)",
      price: "מ-₪2500",
      noteHe: "צילום + תפריט QR + מיני אתר",
      noteEn: "Photos + QR menu + mini website",
      detailsHe: "חבילה מלאה למסעדות: צילום, רילס, תפריט QR, מיני אתר והקמת סושיאל.\nמסירה: 5–10 ימים.",
      detailsEn: "Full restaurant package: photos, reels, QR menu, mini website and social setup.\nDelivery: 5–10 days.",
      order: 4,
    },
  ];

  for (const p of priceSeed) {
    const ex = await prisma.priceItem.findFirst({ where: { titleEn: p.titleEn } });
    if (ex) await prisma.priceItem.update({ where: { id: ex.id }, data: p });
    else await prisma.priceItem.create({ data: p });
  }

  const catalogs = [
    {
      slug: "bars",
      popular: true,
      coverImage: "https://picsum.photos/seed/cat-bars/900/600",
      titleHe: "ברים",
      titleEn: "Bars",
      shortHe: "אווירה, קוקטיילים, תנועה",
      shortEn: "Mood, cocktails, motion",
      longHe: "תוכן לברים: אינטריור, צוות, קוקטיילים, אווירת ערב.\nמושלם ל-reels ו-stories.",
      longEn: "Content for bars: interior, team, cocktails, night mood.\nPerfect for reels & stories.",
      tags: ["night", "reels", "atmosphere"],
      promoVideoUrl: "",
      promoVideoTitleHe: "דוגמת וידאו",
      promoVideoTitleEn: "Video sample",
      promoVideoDescHe: "וידאו קצר שממחיש קצב, תאורה ודיטיילס.",
      promoVideoDescEn: "Short clip showing rhythm, light and details.",
      examples: [
        {
          titleHe: "טיזר ערב",
          titleEn: "Night teaser",
          previewImage: "https://picsum.photos/seed/bar1/900/600",
          videoUrl: "",
          descriptionHe: "קצב מהיר: ידיים, דיטיילס, תאורה.",
          descriptionEn: "Fast rhythm: hands, details, light.",
          link: "",
          order: 1,
        },
        {
          titleHe: "קלוז-אפים לקוקטיילים",
          titleEn: "Cocktail close-ups",
          previewImage: "https://picsum.photos/seed/bar2/900/600",
          videoUrl: "",
          descriptionHe: "סדרה לפרומו/תפריט/סטוריז.",
          descriptionEn: "Series for promo/menu/stories.",
          link: "",
          order: 2,
        },
      ],
    },
    {
      slug: "restaurants",
      popular: true,
      coverImage: "https://picsum.photos/seed/cat-rest/900/600",
      titleHe: "מסעדות",
      titleEn: "Restaurants",
      shortHe: "אוכל, אנשים, הגשה",
      shortEn: "Food, people, service",
      longHe: "מסעדות: מנות, מטבח, חלל, צוות.\nאור נקי שמייצר תיאבון.",
      longEn: "Restaurants: dishes, kitchen, space, team.\nClean light that sells.",
      tags: ["food", "brand", "menu"],
      promoVideoUrl: "",
      promoVideoTitleHe: "וידאו לדוגמה",
      promoVideoTitleEn: "Video sample",
      promoVideoDescHe: "הגשה, תנועה, טקסטורות.",
      promoVideoDescEn: "Plating, motion, textures.",
      examples: [
        {
          titleHe: "שף בהגשה",
          titleEn: "Chef plating",
          previewImage: "https://picsum.photos/seed/rest1/900/600",
          videoUrl: "",
          descriptionHe: "תהליך והגשה סופית, קלוז-אפ.",
          descriptionEn: "Process + final plating, close-ups.",
          link: "",
          order: 1,
        },
        {
          titleHe: "אווירת חלל",
          titleEn: "Dining mood",
          previewImage: "https://picsum.photos/seed/rest2/900/600",
          videoUrl: "",
          descriptionHe: "אור, בוקה, אנשים, דיטיילס.",
          descriptionEn: "Light, bokeh, people, details.",
          link: "",
          order: 2,
        },
      ],
    },
    {
      slug: "hotels",
      popular: false,
      coverImage: "https://picsum.photos/seed/cat-hotel/900/600",
      titleHe: "מלונות",
      titleEn: "Hotels",
      shortHe: "חדרים, לובי, שירות",
      shortEn: "Rooms, lobby, service",
      longHe: "מלונות: חדרים, לובי, דיטיילס.\nסגנון ‘Booking’ + tours.",
      longEn: "Hotels: rooms, lobby, details.\nBooking-like visuals + tours.",
      tags: ["interior", "booking", "lux"],
      promoVideoUrl: "",
      promoVideoTitleHe: "סיור חדר",
      promoVideoTitleEn: "Room tour",
      promoVideoDescHe: "15–30 שניות: כניסה, אזורים, דיטיילס.",
      promoVideoDescEn: "15–30s: entrance, zones, details.",
      examples: [
        {
          titleHe: "סיור חדר",
          titleEn: "Room tour",
          previewImage: "https://picsum.photos/seed/hotel1/900/600",
          videoUrl: "",
          descriptionHe: "קצב רגוע, תאורה רכה.",
          descriptionEn: "Calm rhythm, soft light.",
          link: "",
          order: 1,
        },
        {
          titleHe: "דיטיילס בלובי",
          titleEn: "Lobby details",
          previewImage: "https://picsum.photos/seed/hotel2/900/600",
          videoUrl: "",
          descriptionHe: "טקסטורות, אור, קומפוזיציה.",
          descriptionEn: "Textures, light, composition.",
          link: "",
          order: 2,
        },
      ],
    },
    {
      slug: "events",
      popular: false,
      coverImage: "https://picsum.photos/seed/cat-event/900/600",
      titleHe: "אירועים",
      titleEn: "Events",
      shortHe: "אור, רגש, אנשים",
      shortEn: "Light, emotion, people",
      longHe: "אירועים: ריפורטז׳ מהיר + תוכן לרשתות.\nאפשר להוציא highlights באותו יום.",
      longEn: "Events: fast reportage + social-first content.\nHighlights can be delivered same day.",
      tags: ["live", "people", "highlights"],
      promoVideoUrl: "",
      promoVideoTitleHe: "Highlights",
      promoVideoTitleEn: "Highlights",
      promoVideoDescHe: "רגעים, דיטיילס, מותג.",
      promoVideoDescEn: "Moments, details, brand.",
      examples: [
        {
          titleHe: "היילייטס אירוע",
          titleEn: "Event highlight",
          previewImage: "https://picsum.photos/seed/event1/900/600",
          videoUrl: "",
          descriptionHe: "רגעים + דיטיילס + ברנד.",
          descriptionEn: "Moments + details + brand.",
          link: "",
          order: 1,
        },
        {
          titleHe: "מאחורי הקלעים",
          titleEn: "Backstage",
          previewImage: "https://picsum.photos/seed/event2/900/600",
          videoUrl: "",
          descriptionHe: "תהליך, צוות, הכנות.",
          descriptionEn: "Process, team, prep.",
          link: "",
          order: 2,
        },
      ],
    },
    {
      slug: "real-estate",
      popular: false,
      coverImage: "https://picsum.photos/seed/cat-re/900/600",
      titleHe: "נדל״ן",
      titleEn: "Real Estate",
      shortHe: "מרחב, אור, קווים",
      shortEn: "Space, light, lines",
      longHe: "נדל״ן: סט לליסטינג + רילס.\nפוקוס על מרחב ואור.",
      longEn: "Real estate: listing set + reels.\nFocus on space & light.",
      tags: ["listing", "tour", "wide"],
      promoVideoUrl: "",
      promoVideoTitleHe: "וידאו קצר",
      promoVideoTitleEn: "Short video",
      promoVideoDescHe: "הצגת החלל בצורה שמוכרת.",
      promoVideoDescEn: "Space showcased to sell.",
      examples: [
        {
          titleHe: "סט ליסטינג",
          titleEn: "Listing set",
          previewImage: "https://picsum.photos/seed/re1/900/600",
          videoUrl: "",
          descriptionHe: "רחב + דיטיילס.",
          descriptionEn: "Wide + details.",
          link: "",
          order: 1,
        },
        {
          titleHe: "סדרת דיטיילס",
          titleEn: "Detail series",
          previewImage: "https://picsum.photos/seed/re2/900/600",
          videoUrl: "",
          descriptionHe: "טקסטורות ואור לסטוריז.",
          descriptionEn: "Textures & light for stories.",
          link: "",
          order: 2,
        },
      ],
    },
    {
      slug: "other",
      popular: false,
      coverImage: "https://picsum.photos/seed/cat-other/900/600",
      titleHe: "עסק אחר",
      titleEn: "Other business",
      shortHe: "אם לא מצאתם קטגוריה",
      shortEn: "If your category is missing",
      longHe: "תארו את העסק — אציע פורמט צילום וחבילה.\nאפשר להתחיל מ-“לבנות חבילה”.",
      longEn: "Describe your business — I'll suggest a format + package.\nStart from “Build a package”.",
      tags: ["custom", "brief", "pack"],
      promoVideoUrl: "",
      promoVideoTitleHe: "דוגמה כללית",
      promoVideoTitleEn: "General sample",
      promoVideoDescHe: "וידאו כללי להמחשת סטייל.",
      promoVideoDescEn: "General clip to show style.",
      examples: [
        {
          titleHe: "קונספט מותאם",
          titleEn: "Custom concept",
          previewImage: "https://picsum.photos/seed/other1/900/600",
          videoUrl: "",
          descriptionHe: "מתאימים סגנון לעסק שלך.",
          descriptionEn: "We tailor style to your business.",
          link: "",
          order: 1,
        },
      ],
    },
    {
      slug: "restaurant-menu-website",
      popular: true,
      coverImage: "https://picsum.photos/seed/cat-rmw/900/600",
      titleHe: "מסעדה / בר / קפה: תוכן + תפריט + אתר",
      titleEn: "Restaurant / Bar / Cafe: Content + Menu + Website",
      shortHe: "שותף אחד. חבילה מלאה. מוכנה למכירה.",
      shortEn: "One partner. Full package. Ready to sell.",
      longHe: "חבילת תוכן מלאה למסעדות: צילום, רילס, תפריט QR, מיני אתר והקמת סושיאל.",
      longEn: "Full content package for restaurants: photos, reels, QR menu, mini website and social setup.",
      tags: ["Food", "Restaurant", "Menu", "Website", "UGC"],
      promoVideoUrl: "",
      promoVideoTitleHe: "",
      promoVideoTitleEn: "",
      promoVideoDescHe: "",
      promoVideoDescEn: "",
      examples: [],
    },
  ];

  for (const c of catalogs) {
    const tagsJson = JSON.stringify(c.tags);
    const existing = await prisma.catalog.findUnique({
      where: { slug: c.slug },
      include: { examples: { select: { id: true } } },
    });

    if (existing) {
      // If catalog exists but has zero examples, re-seed the placeholder examples
      if (existing.examples.length === 0 && c.examples.length > 0) {
        await prisma.example.createMany({
          data: c.examples.map((e) => ({
            catalogId: existing.id,
            titleHe: e.titleHe,
            titleEn: e.titleEn,
            mediaType: e.videoUrl ? "VIDEO" : "IMAGE",
            mediaUrl: e.videoUrl || e.previewImage,
            posterUrl: e.videoUrl ? e.previewImage : null,
            descriptionHe: e.descriptionHe,
            descriptionEn: e.descriptionEn,
            link: e.link,
            order: e.order,
          })),
        });
      }
      continue;
    }

    await prisma.catalog.create({
      data: {
        slug: c.slug,
        popular: c.popular,
        tagsJson,
        coverImage: c.coverImage,
        titleHe: c.titleHe,
        titleEn: c.titleEn,
        shortDescriptionHe: c.shortHe,
        shortDescriptionEn: c.shortEn,
        longDescriptionHe: c.longHe,
        longDescriptionEn: c.longEn,
        promoVideoUrl: c.promoVideoUrl,
        promoVideoTitleHe: c.promoVideoTitleHe,
        promoVideoTitleEn: c.promoVideoTitleEn,
        promoVideoDescriptionHe: c.promoVideoDescHe,
        promoVideoDescriptionEn: c.promoVideoDescEn,
        examples: {
          create: c.examples.map((e) => ({
            titleHe: e.titleHe,
            titleEn: e.titleEn,
            mediaType: e.videoUrl ? "VIDEO" : "IMAGE",
            mediaUrl: e.videoUrl || e.previewImage,
            posterUrl: e.videoUrl ? e.previewImage : null,
            descriptionHe: e.descriptionHe,
            descriptionEn: e.descriptionEn,
            link: e.link,
            order: e.order,
          })),
        },
      },
    });
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
