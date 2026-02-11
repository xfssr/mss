import type { L10n } from "./l10n";

export type PriceItem = {
  id: number;
  title: L10n;
  price: string;
  note: L10n;
  details: L10n;
};
