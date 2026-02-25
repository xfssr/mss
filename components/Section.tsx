import type { PropsWithChildren } from "react";

export function Section(props: PropsWithChildren<{ id: string; title?: string; subtitle?: string; eyebrow?: string; centered?: boolean; className?: string }>) {
  const center = props.centered ? "text-center" : "";
  return (
    <section id={props.id} className={`scroll-mt-24 px-4 sm:px-6 lg:px-8 py-20 sm:py-28 section-gradient-overlay section-glow ${props.className ?? ""}`}>
      <div className="relative mx-auto w-full max-w-6xl">
        {props.eyebrow ? <div className={`text-xs tracking-wider uppercase text-white/55 font-medium ${center}`}>{props.eyebrow}</div> : null}
        {props.title ? (
          <>
            <div className={`diamond-ornament mt-2 mb-3 ${center ? "justify-center" : ""}`}>
              <span className="diamond-ornament-gem" />
            </div>
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-gold-gradient tracking-tight ${center}`}>{props.title}</h2>
          </>
        ) : null}
        {props.subtitle ? (
          <p className={`mt-3 text-sm sm:text-base text-white/60 ${center}`}>{props.subtitle}</p>
        ) : null}
        <div className="mt-10 sm:mt-12">{props.children}</div>
      </div>
    </section>
  );
}
