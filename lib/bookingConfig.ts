/** Shared booking configuration derived from environment variables. */

export const BOOKING_DEFAULTS = {
  durationMinutes: Number(process.env.BOOKING_DURATION_MIN) || 120,
  bufferMinutes: Number(process.env.BOOKING_BUFFER_MIN) || 30,
  maxBookingsPerDay: Number(process.env.BOOKING_MAX_PER_DAY) || 1,
} as const;
