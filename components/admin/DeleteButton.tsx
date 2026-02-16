"use client";

import { useFormStatus } from "react-dom";

export function DeleteButton({ className }: { className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      aria-label="Delete"
      disabled={pending}
      onClick={(e) => {
        if (!confirm("Are you sure you want to delete this item?")) {
          e.preventDefault();
        }
      }}
      className={
        className ??
        "rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/85 hover:bg-white/[0.10] disabled:opacity-40 disabled:pointer-events-none"
      }
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
