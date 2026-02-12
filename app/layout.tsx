// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://studioscreen.vercel.app")
  .trim()
  .replace(/\/+$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  applicationName: "Micro-Screen Studio",
  title: {
    default: "Micro-Screen Studio",
    template: "%s · Micro-Screen Studio",
  },
  description:
    "Контент для бизнеса: reels, фото, съемка и ведение соцсетей. Выберите каталог → пакет → дату/город → отправьте заявку в WhatsApp.",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  themeColor: "#0b0f14",

  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Micro-Screen Studio",
    siteName: "Micro-Screen Studio",
    description: "Контент для бизнеса: reels, фото, съемка и ведение соцсетей. Быстрая заявка в WhatsApp.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Micro-Screen Studio" }]
  },

  twitter: {
    card: "summary_large_image",
    title: "Micro-Screen Studio",
    description: "Контент для бизнеса: reels, фото, съемка и ведение соцсетей. Заявка в WhatsApp.",
    images: ["/og.jpg"],
  },

  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
