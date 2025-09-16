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
import { 
  useCreateVoucher, 
  transformFormValuesToRequestBody 
} from "@/services/mastervoucher/createVoucher";
import { useGetVoucherPaymentMethods } from "@/services/mastervoucher/getVoucherPaymentMethods";

const TambahVoucherPage = () => {
  const router = useRouter();
  const formValues = useAddVoucherFormValues();
  const { validateForm, reset, setError } = useAddVoucherActions();

  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showConfirmSaveModal, setShowConfirmSaveModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // SWR mutation hook for creating vouchers
  const { trigger: createVoucher, isMutating } = useCreateVoucher();

  // Fetch payment methods for "all" detection
  const { data: paymentMethodsData } = useGetVoucherPaymentMethods(false);

  // Reset form on mount for a clean state
  useEffect(() => {
    reset();
  }, [reset]);

  const handleSubmit = () => {
    if (validateForm()) {
      setShowConfirmSaveModal(true);
    }
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmSaveModal(false);
    
    try {
      // Transform form data to match API request body
      const allPaymentMethods = (paymentMethodsData?.Data || []).map((method) => ({
        id: method.id,
        value: method.id,
      }));
      const requestBody = transformFormValuesToRequestBody(formValues, allPaymentMethods);
      console.log("Transformed request body:", requestBody);
      
      // Call API to create voucher
      const response = await createVoucher(requestBody);
      console.log("Voucher created successfully:", response);
      
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error creating voucher:", error);
      
      // Handle specific case for voucher code already exists
      if (error.response?.data?.Data === "Voucher code already exists") {
        setError("kodeVoucher", "Kode Voucher telah digunakan pada periode yang sama");
        return; // Don't show error modal
      }
      
      // Handle API validation errors
      if (error.response?.data?.Data?.errors) {
        const apiErrors = error.response.data.Data.errors;
        apiErrors.forEach(({ field, message }) => {
          // Map API field names back to form field names
          const fieldMappings = {
            voucherCode: "kodeVoucher",
            validPeriodStart: "periodeAwal",
            validPeriodEnd: "periodeAkhir",
            discountValue: "nominal",
            totalQuota: "kuotaVoucher",
            quotaPerUser: "kuotaPerUser",
            termsAndConditions: "syaratDanKetentuan",
            usageInstructions: "caraPemakaian",
            maxDiscountAmount: "maksimalPotonganRp",
            minTransactionAmount: "minimalTransaksiRp"
          };
          
          const formFieldName = fieldMappings[field] || field;
          setError(formFieldName, message);
        });
        
        setErrorMessage("Terdapat kesalahan pada form. Silakan periksa kembali data yang diisi.");
      } else {
        // Generic error message
        const errorMsg = error.response?.data?.Message?.Text || error.message || "Terjadi kesalahan saat menyimpan data";
        setErrorMessage(errorMsg);
      }
      
      setShowErrorModal(true);
    }
  };

  const handleBack = () => {
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
        <Button 
          onClick={handleSubmit} 
          className="px-8"
          disabled={isMutating}
          loading={isMutating}
        >
          {isMutating ? "Menyimpan..." : "Simpan"}
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
      <ConfirmationModal
        isOpen={showErrorModal}
        setIsOpen={setShowErrorModal}
        withButtons={false}
        title={{ text: "Error" }}
        description={{ text: errorMessage }}
        onAutoClose={() => setShowErrorModal(false)}
      />
    </div>
  );
};

export default TambahVoucherPage;
