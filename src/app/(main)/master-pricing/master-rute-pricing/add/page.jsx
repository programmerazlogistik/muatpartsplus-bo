"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MasterRutePricingForm from "@/container/MasterRutePricing/MasterRutePricingForm";
import PageTitle from "@/components/PageTitle/PageTitle";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";
import { createRouteWithValidation } from "@/services/masterpricing/masterrute/postRouteMaster";

export default function MasterRutePricingAddPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showSaveConfirmModal, setShowSaveConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);

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
      console.log("Creating new route pricing:", pendingFormData);
      
      // Transform form data to match API payload format
      const apiPayload = {
        alias: pendingFormData.alias,
        originProvinces: pendingFormData.loadingProvince?.map(province => ({
          id: province.id,
          name: province.name
        })) || [],
        destinationProvinces: pendingFormData.unloadingProvince?.map(province => ({
          id: province.id,
          name: province.name
        })) || [],
        isActive: pendingFormData.isActive || false,
        specialRoutes: pendingFormData.specialRoutes?.map(route => ({
          originCityId: route.originLocation?.id || route.originLocation,
          destinationCityId: route.destinationLocation?.id || route.destinationLocation
        })).filter(route => route.originCityId && route.destinationCityId) || []
      };
      
      console.log("API Payload:", apiPayload);
      
      // Call API with validation
      const result = await createRouteWithValidation(apiPayload, { useMock: false });
      
      if (result.success) {
        console.log("Route created successfully:", result.data);
        setHasUnsavedChanges(false);
        setShowSuccessModal(true);
      } else {
        console.error("API Error:", result.error);
        if (result.validationErrors) {
          console.log(`Validasi gagal: ${result.validationErrors.join(", ")}`);
        } else {
          console.log(`Gagal menyimpan data: ${result.error}`);
        }
      }
      
    } catch (error) {
      console.error("Error creating route pricing:", error);
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

  return (
    <>
      <div className="space-y-6">
        <PageTitle showBackButton={true} onBackClick={handleBack}>
          Tambah Rute Pricing
        </PageTitle>
        <MasterRutePricingForm 
          mode="add"
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