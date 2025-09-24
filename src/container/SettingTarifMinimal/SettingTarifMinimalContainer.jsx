"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import Button from "@/components/Button/Button";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";
import PageTitle from "@/components/PageTitle/PageTitle";

import SettingTarifMinimalForm from "./SettingTarifMinimalForm";
import { postCreateMinRateWithValidation, postCreateMinRate } from "@/services/masterpricing/settingMinimumRate/postCreateMinRate";

export default function SettingTarifMinimalContainer() {
  const router = useRouter();
  const [showSaveConfirmModal, setShowSaveConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showBackConfirmModal, setShowBackConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const [pendingFormData, setPendingFormData] = useState(null);

  const handleDataChange = useCallback((hasChanges, formData) => {
    setHasUnsavedChanges(hasChanges);
    if (hasChanges && formData) {
      setPendingFormData(formData);
    }
  }, []);

  const handleSaveClick = () => {
    setShowSaveConfirmModal(true);
  };

  const handleConfirmSave = async () => {
    setShowSaveConfirmModal(false);
    setIsSubmitting(true);

    try {
      // Transform form data to API payload format
      const apiPayload = {
        rates: Object.entries(pendingFormData)
          .filter(([key, value]) => key !== 'effectiveDate' && value && value > 0)
          .map(([truckTypeId, minDistance]) => ({
            truckTypeId,
            minDistance: Number(minDistance)
          })),
        validFrom: pendingFormData.effectiveDate ? 
          (pendingFormData.effectiveDate instanceof Date ? 
            pendingFormData.effectiveDate.toISOString() : 
            pendingFormData.effectiveDate) : 
          new Date().toISOString()
      };

      console.log("API Payload:", apiPayload);

      // Call API directly with the correct payload format
      const response = await postCreateMinRate("/v1/bo/pricing/setting/min-rates", apiPayload);

      console.log("Data berhasil disimpan:", response.data);
      setHasUnsavedChanges(false); // Reset unsaved changes after successful save
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error saving data:", error);
      alert(`Gagal menyimpan data: ${error.message}`);
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
      setPendingNavigation("/master-pricing/setting-tarif-minimal/history");
      setShowBackConfirmModal(true);
    } else {
      router.push("/master-pricing/setting-tarif-minimal/history");
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


  // Handle browser back button
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue =
          "Apakah kamu yakin ingin berpindah halaman? Data yang telah diisi tidak akan disimpan";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  return (
    <>
      <div className="mb-6 flex justify-between">
        <div className="flex items-center space-x-4">
          <PageTitle withBack={false}>
            Setting Tarif Minimal
          </PageTitle>
        </div>
        <Button variant="muatparts-primary" onClick={handleViewHistory}>
          <span className="pt-0.5 text-sm font-semibold">
            Lihat History Perubahan
          </span>
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
          text: "Apakah Anda yakin ingin menyimpan data?",
        }}
        cancel={{
          text: "Tidak",
          onClick: handleCancelSave,
        }}
        confirm={{
          text: "Ya",
          onClick: handleConfirmSave,
        }}
      />

      {/* Success Modal */}
      <ConfirmationModal
        isOpen={showSuccessModal}
        setIsOpen={setShowSuccessModal}
        title={{ text: "Pemberitahuan" }}
        withCancel={false}
        description={{
          text: "Data berhasil disimpan!",
        }}
        confirm={{
          text: "OK",
          onClick: handleCloseSuccessModal,
        }}
      />

      {/* Back Confirmation Modal */}
      <ConfirmationModal
        isOpen={showBackConfirmModal}
        setIsOpen={setShowBackConfirmModal}
        title={{ text: "Warning" }}
        description={{
          text: "Apakah kamu yakin ingin berpindah halaman?<br/>Data yang telah diisi tidak akan disimpan",
        }}
        cancel={{
          text: "Batal",
          onClick: handleCancelBack,
        }}
        confirm={{
          text: "Ya",
          onClick: handleConfirmBack,
        }}
      />
    </>
  );
}
