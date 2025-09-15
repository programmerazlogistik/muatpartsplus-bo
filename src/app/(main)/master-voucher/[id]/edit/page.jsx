"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  transformVoucherDetailToFormValues,
  useGetVoucherDetail,
} from "@/services/mastervoucher/getVoucherDetail";

import Button from "@/components/Button/Button";
import LoadingStatic from "@/components/Loading/LoadingStatic";
import VoucherForm from "@/components/MasterVoucher/VoucherForm";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";
import PageTitle from "@/components/PageTitle/PageTitle";

import {
  useAddVoucherActions,
  useAddVoucherFormValues,
} from "@/store/MasterVoucher/addVoucherStore";

const UbahVoucherPage = () => {
  const router = useRouter();
  const params = useParams();
  const formValues = useAddVoucherFormValues();
  const { setFormValues, validateForm } = useAddVoucherActions();

  const [showConfirmSaveModal, setShowConfirmSaveModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { data, error, isLoading } = useGetVoucherDetail(params.id);

  useEffect(() => {
    if (data && data.data && data.data.Data) {
      const transformedData = transformVoucherDetailToFormValues(
        data.data.Data
      );
      setFormValues(transformedData);
    }
  }, [data, setFormValues]);

  const handleSubmit = () => {
    if (validateForm()) {
      setShowConfirmSaveModal(true);
    }
  };

  const handleConfirmSubmit = () => {
    setShowConfirmSaveModal(false);
    console.log("Form submitted for update:", formValues);
    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    router.push("/master-voucher");
  };

  if (isLoading) {
    return <LoadingStatic />;
  }

  return (
    <div className="space-y-6">
      <div className="flex w-full items-center justify-between">
        <PageTitle
          showBackButton={true}
          onBackClick={() => router.push("/master-voucher")}
          className="!mb-0"
        >
          Ubah Voucher
        </PageTitle>
        <Button
          variant="muatparts-primary"
          onClick={() =>
            router.push(`/master-voucher/${params.id}/change-history`)
          }
        >
          Lihat History Perubahan
        </Button>
      </div>

      <VoucherForm mode="edit" />

      <div className="mt-6 flex justify-center pt-2">
        <Button onClick={handleSubmit} className="px-8">
          Simpan
        </Button>
      </div>

      {/* Modals */}
      <ConfirmationModal
        isOpen={showConfirmSaveModal}
        setIsOpen={setShowConfirmSaveModal}
        title={{ text: "Pemberitahuan" }}
        description={{
          text: "Apakah Anda yakin ingin menyimpan perubahan data?",
        }}
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
        description={{ text: "Data berhasil diperbarui." }}
      />
    </div>
  );
};

export default UbahVoucherPage;
