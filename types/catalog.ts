import type { L10n } from "./l10n";

export type CatalogExample = {
  title: L10n;
  previewImage: string;
  videoUrl?: string;
  description?: L10n;
  link?: string;
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
