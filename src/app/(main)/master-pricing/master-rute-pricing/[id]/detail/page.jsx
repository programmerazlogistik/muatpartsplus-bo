"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import PageTitle from "@/components/PageTitle/PageTitle";
import Button from "@/components/Button/Button";
import MasterRutePricingForm from "@/container/MasterRutePricing/MasterRutePricingForm";

export default function MasterRutePricingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data for detail
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Simulate API call to get route pricing data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - in real app, fetch from API using params.id
        const mockData = {
          id: params.id,
          alias: "Jawa - Sumatera",
          loadingProvince: [
            { value: "jawa-barat", label: "Jawa Barat" },
            { value: "dki-jakarta", label: "DKI Jakarta" }
          ],
          unloadingProvince: [
            { value: "sumatera-utara", label: "Sumatera Utara" },
            { value: "sumatera-selatan", label: "Sumatera Selatan" }
          ],
          isActive: true,
          createSpecialPriceRoute: true,
          specialRoutes: [
            { id: 1, originLocation: "Jakarta", destinationLocation: "Medan" },
            { id: 2, originLocation: "Bandung", destinationLocation: "Palembang" },
          ],
          createdAt: "2024-01-15T10:30:00Z",
          updatedAt: "2024-01-15T10:30:00Z",
        };
        
        setData(mockData);
        
      } catch (error) {
        console.error("Error fetching route pricing data:", error);
        alert("Gagal memuat data. Silakan coba lagi.");
        router.push("/master-pricing/master-rute-pricing");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id, router]);

  const handleBack = () => {
    router.push("/master-pricing/master-rute-pricing");
  };

  const handleEdit = () => {
    router.push(`/master-pricing/master-rute-pricing/${params.id}/edit`);
  };

  const handleViewHistory = () => {
    // TODO: Implement history view functionality
    console.log("View change history for ID:", params.id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-600">Data tidak ditemukan</p>
          <Button
            variant="muatparts-primary"
            onClick={handleBack}
            className="mt-4"
          >
            Kembali
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageTitle showBackButton={true} onBackClick={handleBack}>
          Detail Rute Pricing
        </PageTitle>
        <Button
          variant="muatparts-primary"
          onClick={handleViewHistory}
        >
          Lihat History Perubahan
        </Button>
      </div>

      <MasterRutePricingForm 
        mode="detail"
        initialData={data}
        disabled={true}
        onEdit={handleEdit}
        onBack={handleBack}
      />
    </div>
  );
}
