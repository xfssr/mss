"use client";

export function FloatingWhatsAppButton(props: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className="fixed z-40 bottom-5 right-5 flex rounded-2xl bg-[#FF8C42] px-5 py-3.5 hover:bg-[#E85D2A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 items-center gap-2.5 shadow-xl hover:shadow-2xl transition-all duration-200 sm:hover:-translate-y-1 group"
      aria-label="Open WhatsApp"
    >
      <span className="inline-flex h-2.5 w-2.5 rounded-full bg-white animate-pulse group-hover:animate-none" aria-hidden="true" />
      <span className="text-sm font-medium text-white group-hover:text-white">WhatsApp</span>
    </button>
  );
}
