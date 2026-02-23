/**
 * Calendar webhook gateway.
 *
 * Calls the deployed Google Apps Script calendar webhook
 * (CALENDAR_WEBHOOK_URL + token=CALENDAR_AUTH_TOKEN).
 *
 * Fail-closed: any network / timeout / non-2xx error throws.
 */

const TIMEOUT_MS = 7_000; // 7 seconds

function getConfig() {
  const url = process.env.CALENDAR_WEBHOOK_URL;
  const token = process.env.CALENDAR_AUTH_TOKEN;
  if (!url || !token) {
    throw new Error("CALENDAR_WEBHOOK_URL or CALENDAR_AUTH_TOKEN is not configured");
  }
  return { url, token };
}

/* ------------------------------------------------------------------ */
/*  checkAvailability                                                  */
/* ------------------------------------------------------------------ */

export type AvailabilityParams = {
  date: string;          // YYYY-MM-DD
  time: string;          // HH:MM
  durationMinutes: number;
  bufferMinutes: number;
  maxBookingsPerDay: number;
};

export type AvailabilityResult = {
  available: boolean;
  reason?: string;
  suggested?: string;
};

export async function checkAvailability(
  params: AvailabilityParams,
): Promise<AvailabilityResult> {
  const { url, token } = getConfig();

  const qs = new URLSearchParams({
    token,
    action: "availability",
    date: params.date,
    time: params.time,
    durationMinutes: String(params.durationMinutes),
    bufferMinutes: String(params.bufferMinutes),
    maxBookingsPerDay: String(params.maxBookingsPerDay),
  });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${url}?${qs.toString()}`, {
      method: "GET",
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`Calendar webhook returned ${res.status}`);
    }

    const data = (await res.json()) as AvailabilityResult;
    return {
      available: Boolean(data.available),
      reason: data.reason,
      suggested: data.suggested,
    };
  } finally {
    clearTimeout(timer);
  }
}

/* ------------------------------------------------------------------ */
/*  createHold                                                         */
/* ------------------------------------------------------------------ */

export type HoldParams = {
  catalog: string;
  pkg: string;
  city: string;
  date: string;          // YYYY-MM-DD
  time: string;          // HH:MM
  durationMinutes: number;
  bufferMinutes: number;
  lang: string;
  comment: string;
  pageUrl: string;
};

export type HoldResult = {
  okHold: boolean;
  holdId?: string;
  expiresAt?: string;
  reason?: string;
};

export async function createHold(
  params: HoldParams,
): Promise<HoldResult> {
  const { url, token } = getConfig();

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        token,
        action: "hold",
        ...params,
      }),
    });

    if (!res.ok) {
      throw new Error(`Calendar webhook returned ${res.status}`);
    }

    const data = (await res.json()) as HoldResult;
    return {
      okHold: Boolean(data.okHold),
      holdId: data.holdId,
      expiresAt: data.expiresAt,
      reason: data.reason,
    };
  } finally {
    clearTimeout(timer);
  }
}
