"use client";

import { useRouter } from "next/navigation";

import PageTitle from "@/components/PageTitle/PageTitle";

import SettingDefaultPricingRuteKhususHistoryTable from "@/container/SettingDefaultPricing/SettingDefaultPricingRuteKhususHistoryTable";

export default function HistorySettingDefaultPricingRuteKhususPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <PageTitle showBackButton={true} onBackClick={router.back}>
        History Perubahan Data (Rute Khusus)
      </PageTitle>

      <SettingDefaultPricingRuteKhususHistoryTable />
    </div>
  );
}
