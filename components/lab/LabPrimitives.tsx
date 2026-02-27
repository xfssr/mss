import type { PropsWithChildren } from "react";

export function Container({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Section({
  id,
  label,
  title,
  subtitle,
  children,
  className = "",
}: PropsWithChildren<{ id: string; label?: string; title?: string; subtitle?: string; className?: string }>) {
  return (
    <section id={id} className={`scroll-mt-24 py-14 sm:py-20 ${className}`}>
      <Container>
        {(label || title || subtitle) && (
          <div className="mb-8 sm:mb-10">
            {label ? <p className="lab-label">{label}</p> : null}
            {title ? <h2 className="lab-h2 mt-3">{title}</h2> : null}
            {subtitle ? <p className="lab-subtitle mt-3 max-w-3xl">{subtitle}</p> : null}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}

export function Grid({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <div className={`grid gap-4 sm:gap-6 ${className}`}>{children}</div>;
}

export function Card({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <article className={`lab-card ${className}`}>{children}</article>;
}

export function Badge({ children }: PropsWithChildren) {
  return <span className="lab-badge">{children}</span>;
}

export function Divider() {
  return <div className="h-px w-full bg-[color:var(--line)]" aria-hidden="true" />;
}

type ButtonProps = PropsWithChildren<{
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit";
}>;

export function Button({
  as = "button",
  href,
  onClick,
  variant = "primary",
  className = "",
  children,
  type = "button",
}: ButtonProps) {
  const classes = `lab-btn ${variant === "primary" ? "lab-btn-primary" : "lab-btn-secondary"} ${className}`;
  if (as === "a") {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export function Accordion({
  items,
}: {
  items: { id: string; title: string; content: string }[];
}) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.id} className="lab-card group">
          <summary className="cursor-pointer list-none px-5 py-4 text-sm font-medium text-[color:var(--text-primary)] marker:content-none sm:text-base">
            <span className="inline-flex items-center gap-3">
              <span className="text-[color:var(--accent)]">+</span>
              {item.title}
            </span>
          </summary>
          <p className="border-t border-[color:var(--line)] px-5 py-4 text-sm text-[color:var(--text-secondary)]">{item.content}</p>
        </details>
      ))}
    </div>
  );
}
