"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button/Button";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";
import SettingMarginForm from "./SettingMarginForm";
import { useGetMarginListForForm } from "@/services/masterpricing/settingMargin/getMarginList";
import { 
  postMarginDataWithValidation,
  postMarginDataMock,
  transformFormToAPI,
  transformAPIToForm,
  validateMarginCreationData,
  getMarginCreationSuccessMessage,
  getMarginCreationErrorMessage,
  getMarginCreationConfirmationMessage
} from "@/services/masterpricing/settingMargin/postMarginData";

export default function SettingMarginContainer() {
  const router = useRouter();
  const [showSaveConfirmModal, setShowSaveConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showBackConfirmModal, setShowBackConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const [pendingFormData, setPendingFormData] = useState(null);

  // Get existing margin data
  const { data: existingMarginData, error: marginError, isLoading: marginLoading } = useGetMarginListForForm(
    { search: "", page: 1, limit: 10 },
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  const handleSaveClick = () => {
    setShowSaveConfirmModal(true);
  };

  const handleConfirmSave = async () => {
    setShowSaveConfirmModal(false);
    setIsSubmitting(true);
    
    try {
      if (!pendingFormData) {
        throw new Error("No form data to save");
      }

      // Validate form data first
      const validation = validateMarginCreationData(pendingFormData);
      if (!validation.isValid) {
        const errorMessages = Object.values(validation.errors).join(", ");
        throw new Error(`Validation failed: ${errorMessages}`);
      }

      console.log("Form data:", pendingFormData);

      // Call API with validation
      const result = await postMarginDataWithValidation(pendingFormData);
      
      console.log("Data berhasil disimpan!", result);
      setHasUnsavedChanges(false); // Reset unsaved changes after successful save
      setShowSuccessModal(true);
      
    } catch (error) {
      console.error("Error saving data:", error);
      const errorMessage = getMarginCreationErrorMessage(pendingFormData?.margin || 0, error);
      alert(errorMessage);
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
      setPendingNavigation("/master-pricing/setting-margin/1/history");
      setShowBackConfirmModal(true);
    } else {
      router.push("/master-pricing/setting-margin/1/history");
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

  const handleDataChange = useCallback((hasChanges, formData) => {
    setHasUnsavedChanges(hasChanges);
    if (formData) {
      setPendingFormData(formData);
    }
  }, []);

  // Transform existing data for form
  const initialFormData = useMemo(() => {
    if (!existingMarginData) {
      return {
        margin: "",
        modelMargin: "added",
        effectiveDate: null
      };
    }

    // Use transformAPIToForm for consistency
    return transformAPIToForm(existingMarginData);
  }, [existingMarginData]);

  // Handle browser back button
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "Apakah kamu yakin ingin berpindah halaman? Data yang telah diisi tidak akan disimpan";
      }
    };

    // window.addEventListener("beforeunload", handleBeforeUnload);
    // return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);
  
  return (
    <>
     <div className="flex justify-between mb-6">
        <h1 className="text-xl font-semibold">Setting Margin</h1>
        <Button variant="muatparts-primary" onClick={() => router.push(`/master-pricing/setting-margin/1/history`)}>
            <span className="pt-0.5 font-semibold text-sm">Lihat History Perubahan</span>
        </Button>
      </div>

      <div>
        {marginLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">Memuat data...</div>
          </div>
        ) : marginError ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-red-500">Gagal memuat data. Silakan coba lagi.</div>
          </div>
        ) : (
          <SettingMarginForm 
            initialData={initialFormData}
            onSaveClick={handleSaveClick}
            isSubmitting={isSubmitting}
            onDataChange={handleDataChange}
          />
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showSaveConfirmModal}
        setIsOpen={setShowSaveConfirmModal}
        title={{ text: "Pemberitahuan" }}
        description={{ 
          text: pendingFormData 
            ? getMarginCreationConfirmationMessage(pendingFormData.margin, pendingFormData.modelMargin)
            : "Apakah Anda yakin ingin menyimpan data?" 
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
        withCancel={false}
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