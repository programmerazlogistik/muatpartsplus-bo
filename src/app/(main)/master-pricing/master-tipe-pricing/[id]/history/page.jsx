"use client";
import { useRouter } from "next/navigation";

import PageTitle from "@/components/PageTitle/PageTitle";
import MasterTipePricingTableHistory from "@/container/MasterTipePricing/MasterTipePricingTableHistory";

export default function HistoryMasterTipePricingPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <PageTitle showBackButton={true} onBackClick={router.back}>
        History Perubahan Data
      </PageTitle>
      
      <MasterTipePricingTableHistory />
    </div>
  );
}
