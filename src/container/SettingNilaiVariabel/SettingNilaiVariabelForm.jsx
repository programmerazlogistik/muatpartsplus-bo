"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ChevronDownIcon } from "public/icons";

import Button from "@/components/Button/Button";
import { FormContainer, FormLabel } from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import Select from "@/components/Select/Select";
import Toggle from "@/components/Toggle/Toggle";

import VariablePricing from "@/container/SettingNilaiVariabel/VariablePricing";

import { useTranslation } from "@/hooks/use-translation";

// Import formula options
import { formulaOptions } from "@/lib/constants/formulaOptions";

import { IconComponent } from "@/components";

import SpecialPricePricing from "./SpecialPricePricing";

const SettingNilaiVariabelForm = ({
  mode = "add", // "add", "edit", or "detail"
  initialData = null, // Data for edit/detail mode
  onSubmit,
  loading = false,
  onDataChange,
  disabled = false, // For detail mode
  onEdit, // Callback for edit button in detail mode
  onBack, // Callback for back button in detail mode
  routeValue = "", // Value for route from collapsible trigger
  truckTypeValue = "", // Value for truck type from selected row
}) => {
  const { t = (key, _, fallback) => fallback || key } = useTranslation() || {};
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    route: routeValue || "",
    truckType: truckTypeValue || "",
    formula: null,
    variable: "",
    specialPrice: "",
    applicableFrom: "",
    isActive: true,
  });

  // Truck type options
  const truckTypeOptions = [
    { value: "CDD", label: "CDD" },
    { value: "CDL", label: "CDL" },
    { value: "Fuso", label: "Fuso" },
    { value: "Tronton", label: "Tronton" },
    { value: "Wing Box", label: "Wing Box" },
  ];

  // Update form data when routeValue or truckTypeValue props change
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      route: routeValue || prev.route || "",
      truckType: truckTypeValue || prev.truckType || "",
    }));
  }, [routeValue, truckTypeValue]);

  // Load initial data for edit/detail mode
  useEffect(() => {
    if ((mode === "edit" || mode === "detail") && initialData) {
      setFormData({
        route: initialData.route || routeValue || "",
        truckType: initialData.truckType || truckTypeValue || "",
        formula: initialData.formula || null,
        variable: initialData.variable || "",
        specialPrice: initialData.specialPrice || "",
        applicableFrom: initialData.applicableFrom || "",
        isActive:
          initialData.isActive !== undefined ? initialData.isActive : true,
      });
    }
  }, [mode, initialData, routeValue, truckTypeValue]);

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
    if (!formData.route.trim()) {
      alert("Rute harus diisi");
      return;
    }

    if (!formData.truckType) {
      alert("Jenis truk harus dipilih");
      return;
    }

    if (formData.formula === null || formData.formula === undefined) {
      alert("Rumus harus dipilih");
      return;
    }

    // If a formula is selected, validate the additional fields
    if (formData.formula && !formData.variable.trim()) {
      alert("Variabel harus diisi");
      return;
    }

    if (formData.formula && !formData.specialPrice.trim()) {
      alert("Harga khusus harus diisi");
      return;
    }

    if (!formData.applicableFrom) {
      alert("Berlaku mulai harus diisi");
      return;
    }

    // Call parent onSubmit handler
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1">
          <div className="space-y-6">
            <FormContainer>
              <FormLabel required={disabled}>Rute</FormLabel>
              <Input
                placeholder="Masukkan Rute"
                value={formData.route}
                onChange={(e) => handleInputChange("route", e.target.value)}
                required={!disabled}
                disabled={true} // Always disabled as per requirement
              />
            </FormContainer>

            <FormContainer>
              <FormLabel required={disabled}>Jenis Truk</FormLabel>
              <Input
                placeholder="Masukkan Jenis Truk"
                value={formData.truckType}
                onChange={(e) => handleInputChange("truckType", e.target.value)}
                required={!disabled}
                disabled={true} // Always disabled as per requirement
              />
            </FormContainer>

            <FormContainer>
              <FormLabel required={true}>Rumus</FormLabel>
              <Select.Root
                value={formData.formula}
                onValueChange={(value) => handleInputChange("formula", value)}
                disabled={disabled}
              >
                <Select.Trigger placeholder="Pilih Rumus">
                  <Select.Value placeholder="Pilih Rumus">
                    {formData.formula
                      ? formulaOptions.find(
                          (option) => option.value === formData.formula
                        )?.label
                      : "Pilih Rumus"}
                  </Select.Value>
                </Select.Trigger>
                <Select.Content searchable searchPlaceholder="Cari rumus...">
                  {formulaOptions.map((option) => (
                    <Select.Item
                      key={option.value}
                      value={option.value}
                      textValue={option.label}
                      className="mb-3"
                    >
                      <span className="h-3 truncate text-xs font-medium text-neutral-900">
                        {option.label}
                      </span>
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </FormContainer>

            {/* Show variable and special price fields only when a formula is selected */}
            {formData.formula && (
              <>
                <VariablePricing
                  disabled={disabled}
                  required={!disabled}
                  variableValue={formData.variable}
                  specialPriceValue={formData.specialPrice}
                  onVariableChange={(value) =>
                    handleInputChange("variable", value)
                  }
                  onSpecialPriceChange={(value) =>
                    handleInputChange("specialPrice", value)
                  }
                />
                <SpecialPricePricing
                  disabled={disabled}
                  required={!disabled}
                  variableValue={formData.variable}
                  specialPriceValue={formData.specialPrice}
                  onVariableChange={(value) =>
                    handleInputChange("variable", value)
                  }
                  onSpecialPriceChange={(value) =>
                    handleInputChange("specialPrice", value)
                  }
                />
              </>
            )}

            <FormContainer>
              <FormLabel required={!disabled}>Berlaku Mulai</FormLabel>
              <Input
                placeholder="Masukkan Tanggal Berlaku"
                value={formData.applicableFrom}
                onChange={(e) =>
                  handleInputChange("applicableFrom", e.target.value)
                }
                required={!disabled}
                disabled={disabled}
                type="date"
              />
            </FormContainer>
          </div>
        </div>

        {/* Action Buttons - Only show save button, remove cancel button as requested */}
        {mode !== "detail" && (
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              variant="muatparts-primary"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        )}

        {/* Action Buttons for detail mode */}
        {mode === "detail" && (
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
        )}
      </form>
    </div>
  );
};

export default SettingNilaiVariabelForm;
