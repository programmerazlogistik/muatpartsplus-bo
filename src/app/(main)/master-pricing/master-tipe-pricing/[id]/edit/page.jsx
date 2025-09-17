"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import MasterTipePricingForm from "@/container/MasterTipePricing/MasterTipePricingForm";
import PageTitle from "@/components/PageTitle/PageTitle";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";

export default function MasterTipePricingEditPage() {
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
        // Simulate API call to get tipe pricing data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - in real app, fetch from API using params.id
        const mockData = {
          id: params.id,
          typeName: "Medium",
          isActive: true,
        };
        
        setInitialData(mockData);
        
      } catch (error) {
        console.error("Error fetching tipe pricing data:", error);
        alert("Gagal memuat data. Silakan coba lagi.");
        router.push("/master-pricing/master-tipe-pricing");
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
      router.push("/master-pricing/master-tipe-pricing");
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Updating tipe pricing:", { id: params.id, ...pendingFormData });
      
      // In real app, call API here
      // await updateTipePricing(params.id, pendingFormData);
      
      setHasUnsavedChanges(false);
      setShowSuccessModal(true);
      
    } catch (error) {
      console.error("Error updating tipe pricing:", error);
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
    router.push("/master-pricing/master-tipe-pricing");
  };

  const handleConfirmBack = () => {
    setShowConfirmModal(false);
    router.push("/master-pricing/master-tipe-pricing");
  };

  const handleCancelBack = () => {
    setShowConfirmModal(false);
  };

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <PageTitle showBackButton={true} onBackClick={handleBack}>
          Edit Tipe Pricing
        </PageTitle>
        <MasterTipePricingForm 
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
