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

    choosePackage: "בחרו את החבילה המתאימה לעסק שלכם",
    choosePackageSubtitle: "בחרו חבילה מוכנה או בנו חבילה מותאמת אישית — וממשיכים להזמנה.",
    pkgStarter: "Starter",
    pkgStarterDesc: "4 שעות · 6 רילס · 20 תמונות",
    pkgBusiness: "Business",
    pkgBusinessDesc: "יום מלא · 10 רילס · 120 תמונות",
    pkgMonthly: "Monthly",
    pkgMonthlyDesc: "מנוי חודשי + ניהול סושיאל",
    pkgChoose: "לבחור",

    seoHeroDescription: "סרטוני רילס למסעדות, ברים, בתי קפה, מאפיות, קייטרינג ועסקי אוכל · צילום סרטונים לתוכן לעסקי אוכל ואירוח · הפקת סרטון תדמית לעסק",

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
    backToHome: "חזרה לעמוד הראשי",

    // Food & hospitality redesign
    heroHeadline: "מחפשים תוכן ברמה גבוהה לעסק שלכם?",
    heroSub: "סרטוני וידאו קצרים למסעדות, ברים, בתי קפה, מאפיות, קייטרינג, אולמות אירועים ומותגי אוכל בישראל.",
    heroSupporting: "תוכן שמוכר אוכל, משקאות וחוויה — ומביא תוצאות אמיתיות.",
    heroBullet1: "הופכים מנות, קוקטיילים ואווירה לתוכן שמביא לקוחות אמיתיים",
    heroBullet2: "מגדילים חשיפה לעסקי אוכל ואירוח",
    heroBullet3: "מביאים יותר לקוחות לעסק שלכם",
    heroCtaAvailability: "לבחור חבילה",
    heroCtaWa: "וואטסאפ עכשיו",

    problemTitle: "למה עסקי אוכל ואירוח מתקשים ברשתות?",
    problemIntro: "עסקי אוכל ואירוח רבים מפסידים הכנסות כי:",
    problemPoint1: "המנות והאווירה לא מוצגים נכון ברשת",
    problemPoint2: "הפרסום לא עקבי",
    problemPoint3: "אין זמן לצילום ועריכה",
    problemPoint4: "המתחרים פעילים יותר",

    solutionTitle: "איך אני עוזר לך למכור יותר",
    solutionIntro: "אני יוצר תוכן קצר שממוקד ב:",
    solutionPoint1: "מנות שמוכרות",
    solutionPoint2: "אווירה שמושכת לקוחות",
    solutionPoint3: "תוכן שנבנה לחשיפה אמיתית",
    solutionPoint4: "אירועים, שירות ואישיות המותג",
    solutionOutro: "אני לא רק מצלם אוכל.\nאני מתמקד במנות שמוכרות, באווירה שמושכת ובתוכן שנבנה לחשיפה אמיתית.",

    whyMeTitle: "יותר מצילום",
    whyMeIntro: "אני מתמקד במנות שמוכרות, באווירה שממירה צפיות ללקוחות ובתוכן שמיועד לחשיפה. עם ניסיון בתחום האירוח, אני מבין זרימת שירות, שעות עומס ופסיכולוגיית לקוחות.",
    whyMePoint1: "רקע באירוח ועסקי אוכל",
    whyMePoint2: "מבין את זרימת השירות",
    whyMePoint3: "מכיר שעות שיא",
    whyMePoint4: "מתמקד במנות שמוכרות ובאווירה שמושכת",
    whyMePoint5: "זמן אספקה מהיר",

    // Who is this for section
    whoIsThisForTitle: "למי זה מתאים?",
    whoIsThisFor1: "מסעדות וברים",
    whoIsThisFor2: "בתי קפה ומאפיות",
    whoIsThisFor3: "אולמות אירועים וקייטרינג",
    whoIsThisFor4: "שפים ומותגים אישיים",
    whoIsThisFor5: "אוכל בריא וקונספטים מיוחדים",
    whoIsThisFor6: "ברי קוקטייל וקונספטים ליליים",
    whoIsThisFor7: "מקומות בראנץ' ובוקר",

    // Trust section
    trustTitle: "עסקי אוכל ואירוח סומכים עלינו",
    trustStat1Value: "50+",
    trustStat1Label: "פרויקטים שהושלמו",
    trustStat2Value: "30+",
    trustStat2Label: "עסקים שקיבלו שירות",
    trustStat3Value: "48 שעות",
    trustStat3Label: "זמן אספקה ממוצע",
    trustStat4Value: "100%",
    trustStat4Label: "שביעות רצון לקוחות",

    // CTA urgency
    ctaUrgency: "זמינות מוגבלת בכל חודש",
    sectionCtaWa: "שלח הודעה ב-WhatsApp",
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

    choosePackage: "Choose the Right Package for Your Business",
    choosePackageSubtitle: "Pick a ready-made package or build your own — then proceed to order.",
    pkgStarter: "Starter",
    pkgStarterDesc: "4h · 6 reels · 20 photos",
    pkgBusiness: "Business",
    pkgBusinessDesc: "Full day · 10 reels · 120 photos",
    pkgMonthly: "Monthly",
    pkgMonthlyDesc: "Monthly plan + social mgmt",
    pkgChoose: "Choose",

    seoHeroDescription: "Reels for restaurants, bars, coffee shops, bakeries, catering & food brands · Food & hospitality content · Business promo videos",

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
    backToHome: "Back to homepage",

    // Food & hospitality redesign
    heroHeadline: "Looking for premium content for your business?",
    heroSub: "Short-form video content for restaurants, bars, coffee shops, bakeries, catering, event venues and food brands in Israel.",
    heroSupporting: "Content that sells food, drinks and experience — and drives real results.",
    heroBullet1: "Turn your dishes, drinks and atmosphere into content that attracts real customers",
    heroBullet2: "Increase visibility for your food & hospitality business",
    heroBullet3: "Bring more customers through your doors",
    heroCtaAvailability: "View Packages",
    heroCtaWa: "WhatsApp Now",

    problemTitle: "Why Food & Hospitality Businesses Struggle on Social Media",
    problemIntro: "Many food and hospitality businesses lose revenue because:",
    problemPoint1: "Great dishes and atmosphere aren't shown properly",
    problemPoint2: "Inconsistent posting",
    problemPoint3: "No time to create content",
    problemPoint4: "Competitors post more often",

    solutionTitle: "How I Help You Sell More",
    solutionIntro: "I create short-form content focused on:",
    solutionPoint1: "Dishes that sell",
    solutionPoint2: "Atmosphere that converts",
    solutionPoint3: "Content built for visibility",
    solutionPoint4: "Events, service and brand personality",
    solutionOutro: "I don't just film food.\nI focus on dishes that sell, atmosphere that converts and content built for visibility.",

    whyMeTitle: "More Than Just Filming",
    whyMeIntro: "I focus on dishes that sell, atmosphere that converts and content built for visibility. With experience in hospitality, I understand service flow, peak hours and guest psychology.",
    whyMePoint1: "Background in food & hospitality",
    whyMePoint2: "Understand service flow",
    whyMePoint3: "Know peak hours",
    whyMePoint4: "Focus on dishes that sell and atmosphere that attracts",
    whyMePoint5: "Fast turnaround",

    // Who is this for section
    whoIsThisForTitle: "Who Is This For?",
    whoIsThisFor1: "Restaurants & Bars",
    whoIsThisFor2: "Coffee Shops & Bakeries",
    whoIsThisFor3: "Event Venues & Catering",
    whoIsThisFor4: "Chefs & Personal Brands",
    whoIsThisFor5: "Healthy Food & Specialty Concepts",
    whoIsThisFor6: "Cocktail Bars & Night Concepts",
    whoIsThisFor7: "Breakfast & Brunch Spots",

    // Trust section
    trustTitle: "Trusted by Food & Hospitality Businesses",
    trustStat1Value: "50+",
    trustStat1Label: "Projects Completed",
    trustStat2Value: "30+",
    trustStat2Label: "Businesses Served",
    trustStat3Value: "48h",
    trustStat3Label: "Average Delivery Time",
    trustStat4Value: "100%",
    trustStat4Label: "Client Satisfaction",

    // CTA urgency
    ctaUrgency: "Limited monthly availability",
    sectionCtaWa: "Message on WhatsApp",
  },
};

export function t(lang: Lang, key: string) {
  return STRINGS[lang][key] ?? STRINGS.en[key] ?? key;
}
