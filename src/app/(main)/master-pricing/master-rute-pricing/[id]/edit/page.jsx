"use client";
import { useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import MasterRutePricingForm from "@/container/MasterRutePricing/MasterRutePricingForm";
import PageTitle from "@/components/PageTitle/PageTitle";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";

import { useGetRouteDetailForForm } from "@/services/masterpricing/masterrute/getRouteDetail";
import { updateRouteWithValidation, transformFormDataToUpdateAPI } from "@/services/masterpricing/masterrute/putRouteUpdate";
export default function MasterRutePricingEditPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showSaveConfirmModal, setShowSaveConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);

  // Get route detail data using API
  const { data: apiData, error, isLoading } = useGetRouteDetailForForm(params.id, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  // Transform API data for form compatibility
  const initialData = useMemo(() => {
    if (!apiData) return null;

    return {
      id: apiData.id,
      alias: apiData.alias,
      loadingProvince: apiData.originProvinces?.map(province => ({
        value: province.id,
        label: province.name,
        id: province.id,
        name: province.name
      })) || [],
      unloadingProvince: apiData.destinationProvinces?.map(province => ({
        value: province.id,
        label: province.name,
        id: province.id,
        name: province.name
      })) || [],
      isActive: apiData.isActive,
      createSpecialPriceRoute: apiData.specialRoutes && apiData.specialRoutes.length > 0,
      specialRoutes: apiData.specialRoutes?.map(route => ({
        id: route.id,
        originLocation: {
          id: route.originCityId,
          name: route.originCityName,
          value: route.originCityId
        },
        destinationLocation: {
          id: route.destinationCityId,
          name: route.destinationCityName,
          value: route.destinationCityId
        }
      })) || []
    };
  }, [apiData]);

  const handleBack = () => {
    if (hasUnsavedChanges) {
      setShowConfirmModal(true);
    } else {
      router.push("/master-pricing/master-rute-pricing");
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
      // Transform form data to match API payload format (same as POST)
      const formDataForAPI = {
        alias: pendingFormData.alias,
        originProvinces: pendingFormData.loadingProvince || [],
        destinationProvinces: pendingFormData.unloadingProvince || [],
        isActive: pendingFormData.isActive || false,
        specialRoutes: pendingFormData.specialRoutes?.map(route => ({
          id: route.id,
          originCityId: route.originLocation?.id || route.originLocation,
          destinationCityId: route.destinationLocation?.id || route.destinationLocation
        })).filter(route => route.originCityId && route.destinationCityId) || []
      };

      const apiPayload = transformFormDataToUpdateAPI(formDataForAPI);

      // Call API with validation
      const result = await updateRouteWithValidation(params.id, apiPayload, { useMock: false });

      if (result.success) {
        setHasUnsavedChanges(false);
        setShowSuccessModal(true);
      } else {
        if (result.validationErrors) {
          console.log(`Validasi gagal: ${result.validationErrors.join(", ")}`);
        } else {
          console.log(`Gagal menyimpan data: ${result.error}`);
        }
      }
      
    } catch (error) {
      console.error("Error updating route pricing:", error);
      console.log("Gagal menyimpan data. Silakan coba lagi.");
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
    router.push("/master-pricing/master-rute-pricing");
  };

  const handleConfirmBack = () => {
    setShowConfirmModal(false);
    router.push("/master-pricing/master-rute-pricing");
  };

  const handleCancelBack = () => {
    setShowConfirmModal(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600">Gagal memuat data: {error.message}</p>
          <button
            onClick={() => router.push("/master-pricing/master-rute-pricing")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-600">Data tidak ditemukan</p>
          <button
            onClick={() => router.push("/master-pricing/master-rute-pricing")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <PageTitle showBackButton={true} onBackClick={handleBack}>
          Edit Rute Pricing
        </PageTitle>
        <MasterRutePricingForm 
          mode="edit"
          initialData={initialData}
          onSubmit={handleSubmit}
          loading={loading}
          onDataChange={setHasUnsavedChanges}
        />
      </div>

      <ConfirmationModal
        isOpen={showConfirmModal}
        setIsOpen={setShowConfirmModal}
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

      <ConfirmationModal
        isOpen={showSaveConfirmModal}
        setIsOpen={setShowSaveConfirmModal}
        title={{ text: "Pemberitahuan" }}
        description={{ 
          text: "Apakah Anda yakin ingin menyimpan data?" 
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

      <ConfirmationModal
        isOpen={showSuccessModal}
        setIsOpen={setShowSuccessModal}
        title={{ text: "Pemberitahuan" }}
        description={{ 
          text: "Data berhasil disimpan." 
        }}
        withCancel={false}
        confirm={{
          text: "OK",
          onClick: handleSuccessModalClose
        }}
      />
    </>
  );
}
