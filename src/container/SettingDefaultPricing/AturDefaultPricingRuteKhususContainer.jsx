"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/Button/Button";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";

import AturDefaultPricingRuteKhususForm from "./AturDefaultPricingRuteKhususForm";

export default function AturDefaultPricingRuteKhususContainer({ id }) {
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
      await new Promise((resolve) => setTimeout(resolve, 1000));

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
      setPendingNavigation(
        "/master-pricing/setting-default-pricing/rute-khusus/history"
      );
      setShowBackConfirmModal(true);
    } else {
      router.push(
        "/master-pricing/setting-default-pricing/rute-khusus/history"
      );
    }
  };

  const handleBackClick = () => {
    if (hasUnsavedChanges) {
      setPendingNavigation("/master-pricing/setting-default-pricing");
      setShowBackConfirmModal(true);
    } else {
      router.push("/master-pricing/setting-default-pricing");
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
          <button
            onClick={handleBackClick}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-xl font-semibold">
              Atur Default Pricing Rute Khusus
            </span>
          </button>
        </div>
        <Button variant="muatparts-primary" onClick={handleViewHistory}>
          <span className="pt-0.5 text-sm font-semibold">
            Lihat History Perubahan
          </span>
        </Button>
      </div>

      <div>
        <AturDefaultPricingRuteKhususForm
          id={id}
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
