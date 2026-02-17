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

    sectionCatalog: "דוגמאות מצילומים אמיתיים לפי תחום",
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

    choosePackage: "בחרו חבילת צילום שמתאימה לעסק",
    choosePackageSubtitle: "בחרו חבילה מוכנה או בנו חבילה מותאמת אישית — וממשיכים להזמנה.",
    pkgStarter: "Starter",
    pkgStarterDesc: "4 שעות · 6 רילס · 20 תמונות",
    pkgBusiness: "Business",
    pkgBusinessDesc: "יום מלא · 10 רילס · 120 תמונות",
    pkgMonthly: "Monthly",
    pkgMonthlyDesc: "מנוי חודשי + ניהול סושיאל",
    pkgChoose: "לבחור",

    seoHeroDescription: "סרטוני רילס לעסקים · צילום סרטונים לתוכן לעסקים · הפקת סרטון תדמית לעסק · צילום דירה להשכרה",

    navSolutions: "פתרונות מוכנים",
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
    smmAddon: "SMM Lite",
    targetAddon: "Ads Targeting (Meta)",
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

    sectionWhatYouGet: "מה מקבלים",
    sectionBestFor: "מתאים ל",
    sectionProcess: "התהליך",
    sectionPricingRange: "טווח מחירים",
    sectionWhyThisWorks: "למה זה עובד",
    sectionFaq: "שאלות נפוצות",
    sectionSocialProof: "הוכחה חברתית",

    labelShootTime: "זמן צילום",
    labelDelivery: "זמן אספקה",
    labelLocations: "מיקומים",
    labelRevisions: "תיקונים",

    labelShoot: "זמן צילום",
    labelDeliveryShort: "אספקה",

    formBusinessType: "סוג עסק",
    formLanguages: "שפות",
    formGoalLabel: "מטרה",
    productPageNote: "זו לא הזמנה. כאן רק מידע ומחירים.",

    labelTargetAudience: "קהל יעד",
    pkgCollapsedSummary: "מה כלול",
    buildCustomPkg: "בניית חבילה מותאמת",
    disableHint: "כבו קטגוריה כדי להסתיר אותה זמנית מהאתר",
    chooseAnotherDate: "בחרו תאריך אחר",
    navExamples: "דוגמאות",

    // Homepage redesign
    heroCtaSeePricing: "מחירון",
    stickyCatalogs: "קטלוגים",
    stickyWhatsApp: "WhatsApp",
    clearFilters: "נקה סינון",
    filterEvents: "אירועים",
    filterHotels: "מלונות / צימרים",
    filterRestaurants: "מסעדות",
    filterRetail: "קמעונאות / אונליין",
    filterServices: "שירותים",
    previewBtn: "תצוגה מקדימה",
    previewTitle: "תצוגה מקדימה",
    previewChoosePackage: "בחירת חבילה",
    previewWhatsApp: "שליחה ב-WhatsApp",
    previewPlaceholder: "דוגמה",
    pkgBestFor: "מתאים ל",
    pkgDelivery: "אספקה",

    // Pricing page
    pricingCompareTitle: "השוואת חבילות",
    pricingReels: "רילס",
    pricingPhotos: "תמונות",
    pricingLocations: "מיקומים",
    pricingDelivery: "אספקה",
    pricingBestFor: "מתאים ל",
    pricingInfoBadge: "זו לא הזמנה — מידע ומחירים בלבד.",
    pricingGoToCatalogs: "לקטלוגים",
    pricingWhatsApp: "WhatsApp עם הודעה מוכנה",

    // How it works compact
    howCompactStep1: "בחרו קטלוג",
    howCompactStep2: "בחרו חבילה",
    howCompactStep3: "שלחו ב-WhatsApp",

    // Mobile CTA
    letsStart: "בוא נתחיל",

    // Mobile nav
    navPricing: "מחירים",
    menuOpen: "תפריט",
    menuClose: "סגור",

    // Catalog card
    catalogOpen: "פתח",
    goToPackages: "לחבילות",

    // Catalog preview modal
    tabPhotos: "תמונות",
    tabVideo: "וידאו",
    choosePackageBtn: "בחר חבילה",

    // Package CTA
    pkgWhatsApp: "שלח ב-WhatsApp",

    // Package card examples
    pkgExamples: "דוגמאות",

    // Business type selector
    bizTypeLabel: "בחר סוג עסק",
    bizTypeAll: "הכל",
    bizTypeHint: "בחרו סוג עסק כדי לראות דוגמאות רלוונטיות בחבילות",
    bizTypeBars: "ברים / חיי לילה",
    bizTypeRestaurants: "מסעדות / אוכל",
    bizTypeHotels: "מלונות",
    bizTypeEvents: "אירועים",
    bizTypeRealEstate: "נדל״ן",
    bizTypeServices: "שירותים קטנים",
    bizTypeGateHint: "קודם בחר סוג עסק כדי לראות דוגמאות מתאימות",
    bizTypeMicrocopy: "קודם בחר סוג עסק ואז בחר חבילה",

    // Monthly add-ons
    monthlyAddonsTitle: "תוספות חודשיות",
    monthlyAddonsHelper: "תוספות חודשיות, לא כלול במחיר החבילה",
    addonDetails: "פרטים",
    addonSmmLite: "SMM Lite",
    addonAdsMeta: "Ads Targeting (Meta)",
    addonPerMonth: "/ חודשי",
    addonsTotal: "סה״כ תוספות",
    addonOnlyMonthly: "זמין רק בחבילת Monthly",
    addonsAvailableOnlyMonthly: "התוספות זמינות רק בבחירת חבילת חודשי",
    priceAfterDiscount: "מחיר אחרי הנחה",
    addonWhatsIncluded: "מה כלול",
    addonNotIncluded: "לא כלול",
    finalTotalLabel: "סה״כ לתשלום",
  },
  en: {
    appName: "Micro-Screen Studio",
    navCatalog: "Catalog",
    navAbout: "About",
    navContact: "Contact",

    heroCtaPick: "Pick a catalog",
    heroCtaWhatsApp: "Message on WhatsApp",
    heroHint: "Pick a category → build a package → add date/city → send via WhatsApp.",

    sectionCatalog: "Real shoot examples by industry",
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

    choosePackage: "Choose a photo package that fits your business",
    choosePackageSubtitle: "Pick a ready-made package or build your own — then proceed to order.",
    pkgStarter: "Starter",
    pkgStarterDesc: "4h · 6 reels · 20 photos",
    pkgBusiness: "Business",
    pkgBusinessDesc: "Full day · 10 reels · 120 photos",
    pkgMonthly: "Monthly",
    pkgMonthlyDesc: "Monthly plan + social mgmt",
    pkgChoose: "Choose",

    seoHeroDescription: "Reels for businesses · Content video production · Business promo videos · Real estate photography",

    navSolutions: "Ready Solutions",
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
    smmAddon: "SMM Lite",
    targetAddon: "Ads Targeting (Meta)",
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

    sectionWhatYouGet: "What you get",
    sectionBestFor: "Best for",
    sectionProcess: "Process",
    sectionPricingRange: "Pricing range",
    sectionWhyThisWorks: "Why this works",
    sectionFaq: "FAQ",
    sectionSocialProof: "Social proof",

    labelShootTime: "Shoot time",
    labelDelivery: "Delivery",
    labelLocations: "Locations",
    labelRevisions: "Revisions",

    labelShoot: "Shoot",
    labelDeliveryShort: "Delivery",

    formBusinessType: "Business type",
    formLanguages: "Languages",
    formGoalLabel: "Goal",
    productPageNote: "This is not an order. Information and pricing only.",

    labelTargetAudience: "Target audience",
    pkgCollapsedSummary: "What's included",
    buildCustomPkg: "Build custom package",
    disableHint: "Disable a category to temporarily hide it from the site",
    chooseAnotherDate: "Choose another date",
    navExamples: "Examples",

    // Homepage redesign
    heroCtaSeePricing: "See pricing",
    stickyCatalogs: "Catalogs",
    stickyWhatsApp: "WhatsApp",
    clearFilters: "Clear filters",
    filterEvents: "Events",
    filterHotels: "Hotels",
    filterRestaurants: "Restaurants",
    filterRetail: "Retail / Online",
    filterServices: "Services",
    previewBtn: "Preview",
    previewTitle: "Quick Preview",
    previewChoosePackage: "Choose package",
    previewWhatsApp: "Send via WhatsApp",
    previewPlaceholder: "Sample",
    pkgBestFor: "Best for",
    pkgDelivery: "Delivery",

    // Pricing page
    pricingCompareTitle: "Compare packages",
    pricingReels: "Reels",
    pricingPhotos: "Photos",
    pricingLocations: "Locations",
    pricingDelivery: "Delivery",
    pricingBestFor: "Best for",
    pricingInfoBadge: "This is not an order — information and pricing only.",
    pricingGoToCatalogs: "Go to catalogs",
    pricingWhatsApp: "WhatsApp with prefilled message",

    // How it works compact
    howCompactStep1: "Choose catalog",
    howCompactStep2: "Pick a package",
    howCompactStep3: "Send via WhatsApp",

    // Mobile CTA
    letsStart: "Let's start",

    // Mobile nav
    navPricing: "Pricing",
    menuOpen: "Menu",
    menuClose: "Close",

    // Catalog card
    catalogOpen: "Open",
    goToPackages: "Go to packages",

    // Catalog preview modal
    tabPhotos: "Photos",
    tabVideo: "Video",
    choosePackageBtn: "Choose a package",

    // Package CTA
    pkgWhatsApp: "Message on WhatsApp",

    // Package card examples
    pkgExamples: "Examples",

    // Business type selector
    bizTypeLabel: "Choose business type",
    bizTypeAll: "All",
    bizTypeHint: "Choose a business type to see relevant examples in the packages",
    bizTypeBars: "Bars / Nightlife",
    bizTypeRestaurants: "Restaurants / Food",
    bizTypeHotels: "Hotels",
    bizTypeEvents: "Events",
    bizTypeRealEstate: "Real Estate",
    bizTypeServices: "Small Services",
    bizTypeGateHint: "Choose a business type to see matching examples",
    bizTypeMicrocopy: "First choose a business type, then pick a package",

    // Monthly add-ons
    monthlyAddonsTitle: "Monthly add-ons",
    monthlyAddonsHelper: "Monthly add-ons, not included in package price",
    addonDetails: "Details",
    addonSmmLite: "SMM Lite",
    addonAdsMeta: "Ads Targeting (Meta)",
    addonPerMonth: "/ month",
    addonsTotal: "Add-ons total",
    addonOnlyMonthly: "Available only for Monthly",
    addonsAvailableOnlyMonthly: "Add-ons are available only with the Monthly package",
    priceAfterDiscount: "Price after discount",
    addonWhatsIncluded: "What's included",
    addonNotIncluded: "Not included",
    finalTotalLabel: "Total",
  },
};

export function t(lang: Lang, key: string) {
  return STRINGS[lang][key] ?? STRINGS.en[key] ?? key;
}
