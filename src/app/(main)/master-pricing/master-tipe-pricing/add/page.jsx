"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MasterTipePricingForm from "@/container/MasterTipePricing/MasterTipePricingForm";
import PageTitle from "@/components/PageTitle/PageTitle";

export default function MasterTipePricingAddPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    router.push("/master-pricing/master-tipe-pricing");
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Creating new tipe pricing:", formData);
      
      // In real app, call API here
      // await createTipePricing(formData);
      
      // Redirect back to list page
      router.push("/master-pricing/master-tipe-pricing");
      
    } catch (error) {
      console.error("Error creating tipe pricing:", error);
      alert("Gagal menyimpan data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <PageTitle showBackButton={true} onBackClick={handleBack}>
          Tambah Tipe Pricing
        </PageTitle>
        <MasterTipePricingForm 
          mode="add"
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </>
  );
}
