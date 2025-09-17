"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import MasterRutePricingForm from "@/container/MasterRutePricing/MasterRutePricingForm";
import PageTitle from "@/components/PageTitle/PageTitle";

export default function MasterRutePricingEditPage() {
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
        // Simulate API call to get route pricing data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - in real app, fetch from API using params.id
        const mockData = {
          id: params.id,
          alias: "Jawa - Sumatera",
          loadingProvince: "jawa-barat",
          unloadingProvince: "sumatera-utara",
          isActive: true,
          createSpecialPriceRoute: false,
        };
        
        setInitialData(mockData);
        
      } catch (error) {
        console.error("Error fetching route pricing data:", error);
        alert("Gagal memuat data. Silakan coba lagi.");
        router.push("/master-pricing/master-rute-pricing");
      } finally {
        setPageLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id, router]);

  const handleBack = () => {
    router.push("/master-pricing/master-rute-pricing");
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Updating route pricing:", { id: params.id, ...formData });
      
      // In real app, call API here
      // await updateRoutePricing(params.id, formData);
      
      // Redirect back to list page
      router.push("/master-pricing/master-rute-pricing");
      
    } catch (error) {
      console.error("Error updating route pricing:", error);
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
          Edit Rute Pricing
        </PageTitle>
        <MasterRutePricingForm 
          mode="edit"
          initialData={initialData}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </>
  );
}
