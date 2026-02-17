import type { Metadata } from "next";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { getActiveSolutions } from "@/lib/solutionsStore";
import { getDiscountConfig } from "@/lib/catalogOverridesStore";
import { dbPricingToUi } from "@/lib/mappers";
import { getSiteUrl } from "@/config/constants";
import { SolutionsClient } from "./SolutionsClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  alternates: {
    canonical: `${getSiteUrl()}/solutions`,
  },
};

export default async function SolutionsPage() {
  const solutions = await getActiveSolutions();

  const pricing = await prisma.pricingConfig.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, currency: "₪" },
  });

  const discountConfig = await getDiscountConfig();

  return (
    <Suspense fallback={null}>
      <SolutionsClient
        solutions={solutions}
        pricing={dbPricingToUi(pricing)}
        discountConfig={discountConfig}
      />
    </Suspense>
  );
}
