"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import ConfirmationModal from "@/components/Modal/ConfirmationModal";

import SettingNilaiVariabelForm from "@/container/SettingNilaiVariabel/SettingNilaiVariabelForm";

export default function SettingNilaiVariabelAturContainer({
  id,
  onBack,
  onSaved,
  hasUnsavedChanges,
  setHasUnsavedChanges,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [_hasUnsavedChanges, _setHasUnsavedChanges] = useState(false);
  const [showSaveConfirmModal, setShowSaveConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);

  // Use the passed state setter if provided, otherwise use internal one
  const unsavedChanges =
    hasUnsavedChanges !== undefined ? hasUnsavedChanges : _hasUnsavedChanges;
  const setUnsavedChanges =
    setHasUnsavedChanges !== undefined
      ? setHasUnsavedChanges
      : _setHasUnsavedChanges;

  // Simulate fetching data for edit
  useEffect(() => {
    const fetchData = async () => {
      setPageLoading(true);

      try {
        // Simulate API call to get nilai variabel data
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data - in real app, fetch from API using id
        const mockData = {
          id: id,
          route: "Jakarta - Surabaya",
          truckType: "CDD",
          formula: null,
          variable: "",
          specialPrice: "",
          applicableFrom: "",
          isActive: true,
        };

        setInitialData(mockData);
      } catch (error) {
        console.error("Error fetching nilai variabel data:", error);
        alert("Gagal memuat data. Silakan coba lagi.");
        router.push("/master-pricing/setting-nilai-variabel");
      } finally {
        setPageLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, router]);

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
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Updating nilai variabel:", {
        id: id,
        ...pendingFormData,
      });

      // In real app, call API here
      // await updateNilaiVariabel(id, pendingFormData);

      setUnsavedChanges(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error updating nilai variabel:", error);
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
    if (onSaved) {
      onSaved();
    } else {
      router.push("/master-pricing/setting-nilai-variabel");
    }
  };

  // Handle data change to track unsaved changes
  const handleDataChange = (hasChanged) => {
    setUnsavedChanges(hasChanged);
  };

  if (pageLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SettingNilaiVariabelForm
        mode="edit"
        initialData={initialData}
        onSubmit={handleSubmit}
        loading={loading}
        onDataChange={handleDataChange}
      />

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

      <ConfirmationModal
        isOpen={showSuccessModal}
        setIsOpen={setShowSuccessModal}
        title={{ text: "Pemberitahuan" }}
        description={{
          text: "Data berhasil disimpan.",
        }}
        withCancel={false}
        withButtons={false}
      />
    </>
  );
}
