import type { PropsWithChildren } from "react";

export function Section(props: PropsWithChildren<{ id: string; title?: string; eyebrow?: string }>) {
  return (
    <section id={props.id} className="scroll-mt-24 px-4 sm:px-6 lg:px-8 py-16">
      <div className="mx-auto w-full max-w-6xl">
        {props.eyebrow ? <div className="text-xs tracking-wide uppercase text-white/50">{props.eyebrow}</div> : null}
        {props.title ? (
          <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-[rgb(var(--blue))]">{props.title}</h2>
        ) : null}
        <div className="mt-8">{props.children}</div>
      </div>
    </section>
  );
}
