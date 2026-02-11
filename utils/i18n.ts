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
    sectionAbout: "אודות / מחירים (הערכה)",
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
    sectionAbout: "About / price guide",
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
  },
};

export function t(lang: Lang, key: string) {
  return STRINGS[lang][key] ?? STRINGS.en[key] ?? key;
}
