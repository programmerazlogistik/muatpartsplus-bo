"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import SettingNilaiVariabelForm from "@/container/SettingNilaiVariabel/SettingNilaiVariabelForm";

export default function SettingNilaiVariabelDetailChangeContainer({
  id,
  onBack,
}) {
  const router = useRouter();
  const [initialData, setInitialData] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  // Simulate fetching data for detail change
  useEffect(() => {
    const fetchData = async () => {
      setPageLoading(true);

      try {
        // Simulate API call to get nilai variabel change data
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data - in real app, fetch from API using id
        const mockData = {
          id: id,
          route: "Jakarta - Surabaya",
          truckType: "CDD",
          formula: "Rumus 1",
          variable: "Variable 1",
          specialPrice: "15000",
          applicableFrom: "2024-01-15",
          isActive: true,
        };

        setInitialData(mockData);
      } catch (error) {
        console.error("Error fetching nilai variabel change data:", error);
        alert("Gagal memuat data. Silakan coba lagi.");
        if (onBack) {
          onBack();
        } else {
          router.back();
        }
      } finally {
        setPageLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, router, onBack]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  if (pageLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <SettingNilaiVariabelForm
      mode="detail"
      initialData={initialData}
      disabled={true}
      onBack={handleBack}
    />
  );
}
