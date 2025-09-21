"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import SettingNilaiVariabelForm from "@/container/SettingNilaiVariabel/SettingNilaiVariabelForm";

export default function SettingNilaiVariabelDetailContainer({ id, onBack }) {
  const router = useRouter();
  const [initialData, setInitialData] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  // Simulate fetching data for detail
  useEffect(() => {
    const fetchData = async () => {
      setPageLoading(true);

      try {
        // Simulate API call to get nilai variabel data
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data - in real app, fetch from API using id
        const mockData = {
          id: id,
          route: "Jakarta - Surabaya",
          truckType: "CDD",
          formula: null,
          variable: "",
          specialPrice: "",
          applicableFrom: "",
          isActive: true,
        };

        setInitialData(mockData);
      } catch (error) {
        console.error("Error fetching nilai variabel data:", error);
        alert("Gagal memuat data. Silakan coba lagi.");
        router.push("/master-pricing/setting-nilai-variabel");
      } finally {
        setPageLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, router]);

  const handleEdit = () => {
    router.push(`/master-pricing/setting-nilai-variabel/${id}/atur`);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push("/master-pricing/setting-nilai-variabel");
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
      onEdit={handleEdit}
      onBack={handleBack}
    />
  );
}
