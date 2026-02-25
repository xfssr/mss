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

export type SolutionExample = {
  photo: string;
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
  outcome: L10n;
  bestFor: L10n;
  process: SolutionProcessStep[];
  pricingTiers: SolutionPricingTier[];
  pricingNote: L10n;
  whyThisWorks: L10n[];
  faq: SolutionFaq[];
  socialProof: SolutionSocialProof[];
  examples: SolutionExample[];
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
      he: "תפריט QR + מיני-אתר שמביא הזמנות",
      en: "QR Menu + Mini Website that drives orders",
    },
    subtitle: {
      he: "תפריט דיגיטלי מהיר + קישור אחד שמוביל ל-WhatsApp/הזמנה.",
      en: "Fast digital menu + one link that leads to WhatsApp/ordering.",
    },
    pills: [
      { he: "תפריט QR", en: "QR Menu" },
      { he: "מיני אתר", en: "Mini Website" },
      { he: "WhatsApp הזמנה", en: "WhatsApp Ordering" },
      { he: "צילום + וידאו", en: "Photo + Video" },
      { he: "תבניות פוסטים", en: "Post Templates" },
    ],
    whatYouGet: [
      { he: "תפריט QR מעוצב (נגיש לנייד)", en: "Styled QR menu (mobile-friendly)" },
      { he: "מיני-אתר עמוד אחד: שעות, מיקום, המלצות, CTA", en: "One-page mini website: hours, location, recommendations, CTA" },
      { he: "כפתור WhatsApp להזמנה/שולחן + הודעה מוכנה", en: "WhatsApp button for ordering/table + pre-filled message" },
      { he: "סט תמונות/וידאו לתפריט ולרשתות (לפי החבילה)", en: "Photo/video set for menu and social media (per package)" },
      { he: "סט תבניות פוסטים + תיאור/האשטגים", en: "Post template set + captions/hashtags" },
    ],
    outcome: {
      he: "פחות \"איפה התפריט?\" ויותר הודעות להזמנה.",
      en: "Less \"where's the menu?\" and more order messages.",
    },
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
    examples: [
      { photo: "" },
      { photo: "" },
      { photo: "" },
    ],
    ctaPrimary: { he: "לקבל דוגמה לתפריט + עמוד", en: "Get a menu + page example" },
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
    label: { he: "מיתוג שף שמייצר פניות", en: "Chef Personal Brand that gets inquiries" },
    subtitle: { he: "הופכים אותך ל״מותג״ עם תוכן שמוביל להזמנות/קורסים/אירועים.", en: "Turning you into a \"brand\" with content that drives bookings/courses/events." },
    pills: [
      { he: "רילס מטבח", en: "Kitchen Reels" },
      { he: "צילום מנות", en: "Dish Photography" },
      { he: "עמוד אישי", en: "Personal Page" },
      { he: "תוכנית תוכן", en: "Content Plan" },
    ],
    whatYouGet: [
      { he: "צילום Reels \"מאחורי הקלעים\" + צילומי מנה", en: "Behind-the-scenes Reels photography + dish shots" },
      { he: "עמוד אישי קצר עם הצעה ברורה + WhatsApp", en: "Short personal page with clear offer + WhatsApp" },
      { he: "ביוגרפיה מקצועית + שפה אחידה לפרופיל", en: "Professional bio + consistent profile language" },
      { he: "תוכנית תוכן שבועית (מה לפרסם ומתי)", en: "Weekly content plan (what to post and when)" },
      { he: "תבניות סטוריז: \"הזמנה\", \"סדנה\", \"שירות שף פרטי\"", en: "Story templates: \"Booking\", \"Workshop\", \"Private Chef\"" },
    ],
    outcome: { he: "אנשים מבינים תוך 10 שניות מי אתה ולמה לפנות אליך.", en: "People understand within 10 seconds who you are and why to contact you." },
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
    examples: [
      { photo: "" },
      { photo: "" },
      { photo: "" },
    ],
    ctaPrimary: { he: "לבנות עמוד שף + 3 רעיונות רילס", en: "Build a chef page + 3 reel ideas" },
    ctaSecondary: { he: "שאלה ב-WhatsApp", en: "Question on WhatsApp" },
    whatsappTemplatePrimary: { he: "היי, אני מעוניין בחבילת מותג אישי לשף. פרטים?", en: "Hi, I'm interested in the chef personal brand package. Details?" },
    whatsappTemplateSecondary: { he: "היי, שאלה לגבי חבילת שף", en: "Hi, question about the chef package" },
  },
  {
    slug: "cocktail-bar-bartender",
    isActive: true,
    iconName: "wine",
    label: { he: "בר קוקטיילים שממלא שולחן", en: "Cocktail Bar that fills seats" },
    subtitle: { he: "תוכן + פרסום שמוביל להזמנות ואירועים — בלי כאב ראש.", en: "Content + ads that drive bookings and events — hassle-free." },
    pills: [
      { he: "צילום קוקטיילים", en: "Cocktail Photography" },
      { he: "רילס", en: "Reels" },
      { he: "קמפיין Meta", en: "Meta Campaign" },
      { he: "WhatsApp הזמנה", en: "WhatsApp Booking" },
    ],
    whatYouGet: [
      { he: "6–10 Reels: קוקטיילים, אווירה, צוות, \"Happy Hour\"", en: "6–10 Reels: cocktails, atmosphere, team, \"Happy Hour\"" },
      { he: "מיני-אתר עמוד אחד: תפריט/אירוע/הזמנה ב-WhatsApp", en: "One-page mini site: menu/event/booking via WhatsApp" },
      { he: "קמפיין Meta בסיסי: הודעות WhatsApp / טראפיק", en: "Basic Meta campaign: WhatsApp messages / traffic" },
      { he: "ריטרגטינג למי שצפה/ביקר (לשדרוג)", en: "Retargeting for viewers/visitors (upgrade)" },
      { he: "טקסטים מוכנים לפוסטים + הצעת שבוע", en: "Ready-made post texts + weekly offer" },
    ],
    outcome: { he: "יותר אנשים שואלים \"יש מקום היום?\" במקום רק לצפות.", en: "More people asking \"any tables tonight?\" instead of just watching." },
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
    examples: [
      { photo: "" },
      { photo: "" },
      { photo: "" },
    ],
    ctaPrimary: { he: "להקים קמפיין WhatsApp לבר", en: "Set up a WhatsApp campaign for bar" },
    ctaSecondary: { he: "שאלה ב-WhatsApp", en: "Question on WhatsApp" },
    whatsappTemplatePrimary: { he: "היי, אני מעוניין בחבילה לבר. פרטים?", en: "Hi, interested in the bar package. Details?" },
    whatsappTemplateSecondary: { he: "שאלה על חבילת בר", en: "Question about bar package" },
  },
  {
    slug: "flowers-florist",
    isActive: true,
    iconName: "flower",
    label: { he: "חנות פרחים עם הזמנות בלחיצה", en: "Flower Shop — orders in one click" },
    subtitle: { he: "מיני-קטלוג + WhatsApp: אנשים בוחרים ושולחים הזמנה מהר.", en: "Mini catalog + WhatsApp: people choose and send orders fast." },
    pills: [
      { he: "צילום מוצר", en: "Product Photography" },
      { he: "קטלוג WhatsApp", en: "WhatsApp Catalog" },
      { he: "מיני אתר", en: "Mini Website" },
      { he: "SEO מקומי", en: "Local SEO" },
    ],
    whatYouGet: [
      { he: "צילום מוצר (בוקט/סידור) + 3–6 סרטונים קצרים", en: "Product photography (bouquet/arrangement) + 3–6 short videos" },
      { he: "עמוד קטלוג קצר: \"בחרו סגנון\" + מחירים/טווח", en: "Short catalog page: \"Choose style\" + prices/range" },
      { he: "WhatsApp עם הודעה מובנית: שם/כתובת/תאריך/כרטיס ברכה", en: "WhatsApp with structured message: name/address/date/greeting card" },
      { he: "תבניות סטוריז: \"משלוח היום\", \"יום הולדת\", \"רומנטי\"", en: "Story templates: \"Same-day delivery\", \"Birthday\", \"Romantic\"" },
      { he: "בסיס SEO מקומי: מפה/שעות/אזורי משלוח", en: "Local SEO basics: map/hours/delivery zones" },
    ],
    outcome: { he: "פחות שאלות חוזרות, יותר הזמנות מסודרות.", en: "Fewer repeated questions, more organized orders." },
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
    examples: [
      { photo: "" },
      { photo: "" },
      { photo: "" },
    ],
    ctaPrimary: { he: "לבנות קטלוג WhatsApp לפרחים", en: "Build a WhatsApp catalog for flowers" },
    ctaSecondary: { he: "שאלה ב-WhatsApp", en: "Question on WhatsApp" },
    whatsappTemplatePrimary: { he: "היי, אני מעוניין בחבילה לחנות פרחים. פרטים?", en: "Hi, interested in the florist package. Details?" },
    whatsappTemplateSecondary: { he: "שאלה על חבילת פרחים", en: "Question about florist package" },
  },
  {
    slug: "tattoo-studio",
    isActive: true,
    iconName: "pen-tool",
    label: { he: "סטודיו קעקועים שממלא יומן", en: "Tattoo Studio — booking-focused system" },
    subtitle: { he: "תיק עבודות + טופס קצר → WhatsApp עם סינון לקוחות.", en: "Portfolio + short form → WhatsApp with client screening." },
    pills: [
      { he: "תיק עבודות", en: "Portfolio" },
      { he: "WhatsApp Flow", en: "WhatsApp Flow" },
      { he: "רילס", en: "Reels" },
      { he: "קמפיין לידים", en: "Lead Campaign" },
    ],
    whatYouGet: [
      { he: "צילום/וידאו תיק עבודות (סטייל נקי)", en: "Portfolio photo/video (clean style)" },
      { he: "מיני-אתר: גלריה, סגנונות, שאלות נפוצות, CTA", en: "Mini site: gallery, styles, FAQ, CTA" },
      { he: "WhatsApp Flow: סגנון/מיקום/גודל/תקציב/תאריך", en: "WhatsApp Flow: style/location/size/budget/date" },
      { he: "סט פוסטים: \"סגנון השבוע\" + \"לפני/אחרי\"", en: "Post set: \"Style of the week\" + \"Before/After\"" },
      { he: "קמפיין לידים/הודעות (לשדרוג)", en: "Lead/message campaign (upgrade)" },
    ],
    outcome: { he: "יותר פניות איכותיות, פחות \"סתם מתעניינים\".", en: "More quality inquiries, fewer \"just browsing\"." },
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
    examples: [
      { photo: "" },
      { photo: "" },
      { photo: "" },
    ],
    ctaPrimary: { he: "להקים עמוד תיק עבודות + סינון", en: "Set up a portfolio page + screening" },
    ctaSecondary: { he: "שאלה ב-WhatsApp", en: "Question on WhatsApp" },
    whatsappTemplatePrimary: { he: "היי, אני מעוניין בחבילה לסטודיו קעקועים.", en: "Hi, interested in the tattoo studio package." },
    whatsappTemplateSecondary: { he: "שאלה על חבילת קעקועים", en: "Question about tattoo package" },
  },
  {
    slug: "beauty-nails",
    isActive: true,
    iconName: "sparkles",
    label: { he: "יופי / ציפורניים — מערכת תורים שמביאה לקוחות", en: "Beauty/Nails — booking system" },
    subtitle: { he: "תוכן שמוכר + עמוד הזמנה + WhatsApp אוטומטי.", en: "Content that sells + booking page + auto WhatsApp." },
    pills: [
      { he: "רילס ביוטי", en: "Beauty Reels" },
      { he: "מיני אתר", en: "Mini Website" },
      { he: "WhatsApp Auto", en: "WhatsApp Auto" },
      { he: "קמפיין מקומי", en: "Local Campaign" },
    ],
    whatYouGet: [
      { he: "8–12 Reels: תהליך, לפני/אחרי, סטיילים", en: "8–12 Reels: process, before/after, styles" },
      { he: "מיני-אתר: מחירון קצר, זמינות, CTA", en: "Mini site: short price list, availability, CTA" },
      { he: "WhatsApp Auto: סוג טיפול/עיצוב/תאריך/פיקדון (טקסט)", en: "WhatsApp Auto: treatment type/design/date/deposit (text)" },
      { he: "תבניות שבועיות לסטוריז + מבצע", en: "Weekly story templates + promo" },
      { he: "קמפיין הודעות לאזור (לשדרוג)", en: "Local message campaign (upgrade)" },
    ],
    outcome: { he: "יותר תורים מלאים ופחות חורים ביומן.", en: "More booked slots and fewer gaps in the schedule." },
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
    examples: [
      { photo: "" },
      { photo: "" },
      { photo: "" },
    ],
    ctaPrimary: { he: "לבנות מערכת פניות לציפורניים", en: "Build a nail booking system" },
    ctaSecondary: { he: "שאלה ב-WhatsApp", en: "Question on WhatsApp" },
    whatsappTemplatePrimary: { he: "היי, מעוניינת בחבילת ביוטי.", en: "Hi, interested in the beauty package." },
    whatsappTemplateSecondary: { he: "שאלה על חבילת ביוטי", en: "Question about beauty package" },
  },
  {
    slug: "cosmetics-ecommerce",
    isActive: true,
    iconName: "shopping-bag",
    label: { he: "קוסמטיקה / איקומרס — תוכן שמוכר מוצר", en: "Cosmetics/E-commerce — content that sells" },
    subtitle: { he: "וידאו מוצר + עמוד מוצר קצר + רימרקטינג חכם.", en: "Product video + short product page + smart remarketing." },
    pills: [
      { he: "צילום מוצרים", en: "Product Photography" },
      { he: "UGC סרטונים", en: "UGC Videos" },
      { he: "דפי נחיתה", en: "Landing Pages" },
      { he: "Meta Ads", en: "Meta Ads" },
    ],
    whatYouGet: [
      { he: "צילום מוצר נקי + 6–10 סרטוני UGC", en: "Clean product photography + 6–10 UGC videos" },
      { he: "דפי מוצר/מיני-דפי נחיתה לפי קטגוריה", en: "Product pages/mini landing pages by category" },
      { he: "סט מודעות Meta: Prospecting + Retargeting", en: "Meta ad set: Prospecting + Retargeting" },
      { he: "טקסטים: כותרת/בולטים/FAQ/הוכחה חברתית", en: "Copy: headline/bullets/FAQ/social proof" },
      { he: "שיפור המרות בסיסי (CTA, מבנה, מהירות)", en: "Basic conversion optimization (CTA, layout, speed)" },
    ],
    outcome: { he: "פחות צפיות \"סתם\", יותר הוספה לסל/הודעות.", en: "Fewer \"idle\" views, more add-to-cart/messages." },
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
    examples: [
      { photo: "" },
      { photo: "" },
      { photo: "" },
    ],
    ctaPrimary: { he: "לבנות דף מוצר שממיר", en: "Build a converting product page" },
    ctaSecondary: { he: "שאלה ב-WhatsApp", en: "Question on WhatsApp" },
    whatsappTemplatePrimary: { he: "היי, מעוניין בחבילת קוסמטיקה/אי-קומרס.", en: "Hi, interested in the cosmetics/e-commerce package." },
    whatsappTemplateSecondary: { he: "שאלה על חבילת קוסמטיקה", en: "Question about cosmetics package" },
  },
  {
    slug: "real-estate-rental",
    isActive: true,
    iconName: "home",
    label: { he: "נדל״ן / השכרה — צילום שמביא פניות מהר", en: "Real Estate/Rental — inquiries fast" },
    subtitle: { he: "תמונות + וידאו + עמוד מודעה שמוביל ל-WhatsApp.", en: "Photos + video + listing page that leads to WhatsApp." },
    pills: [
      { he: "צילום דירות", en: "Apartment Photography" },
      { he: "סרטון סיור", en: "Tour Video" },
      { he: "עמוד מודעה", en: "Listing Page" },
      { he: "WhatsApp סינון", en: "WhatsApp Screening" },
    ],
    whatYouGet: [
      { he: "צילום דירה מקצועי + וידאו קצר (Reel)", en: "Professional apartment photography + short video (Reel)" },
      { he: "מיני-עמוד: מחיר, מיקום, יתרונות, תמונות, CTA", en: "Mini page: price, location, perks, photos, CTA" },
      { he: "הודעת WhatsApp מוכנה עם שאלות סינון", en: "Pre-filled WhatsApp message with screening questions" },
      { he: "חבילת \"פוסט מודעה\" לרשתות", en: "\"Post listing\" social media package" },
      { he: "אופציה לפרסום ממומן מקומי (לשדרוג)", en: "Local paid promotion option (upgrade)" },
    ],
    outcome: { he: "יותר פניות מסודרות, פחות בלגן בשיחות.", en: "More organized inquiries, less messy conversations." },
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
    examples: [
      { photo: "" },
      { photo: "" },
      { photo: "" },
    ],
    ctaPrimary: { he: "לקבל עמוד מודעה לדירה", en: "Get a listing page for your property" },
    ctaSecondary: { he: "שאלה ב-WhatsApp", en: "Question on WhatsApp" },
    whatsappTemplatePrimary: { he: "היי, אני מעוניין בצילום דירה להשכרה.", en: "Hi, interested in rental property photography." },
    whatsappTemplateSecondary: { he: "שאלה על צילום נדל״ן", en: "Question about real estate photography" },
  },
  {
    slug: "small-business-fast",
    isActive: true,
    iconName: "zap",
    label: { he: "עסק קטן — Quick Start ב-7 ימים", en: "Small Business — Quick Start in 7 days" },
    subtitle: { he: "מתקינים לך מערכת פשוטה שמתחילה להביא פניות.", en: "We set up a simple system that starts bringing inquiries." },
    pills: [
      { he: "רילס", en: "Reels" },
      { he: "מיני אתר", en: "Mini Website" },
      { he: "WhatsApp Auto", en: "WhatsApp Auto" },
      { he: "קמפיין בסיסי", en: "Basic Campaign" },
    ],
    whatYouGet: [
      { he: "6 Reels + 15 תמונות (בסיס)", en: "6 Reels + 15 photos (basic)" },
      { he: "מיני-אתר תבניתי מותאם לנייד", en: "Mobile-optimized template mini site" },
      { he: "WhatsApp אוטומטי + תשובות מהירות", en: "Auto WhatsApp + quick replies" },
      { he: "10 טקסטים לפוסטים + תוכנית שבועית", en: "10 post texts + weekly plan" },
      { he: "קמפיין בסיסי (Traffic או Messages) (לפי חבילה)", en: "Basic campaign (Traffic or Messages) (per package)" },
    ],
    outcome: { he: "תוך שבוע יש לך \"צינור\" ברור: תוכן → פנייה.", en: "Within a week you have a clear \"pipeline\": content → inquiry." },
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
    examples: [
      { photo: "" },
      { photo: "" },
      { photo: "" },
    ],
    ctaPrimary: { he: "להתחיל Quick Start", en: "Start Quick Start" },
    ctaSecondary: { he: "שאלה ב-WhatsApp", en: "Question on WhatsApp" },
    whatsappTemplatePrimary: { he: "היי, אני צריך חבילת סטארט מהיר לעסק.", en: "Hi, I need a quick start package for my business." },
    whatsappTemplateSecondary: { he: "שאלה על חבילת עסק קטן", en: "Question about small business package" },
  },
];
