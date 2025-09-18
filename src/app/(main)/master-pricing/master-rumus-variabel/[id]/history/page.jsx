"use client";

import { useRouter } from "next/navigation";

import PageTitle from "@/components/PageTitle/PageTitle";
import MasterRumusVariabelTableHistory from "@/container/MasterRumusVariabel/MasterRumusVariabelTableHistory";

export default function HistoryMasterRumusVariabelPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <PageTitle showBackButton={true} onBackClick={router.back}>
        History Perubahan Data
      </PageTitle>
      
      <MasterRumusVariabelTableHistory />
    </div>
  );
}
