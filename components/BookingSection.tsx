"use client";

import { useCallback, useState } from "react";

type Lang = "he" | "en";

type AvailStatus =
  | { kind: "idle" }
  | { kind: "checking" }
  | { kind: "available" }
  | { kind: "unavailable"; reason: string; suggested?: string }
  | { kind: "error"; message: string };

type HoldStatus =
  | { kind: "idle" }
  | { kind: "holding" }
  | { kind: "held"; holdId: string; expiresAt?: string }
  | { kind: "failed"; reason: string }
  | { kind: "error"; message: string };

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

const L: Record<Lang, Record<string, string>> = {
  he: {
    sectionTitle: "בדיקת זמינות והזמנה",
    date: "תאריך",
    time: "שעה",
    city: "עיר",
    catalog: "קטלוג",
    pkg: "חבילה",
    comment: "הערות",
    checkBtn: "בדוק זמינות",
    checking: "בודק…",
    statusFree: "פנוי ✓",
    statusTaken: "תפוס",
    holdBtn: "שמור שעה ופתח WhatsApp",
    holding: "שומר…",
    calendarDown: "לא ניתן לבדוק זמינות כרגע",
    holdSuccess: "השעה נשמרה!",
    holdFailed: "לא הצלחנו לשמור — ",
    fillDateTime: "נא למלא תאריך ושעה בפורמט תקין",
  },
  en: {
    sectionTitle: "Check availability & book",
    date: "Date",
    time: "Time",
    city: "City",
    catalog: "Catalog",
    pkg: "Package",
    comment: "Comment",
    checkBtn: "Check availability",
    checking: "Checking…",
    statusFree: "Available ✓",
    statusTaken: "Taken",
    holdBtn: "Hold slot & open WhatsApp",
    holding: "Holding…",
    calendarDown: "Cannot check availability right now",
    holdSuccess: "Slot held!",
    holdFailed: "Could not hold — ",
    fillDateTime: "Please fill date and time in the correct format",
  },
};

export function BookingSection({
  lang,
  whatsappPhone,
  catalogFromUrl,
  pkgFromUrl,
}: {
  lang: Lang;
  whatsappPhone: string;
  catalogFromUrl: string;
  pkgFromUrl?: string;
}) {
  const s = L[lang];

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [city, setCity] = useState("");
  const [catalog, setCatalog] = useState(catalogFromUrl);
  const [pkg, setPkg] = useState(pkgFromUrl || "");
  const [comment, setComment] = useState("");

  const [avail, setAvail] = useState<AvailStatus>({ kind: "idle" });
  const [hold, setHold] = useState<HoldStatus>({ kind: "idle" });
  const [waUrl, setWaUrl] = useState("");

  const validInput = DATE_RE.test(date) && TIME_RE.test(time);

  /* ---------- check availability ---------- */
  const onCheck = useCallback(async () => {
    if (!validInput) {
      setAvail({ kind: "error", message: s.fillDateTime });
      return;
    }
    setAvail({ kind: "checking" });
    setHold({ kind: "idle" });

    try {
      const res = await fetch(`/api/availability?date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`);

      if (!res.ok) {
        setAvail({ kind: "error", message: s.calendarDown });
        return;
      }

      const json = await res.json();

      if (!json.ok && json.error === "calendar_unavailable") {
        setAvail({ kind: "error", message: s.calendarDown });
        return;
      }

      if (json.available) {
        setAvail({ kind: "available" });
      } else {
        setAvail({
          kind: "unavailable",
          reason: json.reason ?? s.statusTaken,
          suggested: json.suggested,
        });
      }
    } catch {
      setAvail({ kind: "error", message: s.calendarDown });
    }
  }, [date, time, validInput, s]);

  /* ---------- create hold ---------- */
  const onHold = useCallback(async () => {
    if (avail.kind !== "available") return;
    setHold({ kind: "holding" });

    try {
      const res = await fetch("/api/hold", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          catalog,
          pkg,
          city,
          date,
          time,
          lang,
          comment,
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      if (!res.ok) {
        setHold({ kind: "error", message: s.calendarDown });
        return;
      }

      const json = await res.json();

      if (!json.ok && json.error === "calendar_unavailable") {
        setHold({ kind: "error", message: s.calendarDown });
        return;
      }

      if (json.ok) {
        const holdId = json.holdId ?? "";
        setHold({ kind: "held", holdId, expiresAt: json.expiresAt });

        const lines = [
          lang === "he" ? "היי! שמרתי שעה 🗓" : "Hi! I held a slot 🗓",
          lang === "he" ? `תאריך: ${date}` : `Date: ${date}`,
          lang === "he" ? `שעה: ${time}` : `Time: ${time}`,
          city ? (lang === "he" ? `עיר: ${city}` : `City: ${city}`) : "",
          catalog ? (lang === "he" ? `קטלוג: ${catalog}` : `Catalog: ${catalog}`) : "",
          holdId ? (lang === "he" ? `מזהה הזמנה: ${holdId}` : `Booking ID: ${holdId}`) : "",
          comment ? (lang === "he" ? `הערות: ${comment}` : `Comment: ${comment}`) : "",
          "",
          lang === "he" ? "תודה!" : "Thanks!",
        ].filter(Boolean);

        const text = encodeURIComponent(lines.join("\n"));
        setWaUrl(`https://wa.me/${whatsappPhone}?text=${text}`);
      } else {
        setHold({ kind: "failed", reason: json.reason ?? "hold_failed" });
      }
    } catch {
      setHold({ kind: "error", message: s.calendarDown });
    }
  }, [avail, catalog, pkg, city, date, time, lang, comment, whatsappPhone, s]);

  /* ---------- reset availability when date/time change ---------- */
  const onDateChange = (v: string) => {
    setDate(v);
    setAvail({ kind: "idle" });
    setHold({ kind: "idle" });
  };
  const onTimeChange = (v: string) => {
    setTime(v);
    setAvail({ kind: "idle" });
    setHold({ kind: "idle" });
  };

  const inputCls =
    "mt-2 w-full rounded-xl border border-white/10 bg-black/35 px-4 py-2.5 text-base text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-[rgb(var(--blue))] focus:border-[rgb(var(--blue))]/50 transition-all";

  return (
    <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="text-sm font-medium text-white/90">{s.sectionTitle}</div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs font-medium text-white/60">{s.date}</span>
          <input type="date" dir="ltr" value={date} onChange={(e) => onDateChange(e.target.value)} className={inputCls} />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-white/60">{s.time}</span>
          <input type="time" dir="ltr" value={time} onChange={(e) => onTimeChange(e.target.value)} className={inputCls} />
        </label>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs font-medium text-white/60">{s.city}</span>
          <input value={city} onChange={(e) => setCity(e.target.value)} className={inputCls} />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-white/60">{s.catalog}</span>
          <input value={catalog} onChange={(e) => setCatalog(e.target.value)} className={inputCls} />
        </label>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs font-medium text-white/60">{s.pkg}</span>
          <input value={pkg} onChange={(e) => setPkg(e.target.value)} className={inputCls} />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-white/60">{s.comment}</span>
          <input value={comment} onChange={(e) => setComment(e.target.value)} className={inputCls} />
        </label>
      </div>

      {/* Check availability button */}
      <div className="mt-4">
        <button
          type="button"
          onClick={onCheck}
          disabled={avail.kind === "checking"}
          className="w-full rounded-xl border border-[rgb(var(--blue))]/40 bg-[rgb(var(--blue))]/20 px-5 py-3 text-sm text-white hover:bg-[rgb(var(--blue))]/30 disabled:opacity-50 transition-all"
        >
          {avail.kind === "checking" ? s.checking : s.checkBtn}
        </button>
      </div>

      {/* Availability status */}
      {avail.kind === "available" && (
        <div className="mt-3 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-2.5 text-sm text-green-300">
          {s.statusFree}
        </div>
      )}
      {avail.kind === "unavailable" && (
        <div className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
          {s.statusTaken} — {avail.reason}
          {avail.suggested && (
            <div className="mt-1 text-xs text-white/60">
              {lang === "he" ? "הצעה:" : "Suggested:"} {avail.suggested}
            </div>
          )}
        </div>
      )}
      {avail.kind === "error" && (
        <div className="mt-3 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-2.5 text-sm text-yellow-300">
          {avail.message}
        </div>
      )}

      {/* Hold & WhatsApp button */}
      {avail.kind === "available" && hold.kind !== "held" && (
        <div className="mt-3">
          <button
            type="button"
            onClick={onHold}
            disabled={hold.kind === "holding"}
            className="w-full rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-5 py-3 text-sm text-white hover:bg-[rgb(var(--red))]/30 disabled:opacity-50 transition-all"
          >
            {hold.kind === "holding" ? s.holding : s.holdBtn}
          </button>
        </div>
      )}

      {/* Hold status */}
      {hold.kind === "held" && (
        <div className="mt-3 space-y-2">
          <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-2.5 text-sm text-green-300">
            {s.holdSuccess} (ID: {hold.holdId})
          </div>
          {waUrl && (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-xl border border-green-500/40 bg-green-500/20 px-5 py-3 text-sm text-center text-white font-medium hover:bg-green-500/30 transition-all"
            >
              {lang === "he" ? "פתח WhatsApp ושלח הודעה" : "Open WhatsApp & send message"}
            </a>
          )}
        </div>
      )}
      {hold.kind === "failed" && (
        <div className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
          {s.holdFailed}{hold.reason}
        </div>
      )}
      {hold.kind === "error" && (
        <div className="mt-3 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-2.5 text-sm text-yellow-300">
          {hold.message}
        </div>
      )}
    </div>
  );
}
