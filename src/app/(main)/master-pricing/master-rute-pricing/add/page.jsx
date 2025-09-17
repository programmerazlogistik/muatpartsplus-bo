"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MasterRutePricingForm from "@/container/MasterRutePricing/MasterRutePricingForm";
import PageTitle from "@/components/PageTitle/PageTitle";

export default function MasterRutePricingAddPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    router.push("/master-pricing/master-rute-pricing");
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Creating new route pricing:", formData);
      
      // In real app, call API here
      // await createRoutePricing(formData);
      
      // Redirect back to list page
      router.push("/master-pricing/master-rute-pricing");
      
    } catch (error) {
      console.error("Error creating route pricing:", error);
      alert("Gagal menyimpan data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
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
        />
      </div>
    </>
  );
}