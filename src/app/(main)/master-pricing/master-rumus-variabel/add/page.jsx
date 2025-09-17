"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MasterRumusVariabelForm from "@/container/MasterRumusVariabel/MasterRumusVariableForm";
import PageTitle from "@/components/PageTitle/PageTitle";

export default function MasterRumusVariabelAddPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    router.push("/master-pricing/master-rumus-variabel");
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Creating new rumus variabel:", formData);
      
      // In real app, call API here
      // await createRumusVariabel(formData);
      
      // Redirect back to list page
      router.push("/master-pricing/master-rumus-variabel");
      
    } catch (error) {
      console.error("Error creating rumus variabel:", error);
      alert("Gagal menyimpan data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <PageTitle showBackButton={true} onBackClick={handleBack}>
          Tambah Nama Rumus & Variabel
        </PageTitle>
        <MasterRumusVariabelForm 
          mode="add"
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </>
  );
}