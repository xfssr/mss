import { NextResponse } from "next/server";
import { checkAvailability } from "@/lib/calendarGateway";
import { BOOKING_DEFAULTS } from "@/lib/bookingConfig";

export const runtime = "nodejs";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date") ?? "";
  const time = searchParams.get("time") ?? "";

  if (!DATE_RE.test(date) || !TIME_RE.test(time)) {
    return NextResponse.json(
      { ok: false, error: "invalid_params", message: "date (YYYY-MM-DD) and time (HH:MM) are required" },
      { status: 400 },
    );
  }

  try {
    const result = await checkAvailability({
      date,
      time,
      ...BOOKING_DEFAULTS,
    });

    return NextResponse.json({
      ok: true,
      available: result.available,
      reason: result.reason,
      suggested: result.suggested,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "calendar_unavailable" },
      { status: 503 },
    );
  }
}
