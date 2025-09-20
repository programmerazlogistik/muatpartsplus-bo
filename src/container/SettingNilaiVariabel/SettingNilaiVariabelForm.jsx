"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/Button/Button";
import { FormContainer, FormLabel } from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import Select from "@/components/Select/Select";
import Toggle from "@/components/Toggle/Toggle";

import { useTranslation } from "@/hooks/use-translation";

const SettingNilaiVariabelForm = ({
  mode = "add", // "add", "edit", or "detail"
  initialData = null, // Data for edit/detail mode
  onSubmit,
  loading = false,
  onDataChange,
  disabled = false, // For detail mode
  onEdit, // Callback for edit button in detail mode
  onBack, // Callback for back button in detail mode
}) => {
  const { t = (key, _, fallback) => fallback || key } = useTranslation() || {};
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    variableName: "",
    value: "",
    unit: "",
    isActive: false,
  });

  // Unit options
  const unitOptions = [
    { value: "KM", label: "KM" },
    { value: "M", label: "Meter" },
    { value: "KG", label: "Kilogram" },
    { value: "TON", label: "Ton" },
    { value: "M3", label: "Meter Kubik" },
    { value: "Rupiah", label: "Rupiah" },
    { value: "Percent", label: "Persen (%)" },
    { value: "Jam", label: "Jam" },
    { value: "Hari", label: "Hari" },
  ];

  // Load initial data for edit/detail mode
  useEffect(() => {
    if ((mode === "edit" || mode === "detail") && initialData) {
      setFormData({
        variableName: initialData.variableName || "",
        value: initialData.value || "",
        unit: initialData.unit || "",
        isActive: initialData.isActive || false,
      });
    }
  }, [mode, initialData]);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    if (disabled) return; // Don't allow changes in detail mode

    setFormData((prev) => ({
      ...prev,
      [field]: value,
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
    if (!formData.variableName.trim()) {
      alert("Nama Variabel harus diisi");
      return;
    }

    if (!formData.value.trim()) {
      alert("Nilai harus diisi");
      return;
    }

    if (!formData.unit) {
      alert("Satuan harus dipilih");
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
              <FormLabel required={!disabled}>Nama Variabel</FormLabel>
              <Input
                placeholder="Masukkan Nama Variabel"
                value={formData.variableName}
                onChange={(e) =>
                  handleInputChange("variableName", e.target.value)
                }
                required={!disabled}
                disabled={disabled}
              />
            </FormContainer>

            <div className="grid grid-cols-2 gap-6">
              <FormContainer>
                <FormLabel required={!disabled}>Nilai</FormLabel>
                <Input
                  placeholder="Masukkan Nilai"
                  value={formData.value}
                  onChange={(e) => handleInputChange("value", e.target.value)}
                  required={!disabled}
                  disabled={disabled}
                  type="number"
                />
              </FormContainer>

              <FormContainer>
                <FormLabel required={!disabled}>Satuan</FormLabel>
                <Select
                  placeholder="Pilih Satuan"
                  value={formData.unit}
                  onChange={(value) => handleInputChange("unit", value)}
                  options={unitOptions}
                  required={!disabled}
                  disabled={disabled}
                />
              </FormContainer>
            </div>

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
          <div className="flex justify-end space-x-4 pt-6">
            <Button
              type="button"
              variant="muatparts-primary-secondary"
              onClick={onBack}
            >
              Kembali
            </Button>
            <Button type="button" variant="muatparts-primary" onClick={onEdit}>
              Edit
            </Button>
          </div>
        ) : (
          <div className="flex justify-center space-x-4 pt-6">
            <Button
              type="button"
              variant="muatparts-primary-secondary"
              onClick={handleCancel}
              disabled={loading}
            >
              Batal
            </Button>
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

export default SettingNilaiVariabelForm;
