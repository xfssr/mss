import type { L10n } from "@/types/l10n";

export type CategoryDetailFaq = { q: L10n; a: L10n };

export type CategoryDetailPricingTier = {
  label: string;
  range: L10n;
};

export type CategoryDetailProcessStep = {
  title: L10n;
};

export type CategoryDetailSocialProof = {
  title: L10n;
};

export type CategoryDetail = {
  slug: string;
  label: L10n;
  pills: L10n[];
  whatYouGet: L10n[];
  bestFor: L10n;
  process: CategoryDetailProcessStep[];
  pricingTiers: CategoryDetailPricingTier[];
  pricingNote: L10n;
  whyThisWorks: L10n[];
  faq: CategoryDetailFaq[];
  socialProof: CategoryDetailSocialProof[];
  ctaPrimary: L10n;
  ctaSecondary: L10n;
  whatsappTemplatePrimary: L10n;
  whatsappTemplateSecondary: L10n;
};

export const DEFAULT_CATEGORY_DETAILS: CategoryDetail[] = [];
