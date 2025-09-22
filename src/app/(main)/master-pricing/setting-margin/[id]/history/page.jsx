"use client";

import { useRouter } from "next/navigation";

import PageTitle from "@/components/PageTitle/PageTitle";

import SettingMarginTableHistory from "@/container/SettingMargin/SettingMarginTableHistory";

export default function SettingMarginHistoryPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <PageTitle showBackButton={true} onBackClick={router.back}>
        History Perubahan Data
      </PageTitle>
      <SettingMarginTableHistory />
    </div>
  );
}
