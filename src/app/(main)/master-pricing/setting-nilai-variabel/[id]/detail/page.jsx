"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/Button/Button";
import PageTitle from "@/components/PageTitle/PageTitle";

import SettingNilaiVariabelDetailContainer from "@/container/SettingNilaiVariabel/SettingNilaiVariabelDetailContainer";

export default function SettingNilaiVariabelDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [data, setData] = useState(null);

  const handleBack = () => {
    router.push("/master-pricing/setting-nilai-variabel");
  };

  const handleViewHistory = () => {
    router.push(`/master-pricing/setting-nilai-variabel/${params.id}/history`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageTitle showBackButton={true} onBackClick={handleBack}>
          Detail Setting Nilai Variabel
        </PageTitle>
        <Button variant="muatparts-primary" onClick={handleViewHistory}>
          Lihat History Perubahan
        </Button>
      </div>

      <SettingNilaiVariabelDetailContainer id={params.id} onBack={handleBack} />
    </div>
  );
}
