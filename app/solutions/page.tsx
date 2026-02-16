import { Suspense } from "react";
import { getActiveSolutions } from "@/lib/solutionsStore";
import { SolutionsClient } from "./SolutionsClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SolutionsPage() {
  const solutions = await getActiveSolutions();

  return (
    <Suspense fallback={null}>
      <SolutionsClient solutions={solutions} />
    </Suspense>
  );
}
