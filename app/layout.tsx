// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

function getSiteUrl() {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (env) return env.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_URL?.trim(); // e.g. mss-teal.vercel.app
  if (vercel) return `https://${vercel}`;
  return "https://studioscreen.vercel.app";
}

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Micro-Screen Studio",
    template: "%s · Micro-Screen Studio",
  },
  description:
    "Контент для бизнеса: reels, фото, съемка и ведение соцсетей. Выберите каталог → пакет → дату/город → отправьте заявку в WhatsApp.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Micro-Screen Studio",
    description: "Контент для бизнеса: reels, фото, съемка и ведение соцсетей. Быстрая заявка в WhatsApp за 30 секунд.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Micro-Screen Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Micro-Screen Studio",
    description: "Контент для бизнеса: reels, фото, съемка и ведение соцсетей. Заявка в WhatsApp.",
    images: ["/og.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  // Можно добавить robots, если вдруг где-то блокируешь
  robots: {
    index: true,
    follow: true,
  },
  // Важно: эти meta помогают некоторым парсерам “увидеть продукт”
  other: {
    "og:type": "product",
    "product:price:amount": "350",
    "product:price:currency": "ILS",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // default: hebrew, потом ClientPage уже переключает
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
