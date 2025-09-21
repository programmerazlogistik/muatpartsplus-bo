"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/Button/Button";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";
import PageTitle from "@/components/PageTitle/PageTitle";

import SettingNilaiVariabelAturContainer from "@/container/SettingNilaiVariabel/SettingNilaiVariabelAturContainer";

export default function SettingNilaiVariabelEditPage() {
  const router = useRouter();
  const params = useParams();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleBack = () => {
    if (hasUnsavedChanges) {
      setShowConfirmModal(true);
    } else {
      router.push("/master-pricing/setting-nilai-variabel");
    }
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

        {/* Form Container */}
        <SettingNilaiVariabelAturContainer
          id={params.id}
          hasUnsavedChanges={hasUnsavedChanges}
          setHasUnsavedChanges={setHasUnsavedChanges}
        />
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
    </>
  );
}
