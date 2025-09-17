"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button/Button";
import { FormContainer, FormLabel } from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import Toggle from "@/components/Toggle/Toggle";

import { useTranslation } from "@/hooks/use-translation";

const MasterTipePricingForm = ({ 
  mode = "add", // "add", "edit", or "detail"
  initialData = null, // Data for edit/detail mode
  onSubmit,
  loading = false,
  onDataChange,
  disabled = false, // For detail mode
  onEdit, // Callback for edit button in detail mode
  onBack // Callback for back button in detail mode
}) => {
  const { t = (key, _, fallback) => fallback || key } = useTranslation() || {};
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState({
    typeName: "",
    isActive: false,
  });

  // Load initial data for edit/detail mode
  useEffect(() => {
    if ((mode === "edit" || mode === "detail") && initialData) {
      setFormData({
        typeName: initialData.typeName || "",
        isActive: initialData.isActive || false,
      });
    }
  }, [mode, initialData]);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    if (disabled) return; // Don't allow changes in detail mode
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Notify parent component about data changes
    if (onDataChange) {
      onDataChange(true);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (disabled) return; // Don't submit in detail mode
    
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
              <FormLabel required={!disabled}>Nama Tipe</FormLabel>
              <Input
                placeholder="Masukkan Nama Tipe"
                value={formData.typeName}
                onChange={(e) => handleInputChange("typeName", e.target.value)}
                required={!disabled}
                disabled={disabled}
              />
            </FormContainer>

            <FormContainer className="items-center">
              <FormLabel>Status</FormLabel>
              <div onClick={(e) => e.preventDefault()}>
                <Toggle
                  value={formData.isActive}
                  onClick={(value) => handleInputChange("isActive", value)}
                  type="primary"
                  disabled={disabled}
                />
              </div>
            </FormContainer>
          </div>
        </div>

        {/* Action Buttons */}
        {mode === "detail" ? (
        //   <div className="flex justify-end space-x-4 pt-6">
        //     <Button
        //       type="button"
        //       variant="muatparts-primary-secondary"
        //       onClick={onBack}
        //     >
        //       Kembali
        //     </Button>
        //     <Button
        //       type="button"
        //       variant="muatparts-primary"
        //       onClick={onEdit}
        //     >
        //       Edit
        //     </Button>
        //   </div>
        <></>
        ) : (
          <div className="flex justify-center space-x-4 pt-6">
            <Button
              type="submit"
              variant="muatparts-primary"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default MasterTipePricingForm;