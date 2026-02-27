"use client";

import { useEffect, useMemo, useState } from "react";
import type { Catalog, TierExamplesConfig } from "@/types/catalog";
import type { CategoryDetail } from "@/content/categoryDetails";
import type { SolutionItem } from "@/content/solutions";
import type { HeroMedia } from "@/types/hero";
import type { PricingConfig } from "@/types/pricing";
import type { PriceItem } from "@/types/price";
import type { SiteSettings } from "@/types/settings";
import type { DiscountConfig } from "@/lib/catalogOverridesStore";
import type { PackageDetail } from "@/lib/packageConfigStore";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CatalogPreviewModal } from "@/components/CatalogPreviewModal";
import { SolutionDetailModal } from "@/components/SolutionDetailModal";
import { DEFAULT_LANG, STORAGE_KEY_LANG, type Lang } from "@/utils/i18n";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { buildWaMeUrl, buildWhatsAppMessage, openWhatsApp, WHATSAPP_PHONE } from "@/utils/whatsapp";
import { Accordion, Badge, Button, Card, Divider, Grid, Section } from "@/components/lab/LabPrimitives";
import { PortfolioGallery } from "@/components/lab/PortfolioGallery";
import { WhatsAppCTA } from "@/components/lab/WhatsAppCTA";

type Props = {
  catalogs: Catalog[];
  categoryDetails: CategoryDetail[];
  solutions: SolutionItem[];
  settings: SiteSettings;
  prices: PriceItem[];
  heroMedia: HeroMedia[];
  pricing: PricingConfig;
  discountConfig: DiscountConfig;
  packageDetails: PackageDetail[];
  tierExamplesConfig: TierExamplesConfig;
};

function pickL10n(lang: Lang, v: { he: string; en: string }) {
  const s = v?.[lang] ?? "";
  return s.trim() ? s : v.he;
}

const COPY = {
  he: {
    heroLabel: "VISUAL GROWTH LAB",
    heroTitle: "מערכת צמיחה חזותית לעסקים שרוצים שליטה בתוצאה.",
    heroSubtitle:
      "מעבדה אסטרטגית לבניית מערכות תוכן, אריזת מותג דיגיטלית, נכסים חברתיים ומיני-סייטים שמייצרים שיחה והמרה.",
    ctaPrimary: "להתחיל ב-WhatsApp",
    ctaSecondary: "לראות שכבות שירות",
    positioningTitle: "לא עוד ‘תוכן’. מערכת ביצוע מדויקת.",
    positioningBody:
      "אנחנו מתכננים תשתית ויזואלית עסקית: אסטרטגיה, הפקה, אריזה, דפי המרה וזרימת תקשורת ישירה. כל חלק נבנה כדי לתמוך בצמיחה מדידה.",
    processTitle: "איך זה עובד",
    deliverablesTitle: "מה הלקוח מקבל בפועל",
    packagesTitle: "שכבות שירות וחבילות",
    solutionsTitle: "פתרונות מוכנים לפי תחום",
    portfolioTitle: "פורטפוליו ודוגמאות",
    trustTitle: "אמון, ודאות, ותשובות לפני התחלה",
    contactTitle: "מכאן עוברים לתכנון ביצוע",
    portfolioCta: "פתיחת תצוגה",
    faq1q: "תוך כמה זמן מתחילים?",
    faq1a: "ברוב המקרים בתוך 2-5 ימי עבודה, בהתאם ללוח ההפקה.",
    faq2q: "האם אפשר לשלב עברית ואנגלית?",
    faq2a: "כן. המערכת נבנית RTL-first עם התאמה מלאה גם לאנגלית.",
    faq3q: "אפשר לבנות רק שכבה אחת?",
    faq3a: "כן. אפשר לעבוד בשכבות: תוכן, מותג, נכסים או דפי המרה.",
    emptyPortfolio: "אין דוגמאות זמינות כרגע.",
    trust1: "דיוק בביצוע",
    trust2: "שפה ויזואלית אחידה",
    trust3: "WhatsApp כערוץ המרה",
    trust4: "תהליך ברור ושקוף",
    contactBody:
      "השאירו הודעת WhatsApp קצרה עם סוג העסק והיעד הקרוב. תקבלו כיוון אסטרטגי ראשוני ומסגרת ביצוע.",
    sticky: "WhatsApp לתחילת תהליך",
  },
  en: {
    heroLabel: "VISUAL GROWTH LAB",
    heroTitle: "Visual growth systems for businesses that need controlled outcomes.",
    heroSubtitle:
      "A strategic laboratory for content systems, digital brand packaging, social assets, and conversion mini-sites.",
    ctaPrimary: "Start on WhatsApp",
    ctaSecondary: "View Service Layers",
    positioningTitle: "Not content production. Precision execution systems.",
    positioningBody:
      "We build a visual growth infrastructure: strategy, production, packaging, conversion pages, and direct-response messaging.",
    processTitle: "How It Works",
    deliverablesTitle: "What You Actually Get",
    packagesTitle: "Service Layers & Packages",
    solutionsTitle: "Industry-Ready Solutions",
    portfolioTitle: "Portfolio & Examples",
    trustTitle: "Trust, clarity, and pre-project certainty",
    contactTitle: "Move to execution planning",
    portfolioCta: "Open Preview",
    faq1q: "How fast can we start?",
    faq1a: "Usually within 2-5 business days depending on production load.",
    faq2q: "Can we run Hebrew + English together?",
    faq2a: "Yes. The system is built RTL-first with polished English support.",
    faq3q: "Can we start with one service layer only?",
    faq3a: "Yes. You can start with content, brand system, assets, or landing flows.",
    emptyPortfolio: "No examples are available yet.",
    trust1: "Precision execution",
    trust2: "Unified visual language",
    trust3: "WhatsApp conversion flow",
    trust4: "Structured process",
    contactBody:
      "Send a short WhatsApp message with business type and immediate objective. You will get an initial strategic direction and execution framework.",
    sticky: "WhatsApp to start",
  },
} as const;

export function ClientPage(props: Props) {
  const [lang, setLang] = useLocalStorageState<Lang>(STORAGE_KEY_LANG, DEFAULT_LANG);
  const [selectedSolutionSlug, setSelectedSolutionSlug] = useState<string | null>(null);
  const [catalogPreviewSlug, setCatalogPreviewSlug] = useState<string | null>(null);
  const tx = COPY[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
  }, [lang]);

  const selectedSolution = useMemo(
    () => (selectedSolutionSlug ? props.solutions.find((s) => s.slug === selectedSolutionSlug) ?? null : null),
    [props.solutions, selectedSolutionSlug],
  );
  const catalogPreview = useMemo(
    () => (catalogPreviewSlug ? props.catalogs.find((c) => c.slug === catalogPreviewSlug) ?? null : null),
    [props.catalogs, catalogPreviewSlug],
  );

  const portfolioCatalogs = useMemo(
    () => props.catalogs.filter((c) => c.slug !== "restaurant-menu-website").slice(0, 6),
    [props.catalogs],
  );

  function sendWhatsApp() {
    const url = buildWaMeUrl(
      WHATSAPP_PHONE,
      lang === "he"
        ? "שלום, אני רוצה לבנות מערכת צמיחה חזותית לעסק."
        : "Hi, I'd like to build a visual growth system for my business.",
    );
    openWhatsApp(url);
  }

  return (
    <div className="min-h-screen bg-[color:var(--surface-0)] text-[color:var(--text-primary)]">
      <Navbar lang={lang} onSetLang={setLang} />

      <Section id="top" className="pt-8 sm:pt-12">
        <Card className="lab-hero p-6 sm:p-10">
          <Badge>{tx.heroLabel}</Badge>
          <h1 className="lab-h1 mt-4">{pickL10n(lang, props.settings.heroTitle) || tx.heroTitle}</h1>
          <p className="lab-subtitle mt-5 max-w-3xl">{pickL10n(lang, props.settings.heroSubtitle) || tx.heroSubtitle}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button onClick={sendWhatsApp}>{tx.ctaPrimary}</Button>
            <Button as="a" href="#packages" variant="secondary">
              {tx.ctaSecondary}
            </Button>
          </div>
        </Card>
      </Section>

      <Section id="positioning" label="01" title={tx.positioningTitle} subtitle={tx.positioningBody}>
        <Grid className="md:grid-cols-3">
          {[tx.trust1, tx.trust2, tx.trust3].map((item) => (
            <Card key={item} className="p-5">
              <p className="text-sm text-[color:var(--text-secondary)]">{item}</p>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section id="process" label="02" title={tx.processTitle}>
        <Grid className="md:grid-cols-3">
          {[
            lang === "he" ? "מיפוי עסקי ומסרים" : "Business mapping & messaging",
            lang === "he" ? "בניית נכסים ותוכן" : "Asset and content build",
            lang === "he" ? "הטמעת המרות וסקייל" : "Conversion deployment and scale",
          ].map((s, i) => (
            <Card key={s} className="p-5">
              <p className="lab-label">0{i + 1}</p>
              <h3 className="mt-3 text-lg font-semibold">{s}</h3>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section id="deliverables" label="03" title={tx.deliverablesTitle}>
        <Grid className="md:grid-cols-2">
          {[
            lang === "he" ? "מערכות תוכן לרשתות" : "Social content systems",
            lang === "he" ? "אריזת מותג דיגיטלית" : "Digital brand packaging",
            lang === "he" ? "מיני-סייטים ועמודי נחיתה" : "Mini-sites and landing pages",
            lang === "he" ? "זרימות WhatsApp להמרה" : "WhatsApp conversion flows",
          ].map((item) => (
            <Card key={item} className="p-5 text-sm text-[color:var(--text-secondary)]">
              {item}
            </Card>
          ))}
        </Grid>
      </Section>

      <Section id="packages" label="04" title={tx.packagesTitle}>
        <Grid className="lg:grid-cols-3">
          {props.packageDetails.map((pkg) => {
            const label = pickL10n(lang, pkg.title);
            const subtitle = pickL10n(lang, pkg.subtitle);
            const message = buildWhatsAppMessage({
              packageName: label,
              packageIcon: "•",
              basePrice: pkg.priceFrom,
              lang,
            });
            return (
              <Card key={pkg.id} className="p-5">
                <p className="lab-label">{pkg.id.toUpperCase()}</p>
                <h3 className="mt-2 text-xl font-semibold">{label}</h3>
                <p className="mt-2 text-sm text-[color:var(--text-secondary)]">{subtitle}</p>
                <Divider />
                <ul className="my-4 space-y-2 text-sm text-[color:var(--text-secondary)]">
                  {pkg.whatYouGet.slice(0, 4).map((item, idx) => (
                    <li key={`${pkg.id}-${idx}`}>• {pickL10n(lang, item)}</li>
                  ))}
                </ul>
                <Button
                  onClick={() => openWhatsApp(buildWaMeUrl(WHATSAPP_PHONE, message))}
                  className="w-full"
                >
                  {tx.ctaPrimary}
                </Button>
              </Card>
            );
          })}
        </Grid>
      </Section>

      {props.solutions.length > 0 && (
        <Section id="solutions" label="05" title={tx.solutionsTitle}>
          <Grid className="md:grid-cols-2 xl:grid-cols-3">
            {props.solutions.map((item) => (
              <Card key={item.slug} className="p-5">
                <h3 className="text-lg font-semibold">{pickL10n(lang, item.label)}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-[color:var(--text-secondary)]">{pickL10n(lang, item.subtitle)}</p>
                <Button className="mt-4 w-full" variant="secondary" onClick={() => setSelectedSolutionSlug(item.slug)}>
                  {lang === "he" ? "פתיחת פתרון" : "Open Solution"}
                </Button>
              </Card>
            ))}
          </Grid>
        </Section>
      )}

      <Section id="portfolio" label="06" title={tx.portfolioTitle}>
        <PortfolioGallery
          catalogs={portfolioCatalogs}
          lang={lang}
          onPreview={setCatalogPreviewSlug}
          cta={tx.portfolioCta}
          empty={tx.emptyPortfolio}
        />
      </Section>

      <Section id="trust" label="07" title={tx.trustTitle}>
        <Grid className="md:grid-cols-2">
          <Card className="p-5">
            <ul className="space-y-3 text-sm text-[color:var(--text-secondary)]">
              {[tx.trust1, tx.trust2, tx.trust3, tx.trust4].map((x) => (
                <li key={x}>• {x}</li>
              ))}
            </ul>
          </Card>
          <Accordion
            items={[
              { id: "faq-1", title: tx.faq1q, content: tx.faq1a },
              { id: "faq-2", title: tx.faq2q, content: tx.faq2a },
              { id: "faq-3", title: tx.faq3q, content: tx.faq3a },
            ]}
          />
        </Grid>
      </Section>

      <Section id="contact" label="08" title={tx.contactTitle}>
        <Card className="p-6 sm:p-8">
          <p className="max-w-3xl text-sm text-[color:var(--text-secondary)]">{tx.contactBody}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button onClick={sendWhatsApp}>{tx.ctaPrimary}</Button>
            <Button as="a" href={`mailto:${props.settings.email}`} variant="secondary">
              Email
            </Button>
            <Button
              as="a"
              href={`https://instagram.com/${props.settings.instagramHandle.replace("@", "")}`}
              variant="secondary"
            >
              Instagram
            </Button>
          </div>
        </Card>
      </Section>

      <Footer lang={lang} />
      <WhatsAppCTA lang={lang} text={tx.sticky} />

      {selectedSolution && (
        <SolutionDetailModal
          lang={lang}
          item={selectedSolution}
          onClose={() => setSelectedSolutionSlug(null)}
          pricing={props.pricing}
          discountConfig={props.discountConfig}
        />
      )}

      {catalogPreview && <CatalogPreviewModal lang={lang} catalog={catalogPreview} onClose={() => setCatalogPreviewSlug(null)} />}
    </div>
  );
}
