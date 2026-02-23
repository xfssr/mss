import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SEED_DATA = [
  {
    order: 0, category: "street",
    videoUrl: "https://www.tiktok.com/@emilnisenblatt/video/7368112073059978497",
    titleEn: "Street Food — Viral Reach", titleHe: "אוכל רחוב — חשיפה ויראלית",
    tagsEn: "UGC • Street • TikTok", tagsHe: "UGC • רחוב • טיקטוק",
    views: "244K", avgWatch: "32.5s", fullWatch: "12.8%", followers: "+624",
    insightEn: "High reach driven by organic street food appeal", insightHe: "חשיפה גבוהה בזכות תוכן אוכל רחוב אותנטי",
    servicesEn: "Concept • Filming • Editing • Captions", servicesHe: "קונספט • צילום • עריכה • כתוביות",
    thumbnailUrl: "/images/case-placeholder.webp", isPublished: true,
  },
  {
    order: 1, category: "restaurant",
    videoUrl: "https://www.tiktok.com/@emilnisenblatt/video/7437403806054370568",
    titleEn: "Restaurant Spotlight — Strong Retention", titleHe: "מסעדה בזרקור — ריטנשן חזק",
    tagsEn: "UGC • Backstage • TikTok", tagsHe: "UGC • מאחורי הקלעים • טיקטוק",
    views: "49K", avgWatch: "12.99s", fullWatch: "23.1%", followers: "+31", forYou: "87.2%",
    insightEn: "For You page drove 87% of views — proof of algorithmic fit", insightHe: "87% מהצפיות הגיעו מדף ה-For You — התאמה אלגוריתמית מוכחת",
    servicesEn: "Concept • Filming • Editing • Captions", servicesHe: "קונספט • צילום • עריכה • כתוביות",
    thumbnailUrl: "/images/case-placeholder.webp", isPublished: true,
  },
  {
    order: 2, category: "food",
    videoUrl: "https://www.tiktok.com/@emilnisenblatt/video/7367327238452382993",
    titleEn: "Food Close-Up — Appetite Appeal", titleHe: "צילום אוכל — משיכה חזותית",
    tagsEn: "UGC • POV • TikTok", tagsHe: "UGC • POV • טיקטוק",
    views: "—", avgWatch: "—", fullWatch: "—", followers: "—",
    insightEn: "Close-up food visuals drive emotional engagement", insightHe: "צילומי תקריב של אוכל מעוררים מעורבות רגשית",
    servicesEn: "Concept • Filming • Editing • Captions", servicesHe: "קונספט • צילום • עריכה • כתוביות",
    thumbnailUrl: "/images/case-placeholder.webp", isPublished: true,
  },
  {
    order: 3, category: "kitchen",
    videoUrl: "https://www.tiktok.com/@emilnisenblatt/video/7367299135583669505",
    titleEn: "Kitchen POV — Fast Retention", titleHe: "מטבח POV — ריטנשן גבוה",
    tagsEn: "UGC • POV • TikTok", tagsHe: "UGC • POV • טיקטוק",
    views: "—", avgWatch: "—", fullWatch: "—", followers: "—",
    insightEn: "Behind-the-scenes kitchen content keeps viewers watching", insightHe: "תוכן מאחורי הקלעים מהמטבח שומר על הצופים",
    servicesEn: "Concept • Filming • Editing • Captions", servicesHe: "קונספט • צילום • עריכה • כתוביות",
    thumbnailUrl: "/images/case-placeholder.webp", isPublished: true,
  },
  {
    order: 4, category: "bar",
    videoUrl: "https://www.tiktok.com/@emilnisenblatt/video/7453474459144523026",
    titleEn: "Bar Vibes — Night Energy", titleHe: "אווירת בר — אנרגיה לילית",
    tagsEn: "UGC • Nightlife • TikTok", tagsHe: "UGC • חיי לילה • טיקטוק",
    views: "—", avgWatch: "—", fullWatch: "—", followers: "—",
    insightEn: "Nightlife energy captured to attract younger audiences", insightHe: "אנרגיית חיי לילה שמושכת קהל צעיר",
    servicesEn: "Concept • Filming • Editing • Captions", servicesHe: "קונספט • צילום • עריכה • כתוביות",
    thumbnailUrl: "/images/case-placeholder.webp", isPublished: true,
  },
  {
    order: 5, category: "restaurant",
    videoUrl: "https://www.tiktok.com/@emilnisenblatt/video/7466110123199581458",
    titleEn: "Fine Dining — Premium Feel", titleHe: "מסעדה — תחושת פרימיום",
    tagsEn: "UGC • Cinematic • TikTok", tagsHe: "UGC • קולנועי • טיקטוק",
    views: "—", avgWatch: "—", fullWatch: "—", followers: "—",
    insightEn: "Cinematic framing elevates brand positioning", insightHe: "מסגור קולנועי מעלה את מיצוב המותג",
    servicesEn: "Concept • Filming • Editing • Captions", servicesHe: "קונספט • צילום • עריכה • כתוביות",
    thumbnailUrl: "/images/case-placeholder.webp", isPublished: true,
  },
  {
    order: 6, category: "street",
    videoUrl: "https://www.tiktok.com/@emilnisenblatt/video/7569940567610658066",
    titleEn: "Street Food — High Reach", titleHe: "אוכל רחוב — חשיפה גבוהה",
    tagsEn: "UGC • Street • TikTok", tagsHe: "UGC • רחוב • טיקטוק",
    views: "—", avgWatch: "—", fullWatch: "—", followers: "—",
    insightEn: "Authentic street food content performs well organically", insightHe: "תוכן אוכל רחוב אותנטי עובד מצוין אורגנית",
    servicesEn: "Concept • Filming • Editing • Captions", servicesHe: "קונספט • צילום • עריכה • כתוביות",
    thumbnailUrl: "/images/case-placeholder.webp", isPublished: true,
  },
  {
    order: 7, category: "food",
    videoUrl: "https://www.tiktok.com/@emilnisenblatt/video/7287123791048625426",
    titleEn: "Food Styling — Visual Impact", titleHe: "סטיילינג אוכל — אימפקט חזותי",
    tagsEn: "UGC • Styling • TikTok", tagsHe: "UGC • סטיילינג • טיקטוק",
    views: "—", avgWatch: "—", fullWatch: "—", followers: "—",
    insightEn: "Styled food content drives saves and shares", insightHe: "תוכן אוכל מעוצב מניע שמירות ושיתופים",
    servicesEn: "Concept • Filming • Editing • Captions", servicesHe: "קונספט • צילום • עריכה • כתוביות",
    thumbnailUrl: "/images/case-placeholder.webp", isPublished: true,
  },
  {
    order: 8, category: "kitchen",
    videoUrl: "https://www.tiktok.com/@emilnisenblatt/video/7451286146975370503",
    titleEn: "Kitchen Action — Behind the Scenes", titleHe: "מטבח בפעולה — מאחורי הקלעים",
    tagsEn: "UGC • Backstage • TikTok", tagsHe: "UGC • מאחורי הקלעים • טיקטוק",
    views: "—", avgWatch: "—", fullWatch: "—", followers: "—",
    insightEn: "Raw kitchen footage builds trust and authenticity", insightHe: "צילומי מטבח גולמיים בונים אמון ואותנטיות",
    servicesEn: "Concept • Filming • Editing • Captions", servicesHe: "קונספט • צילום • עריכה • כתוביות",
    thumbnailUrl: "/images/case-placeholder.webp", isPublished: true,
  },
];

async function seedIfEmpty() {
  const count = await prisma.caseStudy.count();
  if (count === 0) {
    await prisma.caseStudy.createMany({ data: SEED_DATA });
  }
}

export async function GET() {
  await seedIfEmpty();

  const cases = await prisma.caseStudy.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
  });

  return NextResponse.json(cases);
}
