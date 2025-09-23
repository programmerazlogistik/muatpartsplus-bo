"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MasterTipePricingForm from "@/container/MasterTipePricing/MasterTipePricingForm";
import PageTitle from "@/components/PageTitle/PageTitle";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";
import { postCreateTypeWithValidation } from "@/services/masterpricing/mastertype/postCreateType";

export default function MasterTipePricingAddPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showSaveConfirmModal, setShowSaveConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);

  const handleBack = () => {
    if (hasUnsavedChanges) {
      setShowConfirmModal(true);
    } else {
      router.push("/master-pricing/master-tipe-pricing");
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
      // Transform form data to API format
      const apiData = {
        name: pendingFormData.typeName,
        isActive: pendingFormData.isActive,
      };
      
      // Call API to create new type
      await postCreateTypeWithValidation(apiData);
      
      setHasUnsavedChanges(false);
      setShowSuccessModal(true);
      
    } catch (error) {
      console.error("Error creating tipe pricing:", error);
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
    router.push("/master-pricing/master-tipe-pricing");
  };

  const handleConfirmBack = () => {
    setShowConfirmModal(false);
    router.push("/master-pricing/master-tipe-pricing");
  };

  const handleCancelBack = () => {
    setShowConfirmModal(false);
  };

  return (
    <>
      <div className="space-y-6">
        <PageTitle showBackButton={true} onBackClick={handleBack}>
          Tambah Tipe Pricing
        </PageTitle>
        <MasterTipePricingForm 
          mode="add"
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
