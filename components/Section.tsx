import type { PropsWithChildren } from "react";

export function Section(props: PropsWithChildren<{ id: string; title?: string; subtitle?: string; eyebrow?: string; centered?: boolean; className?: string }>) {
  const center = props.centered ? "text-center" : "";
  return (
    <section id={props.id} className={`scroll-mt-24 px-4 sm:px-6 lg:px-8 py-20 sm:py-28 section-gradient-overlay ${props.className ?? ""}`}>
      <div className="relative mx-auto w-full max-w-6xl">
        {props.eyebrow ? <div className={`text-[11px] tracking-[0.12em] uppercase text-white/50 font-medium ${center}`}>{props.eyebrow}</div> : null}
        {props.title ? (
          <h2 className={`mt-2.5 text-2xl sm:text-3xl lg:text-4xl font-bold text-[rgb(var(--blue))] tracking-tight leading-snug ${center}`}>{props.title}</h2>
        ) : null}
        {props.subtitle ? (
          <p className={`mt-3 text-sm sm:text-base text-white/55 leading-relaxed ${center}`}>{props.subtitle}</p>
        ) : null}
        <div className="mt-10 sm:mt-14">{props.children}</div>
      </div>
    </section>
  );
}
