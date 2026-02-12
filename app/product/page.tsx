// app/product/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function getSiteUrl() {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (env) return env.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel}`;
  return "https://studioscreen.vercel.app";
}

function pickText(v: any) {
  const a = typeof v?.en === "string" ? v.en.trim() : "";
  const b = typeof v?.he === "string" ? v.he.trim() : "";
  return a || b || "";
}

function parsePriceNumber(raw: string) {
  const s = (raw || "").replace(",", ".");
  const m = s.match(/(\d+(\.\d+)?)/);
  return m ? m[1] : null;
}

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();

  let firstPrice = "350";
  try {
    const first = await prisma.priceItem.findFirst({ orderBy: [{ order: "asc" }, { id: "asc" }] });
    const n = first?.price ? parsePriceNumber(first.price) : null;
    if (n) firstPrice = n;
  } catch {
    // ignore
  }

  return {
    title: "Product · Micro-Screen Studio",
    description: "Content packages for businesses: reels, photos, shoots and social media management.",
    robots: { index: false, follow: false },
    openGraph: {
      type: "product",
      url: `${siteUrl}/product`,
      title: "Micro-Screen Studio — Content Packages",
      description: "Reels, photos, shoots and social media management. Contact via WhatsApp.",
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Micro-Screen Studio" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Micro-Screen Studio — Content Packages",
      description: "Reels, photos, shoots and social media management. Contact via WhatsApp.",
      images: ["/og.jpg"],
    },
    other: {
      "og:type": "product",
      "product:price:amount": firstPrice,
      "product:price:currency": "ILS",
    },
  };
}

export default async function ProductPage() {
  const siteUrl = getSiteUrl();

  const prices = await prisma.priceItem.findMany({
    orderBy: [{ order: "asc" }, { id: "asc" }],
  });

  const offers = prices
    .map((p) => {
      const title = pickText(p.title);
      const note = pickText(p.note);
      const details = pickText(p.details);
      const priceNum = parsePriceNumber(p.price || "");
      return {
        id: p.id,
        title,
        note,
        details,
        priceRaw: p.price || "",
        priceNum,
        currency: "ILS",
      };
    })
    .filter((o) => o.title);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Micro-Screen Studio — Content Packages",
    description:
      "Content packages for businesses: reels, photos, shoots and social media management. Contact via WhatsApp.",
    brand: { "@type": "Brand", name: "Micro-Screen Studio" },
    image: [`${siteUrl}/og.jpg`],
    url: `${siteUrl}/product`,
    offers: offers
      .filter((o) => o.priceNum)
      .map((o) => ({
        "@type": "Offer",
        name: o.title,
        priceCurrency: o.currency,
        price: o.priceNum,
        availability: "https://schema.org/InStock",
        url: `${siteUrl}/#about`,
      })),
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0b0f14] via-[#0a0c10] to-[#06070a] text-white px-4 py-10">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.06] p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="relative w-full sm:w-64 aspect-[1200/630] rounded-2xl overflow-hidden border border-white/10 bg-black/20">
            <Image src="/og.jpg" alt="Micro-Screen Studio" fill className="object-cover" />
          </div>

          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-semibold text-[rgb(var(--blue))]">Micro-Screen Studio</h1>
            <p className="mt-2 text-white/70">
              Packages & pricing (auto from DB). This page is made for platforms that require product details (Canva/Meta).
            </p>

            <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-medium text-white/90">Packages</div>

              {offers.length ? (
                <div className="mt-3 space-y-3">
                  {offers.map((o) => (
                    <div key={o.id} className="rounded-xl border border-white/10 bg-black/25 p-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="text-sm text-white/90">{o.title}</div>
                          {o.note ? <div className="text-xs text-white/55">{o.note}</div> : null}
                        </div>
                        <div className="text-sm font-semibold text-white whitespace-nowrap">{o.priceRaw || "—"}</div>
                      </div>

                      {o.details ? <div className="mt-2 text-xs text-white/55 whitespace-pre-line">{o.details}</div> : null}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-3 text-sm text-white/60">
                  No packages in DB yet. Add them in Admin → Prices.
                </div>
              )}
            </div>

            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <a
                href="/#catalog"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm text-white/85 hover:bg-white/[0.10]"
              >
                View catalogs
              </a>

              <a
                href="/#contact"
                className="inline-flex items-center justify-center rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-5 py-3 text-sm text-white hover:bg-[rgb(var(--red))]/30"
              >
                Contact (WhatsApp)
              </a>
            </div>

            <div className="mt-4 text-xs text-white/45">
              Canva link: <span className="text-white/70">{siteUrl}/product</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
