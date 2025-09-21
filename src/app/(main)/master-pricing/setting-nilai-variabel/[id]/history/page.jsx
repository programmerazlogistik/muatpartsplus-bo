"use client";

import { useParams, useRouter } from "next/navigation";

import PageTitle from "@/components/PageTitle/PageTitle";

import SettingNilaiVariabelHistoryTable from "@/container/SettingNilaiVariabel/SettingNilaiVariabelHistoryTable";

export default function SettingNilaiVariabelHistoryPage() {
  const router = useRouter();
  const params = useParams();

  const handleBack = () => {
    router.push(`/master-pricing/setting-nilai-variabel/${params.id}/detail`);
  };

  return (
    <div className="space-y-6">
      <PageTitle showBackButton={true} onBackClick={handleBack}>
        History Perubahan Data Setting Nilai Variabel
      </PageTitle>

      <SettingNilaiVariabelHistoryTable />
    </div>
  );
}
