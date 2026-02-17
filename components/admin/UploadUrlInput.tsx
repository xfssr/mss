"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";

type UploadResponse = { url: string };

function isVideoUrl(url: string) {
  const u = (url || "").toLowerCase();
  return (
    u.endsWith(".mp4") ||
    u.endsWith(".webm") ||
    u.endsWith(".mov") ||
    u.endsWith(".m4v") ||
    u.includes("video/upload") // cloudinary hint
  );
}

type Props =
  | {
      // Media mode: single input that writes to 2 form fields (previewImage/videoUrl)
      label: string;
      imageName: string;
      videoName: string;
      initialUrl?: string; // accepts both video and photo — component auto-detects
      placeholder?: string;
      accept?: string; // default image/*,video/*
    }
  | {
      // Legacy mode (keeps backward compatibility)
      name: string;
      defaultValue: string;
      label: string;
      accept: string;
      preview: "image" | "video";
      placeholder?: string;
    };

export function UploadUrlInput(props: Props) {
  const id = useId();
  const fileRef = useRef<HTMLInputElement | null>(null);

  // --- normalize props
  const mode = "imageName" in props ? "media" : "legacy";

  const initial =
    mode === "media" ? (props as { initialUrl?: string }).initialUrl ?? "" : (props as { defaultValue: string }).defaultValue;

  const [value, setValue] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const accept = mode === "media" ? (props.accept ?? "image/*,video/*") : props.accept;

  const hasPreview = value.startsWith("/") || value.startsWith("http");
  const video = mode === "media" ? isVideoUrl(value) : (props as { preview: "image" | "video" }).preview === "video";

  async function upload(file: File) {
    setBusy(true);
    setError(null);

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = (await res.json().catch(() => ({}))) as Partial<UploadResponse> & { error?: string };

      if (!res.ok) throw new Error(json.error || `Upload failed (${res.status})`);
      if (!json.url) throw new Error("Upload failed (no url)");

      setValue(json.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  // For media-mode: determine which hidden inputs to populate
  const imageVal = mode === "media" ? (video ? "" : value) : "";
  const videoVal = mode === "media" ? (video ? value : "") : "";

  return (
    <div>
      <label htmlFor={id} className="text-[11px] text-white/55">
        {props.label}
      </label>

      {/* Hidden inputs so the form action receives previewImage/videoUrl */}
      {mode === "media" ? (
        <>
          <input type="hidden" name={(props as { imageName: string }).imageName} value={imageVal} />
          <input type="hidden" name={(props as { videoName: string }).videoName} value={videoVal} />
        </>
      ) : null}

      <div className="mt-1 flex gap-2 items-center">
        <input
          id={id}
          name={"name" in props ? props.name : undefined}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={props.placeholder ?? "URL or Upload"}
          className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-[rgb(var(--blue))]"
        />

        <input
          ref={fileRef}
          type="file"
          accept={accept}
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
            {video ? (
              <video src={value} controls muted playsInline className="h-full w-full object-cover" />
            ) : (
              <Image src={value} alt="preview" fill sizes="360px" className="object-cover" />
            )}
          </div>
        </div>
      ) : null}

      <div className="mt-2 text-[11px] text-white/45">
        Upload: Cloudinary (if ENV vars are set) or locally to <span className="font-mono">public/uploads</span>.
      </div>
    </div>
  );
}
