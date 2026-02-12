"use client";

export function MessagePreview(props: { title?: string; text: string }) {
  return (
    <div className="cc-glass rounded-2xl p-5 shadow-lg">
      <div className="text-sm font-semibold text-white/95">{props.title ?? "Preview"}</div>
      <pre dir="auto" className="mt-4 whitespace-pre-wrap rounded-xl border border-white/10 bg-black/30 p-4 text-xs text-white/85 leading-relaxed shadow-inner">
        {props.text}
      </pre>
    </div>
  );
}
