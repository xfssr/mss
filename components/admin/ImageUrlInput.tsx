"use client";

import { UploadUrlInput } from "./UploadUrlInput";

export function ImageUrlInput(props: { name: string; defaultValue: string; label?: string; placeholder?: string }) {
  return (
    <UploadUrlInput
  label="Media (image/video)"
  imageName="previewImage"
  videoName="videoUrl"
  initialUrl={e.videoUrl || e.previewImage || ""}
/>
  );
}
