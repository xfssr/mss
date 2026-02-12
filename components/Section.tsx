import type { PropsWithChildren } from "react";

export function Section(props: PropsWithChildren<{ id: string; title?: string; eyebrow?: string }>) {
  return (
    <section id={props.id} className="scroll-mt-24 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl">
        {props.eyebrow ? <div className="text-xs tracking-wider uppercase text-white/55 font-medium">{props.eyebrow}</div> : null}
        {props.title ? (
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-[rgb(var(--blue))] tracking-tight">{props.title}</h2>
        ) : null}
        <div className="mt-8 sm:mt-10">{props.children}</div>
      </div>
    </section>
  );
}
