"use client";

export function FloatingWhatsAppButton(props: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className="fixed z-40 bottom-5 right-5 cc-glass rounded-2xl px-4 py-3 border border-white/10 hover:border-white/20 hover:bg-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--red))] flex items-center gap-2"
      aria-label="Open WhatsApp"
    >
      <span className="inline-flex h-2 w-2 rounded-full bg-[rgb(var(--red))]" aria-hidden="true" />
      <span className="text-sm text-white/85">WhatsApp</span>
    </button>
  );
}
