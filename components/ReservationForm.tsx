"use client";

import { useMemo } from "react";
import type { Lang } from "@/utils/i18n";
import { t } from "@/utils/i18n";
import type { ReservationDraft } from "@/utils/whatsapp";

const CITY_SUGGESTIONS = ["Tel Aviv", "Jerusalem", "Haifa", "Eilat", "Netanya", "Rishon LeZion", "Beer Sheva"];

export function ReservationForm(props: {
  lang: Lang;
  value: ReservationDraft;
  onChange: (next: ReservationDraft) => void;
  softErrors: Partial<Record<keyof ReservationDraft, string>>;
  showBusiness?: boolean;
}) {
  const v = props.value;
  const lang = props.lang;
  const goalOptions = useMemo(() => [
    { value: "", label: lang === "he" ? "— בחר/י —" : "— Select —" },
    { value: t(lang, "goalReels"), label: t(lang, "goalReels") },
    { value: t(lang, "goalPhotos"), label: t(lang, "goalPhotos") },
    { value: t(lang, "goalBoth"), label: t(lang, "goalBoth") },
  ], [lang]);

  return (
    <div className="space-y-4">
      {props.showBusiness ? (
        <label className="block">
          <span className="text-xs font-medium text-white/60">{t(props.lang, "formBusiness")}</span>
          <input
            value={v.business}
            onChange={(e) => props.onChange({ ...v, business: e.target.value })}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/35 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-[rgb(var(--blue))] focus:border-[rgb(var(--blue))]/50 transition-all"
          />
        </label>
      ) : null}

      <label className="block">
        <span className="text-xs font-medium text-white/60">{t(props.lang, "formGoal")}</span>
        <select
          value={v.goal}
          onChange={(e) => props.onChange({ ...v, goal: e.target.value })}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/35 px-4 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-[rgb(var(--blue))] focus:border-[rgb(var(--blue))]/50 transition-all"
        >
          {goalOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs font-medium text-white/60">{t(props.lang, "formDate")}</span>
          <input
            type="date"
            dir="ltr"
            value={v.date}
            onChange={(e) => props.onChange({ ...v, date: e.target.value })}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/35 px-4 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-[rgb(var(--blue))] focus:border-[rgb(var(--blue))]/50 transition-all"
          />
        </label>

        <label className="block">
          <span className="text-xs font-medium text-white/60">{t(props.lang, "formTime")}</span>
          <input
            type="time"
            dir="ltr"
            value={v.time}
            onChange={(e) => props.onChange({ ...v, time: e.target.value })}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/35 px-4 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-[rgb(var(--blue))] focus:border-[rgb(var(--blue))]/50 transition-all"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-xs font-medium text-white/60">{t(props.lang, "formCity")}</span>
        <input
          list="cities-datalist"
          value={v.city}
          onChange={(e) => props.onChange({ ...v, city: e.target.value })}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/35 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-[rgb(var(--blue))] focus:border-[rgb(var(--blue))]/50 transition-all"
        />
        <datalist id="cities-datalist">
          {CITY_SUGGESTIONS.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </label>

      <label className="block">
        <span className="text-xs font-medium text-white/60">{t(props.lang, "formComment")}</span>
        <textarea
          value={v.comment}
          onChange={(e) => props.onChange({ ...v, comment: e.target.value })}
          rows={3}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/35 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-[rgb(var(--blue))] focus:border-[rgb(var(--blue))]/50 resize-none transition-all"
        />
      </label>

      <label className="block">
        <span className="text-xs font-medium text-white/60">{t(props.lang, "formContact")}</span>
        <input
          value={v.contact}
          onChange={(e) => props.onChange({ ...v, contact: e.target.value })}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/35 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-[rgb(var(--blue))] focus:border-[rgb(var(--blue))]/50 transition-all"
        />
      </label>

      {props.softErrors.comment ? <div className="text-xs text-[rgb(var(--red))] font-medium">{props.softErrors.comment}</div> : null}
      <div className="text-xs text-white/50">{t(props.lang, "reserveSubtitle")}</div>
    </div>
  );
}
