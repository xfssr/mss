export type Lang = "he" | "en";

export const DEFAULT_LANG: Lang = "he";
export const STORAGE_KEY_LANG = "cc_lang_v1";

export const DIR_BY_LANG: Record<Lang, "rtl" | "ltr"> = {
  he: "rtl",
  en: "ltr",
};

export const STRINGS: Record<Lang, Record<string, string>> = {
  he: {
    appName: "Micro-Screen Studio",
    navCatalog: "קטלוג",
    navAbout: "אודות",
    navContact: "יצירת קשר",

    heroCtaPick: "לבחור קטלוג",
    heroCtaWhatsApp: "לכתוב ב-WhatsApp",
    heroHint: "בחרו קטגוריה → בחרו חבילה → מלאו תאריך/עיר → שולחים ב-WhatsApp.",

    sectionCatalog: "קטלוגים",
    sectionAbout: "אודות",
    sectionContact: "יצירת קשר",

    flowHint: "בחרו קטגוריה → דוגמאות → התאמת חבילה → הזמנה → WhatsApp.",

    popular: "פופולרי",
    open: "פתיחה",

    tabExamples: "דוגמאות",
    tabPackage: "לבנות חבילה",
    tabReserve: "הזמנה",

    examplesHint: "בחרו תמונה → מימין וידאו/תיאור.",
    packageHint: "בנו חבילה → הוסיפו להודעה.",
    reserveHint: "מינימום פרטים ולשלוח.",

    breakdownTitle: "דוגמה",

    packageBuildTitle: "לבנות חבילה",
    packageCalcTitle: "חישוב",
    packageApply: "להוסיף להודעה ולעבור להזמנה",
    packageSummaryTitle: "סיכום",
    packageNote: "המחיר הוא הערכה. מאשרים סופית אחרי פרטים.",

    reserveTitle: "הזמנה",
    reserveSubtitle: "אפשר למלא רק מה שידוע עכשיו — את השאר נסגור בצ׳אט.",

    formBusiness: "איזה עסק? (בקצרה)",
    formDate: "תאריך",
    formTime: "שעה",
    formCity: "עיר",
    formComment: "הערות",
    formContact: "הקשר שלי (אופציונלי)",

    generate: "ליצור הודעה",
    copy: "להעתיק טקסט",
    copied: "הועתק ✓",
    send: "לשלוח ב-WhatsApp",
    close: "סגור",

    messagePreview: "תצוגה מקדימה",

    packagesTitle: "חבילות",
    more: "פרטים",
    less: "להסתיר",
    openCatalog: "לפתוח קטלוג",

    contactWhatsApp: "WhatsApp",
    contactInstagram: "Instagram",
    contactEmail: "Email",
    replyTime: "בדרך כלל עונה תוך 1–3 שעות.",

    footerTop: "למעלה",
    footerCatalog: "קטלוג",

    catalogBenefit: "תוכן מקצועי לעסק שלך",
    openArrow: "פתיחה →",
    fromPrice: "החל מ-",

    helpTitle: "3 צעדים פשוטים",
    helpDesc: "1) צפו בדוגמאות  2) בנו חבילה  3) מלאו פרטים ושלחו ב-WhatsApp.",

    showMore: "עוד...",
    showLess: "פחות",

    customPresetTitle: "התאמה אישית",
    customPresetDesc: "בנה חבילה ידנית",

    heroCtaExamples: "לראות דוגמאות",
    heroCtaPackages: "לבחור חבילה",
    heroCtaOrder: "להזמין עכשיו",

    heroCtaCatalogs: "פתח קטלוגים",
    heroCtaPricing: "מחירים",
    howStartNow: "התחל עכשיו",
    continueToPackage: "המשך לבחירת חבילה",

    filterAll: "הכל",
    filterFood: "מסעדות / שף",
    filterBar: "בר / ברמן",
    filterBeauty: "ביוטי / ציפורניים",
    filterFlowers: "פרחים / קמעונאות",
    filterTattoo: "קעקועים / שירותים",
    filterRealEstate: "צילום דירה להשכרה",
    searchPlaceholder: "חיפוש... (בר, קעקוע, דירה, רילס)",
    noResults: "לא נמצאו תוצאות — נסו סינון אחר או חפשו מילה אחרת.",

    formGoal: "מה צריך?",
    goalReels: "רילס",
    goalPhotos: "תמונות",
    goalBoth: "רילס + תמונות",

    stickyExamples: "דוגמאות",
    stickyOrder: "להזמין",

    orderSimilar: "להזמין דומה",

    pickThis: "לבחור חבילה זו",

    choosePackage: "בחרו חבילה",
    choosePackageSubtitle: "בחרו חבילה מוכנה או בנו חבילה מותאמת אישית — וממשיכים להזמנה.",
    pkgStarter: "Starter",
    pkgStarterDesc: "4 שעות · 6 רילס · 20 תמונות",
    pkgBusiness: "Business",
    pkgBusinessDesc: "יום מלא · 10 רילס · 120 תמונות",
    pkgMonthly: "Monthly",
    pkgMonthlyDesc: "מנוי חודשי + ניהול סושיאל",
    pkgChoose: "לבחור",

    seoHeroDescription: "סרטוני רילס לעסקים · צילום סרטונים לתוכן לעסקים · הפקת סרטון תדמית לעסק · צילום דירה להשכרה",

    navSolutions: "פתרונות",
    sectionSolutions: "פתרונות מוכנים",
    solutionsIntro: "חבילות מוכנות לפי סוג העסק — בחרו, צפו בפרטים והזמינו.",
    solutionView: "פרטים",
    solutionChoose: "לבחור פתרון זה",

    priceEstimate: "הערכה",
    selectedLabel: "נבחר",
    packageLabel: "חבילה",
    addonsLabel: "תוספות",
    totalLabel: "סה״כ",
    discountLabel: "הנחה",
    smmAddon: "SMM (ניהול סושיאל)",
    targetAddon: "Target Ads (הגדרה)",
    estimateNote: "המחיר הוא הערכה בלבד, לא הצעה מחייבת.",

    howItWorksTitle: "איך זה עובד",
    howItWorksSubtitle: "צפו בדוגמאות בקטלוג → בחרו חבילה → בדקו זמינות ושלחו ב-WhatsApp.",
    howStep1Title: "דוגמאות",
    howStep1Desc: "גללו בקטלוג וצפו בדוגמאות של עבודות.",
    howStep2Title: "חבילה",
    howStep2Desc: "בחרו חבילה מוכנה או בנו משלכם.",
    howStep3Title: "הזמנה",
    howStep3Desc: "בדקו זמינות, שמרו שעה ושלחו ב-WhatsApp.",
    howStep1Btn: "לראות דוגמאות",
    howStep2Btn: "לבחור חבילה",
    howStep3Btn: "להזמין",
  },
  en: {
    appName: "Micro-Screen Studio",
    navCatalog: "Catalog",
    navAbout: "About",
    navContact: "Contact",

    heroCtaPick: "Pick a catalog",
    heroCtaWhatsApp: "Message on WhatsApp",
    heroHint: "Pick a category → build a package → add date/city → send via WhatsApp.",

    sectionCatalog: "Catalogs",
    sectionAbout: "About",
    sectionContact: "Contact",

    flowHint: "Pick → Examples → Build a package → Reserve → WhatsApp.",

    popular: "popular",
    open: "open",

    tabExamples: "Examples",
    tabPackage: "Build package",
    tabReserve: "Reserve",

    examplesHint: "Pick a thumbnail → video/notes on the right.",
    packageHint: "Build a package → add to message.",
    reserveHint: "Fill the minimum → send.",

    breakdownTitle: "Example",

    packageBuildTitle: "Build a package",
    packageCalcTitle: "Calculation",
    packageApply: "Add to message & go to reserve",
    packageSummaryTitle: "Summary",
    packageNote: "Price is an estimate. Final quote after details.",

    reserveTitle: "Reserve",
    reserveSubtitle: "Fill what you know now — we’ll clarify the rest in chat.",

    formBusiness: "What business is it? (short)",
    formDate: "Date",
    formTime: "Time",
    formCity: "City",
    formComment: "Comment",
    formContact: "My contact (optional)",

    generate: "Generate message",
    copy: "Copy text",
    copied: "Copied ✓",
    send: "Send to WhatsApp",
    close: "Close",

    messagePreview: "Message preview",

    packagesTitle: "Packages",
    more: "More",
    less: "Less",
    openCatalog: "Open catalog",

    contactWhatsApp: "WhatsApp",
    contactInstagram: "Instagram",
    contactEmail: "Email",
    replyTime: "Usually reply within 1–3 hours.",

    footerTop: "Top",
    footerCatalog: "Catalog",

    catalogBenefit: "Professional content for your business",
    openArrow: "Open →",
    fromPrice: "from ",

    helpTitle: "3 Simple Steps",
    helpDesc: "1) Browse examples  2) Build a package  3) Fill details & send via WhatsApp.",

    showMore: "More...",
    showLess: "Less",

    customPresetTitle: "Custom",
    customPresetDesc: "Build your own package",

    heroCtaExamples: "View examples",
    heroCtaPackages: "Choose a package",
    heroCtaOrder: "Order now",

    heroCtaCatalogs: "Open catalogs",
    heroCtaPricing: "Pricing",
    howStartNow: "Start now",
    continueToPackage: "Continue to package",

    filterAll: "All",
    filterFood: "Food / Restaurant",
    filterBar: "Bar / Bartender",
    filterBeauty: "Beauty / Nails",
    filterFlowers: "Flowers / Retail",
    filterTattoo: "Tattoo / Services",
    filterRealEstate: "Real Estate",
    searchPlaceholder: "Search... (bar, tattoo, apartment, reels)",
    noResults: "No results found — try a different filter or search term.",

    formGoal: "What do you need?",
    goalReels: "Reels",
    goalPhotos: "Photos",
    goalBoth: "Reels + Photos",

    stickyExamples: "Examples",
    stickyOrder: "Order",

    orderSimilar: "Order similar",

    pickThis: "Pick this package",

    choosePackage: "Choose a package",
    choosePackageSubtitle: "Pick a ready-made package or build your own — then proceed to order.",
    pkgStarter: "Starter",
    pkgStarterDesc: "4h · 6 reels · 20 photos",
    pkgBusiness: "Business",
    pkgBusinessDesc: "Full day · 10 reels · 120 photos",
    pkgMonthly: "Monthly",
    pkgMonthlyDesc: "Monthly plan + social mgmt",
    pkgChoose: "Choose",

    seoHeroDescription: "Reels for businesses · Content video production · Business promo videos · Real estate photography",

    navSolutions: "Solutions",
    sectionSolutions: "Ready-Made Solutions",
    solutionsIntro: "Ready-made packages by business type — pick, view details and order.",
    solutionView: "View",
    solutionChoose: "Choose this solution",

    priceEstimate: "estimate",
    selectedLabel: "Selected",
    packageLabel: "Package",
    addonsLabel: "Add-ons",
    totalLabel: "Total",
    discountLabel: "Discount",
    smmAddon: "SMM (social management)",
    targetAddon: "Target Ads (setup)",
    estimateNote: "Price is an estimate only, not a binding offer.",

    howItWorksTitle: "How it works",
    howItWorksSubtitle: "Browse the catalog for examples → pick a package → check availability and send via WhatsApp.",
    howStep1Title: "Examples",
    howStep1Desc: "Scroll through the catalog and browse work samples.",
    howStep2Title: "Package",
    howStep2Desc: "Choose a preset or build your own.",
    howStep3Title: "Order",
    howStep3Desc: "Check availability, hold a slot and send via WhatsApp.",
    howStep1Btn: "View examples",
    howStep2Btn: "Choose package",
    howStep3Btn: "Order",
  },
};

export function t(lang: Lang, key: string) {
  return STRINGS[lang][key] ?? STRINGS.en[key] ?? key;
}
