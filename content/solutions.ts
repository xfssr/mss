import type { L10n } from "@/types/l10n";

export type SolutionFaq = { q: L10n; a: L10n };

export type SolutionPricingTier = {
  label: string;
  range: L10n;
};

export type SolutionProcessStep = {
  title: L10n;
};

export type SolutionSocialProof = {
  title: L10n;
};

export type SolutionItem = {
  slug: string;
  isActive: boolean;
  iconName: string;
  cover?: string;
  label: L10n;
  subtitle: L10n;
  pills: L10n[];
  whatYouGet: L10n[];
  bestFor: L10n;
  process: SolutionProcessStep[];
  pricingTiers: SolutionPricingTier[];
  pricingNote: L10n;
  whyThisWorks: L10n[];
  faq: SolutionFaq[];
  socialProof: SolutionSocialProof[];
  ctaPrimary: L10n;
  ctaSecondary: L10n;
  whatsappTemplatePrimary: L10n;
  whatsappTemplateSecondary: L10n;
};

export const DEFAULT_SOLUTIONS: SolutionItem[] = [
  {
    slug: "restaurant-menu-website",
    isActive: true,
    iconName: "utensils",
    label: {
      he: "תפריט QR + מיני אתר למסעדות",
      en: "QR Menu + Mini Website for Restaurants",
    },
    subtitle: {
      he: "תוכן + תפריט + אתר למסעדה / בר / קפה",
      en: "Content + Menu + Website for Restaurant / Bar / Café",
    },
    pills: [
      { he: "UGC רילס", en: "UGC Reels" },
      { he: "עיצוב תפריט (QR/PDF)", en: "Menu Design (QR/PDF)" },
      { he: "מיני אתר", en: "Mini Website" },
      { he: "צילום + וידאו", en: "Photo + Video" },
      { he: "הקמת סושיאל", en: "Social Setup" },
    ],
    whatYouGet: [
      { he: "צילום אוכל/קוקטיילים + אווירה (פנים/חוץ)", en: "Food/cocktail + atmosphere photos (indoor/outdoor)" },
      { he: "6–12 רילס (UGC + דיטיילס סינמטי)", en: "6–12 reels (UGC + cinematic details)" },
      { he: "תפריט QR: PDF + גרסה להדפסה", en: "QR menu: PDF + print-ready version" },
      { he: "מיני אתר/לנדינג: תפריט, מפה, WhatsApp, כפתור הזמנה", en: "Mini website/landing: menu, map, WhatsApp, booking button" },
      { he: "סט בסיסי לסושיאל: ביו, היילייטס, תבנית סטוריז", en: "Basic social setup: bio, highlights, story template" },
    ],
    bestFor: {
      he: "בתי קפה, ברים, מסעדות, שפים, מקומות חדשים, תפריט עונתי, אירועים",
      en: "Cafes, bars, restaurants, chefs, new openings, seasonal menus, events",
    },
    process: [
      { title: { he: "בריף + קונספט", en: "Brief + concept" } },
      { title: { he: "צילום + עיצוב", en: "Shoot + design" } },
      { title: { he: "השקה + מסירה", en: "Launch + deliverables" } },
    ],
    pricingTiers: [
      { label: "Mini", range: { he: "2,500–5,000 ₪", en: "₪2,500–5,000" } },
      { label: "Standard", range: { he: "6,000–12,000 ₪", en: "₪6,000–12,000" } },
      { label: "Premium", range: { he: "15,000–30,000 ₪+", en: "₪15,000–30,000+" } },
    ],
    pricingNote: {
      he: "המחיר הסופי נקבע לפי היקף העבודה",
      en: "Final quote depends on scope",
    },
    whyThisWorks: [
      { he: "אנשים מחליטים עם העיניים", en: "People decide with their eyes" },
      { he: "תפריט חייב להיות קל לבחור ממנו", en: "Menu must be effortless to choose" },
      { he: "QR/אתר חייב לסגור את הפעולה", en: "QR/website must close the action" },
    ],
    faq: [
      {
        q: { he: "אפשר לעשות רק תפריט / רק אתר / רק תוכן?", en: "Can you do only menu / only site / only content?" },
        a: { he: "כן. אפשר לבחור מודול אחד או לשלב, לפי צורך ותקציב.", en: "Yes. Pick one module or combine them based on scope." },
      },
      {
        q: { he: "כמה סבבי תיקונים כלולים?", en: "How many revision rounds?" },
        a: { he: "בדרך כלל סבב תיקונים אחד כלול. יותר לפי היקף.", en: "Usually 1 revision round included. More depends on scope." },
      },
      {
        q: { he: "אתם עובדים בכמה שפות?", en: "Do you work in multiple languages?" },
        a: { he: "כן. עברית/אנגלית ועוד שפות בתוספת לפי צורך.", en: "Yes. Hebrew/English plus more as needed (extra)." },
      },
      {
        q: { he: "כמה מהר אפשר לעלות לאוויר?", en: "How fast can we launch?" },
        a: { he: "בדרך כלל 3–7 ימים, תלוי בהיקף ובזמינות.", en: "Usually 3–7 days depending on scope and availability." },
      },
    ],
    socialProof: [
      { title: { he: "לפני / אחרי (מקום שמרגיש יוקרתי)", en: "Before/After (premium look)" } },
      { title: { he: "יותר צפיות (סלוט לטסטימוניאל)", en: "More views (testimonial slot)" } },
      { title: { he: "יותר הזמנות (סלוט לקייס)", en: "More bookings (case slot)" } },
    ],
    ctaPrimary: { he: "בקשו את החבילה", en: "Request this package" },
    ctaSecondary: { he: "שאלה מהירה ב-WhatsApp", en: "Quick question on WhatsApp" },
    whatsappTemplatePrimary: {
      he: "היי, אני מעוניין/ת בחבילת תוכן+תפריט+אתר למסעדה. אשמח לפרטים!",
      en: "Hi, I'm interested in the content+menu+website package for a restaurant. Please share details!",
    },
    whatsappTemplateSecondary: {
      he: "היי, יש לי שאלה לגבי החבילה למסעדות",
      en: "Hi, I have a question about the restaurant package",
    },
  },
  {
    slug: "chef-personal-brand",
    isActive: true,
    iconName: "flame",
    label: { he: "מותג אישי לשף", en: "Chef Personal Brand" },
    subtitle: { he: "תוכן, סושיאל ואתר לשפים", en: "Content, social & website for chefs" },
    pills: [
      { he: "רילס מטבח", en: "Kitchen Reels" },
      { he: "צילום מנות", en: "Dish Photography" },
      { he: "מיני אתר", en: "Mini Website" },
    ],
    whatYouGet: [
      { he: "צילום מנות ברמה גבוהה", en: "High-quality dish photography" },
      { he: "6–10 רילס מאחורי הקלעים", en: "6–10 behind-the-scenes reels" },
      { he: "מיני אתר / לנדינג עם תפריט ולינקים", en: "Mini website / landing with menu and links" },
      { he: "הקמת פרופיל סושיאל", en: "Social profile setup" },
    ],
    bestFor: { he: "שפים, קייטרינג, פוד-בלוגרים", en: "Chefs, catering, food bloggers" },
    process: [
      { title: { he: "בריף + קונספט", en: "Brief + concept" } },
      { title: { he: "צילום + עריכה", en: "Shoot + editing" } },
      { title: { he: "מסירה", en: "Deliverables" } },
    ],
    pricingTiers: [
      { label: "Mini", range: { he: "2,000–4,000 ₪", en: "₪2,000–4,000" } },
      { label: "Standard", range: { he: "5,000–10,000 ₪", en: "₪5,000–10,000" } },
      { label: "Premium", range: { he: "12,000–25,000 ₪+", en: "₪12,000–25,000+" } },
    ],
    pricingNote: { he: "המחיר הסופי לפי היקף", en: "Final quote depends on scope" },
    whyThisWorks: [
      { he: "שף עם מותג חזק מקבל יותר הזמנות", en: "A chef with a strong brand gets more bookings" },
      { he: "תוכן מקצועי מוכר יותר", en: "Professional content sells more" },
    ],
    faq: [
      {
        q: { he: "אפשר רק צילום בלי אתר?", en: "Can I get just photography without a website?" },
        a: { he: "כן, לגמרי. אפשר לבחור מודולים.", en: "Yes, absolutely. You can pick modules." },
      },
      {
        q: { he: "כמה זמן לוקח?", en: "How long does it take?" },
        a: { he: "בדרך כלל 5–10 ימי עבודה.", en: "Usually 5–10 working days." },
      },
    ],
    socialProof: [
      { title: { he: "שף שהכפיל הזמנות", en: "Chef who doubled bookings" } },
      { title: { he: "מותג שקפץ בסושיאל", en: "Brand that jumped on social" } },
    ],
    ctaPrimary: { he: "בקשו הצעת מחיר", en: "Request a quote" },
    ctaSecondary: { he: "שאלה ב-WhatsApp", en: "Question on WhatsApp" },
    whatsappTemplatePrimary: { he: "היי, אני מעוניין בחבילת מותג אישי לשף. פרטים?", en: "Hi, I'm interested in the chef personal brand package. Details?" },
    whatsappTemplateSecondary: { he: "היי, שאלה לגבי חבילת שף", en: "Hi, question about the chef package" },
  },
  {
    slug: "cocktail-bar-bartender",
    isActive: true,
    iconName: "wine",
    label: { he: "בר קוקטיילים / ברמן", en: "Cocktail Bar / Bartender" },
    subtitle: { he: "תוכן ומיתוג לבר ולברמנים", en: "Content & branding for bars and bartenders" },
    pills: [
      { he: "צילום קוקטיילים", en: "Cocktail Photography" },
      { he: "רילס", en: "Reels" },
      { he: "תפריט QR", en: "QR Menu" },
    ],
    whatYouGet: [
      { he: "צילום קוקטיילים ואווירת בר", en: "Cocktail & bar atmosphere photography" },
      { he: "4–8 רילס", en: "4–8 reels" },
      { he: "תפריט QR לברים", en: "QR menu for bars" },
      { he: "הקמת סושיאל", en: "Social setup" },
    ],
    bestFor: { he: "ברים, ברמנים, לאונג׳ים, אירועים", en: "Bars, bartenders, lounges, events" },
    process: [
      { title: { he: "בריף", en: "Brief" } },
      { title: { he: "צילום", en: "Shoot" } },
      { title: { he: "מסירה", en: "Deliverables" } },
    ],
    pricingTiers: [
      { label: "Mini", range: { he: "2,000–4,000 ₪", en: "₪2,000–4,000" } },
      { label: "Standard", range: { he: "5,000–9,000 ₪", en: "₪5,000–9,000" } },
      { label: "Premium", range: { he: "10,000–20,000 ₪+", en: "₪10,000–20,000+" } },
    ],
    pricingNote: { he: "לפי היקף", en: "Depends on scope" },
    whyThisWorks: [
      { he: "בר עם נוכחות ויזואלית חזקה מושך יותר לקוחות", en: "A bar with strong visual presence attracts more customers" },
    ],
    faq: [
      {
        q: { he: "עובדים גם באירועים?", en: "Do you work at events?" },
        a: { he: "כן, אנחנו מצלמים גם באירועים.", en: "Yes, we shoot at events too." },
      },
    ],
    socialProof: [
      { title: { he: "בר שעלה בביקורים", en: "Bar that increased visits" } },
    ],
    ctaPrimary: { he: "בקשו הצעת מחיר", en: "Request a quote" },
    ctaSecondary: { he: "שאלה ב-WhatsApp", en: "Question on WhatsApp" },
    whatsappTemplatePrimary: { he: "היי, אני מעוניין בחבילה לבר. פרטים?", en: "Hi, interested in the bar package. Details?" },
    whatsappTemplateSecondary: { he: "שאלה על חבילת בר", en: "Question about bar package" },
  },
  {
    slug: "flowers-florist",
    isActive: true,
    iconName: "flower",
    label: { he: "חנות פרחים / פלוריסט", en: "Flower Shop / Florist" },
    subtitle: { he: "תוכן ואתר לחנויות פרחים", en: "Content & website for flower shops" },
    pills: [
      { he: "צילום זרים", en: "Bouquet Photography" },
      { he: "רילס", en: "Reels" },
      { he: "מיני אתר", en: "Mini Website" },
    ],
    whatYouGet: [
      { he: "צילום זרים ועיצובים", en: "Bouquet & arrangement photography" },
      { he: "4–8 רילס", en: "4–8 reels" },
      { he: "מיני אתר עם קטלוג", en: "Mini website with catalog" },
      { he: "סושיאל בסיסי", en: "Basic social setup" },
    ],
    bestFor: { he: "חנויות פרחים, פלוריסטים, אירועים", en: "Flower shops, florists, events" },
    process: [
      { title: { he: "בריף", en: "Brief" } },
      { title: { he: "צילום", en: "Shoot" } },
      { title: { he: "מסירה", en: "Deliverables" } },
    ],
    pricingTiers: [
      { label: "Mini", range: { he: "1,500–3,500 ₪", en: "₪1,500–3,500" } },
      { label: "Standard", range: { he: "4,000–8,000 ₪", en: "₪4,000–8,000" } },
    ],
    pricingNote: { he: "לפי היקף", en: "Depends on scope" },
    whyThisWorks: [
      { he: "פרחים מוכרים עם תמונות יפות", en: "Flowers sell with beautiful photos" },
    ],
    faq: [
      {
        q: { he: "כמה זמן לוקח?", en: "How long does it take?" },
        a: { he: "3–7 ימי עבודה.", en: "3–7 working days." },
      },
    ],
    socialProof: [
      { title: { he: "חנות פרחים שהגדילה מכירות", en: "Flower shop that increased sales" } },
    ],
    ctaPrimary: { he: "בקשו הצעת מחיר", en: "Request a quote" },
    ctaSecondary: { he: "שאלה ב-WhatsApp", en: "Question on WhatsApp" },
    whatsappTemplatePrimary: { he: "היי, אני מעוניין בחבילה לחנות פרחים. פרטים?", en: "Hi, interested in the florist package. Details?" },
    whatsappTemplateSecondary: { he: "שאלה על חבילת פרחים", en: "Question about florist package" },
  },
  {
    slug: "tattoo-studio",
    isActive: true,
    iconName: "pen-tool",
    label: { he: "סטודיו לקעקועים", en: "Tattoo Studio" },
    subtitle: { he: "תוכן ומיתוג לסטודיו קעקועים", en: "Content & branding for tattoo studios" },
    pills: [
      { he: "צילום עבודות", en: "Portfolio Photography" },
      { he: "רילס", en: "Reels" },
      { he: "סושיאל", en: "Social" },
    ],
    whatYouGet: [
      { he: "צילום עבודות קעקוע", en: "Tattoo portfolio photography" },
      { he: "4–8 רילס תהליך + תוצאה", en: "4–8 process + result reels" },
      { he: "הקמת פרופיל סושיאל", en: "Social profile setup" },
    ],
    bestFor: { he: "סטודיו קעקועים, אמנים", en: "Tattoo studios, artists" },
    process: [
      { title: { he: "בריף", en: "Brief" } },
      { title: { he: "צילום", en: "Shoot" } },
      { title: { he: "מסירה", en: "Deliverables" } },
    ],
    pricingTiers: [
      { label: "Mini", range: { he: "1,500–3,000 ₪", en: "₪1,500–3,000" } },
      { label: "Standard", range: { he: "3,500–7,000 ₪", en: "₪3,500–7,000" } },
    ],
    pricingNote: { he: "לפי היקף", en: "Depends on scope" },
    whyThisWorks: [
      { he: "פורטפוליו חזק מושך לקוחות חדשים", en: "A strong portfolio attracts new clients" },
    ],
    faq: [
      {
        q: { he: "כמה זמן?", en: "How long?" },
        a: { he: "3–7 ימים.", en: "3–7 days." },
      },
    ],
    socialProof: [
      { title: { he: "סטודיו שהגדיל פניות", en: "Studio that increased inquiries" } },
    ],
    ctaPrimary: { he: "בקשו הצעת מחיר", en: "Request a quote" },
    ctaSecondary: { he: "שאלה ב-WhatsApp", en: "Question on WhatsApp" },
    whatsappTemplatePrimary: { he: "היי, אני מעוניין בחבילה לסטודיו קעקועים.", en: "Hi, interested in the tattoo studio package." },
    whatsappTemplateSecondary: { he: "שאלה על חבילת קעקועים", en: "Question about tattoo package" },
  },
  {
    slug: "beauty-nails",
    isActive: true,
    iconName: "sparkles",
    label: { he: "ביוטי / ציפורניים", en: "Beauty / Nails" },
    subtitle: { he: "תוכן לקוסמטיקה, ציפורניים ומכוני יופי", en: "Content for cosmetics, nails & beauty salons" },
    pills: [
      { he: "צילום", en: "Photography" },
      { he: "רילס", en: "Reels" },
      { he: "סושיאל", en: "Social" },
    ],
    whatYouGet: [
      { he: "צילום עבודות ביוטי", en: "Beauty portfolio photography" },
      { he: "4–8 רילס", en: "4–8 reels" },
      { he: "הקמת סושיאל", en: "Social setup" },
    ],
    bestFor: { he: "מכוני יופי, ציפורניים, איפור", en: "Beauty salons, nails, makeup" },
    process: [
      { title: { he: "בריף", en: "Brief" } },
      { title: { he: "צילום", en: "Shoot" } },
      { title: { he: "מסירה", en: "Deliverables" } },
    ],
    pricingTiers: [
      { label: "Mini", range: { he: "1,500–3,000 ₪", en: "₪1,500–3,000" } },
      { label: "Standard", range: { he: "3,500–7,000 ₪", en: "₪3,500–7,000" } },
    ],
    pricingNote: { he: "לפי היקף", en: "Depends on scope" },
    whyThisWorks: [
      { he: "לקוחות בוחרים לפי תמונות", en: "Clients choose by photos" },
    ],
    faq: [
      {
        q: { he: "כמה זמן?", en: "How long?" },
        a: { he: "3–7 ימים.", en: "3–7 days." },
      },
    ],
    socialProof: [
      { title: { he: "מכון שהכפיל לקוחות", en: "Salon that doubled clients" } },
    ],
    ctaPrimary: { he: "בקשו הצעת מחיר", en: "Request a quote" },
    ctaSecondary: { he: "שאלה ב-WhatsApp", en: "Question on WhatsApp" },
    whatsappTemplatePrimary: { he: "היי, מעוניינת בחבילת ביוטי.", en: "Hi, interested in the beauty package." },
    whatsappTemplateSecondary: { he: "שאלה על חבילת ביוטי", en: "Question about beauty package" },
  },
  {
    slug: "cosmetics-ecommerce",
    isActive: true,
    iconName: "shopping-bag",
    label: { he: "קוסמטיקה / חנות אונליין", en: "Cosmetics / E-commerce" },
    subtitle: { he: "תוכן ואתר למותגי קוסמטיקה", en: "Content & website for cosmetics brands" },
    pills: [
      { he: "צילום מוצרים", en: "Product Photography" },
      { he: "אתר / חנות", en: "Website / Store" },
      { he: "רילס", en: "Reels" },
    ],
    whatYouGet: [
      { he: "צילום מוצרים מקצועי", en: "Professional product photography" },
      { he: "4–8 רילס", en: "4–8 reels" },
      { he: "מיני אתר / דף חנות", en: "Mini website / store page" },
    ],
    bestFor: { he: "מותגי קוסמטיקה, חנויות אונליין", en: "Cosmetics brands, online stores" },
    process: [
      { title: { he: "בריף", en: "Brief" } },
      { title: { he: "צילום + בנייה", en: "Shoot + build" } },
      { title: { he: "מסירה", en: "Deliverables" } },
    ],
    pricingTiers: [
      { label: "Mini", range: { he: "2,500–5,000 ₪", en: "₪2,500–5,000" } },
      { label: "Standard", range: { he: "6,000–12,000 ₪", en: "₪6,000–12,000" } },
    ],
    pricingNote: { he: "לפי היקף", en: "Depends on scope" },
    whyThisWorks: [
      { he: "מוצרים נמכרים עם תמונות מקצועיות", en: "Products sell with professional photos" },
    ],
    faq: [
      {
        q: { he: "כמה זמן?", en: "How long?" },
        a: { he: "5–10 ימים.", en: "5–10 days." },
      },
    ],
    socialProof: [
      { title: { he: "מותג שהכפיל מכירות", en: "Brand that doubled sales" } },
    ],
    ctaPrimary: { he: "בקשו הצעת מחיר", en: "Request a quote" },
    ctaSecondary: { he: "שאלה ב-WhatsApp", en: "Question on WhatsApp" },
    whatsappTemplatePrimary: { he: "היי, מעוניין בחבילת קוסמטיקה/אי-קומרס.", en: "Hi, interested in the cosmetics/e-commerce package." },
    whatsappTemplateSecondary: { he: "שאלה על חבילת קוסמטיקה", en: "Question about cosmetics package" },
  },
  {
    slug: "real-estate-rental",
    isActive: true,
    iconName: "home",
    label: { he: "צילום דירה להשכרה / נדל״ן", en: "Real Estate / Rental Photography" },
    subtitle: { he: "צילום ותוכן לנדל״ן והשכרה", en: "Photography & content for real estate and rentals" },
    pills: [
      { he: "צילום דירות", en: "Apartment Photography" },
      { he: "סרטון סיור", en: "Tour Video" },
      { he: "רילס", en: "Reels" },
    ],
    whatYouGet: [
      { he: "צילום מקצועי של הנכס", en: "Professional property photography" },
      { he: "סרטון סיור וירטואלי", en: "Virtual tour video" },
      { he: "2–4 רילס", en: "2–4 reels" },
    ],
    bestFor: { he: "דירות להשכרה, נדל״ן, Airbnb", en: "Rental apartments, real estate, Airbnb" },
    process: [
      { title: { he: "תיאום", en: "Coordination" } },
      { title: { he: "צילום", en: "Shoot" } },
      { title: { he: "מסירה", en: "Deliverables" } },
    ],
    pricingTiers: [
      { label: "Mini", range: { he: "1,000–2,500 ₪", en: "₪1,000–2,500" } },
      { label: "Standard", range: { he: "3,000–6,000 ₪", en: "₪3,000–6,000" } },
    ],
    pricingNote: { he: "לפי גודל הנכס ומספר חדרים", en: "Depends on property size" },
    whyThisWorks: [
      { he: "דירה עם תמונות מקצועיות מושכרת מהר יותר", en: "Properties with professional photos rent faster" },
    ],
    faq: [
      {
        q: { he: "כמה זמן לוקח?", en: "How long does it take?" },
        a: { he: "2–5 ימים.", en: "2–5 days." },
      },
    ],
    socialProof: [
      { title: { he: "דירה שהושכרה ביום", en: "Apartment rented in a day" } },
    ],
    ctaPrimary: { he: "בקשו הצעת מחיר", en: "Request a quote" },
    ctaSecondary: { he: "שאלה ב-WhatsApp", en: "Question on WhatsApp" },
    whatsappTemplatePrimary: { he: "היי, אני מעוניין בצילום דירה להשכרה.", en: "Hi, interested in rental property photography." },
    whatsappTemplateSecondary: { he: "שאלה על צילום נדל״ן", en: "Question about real estate photography" },
  },
  {
    slug: "small-business-fast",
    isActive: true,
    iconName: "zap",
    label: { he: "עסק קטן / סטארט מהיר", en: "Small Business / Quick Start" },
    subtitle: { he: "חבילת התחלה מהירה לעסקים קטנים", en: "Quick start package for small businesses" },
    pills: [
      { he: "צילום", en: "Photography" },
      { he: "סושיאל בסיסי", en: "Basic Social" },
      { he: "מהיר", en: "Fast" },
    ],
    whatYouGet: [
      { he: "צילום בסיסי לעסק", en: "Basic business photography" },
      { he: "2–4 רילס", en: "2–4 reels" },
      { he: "הקמת סושיאל בסיסית", en: "Basic social setup" },
    ],
    bestFor: { he: "עסקים קטנים, פרילנסרים, עסקים חדשים", en: "Small businesses, freelancers, new businesses" },
    process: [
      { title: { he: "שיחה", en: "Call" } },
      { title: { he: "צילום", en: "Shoot" } },
      { title: { he: "מסירה", en: "Deliverables" } },
    ],
    pricingTiers: [
      { label: "Quick", range: { he: "800–2,000 ₪", en: "₪800–2,000" } },
      { label: "Standard", range: { he: "2,500–5,000 ₪", en: "₪2,500–5,000" } },
    ],
    pricingNote: { he: "לפי היקף", en: "Depends on scope" },
    whyThisWorks: [
      { he: "עסק חדש צריך נוכחות מקצועית מהיום הראשון", en: "A new business needs a professional presence from day one" },
    ],
    faq: [
      {
        q: { he: "כמה מהר?", en: "How fast?" },
        a: { he: "2–5 ימים.", en: "2–5 days." },
      },
    ],
    socialProof: [
      { title: { he: "עסק שהתחיל עם תוכן מקצועי", en: "Business that started with professional content" } },
    ],
    ctaPrimary: { he: "בקשו הצעת מחיר", en: "Request a quote" },
    ctaSecondary: { he: "שאלה ב-WhatsApp", en: "Question on WhatsApp" },
    whatsappTemplatePrimary: { he: "היי, אני צריך חבילת סטארט מהיר לעסק.", en: "Hi, I need a quick start package for my business." },
    whatsappTemplateSecondary: { he: "שאלה על חבילת עסק קטן", en: "Question about small business package" },
  },
];
