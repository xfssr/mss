"use client";

export function MessagePreview(props: { title?: string; text: string }) {
  return (
    <div className="cc-glass rounded-2xl p-4">
      <div className="text-sm font-medium text-white/90">{props.title ?? "Preview"}</div>
      <pre dir="auto" className="mt-3 whitespace-pre-wrap rounded-xl border border-white/10 bg-black/20 p-3 text-xs text-white/75">
        {props.text}
      </pre>
    </div>
  );
}
