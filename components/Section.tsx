import type { PropsWithChildren } from "react";

export function Section(props: PropsWithChildren<{ id: string; title?: string; eyebrow?: string; className?: string }>) {
  return (
    <section id={props.id} className={`scroll-mt-24 px-4 sm:px-6 lg:px-8 py-24 sm:py-32 section-gradient-overlay ${props.className ?? ""}`}>
      <div className="relative mx-auto w-full max-w-6xl">
        {props.eyebrow ? <div className="text-xs tracking-wider uppercase text-[rgb(var(--gold))]/70 font-medium">{props.eyebrow}</div> : null}
        {props.title ? (
          <h2 className="mt-2 font-bold text-[rgb(var(--accent))] tracking-wide">{props.title}</h2>
        ) : null}
        <div className="mt-10 sm:mt-14">{props.children}</div>
      </div>
    </section>
  );
}
