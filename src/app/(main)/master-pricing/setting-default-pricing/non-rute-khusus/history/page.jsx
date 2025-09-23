"use client";

import { useRouter } from "next/navigation";

import PageTitle from "@/components/PageTitle/PageTitle";

import SettingDefaultPricingNonRuteKhususHistoryTable from "@/container/SettingDefaultPricing/SettingDefaultPricingNonRuteKhususHistoryTable";

export default function HistorySettingDefaultPricingNonRuteKhususPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <PageTitle showBackButton={true} onBackClick={router.back}>
        History Perubahan Data (Non Rute Khusus)
      </PageTitle>
      <SettingDefaultPricingNonRuteKhususHistoryTable />
    </div>
  );
}
