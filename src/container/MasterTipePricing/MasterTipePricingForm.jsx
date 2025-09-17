"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button/Button";
import { FormContainer, FormLabel } from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import Toggle from "@/components/Toggle/Toggle";

import { useTranslation } from "@/hooks/use-translation";

const MasterTipePricingForm = ({ 
  mode = "add", // "add" or "edit"
  initialData = null, // Data for edit mode
  onSubmit,
  loading = false 
}) => {
  const { t = (key, _, fallback) => fallback || key } = useTranslation() || {};
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState({
    typeName: "",
    isActive: false,
  });

  // Load initial data for edit mode
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        typeName: initialData.typeName || "",
        isActive: initialData.isActive || false,
      });
    }
  }, [mode, initialData]);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.typeName.trim()) {
      alert("Nama Tipe harus diisi");
      return;
    }

    // Call parent onSubmit handler
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    router.back();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1">
          <div className="space-y-6">
            <FormContainer>
              <FormLabel required>Nama Tipe</FormLabel>
              <Input
                placeholder="Masukkan Nama Tipe"
                value={formData.typeName}
                onChange={(e) => handleInputChange("typeName", e.target.value)}
                required
              />
            </FormContainer>

            <FormContainer className="items-center">
              <FormLabel>Status</FormLabel>
              <Toggle
                value={formData.isActive}
                onClick={(value) => handleInputChange("isActive", value)}
                type="primary"
              />
            </FormContainer>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 pt-6">
          <Button
            type="submit"
            variant="muatparts-primary"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MasterTipePricingForm;