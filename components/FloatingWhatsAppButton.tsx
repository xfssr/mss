"use client";

export function FloatingWhatsAppButton(props: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className="fixed z-40 bottom-5 right-5 flex cc-glass rounded-2xl px-5 py-3.5 border border-white/10 hover:border-[rgb(var(--red))]/40 hover:bg-[rgb(var(--red))]/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--red))] focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 items-center gap-2.5 shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-y-1 group"
      aria-label="Open WhatsApp"
    >
      <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[rgb(var(--red))] animate-pulse group-hover:animate-none" aria-hidden="true" />
      <span className="text-sm font-medium text-white/90 group-hover:text-white">WhatsApp</span>
    </button>
  );
}
