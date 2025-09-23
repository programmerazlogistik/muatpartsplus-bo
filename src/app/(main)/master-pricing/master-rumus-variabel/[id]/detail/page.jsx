"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import PageTitle from "@/components/PageTitle/PageTitle";
import Button from "@/components/Button/Button";
import MasterRumusVariabelForm from "@/container/MasterRumusVariabel/MasterRumusVariableForm";
import { useGetFormulaDetailForDetail } from "@/services/masterpricing/masterformulavariable/getFormulaDetail";

export default function MasterRumusVariabelDetailPage() {
  const router = useRouter();
  const params = useParams();
  
  // Use API hook to fetch formula detail
  const { data, error, isLoading } = useGetFormulaDetailForDetail(params.id);

  // Transform API data for form compatibility
  const formData = data ? {
    id: data.id,
    formulaName: data.name, // Map name to formulaName for form compatibility
    isActive: data.isActive,
    variables: data.variables || [],
  } : null;

  const handleBack = () => {
    router.push("/master-pricing/master-rumus-variabel");
  };

  const handleEdit = () => {
    router.push(`/master-pricing/master-rumus-variabel/${params.id}/edit`);
  };

  const handleViewHistory = () => {
    router.push(`/master-pricing/master-rumus-variabel/${params.id}/history`);
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
          Detail Nama Rumus & Variabel
        </PageTitle>
        <Button
          variant="muatparts-primary"
          onClick={() => router.push(`/master-pricing/master-rumus-variabel/${params.id}/history`)}
        >
          Lihat History Perubahan
        </Button>
      </div>

      <MasterRumusVariabelForm 
        mode="detail"
        initialData={formData}
        disabled={true}
        onEdit={handleEdit}
        onBack={handleBack}
      />
    </div>
  );
}
