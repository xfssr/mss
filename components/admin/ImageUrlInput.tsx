"use client";

import { UploadUrlInput } from "./UploadUrlInput";

export function ImageUrlInput(props: { name: string; defaultValue: string; label?: string; placeholder?: string }) {
  return (
    <UploadUrlInput
      label={props.label ?? "Media (image/video)"}
      imageName="previewImage"
      videoName="videoUrl"
      initialUrl={props.defaultValue ?? ""}
      placeholder={props.placeholder}
    />
  );
}
