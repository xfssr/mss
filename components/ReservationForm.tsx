"use client";

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

  return (
    <div className="space-y-4">
      {props.showBusiness ? (
        <label className="block">
          <span className="text-xs text-white/55">{t(props.lang, "formBusiness")}</span>
          <input
            value={v.business}
            onChange={(e) => props.onChange({ ...v, business: e.target.value })}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-[rgb(var(--blue))]"
          />
        </label>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs text-white/55">{t(props.lang, "formDate")}</span>
          <input
            type="date"
            dir="ltr"
            value={v.date}
            onChange={(e) => props.onChange({ ...v, date: e.target.value })}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-[rgb(var(--blue))]"
          />
        </label>

        <label className="block">
          <span className="text-xs text-white/55">{t(props.lang, "formTime")}</span>
          <input
            type="time"
            dir="ltr"
            value={v.time}
            onChange={(e) => props.onChange({ ...v, time: e.target.value })}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-[rgb(var(--blue))]"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-xs text-white/55">{t(props.lang, "formCity")}</span>
        <input
          list="cities-datalist"
          value={v.city}
          onChange={(e) => props.onChange({ ...v, city: e.target.value })}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-[rgb(var(--blue))]"
        />
        <datalist id="cities-datalist">
          {CITY_SUGGESTIONS.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </label>

      <label className="block">
        <span className="text-xs text-white/55">{t(props.lang, "formComment")}</span>
        <textarea
          value={v.comment}
          onChange={(e) => props.onChange({ ...v, comment: e.target.value })}
          rows={3}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-[rgb(var(--blue))] resize-none"
        />
      </label>

      <label className="block">
        <span className="text-xs text-white/55">{t(props.lang, "formContact")}</span>
        <input
          value={v.contact}
          onChange={(e) => props.onChange({ ...v, contact: e.target.value })}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-[rgb(var(--blue))]"
        />
      </label>

      {props.softErrors.comment ? <div className="text-xs text-[rgb(var(--red))]">{props.softErrors.comment}</div> : null}
      <div className="text-xs text-white/45">{t(props.lang, "reserveSubtitle")}</div>
    </div>
  );
}
