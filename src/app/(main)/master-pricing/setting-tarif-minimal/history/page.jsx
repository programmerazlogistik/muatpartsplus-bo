"use client";
import { useRouter } from "next/navigation";

import PageTitle from "@/components/PageTitle/PageTitle";
import SettingTarifMinimalTableHistory from "@/container/SettingTarifMinimal/SettingTarifMinimalTableHistory";

export default function SettingTarifMinimalHistoryPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/master-pricing/setting-tarif-minimal");
  };

  return (
    <div className="space-y-6">
      <PageTitle showBackButton={true} onBackClick={handleBack}>
        History Perubahan Data
      </PageTitle>

      <SettingTarifMinimalTableHistory />
    </div>
  );
}
