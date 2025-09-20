"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/Button/Button";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";
import PageTitle from "@/components/PageTitle/PageTitle";

import SettingNilaiVariabelForm from "@/container/SettingNilaiVariabel/SettingNilaiVariabelForm";

export default function SettingNilaiVariabelEditPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showSaveConfirmModal, setShowSaveConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);

  // Simulate fetching data for edit
  useEffect(() => {
    const fetchData = async () => {
      setPageLoading(true);

      try {
        // Simulate API call to get nilai variabel data
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data - in real app, fetch from API using params.id
        const mockData = {
          id: params.id,
          variableName: "Tarif Dasar",
          value: "15000",
          unit: "Rupiah",
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

    if (params.id) {
      fetchData();
    }
  }, [params.id, router]);

  const handleBack = () => {
    if (hasUnsavedChanges) {
      setShowConfirmModal(true);
    } else {
      router.push("/master-pricing/setting-nilai-variabel");
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
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Updating nilai variabel:", {
        id: params.id,
        ...pendingFormData,
      });

      // In real app, call API here
      // await updateNilaiVariabel(params.id, pendingFormData);

      setHasUnsavedChanges(false);
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
    router.push("/master-pricing/setting-nilai-variabel");
  };

  const handleConfirmBack = () => {
    setShowConfirmModal(false);
    router.push("/master-pricing/setting-nilai-variabel");
  };

  const handleCancelBack = () => {
    setShowConfirmModal(false);
  };

  const handleViewHistory = () => {
    router.push(`/master-pricing/setting-nilai-variabel/${params.id}/history`);
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <PageTitle showBackButton={true} onBackClick={handleBack}>
            Atur Nilai Variabel
          </PageTitle>
          <Button variant="muatparts-primary" onClick={handleViewHistory}>
            Lihat History Perubahan
          </Button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmModal}
        setIsOpen={setShowConfirmModal}
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
        confirm={{
          text: "OK",
          onClick: handleSuccessModalClose,
        }}
      />
    </>
  );
}
