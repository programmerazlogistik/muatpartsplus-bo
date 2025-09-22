"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button/Button";
import SettingMarginForm from "@/container/SettingMargin/SettingMarginForm";

export default function SettingMarginDetailPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    margin: "15",
    modelMargin: "added",
    effectiveDate: new Date("2024-12-30")
  });

  const handleBackClick = () => {
    router.push("/master-pricing");
  };

  const handleViewHistory = () => {
    router.push("/master-pricing/setting-margin/1/history");
  };

  return (
    <>
      <div className="flex justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBackClick}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-xl font-semibold">Detail Perubahan Data</span>
          </button>
        </div>
        <Button variant="muatparts-primary" onClick={handleViewHistory}>
          <span className="pt-0.5 font-semibold text-sm">Lihat History Perubahan</span>
        </Button>
      </div>

      {/* Waktu Update */}
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-32 flex-shrink-0">
            <span className="text-sm font-medium text-gray-700">Waktu Update</span>
          </div>
          <div className="flex-1">
            <span className="text-sm text-gray-900">08/07/2023 10:50 WIB</span>
          </div>
        </div>
      </div>

      <div>
        <SettingMarginForm 
          mode="detail"
          initialData={formData}
          onSaveClick={() => {}}
          isSubmitting={false}
          onDataChange={() => {}}
        />
      </div>
    </>
  );
}

