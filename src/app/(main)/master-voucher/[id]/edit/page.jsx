"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  transformVoucherDetailToFormValues,
  useGetVoucherDetail,
} from "@/services/mastervoucher/getVoucherDetail";

import { 
  useUpdateVoucher, 
  transformFormValuesToUpdateRequestBody 
} from "@/services/mastervoucher/updateVoucher";

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
  const { setFormValues, validateForm, setError } = useAddVoucherActions();

  const [showConfirmSaveModal, setShowConfirmSaveModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { data, error, isLoading } = useGetVoucherDetail(params.id);
  
  // SWR mutation hook for updating voucher
  const { trigger: updateVoucher, isMutating } = useUpdateVoucher(params.id);

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

  const handleConfirmSubmit = async () => {
    setShowConfirmSaveModal(false);
    
    try {
      // Transform form data to match API request body
      const requestBody = transformFormValuesToUpdateRequestBody(formValues);
      
      console.log("🚀 Updating voucher:", params.id);
      console.log("Request body:", requestBody);
      
      // Call API to update voucher
      const response = await updateVoucher(requestBody);
      
      console.log("✅ Update voucher success:", response);
      setShowSuccessModal(true);
      
    } catch (error) {
      console.error("❌ Update voucher error:", error);
      
      // Handle API validation errors similar to createVoucher
      if (error.response?.data?.Data?.errors) {
        const apiErrors = error.response.data.Data.errors;
        const errorMap = {};
        
        apiErrors.forEach(err => {
          const field = err.field;
          const message = err.message;
          
          // Map API field names to form field names
          const fieldMapping = {
            'termsAndConditions': 'syaratDanKetentuan',
            'usageInstructions': 'caraPemakaian', 
            'validPeriodEnd': 'periodeAkhir',
            'totalQuota': 'kuotaVoucher',
            'quotaPerUser': 'kuotaPerUser',
            'userIds': 'userWhatsApp',
            'paymentMethodIds': 'metodeInstansiTujuanPembayaran',
            'pickupLocations': 'lokasiMuat',
            'deliveryLocations': 'lokasiBongkar'
          };
          
          const formField = fieldMapping[field] || field;
          errorMap[formField] = message;
        });
        
        setError(errorMap);
        setErrorMessage("Terdapat kesalahan validasi pada form");
      } else {
        setErrorMessage(error.response?.data?.Message?.Text || "Terjadi kesalahan saat mengupdate voucher");
      }
      
      setShowErrorModal(true);
    }
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
        <Button 
          onClick={handleSubmit} 
          className="px-8"
          disabled={isMutating}
        >
          {isMutating ? "Menyimpan..." : "Simpan"}
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

      <ConfirmationModal
        isOpen={showErrorModal}
        setIsOpen={() => setShowErrorModal(false)}
        withButtons={false}
        title={{ text: "Kesalahan" }}
        description={{ text: errorMessage }}
      />
    </div>
  );
};

export default UbahVoucherPage;
