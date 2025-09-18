"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button/Button";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";
import SettingTarifMinimalForm from "./SettingTarifMinimalForm";

export default function SettingTarifMinimalContainer() {
  const router = useRouter();
  const [showSaveConfirmModal, setShowSaveConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showBackConfirmModal, setShowBackConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);

  const handleSaveClick = () => {
    setShowSaveConfirmModal(true);
  };

  const handleConfirmSave = async () => {
    setShowSaveConfirmModal(false);
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Data berhasil disimpan!");
      setShowSuccessModal(true);
      
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Gagal menyimpan data. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelSave = () => {
    setShowSaveConfirmModal(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleViewHistory = () => {
    if (hasUnsavedChanges) {
      setPendingNavigation("/master-pricing/setting-tarif-minimal/1/history");
      setShowBackConfirmModal(true);
    } else {
      router.push("/master-pricing/setting-tarif-minimal/1/history");
    }
  };

  const handleBackClick = () => {
    if (hasUnsavedChanges) {
      setPendingNavigation("/master-pricing");
      setShowBackConfirmModal(true);
    } else {
      router.push("/master-pricing");
    }
  };

  const handleConfirmBack = () => {
    setShowBackConfirmModal(false);
    if (pendingNavigation) {
      router.push(pendingNavigation);
      setPendingNavigation(null);
    }
  };

  const handleCancelBack = () => {
    setShowBackConfirmModal(false);
    setPendingNavigation(null);
  };

  const handleDataChange = (hasChanges) => {
    setHasUnsavedChanges(hasChanges);
  };

  // Handle browser back button
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "Apakah kamu yakin ingin berpindah halaman? Data yang telah diisi tidak akan disimpan";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  return (
    <>
      <div className="flex justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBackClick}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-xl font-semibold">Setting Tarif Minimal</span>
          </button>
        </div>
        <Button variant="muatparts-primary" onClick={handleViewHistory}>
          <span className="pt-0.5 font-semibold text-sm">Lihat History Perubahan</span>
        </Button>
      </div>

      <div>
        <SettingTarifMinimalForm 
          onSaveClick={handleSaveClick}
          isSubmitting={isSubmitting}
          onDataChange={handleDataChange}
        />
      </div>

      {/* Confirmation Modal */}
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

      {/* Success Modal */}
      <ConfirmationModal
        isOpen={showSuccessModal}
        setIsOpen={setShowSuccessModal}
        title={{ text: "Pemberitahuan" }}
        description={{ 
          text: "Data berhasil disimpan!" 
        }}
        confirm={{
          text: "OK",
          onClick: handleCloseSuccessModal
        }}
      />

      {/* Back Confirmation Modal */}
      <ConfirmationModal
        isOpen={showBackConfirmModal}
        setIsOpen={setShowBackConfirmModal}
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
    </>
  );
}