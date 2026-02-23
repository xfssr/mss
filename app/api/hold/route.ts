import { NextResponse } from "next/server";
import { checkAvailability, createHold } from "@/lib/calendarGateway";
import { BOOKING_DEFAULTS } from "@/lib/bookingConfig";

export const runtime = "nodejs";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  const catalog = String(body.catalog ?? "");
  const pkg = String(body.pkg ?? "");
  const city = String(body.city ?? "");
  const date = String(body.date ?? "");
  const time = String(body.time ?? "");
  const lang = String(body.lang ?? "he");
  const comment = String(body.comment ?? "");
  const pageUrl = String(body.pageUrl ?? "");

  if (!DATE_RE.test(date) || !TIME_RE.test(time)) {
    return NextResponse.json(
      { ok: false, error: "invalid_params", message: "date (YYYY-MM-DD) and time (HH:MM) are required" },
      { status: 400 },
    );
  }

  try {
    // Server-side availability recheck
    const avail = await checkAvailability({
      date,
      time,
      ...BOOKING_DEFAULTS,
    });

    if (!avail.available) {
      return NextResponse.json({
        ok: false,
        reason: avail.reason ?? "slot_taken",
        suggested: avail.suggested,
      });
    }

    // Create hold
    const hold = await createHold({
      catalog,
      pkg,
      city,
      date,
      time,
      durationMinutes: BOOKING_DEFAULTS.durationMinutes,
      bufferMinutes: BOOKING_DEFAULTS.bufferMinutes,
      lang,
      comment,
      pageUrl,
    });

    if (!hold.okHold) {
      return NextResponse.json({
        ok: false,
        reason: hold.reason ?? "hold_failed",
      });
    }

    return NextResponse.json({
      ok: true,
      holdId: hold.holdId,
      expiresAt: hold.expiresAt,
    });
  } catch (err) {
    console.error("[hold] calendar error:", err);
    return NextResponse.json(
      { ok: false, error: "calendar_unavailable" },
      { status: 503 },
    );
  }
}
