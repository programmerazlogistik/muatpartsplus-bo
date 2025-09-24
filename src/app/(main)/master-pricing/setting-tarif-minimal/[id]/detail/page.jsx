"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";

import Button from "@/components/Button/Button";
import SettingTarifMinimalForm from "@/container/SettingTarifMinimal/SettingTarifMinimalForm";
import PageTitle from "@/components/PageTitle/PageTitle";
import { useGetMinRateHistoryDetailForDetail } from "@/services/masterpricing/settingMinimumRate/getMinRateHistoryDetail";

export default function SettingTarifMinimalDetailPage() {
  const router = useRouter();
  const params = useParams();
  const historyId = params.id;

  // Get history detail from API
  const { data: historyDetail, error, isLoading } = useGetMinRateHistoryDetailForDetail(historyId);

  // Memoize form data to prevent unnecessary re-renders
  const formData = useMemo(() => {
    if (!historyDetail) {
      return {
        "550e8400-e29b-41d4-a716-446655440201": "",
        "550e8400-e29b-41d4-a716-446655440202": "",
        "550e8400-e29b-41d4-a716-446655440203": "",
        "550e8400-e29b-41d4-a716-446655440204": "",
        "550e8400-e29b-41d4-a716-446655440205": "",
        "550e8400-e29b-41d4-a716-446655440206": "",
        "550e8400-e29b-41d4-a716-446655440207": "",
        "550e8400-e29b-41d4-a716-446655440208": "",
        effectiveDate: null
      };
    }

    console.log("History Detail Data:", historyDetail);
    console.log("After State:", historyDetail.history?.afterState);
    console.log("Valid From:", historyDetail.history?.changes?.validFrom);
    
    // Create a map from afterState array using truckTypeId as key
    const afterStateMap = {};
    if (historyDetail.history?.afterState) {
      historyDetail.history.afterState.forEach(item => {
        afterStateMap[item.truckTypeId] = item.minDistance;
      });
    }
    
    // Map afterState data to form keys (UUIDs from truck types)
    const newFormData = {
      "550e8400-e29b-41d4-a716-446655440201": afterStateMap["550e8400-e29b-41d4-a716-446655440201"] || "", // Colt Diesel Engkel
      "550e8400-e29b-41d4-a716-446655440202": afterStateMap["550e8400-e29b-41d4-a716-446655440202"] || "", // Colt Diesel Double
      "550e8400-e29b-41d4-a716-446655440203": afterStateMap["550e8400-e29b-41d4-a716-446655440203"] || "", // Medium Truk 4 x 2 (Rigid)
      "550e8400-e29b-41d4-a716-446655440204": afterStateMap["550e8400-e29b-41d4-a716-446655440204"] || "", // Medium Truck 4 x 2 + Gandengan
      "550e8400-e29b-41d4-a716-446655440205": afterStateMap["550e8400-e29b-41d4-a716-446655440205"] || "", // Medium Truck 6 x 2 (Rigid)
      "550e8400-e29b-41d4-a716-446655440206": afterStateMap["550e8400-e29b-41d4-a716-446655440206"] || "", // Medium Truck 6 x 4
      "550e8400-e29b-41d4-a716-446655440207": afterStateMap["550e8400-e29b-41d4-a716-446655440207"] || "", // Tractor Head 4 x 2
      "550e8400-e29b-41d4-a716-446655440208": afterStateMap["550e8400-e29b-41d4-a716-446655440208"] || "", // Tractor Head 6 x 4
      effectiveDate: historyDetail.history?.changes?.validFrom ? new Date(historyDetail.history.changes.validFrom) : null
    };
    
    console.log("New Form Data:", newFormData);
    return newFormData;
  }, [historyDetail]);

  const handleBackClick = () => {
    router.push("/master-pricing/setting-tarif-minimal/history");
  };

  const handleViewHistory = () => {
    router.push("/master-pricing/setting-tarif-minimal/history");
  };

  // Show loading state
  if (isLoading) {
    return (
      <>
        <div className="flex justify-between mb-6">
          <PageTitle showBackButton={true} onBackClick={handleBackClick}>
            Detail Perubahan Data
          </PageTitle>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">Memuat data...</div>
        </div>
      </>
    );
  }

  // Show error state
  if (error) {
    return (
      <>
        <div className="flex justify-between mb-6">
          <PageTitle showBackButton={true} onBackClick={handleBackClick}>
            Detail Perubahan Data
          </PageTitle>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-red-500">Gagal memuat data. Silakan coba lagi.</div>
        </div>
      </>
    );
  }

  // Show not found state
  if (!historyDetail) {
    return (
      <>
        <div className="flex justify-between mb-6">
          <PageTitle showBackButton={true} onBackClick={handleBackClick}>
            Detail Perubahan Data
          </PageTitle>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">Data tidak ditemukan.</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-between mb-6">
        <PageTitle showBackButton={true} onBackClick={handleBackClick}>
          Detail Perubahan Data
        </PageTitle>
      </div>

      {/* Waktu Update */}
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-48 flex-shrink-0">
            <span className="text-sm font-semibold">Waktu Update</span>
          </div>
          <div className="flex-1">
            <span className="text-xs font-semibold">
              {historyDetail.createdAt ? `${new Date(historyDetail.createdAt).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "2-digit", 
                year: "numeric"
              })} ${new Date(historyDetail.createdAt).toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit"
              })}` : "-"}
            </span>
          </div>
        </div>
      </div>

      <div>
        <SettingTarifMinimalForm 
          mode="detail"
          initialData={formData}
          onSaveClick={() => {}}
          isSubmitting={false}
          onDataChange={() => {}}
        />
      </div>
    </>
  );
}