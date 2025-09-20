"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/Button/Button";
import PageTitle from "@/components/PageTitle/PageTitle";

import SettingNilaiVariabelForm from "@/container/SettingNilaiVariabel/SettingNilaiVariabelForm";

export default function SettingNilaiVariabelDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data for detail
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Simulate API call to get nilai variabel data
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data - in real app, fetch from API using params.id
        const mockData = {
          id: params.id,
          variableName: "Tarif Dasar",
          value: "15000",
          unit: "Rupiah",
          isActive: true,
          createdAt: "2024-01-15T10:30:00Z",
          updatedAt: "2024-01-15T10:30:00Z",
        };

        setData(mockData);
      } catch (error) {
        console.error("Error fetching nilai variabel data:", error);
        alert("Gagal memuat data. Silakan coba lagi.");
        router.push("/master-pricing/setting-nilai-variabel");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id, router]);

  const handleBack = () => {
    router.push("/master-pricing/setting-nilai-variabel");
  };

  const handleEdit = () => {
    router.push(`/master-pricing/setting-nilai-variabel/${params.id}/edit`);
  };

  const handleViewHistory = () => {
    router.push(`/master-pricing/setting-nilai-variabel/${params.id}/history`);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-64 items-center justify-center">
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
          Detail Setting Nilai Variabel
        </PageTitle>
        <Button variant="muatparts-primary" onClick={handleViewHistory}>
          Lihat History Perubahan
        </Button>
      </div>
    </div>
  );
}
