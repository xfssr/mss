import { NextResponse } from "next/server";
import { checkAvailability } from "@/lib/calendarGateway";

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

  const durationMinutes = Number(process.env.BOOKING_DURATION_MIN) || 120;
  const bufferMinutes = Number(process.env.BOOKING_BUFFER_MIN) || 30;
  const maxBookingsPerDay = Number(process.env.BOOKING_MAX_PER_DAY) || 1;

  try {
    const result = await checkAvailability({
      date,
      time,
      durationMinutes,
      bufferMinutes,
      maxBookingsPerDay,
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
