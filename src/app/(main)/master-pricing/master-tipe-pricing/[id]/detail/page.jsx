"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import PageTitle from "@/components/PageTitle/PageTitle";
import Button from "@/components/Button/Button";
import MasterTipePricingForm from "@/container/MasterTipePricing/MasterTipePricingForm";
import { useGetTypeDetailForDetail } from "@/services/masterpricing/mastertype/getTypeDetail";

export default function MasterTipePricingDetailPage() {
  const router = useRouter();
  const params = useParams();
  
  // Use API hook to fetch type detail
  const { data, error, isLoading } = useGetTypeDetailForDetail(params.id);

  // Transform API data for form compatibility
  const formData = data ? {
    id: data.id,
    typeName: data.name, // Map name to typeName for form compatibility
    isActive: data.isActive,
  } : null;

  const handleBack = () => {
    router.push("/master-pricing/master-tipe-pricing");
  };

  const handleEdit = () => {
    router.push(`/master-pricing/master-tipe-pricing/${params.id}/edit`);
  };

  const handleViewHistory = () => {
    router.push(`/master-pricing/master-tipe-pricing/${params.id}/history`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (error || !formData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-600">Data tidak ditemukan</p>
          <Button
            variant="muatparts-primary"
            onClick={handleBack}
            className="mt-4"
          >
            Kembali
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageTitle showBackButton={true} onBackClick={handleBack}>
          Detail Tipe Pricing
        </PageTitle>
        <Button
          variant="muatparts-primary"
          onClick={() => router.push(`/master-pricing/master-tipe-pricing/${params.id}/history`)}
        >
          Lihat History Perubahan
        </Button>
      </div>

      <MasterTipePricingForm 
        mode="detail"
        initialData={formData}
        disabled={true}
        onEdit={handleEdit}
        onBack={handleBack}
      />
    </div>
  );
}
