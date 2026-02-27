export type Lang = "he" | "en";

export const DEFAULT_LANG: Lang = "he";
export const STORAGE_KEY_LANG = "cc_lang_v1";

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
    sectionOutcome: "תוצאה צפויה",
    sectionExamples: "דוגמאות",

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
    pkgNoExamples: "דוגמאות יתווספו בקרוב",

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
    heroHeadline: "תוכן שמוכר אוכל וחוויה",
    heroSub: "סרטוני וידאו קצרים למסעדות, ברים, בתי קפה, מאפיות, קייטרינג, אולמות אירועים ומותגי אוכל בישראל.",
    heroSupporting: "הופכים מנות, קוקטיילים ואווירה לתוכן שמביא לקוחות אמיתיים.",
    heroBullet1: "הופכים מנות, קוקטיילים ואווירה לתוכן שמביא לקוחות אמיתיים",
    heroBullet2: "מגדילים חשיפה לעסקי אוכל ואירוח",
    heroBullet3: "מביאים יותר לקוחות לעסק שלכם",
    heroCtaAvailability: "בדוק זמינות",
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

    // CTA urgency
    ctaUrgency: "זמינות מוגבלת בכל חודש",
    sectionCtaWa: "שלח הודעה ב-WhatsApp",

    // Collab section
    navCollab: "שיתופי פעולה",
    collabTitle: "שיתופי פעולה (Collab)",
    collabSubtitle: "מספר מקומות מוגבל בכל חודש",
    collabBody: "לעיתים אני פותח 1–2 מקומות בחודש לשיתוף פעולה עם עסקים מעניינים.\nזה מתאים לעסק בתחילת הדרך או לפרויקט עם פוטנציאל שיווקי ברור.\nההטבה מוגבלת ובאישור בלבד.",
    collabBullet1: "צילום קצר + עריכה בסיסית",
    collabBullet2: "אישור שימוש בתיק עבודות + תיוג",
    collabBullet3: "אפשרות לברטר לפי ערך מוסכם",
    collabBullet4: "לא מתאים לכל עסק",
    collabCta: "בדוק התאמה לשיתוף פעולה",
    collabDisclaimer: "נפתח לפי זמינות ובהתאם להתאמה.",
    collabSpots: "1–2 מקומות / חודש",
    collabApproval: "באישור בלבד",
    collabWaMessage: "היי! אני רוצה לבדוק שיתוף פעולה (Collab).\nשם העסק:\nתחום:\nמיקום:\nמה צריך לצלם:\nקישור לאינסטגרם/טיקטוק:\n",

    // ─── Redesign: About / Studio ───
    studioTitle: "מי אנחנו",
    studioSubtitle: "סטודיו לתוכן וצמיחה עסקית",
    studioBody: "אנחנו לא רק מצלמים. אנחנו בונים מערכות תוכן שמביאות פניות אמיתיות לעסק שלך.\n\nאנחנו מבינים מסעדות, ברים, אירוח, עסקים מקומיים ושיווק ויזואלי. אנחנו משלבים הפקה יצירתית עם חשיבה עסקית מעשית.",
    studioPoint1: "ניסיון מעשי בעולם האירוח והאוכל",
    studioPoint2: "שילוב של תוכן יצירתי עם אסטרטגיה עסקית",
    studioPoint3: "מבינים את הלקוח הסופי שלך",
    studioPoint4: "תוכן שנבנה להמרה, לא רק לאסתטיקה",

    // ─── Redesign: How It Works ───
    howTitle: "איך זה עובד",
    howSubtitle: "מערכת פשוטה שהופכת תוכן לפניות",
    howStep1Num: "01",
    howStep1Label: "יצירת תוכן שמוכר",
    howStep1Text: "צילום מקצועי, רילסים, עריכה ותוכן מותאם לרשתות — הכל בסגנון שמושך את הלקוח הנכון.",
    howStep2Num: "02",
    howStep2Label: "בניית מיני-סייט + נתיב WhatsApp",
    howStep2Text: "דף נחיתה מקצועי, תפריט QR, או עמוד מוצר שמוביל ישירות לפניה ב-WhatsApp.",
    howStep3Num: "03",
    howStep3Label: "השקת תוכן ומודעות שמביאים פניות",
    howStep3Text: "פרסום חכם, העלאת תוכן עקבית ומערכת שהופכת צפיות ללקוחות.",

    // ─── Redesign: What Clients Get ───
    deliverablesTitle: "מה הלקוח מקבל",
    deliverablesSubtitle: "לא רק תמונות — מערכת שלמה",
    deliverable1: "רילסים וסרטונים קצרים",
    deliverable2: "צילומי סטילס מקצועיים",
    deliverable3: "תוכן ערוך ומוכן לרשתות",
    deliverable4: "כיתובים + תמיכה בהעלאות",
    deliverable5: "מיני-סייט או דף נחיתה",
    deliverable6: "תפריט QR או עמוד מוצר/שירות",
    deliverable7: "קריאטיב מוכן לפרסום",
    deliverable8: "נתיב פניה ב-WhatsApp",
    deliverable9: "נוכחות דיגיטלית ברורה יותר",

    // ─── Redesign: Content Services ───
    contentSvcTitle: "שירותי תוכן",
    contentSvcSubtitle: "הפקת תוכן מקצועית לעסק שלך",
    contentSvc1: "צילום סטילס מקצועי",
    contentSvc2: "צילום וידאו ורילסים",
    contentSvc3: "UGC ותוכן אותנטי",
    contentSvc4: "עריכה מקצועית",
    contentSvc5: "יום צילום מרוכז",
    contentSvc6: "צילום אוכל / משקאות / מוצרים",
    contentSvc7: "תוכן מותאם לסושיאל",

    // ─── Redesign: Services section header ───
    servicesTitle: "שתי רמות שירות",
    servicesSubtitle: "בחר את הרמה שמתאימה לצרכי העסק שלך",
    contentSvcForLabel: "להפקת תוכן בלבד",
    growthForLabel: "לצמיחה עסקית מלאה",

    // ─── Redesign: Deliverables groups ───
    deliverablesGroupContent: "הפקת תוכן",
    deliverablesGroupSystems: "מערכות דיגיטליות",

    // ─── Redesign: Growth Solutions ───
    growthTitle: "פתרונות צמיחה",
    growthSubtitle: "יותר מתוכן — מערכת שלמה לפניות",
    growth1: "תפריט QR + מיני-סייט למסעדה",
    growth2: "מותג אישי לשף",
    growth3: "פתרון לבר קוקטיילים / אירוח",
    growth4: "ביוטי / פאנל הזמנות",
    growth5: "מוצרים / חנות אונליין",
    growth6: "Quick Start לעסק קטן",

    // ─── Redesign: Industries ───
    industriesTitle: "למי זה מתאים",
    industriesSubtitle: "אנחנו עובדים עם",
    industry1: "מסעדות",
    industry2: "ברים",
    industry3: "בתי קפה",
    industry4: "שפים",
    industry5: "פרחים",
    industry6: "ביוטי",
    industry7: "קעקועים",
    industry8: "חנויות אונליין",
    industry9: "השכרות / נדל״ן",
    industry10: "עסקים מקומיים",

    // ─── Redesign: FAQ ───
    faqTitle: "שאלות נפוצות",
    faq1Q: "איך התהליך עובד?",
    faq1A: "אנחנו מתחילים בשיחה קצרה ב-WhatsApp כדי להבין את הצרכים שלך. אחר כך מתאמים צילום, מפיקים תוכן ומספקים הכל ערוך ומוכן.",
    faq2Q: "כמה זמן לוקחת ההפקה?",
    faq2A: "תלוי בחבילה. יום צילום רגיל נמסר תוך 3–7 ימי עבודה. פרויקטים מורכבים יותר בהתאם להיקף.",
    faq3Q: "אפשר להזמין רק תוכן בלי פתרונות?",
    faq3A: "בוודאי. שירותי התוכן שלנו עצמאיים — צילום, רילסים, עריכה — אפשר להזמין בנפרד.",
    faq4Q: "אפשר להזמין פתרון מלא?",
    faq4A: "כן. אנחנו בונים גם מיני-סייט, תפריט QR, מערכת WhatsApp ומודעות — הכל במקום אחד.",
    faq5Q: "האם פרסום ממומן כלול?",
    faq5A: "פרסום ממומן הוא תוספת אופציונלית. אנחנו מגדירים קמפיינים, קהלי יעד ותקציב — ומנהלים את הכל.",
    faq6Q: "איך עובדות פניות WhatsApp?",
    faq6A: "כל התוכן, הדפים והמודעות מכוונים לנתיב WhatsApp ישיר. הלקוחות שלך פונים בהודעה — אתה מקבל ליד חם.",
    faq7Q: "מה צריך מהלקוח כדי להתחיל?",
    faq7A: "שיחה קצרה + גישה לעסק ליום הצילום. את כל השאר אנחנו מנהלים.",

    // ─── Redesign: Final CTA ───
    finalCtaTitle: "בואו נדבר",
    finalCtaSubtitle: "מוכנים להפוך את התוכן שלכם למערכת שמביאה פניות?",
    finalCtaPackage: "שאלו על חבילה",
    finalCtaCustom: "בקשו הצעה מותאמת",
    finalCtaContent: "התחילו עם תוכן",
    finalCtaSolution: "בקשו פתרון עסקי מלא",
    finalCtaWa: "שלחו הודעה ב-WhatsApp",

    // ─── Redesign: Hero updated ───
    heroTagline: "תוכן · נראות · פניות",
    heroHeadlineNew: "תוכן שמביא לקוחות אמיתיים",
    heroSubNew: "אנחנו בונים מערכות תוכן לעסקים מקומיים — צילום, רילסים, מיני-סייט, מודעות ונתיב WhatsApp שמוביל לפניות.",
    heroCtaWhatsAppNew: "דברו איתנו ב-WhatsApp",
    heroCtaPricingNew: "ראו חבילות ומחירים",

    // ─── Redesign: Section eyebrows ───
    eyebrowAbout: "אודות הסטודיו",
    eyebrowProcess: "התהליך",
    eyebrowDeliverables: "תוצרים",
    eyebrowContent: "שירותי תוכן",
    eyebrowGrowth: "פתרונות צמיחה",
    eyebrowServices: "השירותים שלנו",
    eyebrowPortfolio: "עבודות נבחרות",
    eyebrowPricing: "מחירים וחבילות",
    eyebrowIndustries: "תחומים",
    eyebrowFaq: "שאלות נפוצות",
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
    sectionOutcome: "Expected outcome",
    sectionExamples: "Examples",

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
    pkgNoExamples: "Examples coming soon",

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
    heroHeadline: "Content That Sells Food & Experience",
    heroSub: "Short-form video content for restaurants, bars, coffee shops, bakeries, catering, event venues and food brands in Israel.",
    heroSupporting: "Turn your dishes, drinks and atmosphere into content that attracts real customers.",
    heroBullet1: "Turn your dishes, drinks and atmosphere into content that attracts real customers",
    heroBullet2: "Increase visibility for your food & hospitality business",
    heroBullet3: "Bring more customers through your doors",
    heroCtaAvailability: "Check Availability",
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

    // CTA urgency
    ctaUrgency: "Limited monthly availability",
    sectionCtaWa: "Message on WhatsApp",

    // Collab section
    navCollab: "Collab",
    collabTitle: "Collaboration (Collab)",
    collabSubtitle: "Limited spots each month",
    collabBody: "Sometimes I open 1–2 collaboration spots per month for interesting businesses.\nBest for new brands or projects with clear marketing potential.\nLimited and approval-only.",
    collabBullet1: "Short shoot + basic edit",
    collabBullet2: "Portfolio usage + tagging",
    collabBullet3: "Barter possible (agreed value)",
    collabBullet4: "Not for every business",
    collabCta: "Check if we're a fit",
    collabDisclaimer: "Opens based on availability and fit.",
    collabSpots: "1–2 spots / month",
    collabApproval: "Approval only",
    collabWaMessage: "Hi! I'd like to check a collaboration (Collab).\nBusiness name:\nNiche:\nLocation:\nWhat to shoot:\nInstagram/TikTok link:\n",

    // ─── Redesign: About / Studio ───
    studioTitle: "Who We Are",
    studioSubtitle: "A Content & Growth Studio",
    studioBody: "We don't just shoot. We build content systems that generate real client inquiries for your business.\n\nWe understand restaurants, bars, hospitality, local businesses and visual marketing. We combine creative production with practical business thinking.",
    studioPoint1: "Hands-on experience in hospitality & food",
    studioPoint2: "Creative content meets business strategy",
    studioPoint3: "We understand your end customer",
    studioPoint4: "Content built for conversion, not just aesthetics",

    // ─── Redesign: How It Works ───
    howTitle: "How It Works",
    howSubtitle: "A simple system that turns content into inquiries",
    howStep1Num: "01",
    howStep1Label: "Create content that sells",
    howStep1Text: "Professional shoots, reels, editing and social-ready content — all designed to attract the right customer.",
    howStep2Num: "02",
    howStep2Label: "Build a mini-site + WhatsApp path",
    howStep2Text: "A professional landing page, QR menu, or product page that leads directly to a WhatsApp inquiry.",
    howStep3Num: "03",
    howStep3Label: "Launch content & ads that bring inquiries",
    howStep3Text: "Smart advertising, consistent content publishing, and a system that turns views into customers.",

    // ─── Redesign: What Clients Get ───
    deliverablesTitle: "What You Get",
    deliverablesSubtitle: "Not just pretty visuals — a complete system",
    deliverable1: "Reels & short-form videos",
    deliverable2: "Professional photography",
    deliverable3: "Edited content ready for social media",
    deliverable4: "Captions + posting support",
    deliverable5: "Mini-site or landing page",
    deliverable6: "QR menu or product/service page",
    deliverable7: "Ad-ready creative assets",
    deliverable8: "WhatsApp inquiry path",
    deliverable9: "Clearer digital presence",

    // ─── Redesign: Content Services ───
    contentSvcTitle: "Content Services",
    contentSvcSubtitle: "Professional content production for your business",
    contentSvc1: "Professional photography",
    contentSvc2: "Video & reels production",
    contentSvc3: "UGC & authentic content",
    contentSvc4: "Professional editing",
    contentSvc5: "Content day shoot",
    contentSvc6: "Food / drinks / product visuals",
    contentSvc7: "Social-ready content delivery",

    // ─── Redesign: Services section header ───
    servicesTitle: "Two Service Levels",
    servicesSubtitle: "Choose the level that fits your business needs",
    contentSvcForLabel: "For production only",
    growthForLabel: "For complete business growth",

    // ─── Redesign: Deliverables groups ───
    deliverablesGroupContent: "Content Production",
    deliverablesGroupSystems: "Digital Systems",

    // ─── Redesign: Growth Solutions ───
    growthTitle: "Growth Solutions",
    growthSubtitle: "More than content — a complete inquiry system",
    growth1: "Restaurant QR menu + mini-site",
    growth2: "Chef personal brand",
    growth3: "Cocktail bar / hospitality solution",
    growth4: "Beauty / booking funnel",
    growth5: "Product / ecommerce content flow",
    growth6: "Small business quick start",

    // ─── Redesign: Industries ───
    industriesTitle: "Who We Work With",
    industriesSubtitle: "Industries we serve",
    industry1: "Restaurants",
    industry2: "Bars",
    industry3: "Cafés",
    industry4: "Chefs",
    industry5: "Florists",
    industry6: "Beauty",
    industry7: "Tattoo Studios",
    industry8: "Ecommerce",
    industry9: "Rentals / Real Estate",
    industry10: "Local Businesses",

    // ─── Redesign: FAQ ───
    faqTitle: "Frequently Asked Questions",
    faq1Q: "How does the process work?",
    faq1A: "We start with a quick WhatsApp conversation to understand your needs. Then we schedule a shoot, produce content and deliver everything edited and ready.",
    faq2Q: "How long does production take?",
    faq2A: "Depends on the package. A standard shoot day is delivered within 3–7 business days. More complex projects depend on scope.",
    faq3Q: "Can I order just content without solutions?",
    faq3A: "Absolutely. Our content services are standalone — photography, reels, editing — you can order separately.",
    faq4Q: "Can I order a full solution?",
    faq4A: "Yes. We also build mini-sites, QR menus, WhatsApp systems and ads — all in one place.",
    faq5Q: "Are paid ads included?",
    faq5A: "Paid ads are an optional add-on. We set up campaigns, audiences and budgets — and manage everything.",
    faq6Q: "How do WhatsApp inquiries work?",
    faq6A: "All content, pages and ads point to a direct WhatsApp path. Your customers reach out with a message — you get a warm lead.",
    faq7Q: "What do you need from me to start?",
    faq7A: "A short conversation + access to your business for the shoot day. We handle everything else.",

    // ─── Redesign: Final CTA ───
    finalCtaTitle: "Let's Talk",
    finalCtaSubtitle: "Ready to turn your content into a system that brings real inquiries?",
    finalCtaPackage: "Ask about a package",
    finalCtaCustom: "Request a custom offer",
    finalCtaContent: "Start with content only",
    finalCtaSolution: "Request a full business solution",
    finalCtaWa: "Message us on WhatsApp",

    // ─── Redesign: Hero updated ───
    heroTagline: "Content · Visibility · Inquiries",
    heroHeadlineNew: "Content That Brings Real Customers",
    heroSubNew: "We build content systems for local businesses — photography, reels, mini-sites, ads and a WhatsApp path that leads to inquiries.",
    heroCtaWhatsAppNew: "Talk to us on WhatsApp",
    heroCtaPricingNew: "See Packages & Pricing",

    // ─── Redesign: Section eyebrows ───
    eyebrowAbout: "About the Studio",
    eyebrowProcess: "The Process",
    eyebrowDeliverables: "Deliverables",
    eyebrowContent: "Content Services",
    eyebrowGrowth: "Growth Solutions",
    eyebrowServices: "Our Services",
    eyebrowPortfolio: "Selected Work",
    eyebrowPricing: "Pricing & Packages",
    eyebrowIndustries: "Industries",
    eyebrowFaq: "FAQ",
  },
};

export function t(lang: Lang, key: string) {
  return STRINGS[lang][key] ?? STRINGS.en[key] ?? key;
}
