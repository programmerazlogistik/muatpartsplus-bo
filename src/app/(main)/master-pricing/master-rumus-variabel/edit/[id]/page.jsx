"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import MasterRumusVariabelForm from "@/container/MasterRumusVariabel/MasterRumusVariableForm";
import PageTitle from "@/components/PageTitle/PageTitle";

export default function MasterRumusVariabelEditPage() {
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
          ]
        };
        
        setInitialData(mockData);
        
      } catch (error) {
        console.error("Error fetching rumus variabel data:", error);
        alert("Gagal memuat data. Silakan coba lagi.");
        router.push("/master-pricing/master-rumus-variabel");
      } finally {
        setPageLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id, router]);

  const handleBack = () => {
    router.push("/master-pricing/master-rumus-variabel");
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Updating rumus variabel:", { id: params.id, ...formData });
      
      // In real app, call API here
      // await updateRumusVariabel(params.id, formData);
      
      // Redirect back to list page
      router.push("/master-pricing/master-rumus-variabel");
      
    } catch (error) {
      console.error("Error updating rumus variabel:", error);
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
          Edit Nama Rumus & Variabel
        </PageTitle>
        <MasterRumusVariabelForm 
          mode="edit"
          initialData={initialData}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </>
  );
}
