// components/Logo.tsx
"use client";

type LogoVariant = "lockup" | "mark";

export function Logo(props: { variant?: LogoVariant; className?: string }) {
  const variant = props.variant ?? "lockup";
if (variant === "mark") {
    return (
      <span
        dir="ltr"
        className={["font-semibold tracking-tight text-white/95", props.className ?? ""].join(" ")}
        aria-label="Micro-Screen Studio"
      >
        MSS
      </span>
    );
  }

  return (
    <span
      dir="ltr"
      className={["inline-flex min-w-0 select-none", props.className ?? ""].join(" ")}
      aria-label="Micro-Screen Studio"
    >
      {/* MOBILE: 1 line, never wraps (truncate if too tight) */}
      <span className="sm:hidden inline-flex items-center gap-2 min-w-0">
        <span className="text-base font-semibold tracking-tight text-white/95 whitespace-nowrap overflow-hidden text-ellipsis">
          Micro-Screen Studio
        </span>
        <span className="h-2.5 w-2.5 rounded-full bg-[rgb(var(--accent))] flex-none" aria-hidden="true" />
      </span>

      {/* DESKTOP: 2 lines like your reference */}
      <span className="hidden sm:inline-flex sm:flex-col items-start leading-none">
        <span className="inline-flex items-center gap-2">
          <span className="text-2xl font-semibold tracking-tight text-white/95">Micro-Screen</span>
          <span className="h-2.5 w-2.5 rounded-full bg-[rgb(var(--accent))]" aria-hidden="true" />
        </span>
        <span className="mt-2 text-xs uppercase tracking-[0.42em] text-white/65">STUDIO</span>
      </span>
    </span>
  );
}
