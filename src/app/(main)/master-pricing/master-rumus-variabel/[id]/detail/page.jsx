"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import PageTitle from "@/components/PageTitle/PageTitle";
import Button from "@/components/Button/Button";
import MasterRumusVariabelForm from "@/container/MasterRumusVariabel/MasterRumusVariableForm";

export default function MasterRumusVariabelDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data for detail
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Simulate API call to get rumus variabel data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - in real app, fetch from API using params.id
        const mockData = {
          id: params.id,
          formulaName: "4PL",
          isActive: true,
          variables: [
            { id: 1, name: "a" },
            { id: 2, name: "b" },
            { id: 3, name: "c" },
            { id: 4, name: "d" },
          ],
          createdAt: "2024-01-15T10:30:00Z",
          updatedAt: "2024-01-15T10:30:00Z",
        };
        
        setData(mockData);
        
      } catch (error) {
        console.error("Error fetching rumus variabel data:", error);
        alert("Gagal memuat data. Silakan coba lagi.");
        router.push("/master-pricing/master-rumus-variabel");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id, router]);

  const handleBack = () => {
    router.push("/master-pricing/master-rumus-variabel");
  };

  const handleEdit = () => {
    router.push(`/master-pricing/master-rumus-variabel/${params.id}/edit`);
  };

  const handleViewHistory = () => {
    router.push(`/master-pricing/master-rumus-variabel/${params.id}/history`);
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
          Detail Nama Rumus & Variabel
        </PageTitle>
        <Button
          variant="muatparts-primary"
          onClick={() => router.push(`/master-pricing/master-rumus-variabel/${params.id}/history`)}
        >
          Lihat History Perubahan
        </Button>
      </div>

      <MasterRumusVariabelForm 
        mode="detail"
        initialData={data}
        disabled={true}
        onEdit={handleEdit}
        onBack={handleBack}
      />
    </div>
  );
}
