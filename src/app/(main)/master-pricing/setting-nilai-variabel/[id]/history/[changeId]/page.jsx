"use client";

import { useParams, useRouter } from "next/navigation";

import PageTitle from "@/components/PageTitle/PageTitle";

import SettingNilaiVariabelDetailChangeContainer from "@/container/SettingNilaiVariabel/SettingNilaiVariabelDetailChangeContainer";

export default function SettingNilaiVariabelDetailChangePage() {
  const router = useRouter();
  const params = useParams();

  const handleBack = () => {
    router.push(`/master-pricing/setting-nilai-variabel/${params.id}/history`);
  };

  return (
    <div className="space-y-6">
      <PageTitle showBackButton={true} onBackClick={handleBack}>
        Detail Perubahan Data (Non Rute Khusus)
      </PageTitle>

      <SettingNilaiVariabelDetailChangeContainer
        id={params.changeId}
        onBack={handleBack}
      />
    </div>
  );
}
