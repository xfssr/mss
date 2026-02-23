import type { PropsWithChildren } from "react";

export function Section(props: PropsWithChildren<{ id: string; title?: string; eyebrow?: string; className?: string }>) {
  return (
    <section id={props.id} className={`scroll-mt-24 px-4 sm:px-6 lg:px-8 py-24 sm:py-32 section-gradient-overlay ${props.className ?? ""}`}>
      <div className="relative mx-auto w-full max-w-6xl">
        {props.eyebrow ? <div className="text-xs tracking-[0.2em] uppercase text-[#B9B5AC] font-medium">{props.eyebrow}</div> : null}
        {props.title ? (
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#C6A75E] tracking-wide font-serif">{props.title}</h2>
        ) : null}
        <div className="mt-12 sm:mt-14">{props.children}</div>
      </div>
    </section>
  );
}
