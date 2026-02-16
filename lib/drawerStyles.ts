/**
 * Shared drawer/modal shell styles for BookingDrawer and all modals.
 * Ensures visual consistency (glassmorphism, backdrop, border, radius)
 * regardless of entry point (homepage packages, solutions, category modals).
 */

/** Backdrop overlay behind all drawers/modals */
export const DRAWER_BACKDROP_CLASS =
  "absolute inset-0 bg-black/75 sm:bg-black/65 backdrop-blur-[1px] sm:backdrop-blur-sm";

/** Panel shell: bottom-sheet on mobile, centered modal on desktop */
export const DRAWER_PANEL_CLASS =
  "relative w-full sm:max-w-lg overflow-hidden border border-white/12 shadow-2xl rounded-t-2xl sm:rounded-2xl bg-white/[0.06] backdrop-blur-xl flex flex-col max-h-[90dvh] sm:max-h-[calc(100dvh-8rem)]";

/** Header area inside the panel */
export const DRAWER_HEADER_CLASS =
  "shrink-0 px-4 sm:px-6 pt-4 sm:pt-5 pb-3 border-b border-white/10 bg-white/[0.03] backdrop-blur";

/** Footer CTA area inside the panel */
export const DRAWER_FOOTER_CLASS =
  "shrink-0 border-t border-white/10 bg-white/[0.03] backdrop-blur px-4 sm:px-6 pt-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] space-y-2";
