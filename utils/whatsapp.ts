import type { Lang } from "@/utils/i18n";

export const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "15551234567";
export const STORAGE_KEY_RESERVATION = "cc_reservation_v3";

export type ReservationDraft = {
  date: string;
  time: string;
  city: string;
  comment: string;
  contact: string;
  business: string;
};

export const DEFAULT_RESERVATION: ReservationDraft = {
  date: "",
  time: "",
  city: "",
  comment: "",
  contact: "",
  business: "",
};

export function buildWaMeUrl(phone: string, text: string) {
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${phone}?text=${encoded}`;
}

export function openWhatsApp(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

export function buildMessage(args: {
  lang: Lang;
  catalogTitle?: string;
  reservation: ReservationDraft;
  packageSummary?: string[];
}) {
  const { reservation: r, lang } = args;

  const hello = lang === "he" ? "היי! רוצה להזמין צילום." : "Hi! I’d like to book a shoot.";
  const thanks = lang === "he" ? "תודה!" : "Thanks!";

  const titleLine = args.catalogTitle
    ? (lang === "he" ? `קטלוג: ${args.catalogTitle}` : `Catalog: ${args.catalogTitle}`)
    : (lang === "he" ? "קטלוג: (לא נבחר)" : "Catalog: (not selected)");

  const dtParts = [
    r.date ? (lang === "he" ? `תאריך: ${r.date}` : `Date: ${r.date}`) : "",
    r.time ? (lang === "he" ? `שעה: ${r.time}` : `Time: ${r.time}`) : "",
    r.city ? (lang === "he" ? `עיר: ${r.city}` : `City: ${r.city}`) : "",
  ].filter(Boolean);

  const lines: string[] = [hello, titleLine];

  if (r.business.trim()) {
    lines.push(lang === "he" ? `עסק: ${r.business.trim()}` : `Business: ${r.business.trim()}`);
  }

  if (dtParts.length) lines.push(dtParts.join(" • "));

  if (args.packageSummary?.length) {
    lines.push("");
    lines.push(lang === "he" ? "חבילה שנבחרה:" : "Selected package:");
    for (const s of args.packageSummary) lines.push(`- ${s}`);
  }

  if (r.comment.trim()) {
    lines.push("");
    lines.push(lang === "he" ? `הערות: ${r.comment.trim()}` : `Comment: ${r.comment.trim()}`);
  }

  if (r.contact.trim()) {
    lines.push("");
    lines.push(lang === "he" ? `הקשר שלי: ${r.contact.trim()}` : `My contact: ${r.contact.trim()}`);
  }

  lines.push("", thanks);
  return lines.join("\n");
}
