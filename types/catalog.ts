import type { L10n } from "./l10n";

// types/catalog.ts
export type MediaType = "IMAGE" | "VIDEO";

export type CatalogExample = {
  id: number;
  order: number;
  title: Record<"he" | "en", string>;
  description: Record<"he" | "en", string>;
  mediaType: MediaType;
  mediaUrl: string;
  posterUrl?: string | null;
  link?: string | null;
};

export type Catalog = {
  slug: string;
  title: L10n;
  shortDescription: L10n;
  longDescription: L10n;

  coverImage?: string;

  promoVideoUrl?: string;
  promoVideoTitle?: L10n;
  promoVideoDescription?: L10n;

  tags: string[];
  popular?: boolean;
  examples: CatalogExample[];
};
