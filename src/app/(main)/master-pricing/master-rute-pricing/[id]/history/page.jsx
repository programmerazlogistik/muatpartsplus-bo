"use client";

import { useRouter } from "next/navigation";

import PageTitle from "@/components/PageTitle/PageTitle";
import MasterRutePricingTableHistory from "@/container/MasterRutePricing/MasterRutePricingTableHistory";

export default function HistoryMasterRutePricingPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <PageTitle showBackButton={true} onBackClick={router.back}>
        History Perubahan Data
      </PageTitle>
      
      <MasterRutePricingTableHistory />
    </div>
  );
}
