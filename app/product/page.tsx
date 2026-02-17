// app/product/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SAME_AS, getSiteUrl } from "@/config/constants";
import { BookingSectionToggle } from "@/components/BookingSectionToggle";
import { getPackageDetails } from "@/lib/packageConfigStore";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Lang = "he" | "en";

function parseLang(searchParams?: Record<string, string | string[] | undefined>): Lang {
  const raw = searchParams?.lang;
  const v = Array.isArray(raw) ? raw[0] : raw;
  return v === "en" ? "en" : "he";
}

function pickL10nFromRow(row: any, base: "title" | "note" | "details") {
  const en =
    (typeof row?.[`${base}En`] === "string" ? row[`${base}En`] : "") ||
    (typeof row?.[base]?.en === "string" ? row[base].en : "") ||
    (typeof row?.[base] === "string" ? row[base] : "");
  const he =
    (typeof row?.[`${base}He`] === "string" ? row[`${base}He`] : "") ||
    (typeof row?.[base]?.he === "string" ? row[base].he : "");
  return { en: (en || "").trim(), he: (he || "").trim() };
}

function pickByLang(lang: Lang, v: { he: string; en: string }) {
  const s = (lang === "en" ? v.en : v.he).trim();
  return s || v.he.trim() || v.en.trim() || "";
}

/** Accepts: "₪ 350", "350₪", "ILS 350", "350", "350.50" */
function parsePriceNumber(raw: string) {
  const s = (raw || "").replace(",", ".");
  const m = s.match(/(\d+(\.\d+)?)/);
  return m ? m[1] : null;
}

async function getLowestPriceFromDb() {
  try {
    const first = await prisma.priceItem.findFirst({ orderBy: [{ order: "asc" }, { id: "asc" }] });
    const n = first?.price ? parsePriceNumber(first.price) : null;
    return n || "350";
  } catch {
    return "350";
  }
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "https://www.mscreenstudio.online";
  const resolvedParams = searchParams ? await searchParams : undefined;
  const lang = parseLang(resolvedParams);
  const firstPrice = await getLowestPriceFromDb();

  const isProduction =
    (process.env.VERCEL_ENV || "production") === "production";

  const title =
    lang === "he"
      ? "Micro-Screen Studio — חבילות תוכן"
      : "Micro-Screen Studio — Content Packages";
  const description =
    lang === "he"
      ? "חבילות תוכן לעסקים: רילס, צילום, הפקות וניהול סושיאל. הזמנה ב-WhatsApp."
      : "Content packages for businesses: reels, photos, shoots and social media management. Order via WhatsApp.";

  return {
    title,
    description,
    alternates: {
      canonical: "https://www.mscreenstudio.online/product",
      languages: {
        he: `${SITE_URL}/product?lang=he`,
        en: `${SITE_URL}/product?lang=en`,
      },
    },
    robots: isProduction
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/product`,
      locale: lang === "he" ? "he_IL" : "en_US",
      title,
      description,
      images: [{ url: `${SITE_URL}/og.jpg`, width: 1200, height: 630, alt: "Micro-Screen Studio — Professional content packages for businesses" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og.jpg`],
    },
    other: {
      "og:type": "product",
      "product:price:amount": firstPrice,
      "product:price:currency": "ILS",
    },
  };
}

export default async function ProductPage(props: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const siteUrl = getSiteUrl();
  const searchParams = props.searchParams ? await props.searchParams : undefined;
  const lang = parseLang(searchParams);
  const dir = lang === "he" ? "rtl" : "ltr";

  const catalogRaw = searchParams?.catalog;
  const catalogFromUrl = (Array.isArray(catalogRaw) ? catalogRaw[0] : catalogRaw) ?? "";
  const pkgRaw = searchParams?.pkg;
  const pkgFromUrl = (Array.isArray(pkgRaw) ? pkgRaw[0] : pkgRaw) ?? "";
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "15551234567";

  const prices = await prisma.priceItem.findMany({
    orderBy: [{ order: "asc" }, { id: "asc" }],
  });

  const packageDetails = await getPackageDetails();

  const offers = prices
    .map((p: any) => {
      const title = pickL10nFromRow(p, "title");
      const note = pickL10nFromRow(p, "note");
      const details = pickL10nFromRow(p, "details");
      const priceNum = parsePriceNumber(p.price || "");
      const name = (title.en || title.he || "").trim();
      return {
        id: p.id,
        title,
        note,
        details,
        name,
        priceRaw: (p.price || "").trim(),
        priceNum, // "350"
        currency: "ILS",
      };
    })
    .filter((o) => o.name);

  // If pkg query param is provided, filter to show only the matching package
  const matchedOffers = pkgFromUrl
    ? offers.filter((o) => {
        const q = pkgFromUrl.toLowerCase();
        return (
          o.name.toLowerCase().includes(q) ||
          o.title.en.toLowerCase().includes(q) ||
          o.title.he.toLowerCase().includes(q)
        );
      })
    : [];
  // Only apply pkg-specific layout (hide FAQ, etc.) when filter actually matched
  const hasPkgFilter = !!(pkgFromUrl && matchedOffers.length > 0);
  // Show matched offers when filter matches, otherwise fall back to all offers
  const filteredOffers = hasPkgFilter ? matchedOffers : offers;

  // Build Offer nodes (from DB)
  const offerNodes = offers
    .filter((o) => o.priceNum)
    .map((o) => ({
      "@type": "Offer",
      name: pickByLang(lang, { he: o.title.he || o.name, en: o.title.en || o.name }),
      description: [
        pickByLang(lang, { he: o.note.he || "", en: o.note.en || "" }),
        pickByLang(lang, { he: o.details.he || "", en: o.details.en || "" }),
      ]
        .filter(Boolean)
        .join(" — ")
        .slice(0, 400),
      priceCurrency: o.currency,
      price: o.priceNum, // must be numeric string
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/#about`,
      seller: { "@type": "Organization", name: "Micro-Screen Studio" },
    }));

  // Fallback offer (so Canva never sees empty offers)
  const fallbackOffer = {
    "@type": "Offer",
    name: lang === "he" ? "חבילת Starter" : "Starter package",
    description: lang === "he" ? "רילס + תמונות. הזמנה מהירה ב-WhatsApp." : "Reels + photos. Fast WhatsApp booking.",
    priceCurrency: "ILS",
    price: "350",
    availability: "https://schema.org/InStock",
    url: `${siteUrl}/#about`,
    seller: { "@type": "Organization", name: "Micro-Screen Studio" },
  };

  const safeOffers = offerNodes.length ? offerNodes : [fallbackOffer];

  const numeric = safeOffers
    .map((o: any) => Number(String(o.price).replace(",", ".")))
    .filter((n) => Number.isFinite(n));
  const lowPrice = numeric.length ? String(Math.min(...numeric)) : "350";
  const highPrice = numeric.length ? String(Math.max(...numeric)) : lowPrice;

  const faq = [
    {
      q: lang === "he" ? "איך מזמינים?" : "How do I book?",
      a:
        lang === "he"
          ? "בוחרים קטלוג, עוברים לחבילה, ממלאים תאריך/שעה/עיר ולוחצים 'WhatsApp' — ההודעה מוכנה."
          : "Pick a catalog, choose a package, fill date/time/city and press WhatsApp — message is prefilled.",
    },
    {
      q: lang === "he" ? "מה כולל השירות?" : "What’s included?",
      a:
        lang === "he"
          ? "צילום רילס, תמונות, הפקה לפי צורך, ואפשרות לניהול סושיאל מלא והקמת קמפיינים."
          : "Reels, photos, shoots, plus optional full social management and ads setup.",
    },
    {
      q: lang === "he" ? "האם המחיר קבוע?" : "Is the price fixed?",
      a:
        lang === "he"
          ? "אפשר לבחור חבילה קיימת או להרכיב חבילה אישית — המחיר מתעדכן בהתאם."
          : "You can pick a preset or build a custom package — the price updates accordingly.",
    },
    {
      q: lang === "he" ? "כמה מהר עונים?" : "How fast do you reply?",
      a: lang === "he" ? "בדרך כלל תוך כמה שעות." : "Usually within a few hours.",
    },
  ];

  // JSON-LD graph: Organization + Product + FAQPage + (optional) Service
  const productJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}#org`,
        name: "Micro-Screen Studio",
        url: siteUrl,
        logo: `${siteUrl}/apple-touch-icon.png`,
        sameAs: [...SAME_AS],
      },
      {
        "@type": "Product",
        "@id": `${siteUrl}/product#product`,
        name: lang === "he" ? "Micro-Screen Studio — חבילות תוכן" : "Micro-Screen Studio — Content Packages",
        description:
          lang === "he"
            ? "חבילות תוכן לעסקים: רילס, צילום, הפקות וניהול סושיאל. הזמנה ב-WhatsApp."
            : "Content packages for businesses: reels, photos, shoots and social media management. Book via WhatsApp.",
        brand: { "@type": "Brand", name: "Micro-Screen Studio" },
        image: [`${siteUrl}/og.jpg`],
        url: `${siteUrl}/product?lang=${lang}`,
        offers: {
          "@type": "AggregateOffer",
          lowPrice,
          highPrice,
          priceCurrency: "ILS",
          offerCount: String(safeOffers.length),
          offers: safeOffers,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/product#faq`,
        mainEntity: faq.map((x) => ({
          "@type": "Question",
          name: x.q,
          acceptedAnswer: { "@type": "Answer", text: x.a },
        })),
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/product#service`,
        name: lang === "he" ? "יצירת תוכן וניהול סושיאל" : "Content creation & social media management",
        provider: { "@id": `${siteUrl}#org` },
        areaServed: "IL",
        url: `${siteUrl}/#packages`,
      },
    ],
  };

  const lowestOffer = lowPrice || "350";

  const ui = {
    title: lang === "he" ? "Micro-Screen Studio — חבילות תוכן" : "Micro-Screen Studio — Content Packages",
    subtitle:
      lang === "he"
        ? "חבילות ומחירים. בחרו קטלוג, חבילה, והזמינו ב-WhatsApp."
        : "Packages & pricing. Pick a catalog, package, and book via WhatsApp.",
    packages: lang === "he" ? "חבילות" : "Packages",
    viewCatalogs: lang === "he" ? "צפו בקטלוגים" : "View catalogs",
    contact: lang === "he" ? "יצירת קשר (WhatsApp)" : "Contact (WhatsApp)",
    from: lang === "he" ? "החל מ-" : "From",
    noPackages: lang === "he" ? "עדיין אין חבילות ב-DB. הוסיפו ב-Admin → Prices." : "No packages in DB yet. Add them in Admin → Prices.",
    faqTitle: lang === "he" ? "שאלות נפוצות" : "FAQ",
    infoNote: lang === "he" ? "זו לא הזמנה — מידע ומחירים בלבד." : "This is not an order — information and pricing only.",
    compareTitle: lang === "he" ? "השוואת חבילות" : "Compare packages",
    reels: lang === "he" ? "רילס" : "Reels",
    photos: lang === "he" ? "תמונות" : "Photos",
    locations: lang === "he" ? "מיקומים" : "Locations",
    delivery: lang === "he" ? "אספקה" : "Delivery",
    bestFor: lang === "he" ? "מתאים ל" : "Best for",
    goToCatalogs: lang === "he" ? "לקטלוגים" : "Go to catalogs",
    whatsappCta: lang === "he" ? "WhatsApp עם הודעה מוכנה" : "WhatsApp with prefilled message",
  };

  /** Pick localized value from {he,en} */
  function pickPkg(v: { he: string; en: string }) {
    const s = (lang === "en" ? v.en : v.he).trim();
    return s || v.he.trim() || v.en.trim();
  }

  const whatsappMsg = encodeURIComponent(
    lang === "he"
      ? "היי, אני מעוניין לשמוע על חבילות תוכן"
      : "Hi, I'd like to learn about content packages",
  );
  const waLink = `https://wa.me/${whatsappPhone}?text=${whatsappMsg}`;

  return (
    <main
      dir={dir}
      className="min-h-screen bg-gradient-to-b from-[#0b0f14] via-[#0a0c10] to-[#06070a] text-white px-4 py-10"
    >
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.06] p-6 sm:p-10">
        {/* lang switch */}
        <div className="flex items-center justify-end gap-2">
          <Link
            href="/product?lang=he"
            className={[
              "px-3 py-1.5 text-xs rounded-lg border border-white/10",
              lang === "he" ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/[0.06]",
            ].join(" ")}
          >
            עברית
          </Link>
          <Link
            href="/product?lang=en"
            className={[
              "px-3 py-1.5 text-xs rounded-lg border border-white/10",
              lang === "en" ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/[0.06]",
            ].join(" ")}
          >
            EN
          </Link>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-6 items-start">
          <div className="relative w-full sm:w-64 aspect-[1200/630] rounded-2xl overflow-hidden border border-white/10 bg-black/20">
            <Image src="/og.jpg" alt="Micro-Screen Studio" fill className="object-cover" />
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="text-2xl sm:text-3xl font-semibold text-[rgb(var(--blue))]">
              {ui.title}
            </h1>

            <p className="mt-2 text-white/70">
              {ui.subtitle}
            </p>

            {/* Info badge */}
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[rgb(var(--blue))]/30 bg-[rgb(var(--blue))]/10 px-3 py-1.5 text-xs text-[rgb(var(--blue))]">
              <span aria-hidden="true">ℹ️</span>
              {ui.infoNote}
            </div>

            <div className="mt-3 text-sm text-white/75">
              {ui.from} <span className="font-semibold text-white">₪ {lowestOffer}</span>
            </div>

            {/* Comparison blocks (mobile-first stacked) */}
            {packageDetails.length > 0 && (
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-sm font-medium text-white/90 mb-3">{ui.compareTitle}</div>
                <div className="space-y-3">
                  {packageDetails.map((pkg) => (
                    <div key={pkg.id} className="rounded-xl border border-white/10 bg-black/25 p-3">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="text-sm font-semibold text-white">{pickPkg(pkg.title)}</div>
                        <div className="text-sm font-semibold text-[rgb(var(--blue))] whitespace-nowrap">
                          ₪{pkg.priceFrom.toLocaleString()}+
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                        <div className="text-white/50">{ui.reels}</div>
                        <div className="text-white/80">{pickPkg(pkg.pills[0] ?? { he: "—", en: "—" })}</div>
                        <div className="text-white/50">{ui.photos}</div>
                        <div className="text-white/80">{pickPkg(pkg.pills[2] ?? pkg.pills[1] ?? { he: "—", en: "—" })}</div>
                        <div className="text-white/50">{ui.locations}</div>
                        <div className="text-white/80">{pickPkg(pkg.locations)}</div>
                        <div className="text-white/50">{ui.delivery}</div>
                        <div className="text-white/80">{pickPkg(pkg.deliveryTime)}</div>
                        <div className="text-white/50">{ui.bestFor}</div>
                        <div className="text-white/80 col-span-1">{pickPkg(pkg.bestFor)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DB price items */}
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-medium text-white/90">{ui.packages}</div>

              {filteredOffers.length ? (
                <div className="mt-3 space-y-3">
                  {filteredOffers.map((o) => {
                    const name = pickByLang(lang, { he: o.title.he || o.name, en: o.title.en || o.name });
                    const note = pickByLang(lang, { he: o.note.he || "", en: o.note.en || "" });
                    const details = pickByLang(lang, { he: o.details.he || "", en: o.details.en || "" });

                    return (
                      <div key={o.id} className="rounded-xl border border-white/10 bg-black/25 p-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="text-sm text-white/90">{name}</div>
                            {note ? <div className="text-xs text-white/55">{note}</div> : null}
                          </div>
                          <div className="text-sm font-semibold text-white whitespace-nowrap">{o.priceRaw || "—"}</div>
                        </div>

                        {details ? <div className="mt-2 text-xs text-white/55 whitespace-pre-line">{details}</div> : null}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-3 text-sm text-white/60">{ui.noPackages}</div>
              )}
            </div>

            {!hasPkgFilter && (
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-medium text-white/90">{ui.faqTitle}</div>
              <div className="mt-3 space-y-3">
                {faq.map((x) => (
                  <div key={x.q} className="rounded-xl border border-white/10 bg-black/25 p-3">
                    <div className="text-sm text-white/90">{x.q}</div>
                    <div className="mt-1 text-xs text-white/60">{x.a}</div>
                  </div>
                ))}
              </div>
            </div>
            )}

            <BookingSectionToggle lang={lang} whatsappPhone={whatsappPhone} catalogFromUrl={catalogFromUrl} pkgFromUrl={pkgFromUrl} />

            {/* CTAs */}
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <Link
                href="/#packages"
                className="inline-flex items-center justify-center rounded-xl border border-[rgb(var(--blue))]/30 bg-[rgb(var(--blue))]/10 px-5 py-3 text-sm text-white/90 font-medium hover:bg-[rgb(var(--blue))]/20 hover:border-[rgb(var(--blue))]/50 transition-all"
              >
                {ui.goToCatalogs}
              </Link>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm text-white/85 hover:bg-white/[0.10] hover:border-white/20 transition-all"
              >
                {ui.whatsappCta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
