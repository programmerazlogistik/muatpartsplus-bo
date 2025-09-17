"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MasterRumusVariabelForm from "@/container/MasterRumusVariabel/MasterRumusVariableForm";
import PageTitle from "@/components/PageTitle/PageTitle";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";

export default function MasterRumusVariabelAddPage() {
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Creating new rumus variabel:", pendingFormData);
      
      // In real app, call API here
      // await createRumusVariabel(pendingFormData);
      
      setHasUnsavedChanges(false);
      setShowSuccessModal(true);
      
    } catch (error) {
      console.error("Error creating rumus variabel:", error);
      alert("Gagal menyimpan data. Silakan coba lagi.");
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

  return (
    <>
      <div className="space-y-6">
        <PageTitle showBackButton={true} onBackClick={handleBack}>
          Tambah Nama Rumus & Variabel
        </PageTitle>
        <MasterRumusVariabelForm 
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