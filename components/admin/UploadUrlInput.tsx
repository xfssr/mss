"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";

type Props = {
  name: string;
  defaultValue: string;
  label: string;
  accept: string;
  preview: "image" | "video";
  placeholder?: string;
};

type UploadResponse = { url: string };

export function UploadUrlInput(props: Props) {
  const id = useId();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [value, setValue] = useState(props.defaultValue ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setBusy(true);
    setError(null);

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = (await res.json().catch(() => ({}))) as Partial<UploadResponse> & { error?: string };

      if (!res.ok) {
        throw new Error(json.error || `Upload failed (${res.status})`);
      }
      if (!json.url) throw new Error("Upload failed (no url)");

      setValue(json.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  const hasPreview = value.startsWith("/") || value.startsWith("http");

  return (
    <div>
      <label htmlFor={id} className="text-[11px] text-white/55">
        {props.label}
      </label>

      <div className="mt-1 flex gap-2 items-center">
        <input
          id={id}
          name={props.name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={props.placeholder ?? "URL или Upload"}
          className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-[rgb(var(--blue))]"
        />

        <input
          ref={fileRef}
          type="file"
          accept={props.accept}
          className="hidden"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            await upload(f);
            e.target.value = "";
          }}
        />

        <button
          type="button"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
          className="shrink-0 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white/85 hover:bg-white/[0.10] hover:border-white/20 disabled:opacity-60"
        >
          {busy ? "..." : "Upload"}
        </button>
      </div>

      {error ? <div className="mt-2 text-xs text-[rgb(var(--red))]">{error}</div> : null}

      {hasPreview ? (
        <div className="mt-2 overflow-hidden rounded-xl border border-white/10 bg-black/20">
          <div className="relative aspect-[16/9]">
            {props.preview === "image" ? (
              <Image src={value} alt="preview" fill sizes="360px" className="object-cover" />
            ) : (
              <video src={value} controls muted playsInline className="h-full w-full object-cover" />
            )}
          </div>
        </div>
      ) : null}

      <div className="mt-2 text-[11px] text-white/45">
        Upload: Cloudinary (если ENV заданы) или локально в <span className="font-mono">public/uploads</span>.
      </div>
    </div>
  );
}
