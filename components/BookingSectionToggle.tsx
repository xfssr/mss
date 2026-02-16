"use client";

import { useState } from "react";
import { BookingSection } from "@/components/BookingSection";

type Lang = "he" | "en";

export function BookingSectionToggle(props: {
  lang: Lang;
  whatsappPhone: string;
  catalogFromUrl: string;
  pkgFromUrl?: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="mt-4">
      {!show && (
        <button
          type="button"
          onClick={() => setShow(true)}
          className="text-xs text-white/40 underline hover:text-white/60 transition-colors"
        >
          {props.lang === "he" ? "בדיקת זמינות (לטופס מלא)" : "Check availability (full form)"}
        </button>
      )}
      {show && (
        <BookingSection
          lang={props.lang}
          whatsappPhone={props.whatsappPhone}
          catalogFromUrl={props.catalogFromUrl}
          pkgFromUrl={props.pkgFromUrl}
        />
      )}
    </div>
  );
}
