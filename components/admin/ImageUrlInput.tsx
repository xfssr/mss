"use client";

import { UploadUrlInput } from "./UploadUrlInput";

export function ImageUrlInput(props: { name: string; defaultValue: string; label?: string; placeholder?: string }) {
  return (
    <UploadUrlInput
      name={props.name}
      defaultValue={props.defaultValue}
      label={props.label ?? "image"}
      placeholder={props.placeholder}
      accept="image/png,image/jpeg,image/webp,image/gif"
      preview="image"
    />
  );
}
