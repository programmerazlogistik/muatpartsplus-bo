"use client";

import { useRouter } from "next/navigation";

import PageTitle from "@/components/PageTitle/PageTitle";

import SettingDefaultPricingNonRuteKhususHistoryDetail from "@/container/SettingDefaultPricing/SettingDefaultPricingNonRuteKhususHistoryDetail";

export default function DetailPerubahanDataNonRuteKhususPage() {
  const router = useRouter();

  return (
    <div className="space-y-5">
      <PageTitle showBackButton={true} onBackClick={router.back}>
        Detail Perubahan Data (Non Rute Khusus)
      </PageTitle>

      <SettingDefaultPricingNonRuteKhususHistoryDetail />
    </div>
  );
}
