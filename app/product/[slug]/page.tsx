// app/product/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPackageDetails, type PackageDetail } from "@/lib/packageConfigStore";
import { getActiveSolutions } from "@/lib/solutionsStore";
import { DEFAULT_SOLUTIONS, type SolutionItem } from "@/content/solutions";
import { SAME_AS, getSiteUrl } from "@/config/constants";
import { ProductSlugClient } from "./ProductSlugClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Lang = "he" | "en";

function parseLang(
  searchParams?: Record<string, string | string[] | undefined>,
): Lang {
  const raw = searchParams?.lang;
  const v = Array.isArray(raw) ? raw[0] : raw;
  return v === "en" ? "en" : "he";
}

function pick(lang: Lang, v: { he: string; en: string }) {
  const s = v?.[lang] ?? "";
  return s?.trim() ? s : v.he;
}

/** All known slugs for packages (static, never from DB). */
const PACKAGE_SLUGS = ["starter", "business", "monthly"] as const;

type ResolvedProduct =
  | { kind: "package"; data: PackageDetail }
  | { kind: "solution"; data: SolutionItem };

async function resolveProduct(slug: string): Promise<ResolvedProduct | null> {
  // Check packages first
  if ((PACKAGE_SLUGS as readonly string[]).includes(slug)) {
    const packages = await getPackageDetails();
    const pkg = packages.find((p) => p.id === slug);
    if (pkg) return { kind: "package", data: pkg };
  }

  // Check solutions
  const solutions = await getActiveSolutions();
  const sol = solutions.find((s) => s.slug === slug);
  if (sol) return { kind: "solution", data: sol };

  return null;
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resolvedParams = searchParams ? await searchParams : undefined;
  const lang = parseLang(resolvedParams);
  const siteUrl = getSiteUrl();
  const product = await resolveProduct(slug);

  if (!product) {
    return { title: "Not Found" };
  }

  const isProduction =
    (process.env.VERCEL_ENV || "production") === "production";

  let title: string;
  let description: string;
  let price: string | undefined;

  if (product.kind === "package") {
    const pkg = product.data;
    title = `${pick(lang, pkg.title)} — Micro-Screen Studio`;
    description = pick(lang, pkg.subtitle);
    price = String(pkg.priceFrom);
  } else {
    const sol = product.data;
    title = `${pick(lang, sol.label)} — Micro-Screen Studio`;
    description = pick(lang, sol.subtitle);
    if (sol.pricingTiers.length > 0) {
      const raw = pick(lang, sol.pricingTiers[0].range);
      const m = raw.match(/(\d[\d,]*)/);
      price = m ? m[1].replace(",", "") : undefined;
    }
  }

  const canonical = `${siteUrl}/product/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        he: `${siteUrl}/product/${slug}?lang=he`,
        en: `${siteUrl}/product/${slug}?lang=en`,
      },
    },
    robots: isProduction
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      type: "website",
      url: canonical,
      locale: lang === "he" ? "he_IL" : "en_US",
      title,
      description,
      images: [
        {
          url: `${siteUrl}/og.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/og.jpg`],
    },
    ...(price
      ? {
          other: {
            "og:type": "product",
            "product:price:amount": price,
            "product:price:currency": "ILS",
          },
        }
      : {}),
  };
}

export default async function ProductSlugPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const resolvedParams = searchParams ? await searchParams : undefined;
  const lang = parseLang(resolvedParams);
  const siteUrl = getSiteUrl();
  const product = await resolveProduct(slug);

  if (!product) notFound();

  // Build JSON-LD
  let jsonLd: Record<string, unknown>;

  if (product.kind === "package") {
    const pkg = product.data;
    jsonLd = {
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
          "@id": `${siteUrl}/product/${slug}#product`,
          name: pick(lang, pkg.title),
          description: pick(lang, pkg.subtitle),
          brand: { "@type": "Brand", name: "Micro-Screen Studio" },
          image: [`${siteUrl}/og.jpg`],
          url: `${siteUrl}/product/${slug}`,
          offers: {
            "@type": "Offer",
            priceCurrency: "ILS",
            price: String(pkg.priceFrom),
            availability: "https://schema.org/InStock",
            url: `${siteUrl}/product/${slug}`,
            seller: {
              "@type": "Organization",
              name: "Micro-Screen Studio",
            },
          },
        },
      ],
    };
  } else {
    const sol = product.data;
    const offers = sol.pricingTiers.map((tier) => {
      const raw = pick(lang, tier.range);
      const m = raw.match(/(\d[\d,]*)/);
      const priceNum = m ? m[1].replace(",", "") : "0";
      return {
        "@type": "Offer",
        name: tier.label,
        priceCurrency: "ILS",
        price: priceNum,
        availability: "https://schema.org/InStock",
        url: `${siteUrl}/product/${slug}`,
        seller: { "@type": "Organization", name: "Micro-Screen Studio" },
      };
    });

    const faqEntities = sol.faq.map((f) => ({
      "@type": "Question",
      name: pick(lang, f.q),
      acceptedAnswer: { "@type": "Answer", text: pick(lang, f.a) },
    }));

    jsonLd = {
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
          "@id": `${siteUrl}/product/${slug}#product`,
          name: pick(lang, sol.label),
          description: pick(lang, sol.subtitle),
          brand: { "@type": "Brand", name: "Micro-Screen Studio" },
          image: [`${siteUrl}/og.jpg`],
          url: `${siteUrl}/product/${slug}`,
          ...(offers.length > 0
            ? {
                offers:
                  offers.length === 1
                    ? offers[0]
                    : {
                        "@type": "AggregateOffer",
                        priceCurrency: "ILS",
                        lowPrice: Math.min(
                          ...offers.map((o) => Number(o.price) || 0),
                        ),
                        highPrice: Math.max(
                          ...offers.map((o) => Number(o.price) || 0),
                        ),
                        offerCount: String(offers.length),
                        offers,
                      },
              }
            : {}),
        },
        ...(faqEntities.length > 0
          ? [
              {
                "@type": "FAQPage",
                "@id": `${siteUrl}/product/${slug}#faq`,
                mainEntity: faqEntities,
              },
            ]
          : []),
      ],
    };
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductSlugClient
        kind={product.kind}
        packageData={product.kind === "package" ? product.data : null}
        solutionData={product.kind === "solution" ? product.data : null}
        initialLang={lang}
      />
    </>
  );
}
