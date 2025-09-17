"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import MasterTipePricingForm from "@/container/MasterTipePricing/MasterTipePricingForm";
import PageTitle from "@/components/PageTitle/PageTitle";

export default function MasterTipePricingEditPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

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
    router.push("/master-pricing/master-tipe-pricing");
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Updating tipe pricing:", { id: params.id, ...formData });
      
      // In real app, call API here
      // await updateTipePricing(params.id, formData);
      
      // Redirect back to list page
      router.push("/master-pricing/master-tipe-pricing");
      
    } catch (error) {
      console.error("Error updating tipe pricing:", error);
      alert("Gagal menyimpan data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
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
        />
      </div>
    </>
  );
}
