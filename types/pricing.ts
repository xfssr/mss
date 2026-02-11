export type PricingConfig = {
  currency: string;
  duration2h: number;
  duration4h: number;
  duration8h: number;
  durationDay: number;
  durationWeek: number;

  perReel: number;
  perPhoto: number;

  monthlyStarter: number;
  monthlyGrowth: number;
  monthlyPro: number;

  socialManagement: number;
  targetingSetup: number;
};
