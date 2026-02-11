import type { Metadata } from "next";
import "./globals.css";
import { Rubik } from "next/font/google";
import { LangProvider } from "@/components/LangProvider";

const rubik = Rubik({
  subsets: ["latin", "hebrew"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Micro-Screen Studio",
  description: "One-page booking flow with micro 3D UI panels, WhatsApp prefill, and admin CMS.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${rubik.className} min-h-screen antialiased`}>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
