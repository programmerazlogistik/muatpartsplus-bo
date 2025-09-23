"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import MasterRumusVariabelForm from "@/container/MasterRumusVariabel/MasterRumusVariableForm";
import PageTitle from "@/components/PageTitle/PageTitle";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";
import { useGetFormulaDetailForForm } from "@/services/masterpricing/masterformulavariable/getFormulaDetail";
import { putUpdateFormulaWithValidation } from "@/services/masterpricing/masterformulavariable/putUpdateFormula";

export default function MasterRumusVariabelEditPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showSaveConfirmModal, setShowSaveConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);

  // Use API hook to fetch formula detail for edit
  const { data: apiData, error, isLoading: pageLoading } = useGetFormulaDetailForForm(params.id);

  // Transform API data for form compatibility with useMemo to prevent unnecessary re-renders
  const initialData = useMemo(() => {
    if (!apiData) return null;
    
    return {
      id: apiData.id,
      formulaName: apiData.name, // Map name to formulaName for form compatibility
      isActive: apiData.isActive,
      variables: apiData.variables || [],
    };
  }, [apiData]);

  const handleBack = () => {
    if (hasUnsavedChanges) {
      setShowConfirmModal(true);
    } else {
      router.push("/master-pricing/master-rumus-variabel");
    }
  };

  const handleSubmit = async (formData) => {
    // Show save confirmation modal first
    setPendingFormData(formData);
    setShowSaveConfirmModal(true);
  };

  const handleConfirmSave = async () => {
    setShowSaveConfirmModal(false);
    setLoading(true);
    
    try {
      // Call API to update formula using putUpdateFormulaWithValidation
      const updateData = {
        name: pendingFormData.formulaName, // Map formulaName to name for API
        isActive: pendingFormData.isActive,
        // Variables are not updated in edit mode, only name and isActive
      };
      
      console.log("Updating formula:", { id: params.id, updateData });
      
      const response = await putUpdateFormulaWithValidation(params.id, updateData);
      
      console.log("Formula updated successfully:", response);
      
      setHasUnsavedChanges(false);
      setShowSuccessModal(true);
      
    } catch (error) {
      console.error("Error updating formula:", error);
      alert(`Gagal menyimpan data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSave = () => {
    setShowSaveConfirmModal(false);
    setPendingFormData(null);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    router.push("/master-pricing/master-rumus-variabel");
  };

  const handleConfirmBack = () => {
    setShowConfirmModal(false);
    router.push("/master-pricing/master-rumus-variabel");
  };

  const handleCancelBack = () => {
    setShowConfirmModal(false);
  };

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (error || !initialData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-600">Data tidak ditemukan</p>
          <button
            onClick={() => router.push("/master-pricing/master-rumus-variabel")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <PageTitle showBackButton={true} onBackClick={handleBack}>
          Ubah Nama Rumus & Variabel
        </PageTitle>
        <MasterRumusVariabelForm 
          mode="edit"
          initialData={initialData}
          onSubmit={handleSubmit}
          loading={loading}
          onDataChange={setHasUnsavedChanges}
        />
      </div>

      <ConfirmationModal
        isOpen={showConfirmModal}
        setIsOpen={setShowConfirmModal}
        title={{ text: "Warning" }}
        description={{ 
          text: "Apakah kamu yakin ingin berpindah halaman?<br/>Data yang telah diisi tidak akan disimpan" 
        }}
        cancel={{
          text: "Batal",
          onClick: handleCancelBack
        }}
        confirm={{
          text: "Ya",
          onClick: handleConfirmBack
        }}
      />

      <ConfirmationModal
        isOpen={showSaveConfirmModal}
        setIsOpen={setShowSaveConfirmModal}
        title={{ text: "Pemberitahuan" }}
        description={{ 
          text: "Apakah Anda yakin ingin menyimpan data?" 
        }}
        cancel={{
          text: "Tidak",
          onClick: handleCancelSave
        }}
        confirm={{
          text: "Ya",
          onClick: handleConfirmSave
        }}
      />

      <ConfirmationModal
        isOpen={showSuccessModal}
        setIsOpen={setShowSuccessModal}
        title={{ text: "Pemberitahuan" }}
        description={{ 
          text: "Data berhasil disimpan." 
        }}
        withCancel={false}
        confirm={{
          text: "OK",
          onClick: handleSuccessModalClose
        }}
      />
    </>
  );
}
