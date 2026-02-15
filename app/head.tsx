// app/head.tsx
import { getSiteUrl } from "@/config/constants";

export default function Head() {
  const siteUrl = getSiteUrl();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Micro-Screen Studio — Content Packages",
    description:
      "Пакеты контента для бизнеса: reels, фото, съемка и ведение соцсетей. Быстрая заявка через WhatsApp.",
    brand: { "@type": "Brand", name: "Micro-Screen Studio" },
    image: [`${siteUrl}/og.jpg`],
    url: siteUrl,
    offers: [
      {
        "@type": "Offer",
        name: "Starter",
        priceCurrency: "ILS",
        price: "350",
        availability: "https://schema.org/InStock",
        url: `${siteUrl}/#about`,
      },
      {
        "@type": "Offer",
        name: "Business (shoot day)",
        priceCurrency: "ILS",
        price: "800",
        availability: "https://schema.org/InStock",
        url: `${siteUrl}/#about`,
      },
      {
        "@type": "Offer",
        name: "Monthly",
        priceCurrency: "ILS",
        price: "2400",
        availability: "https://schema.org/InStock",
        url: `${siteUrl}/#about`,
      },
    ],
  };

  return (
    <>
      {/* Дублируем product meta на всякий случай для парсеров */}
      <meta property="og:type" content="product" />
      <meta property="product:price:amount" content="350" />
      <meta property="product:price:currency" content="ILS" />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    </>
  );
}
