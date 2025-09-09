"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/Button/Button";
import VoucherForm from "@/components/MasterVoucher/VoucherForm";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";
import PageTitle from "@/components/PageTitle/PageTitle";

import {
  useAddVoucherActions,
  useAddVoucherFormValues,
} from "@/store/MasterVoucher/addVoucherStore";

const TambahVoucherPage = () => {
  const router = useRouter();
  const formValues = useAddVoucherFormValues();
  const { validateForm, reset } = useAddVoucherActions();

  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showConfirmSaveModal, setShowConfirmSaveModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Reset form on mount for a clean state
  useEffect(() => {
    reset();
  }, [reset]);

  const handleSubmit = () => {
    if (validateForm()) {
      setShowConfirmSaveModal(true);
    }
  };

  const handleConfirmSubmit = () => {
    setShowConfirmSaveModal(false);
    // TODO: Submit to API for CREATING a new voucher
    console.log("Form submitted for creation:", formValues);
    setShowSuccessModal(true);
  };

  const handleBack = () => {
    // Check if form has any data, ignoring default values
    const hasFormData = Object.keys(formValues).some((key) => {
      if (
        key === "tanggalPembuatan" ||
        key === "status" ||
        key === "jenisPotongan"
      )
        return false;
      const value = formValues[key];
      if (Array.isArray(value)) return value.length > 0;
      return value !== "" && value !== false;
    });

    if (hasFormData) {
      setShowWarningModal(true);
    } else {
      router.push("/master-voucher");
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    router.push("/master-voucher");
  };

  return (
    <div className="space-y-6">
      <PageTitle showBackButton={true} onBackClick={handleBack}>
        Tambah Voucher
      </PageTitle>

      <VoucherForm mode="add" />

      <div className="mt-6 flex justify-center pt-2">
        <Button onClick={handleSubmit} className="px-8">
          Simpan
        </Button>
      </div>

      {/* Modals */}
      <ConfirmationModal
        isOpen={showWarningModal}
        setIsOpen={setShowWarningModal}
        title={{ text: "Warning" }}
        description={{
          text: "Apakah kamu yakin ingin berpindah halaman? Data yang telah diisi tidak akan disimpan",
        }}
        cancel={{ text: "Batal", onClick: () => setShowWarningModal(false) }}
        confirm={{ text: "Ya", onClick: () => router.push("/master-voucher") }}
      />
      <ConfirmationModal
        isOpen={showConfirmSaveModal}
        setIsOpen={setShowConfirmSaveModal}
        title={{ text: "Pemberitahuan" }}
        description={{ text: "Apakah Anda yakin ingin menyimpan data?" }}
        cancel={{
          text: "Tidak",
          onClick: () => setShowConfirmSaveModal(false),
        }}
        confirm={{ text: "Ya", onClick: handleConfirmSubmit }}
      />
      <ConfirmationModal
        isOpen={showSuccessModal}
        setIsOpen={handleSuccessModalClose}
        withButtons={false}
        title={{ text: "Pemberitahuan" }}
        description={{ text: "Data berhasil disimpan." }}
      />
    </div>
  );
};

export default TambahVoucherPage;
