"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ChevronDownIcon } from "public/icons";
// Import Valibot for validation
import * as v from "valibot";

// Import formula variables service
import {
  transformFormulaVariablesToDropdownData,
  useGetFormulaVariables,
} from "@/services/masterpricing/settingnilaivariable/getFormulaVariables";

import Button from "@/components/Button/Button";
import DatePicker from "@/components/DatePicker/DatePicker";
import { FormContainer, FormLabel } from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import Select from "@/components/Select/Select";

import VariablePricing from "@/container/SettingNilaiVariabel/VariablePricing";

import { useTranslation } from "@/hooks/use-translation";

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

  // Fetch formula variables using SWR hook
  const {
    data: formulaData,
    error: formulaError,
    isLoading: formulaLoading,
  } = useGetFormulaVariables();
  // Transform API data to dropdown format
  const formulaOptions = formulaData?.data?.Data?.data
    ? transformFormulaVariablesToDropdownData(formulaData.data.Data.data)
    : [];
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

  // Validation errors state
  const [errors, setErrors] = useState({});

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

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }

    // Notify parent component about data changes
    if (onDataChange) {
      onDataChange(true);
    }
  };

  // Handle error from child components
  const handleChildError = (field, errorMessage) => {
    setErrors((prev) => ({
      ...prev,
      [field]: errorMessage,
    }));
  };

  // Validate form using Valibot
  const validateForm = () => {
    // Define validation schema
    const schema = v.object({
      route: v.string(),
      truckType: v.string(),
      formula: v.nullable(v.string()),
      variable: v.string(),
      specialPrice: v.string(),
      applicableFrom: v.string(),
      isActive: v.boolean(),
    });

    // Create partial schema for conditional validation
    const partialSchema = v.partial(schema);

    // Validate basic form data
    const result = v.safeParse(partialSchema, formData);

    if (!result.success) {
      // If validation fails, extract error messages
      const fieldErrors = {};
      result.issues.forEach((issue) => {
        const path = issue.path?.[0]?.key || "";
        fieldErrors[path] = issue.message;
      });
      return fieldErrors;
    }

    // Additional custom validation
    const customErrors = {};

    // Validate formula is selected
    if (formData.formula === null || formData.formula === undefined) {
      customErrors.formula = "Rumus wajib dipilih";
    }

    // If a formula is selected, validate the additional fields
    if (formData.formula && !formData.variable.trim()) {
      customErrors.variable = "Variabel harus diisi";
    }

    if (formData.formula && !formData.specialPrice.trim()) {
      customErrors.specialPrice = "Harga khusus harus diisi";
    }

    if (!formData.applicableFrom) {
      customErrors.applicableFrom = "Berlaku Mulai wajib diisi";
    }

    return customErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (disabled) return; // Don't submit in detail mode

    // Validate form
    const validationErrors = validateForm();
    setErrors(validationErrors);

    // If there are validation errors, don't submit
    if (Object.keys(validationErrors).length > 0) {
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
                <Select.Trigger
                  placeholder="Pilih Rumus"
                  errorMessage={errors.formula}
                  isError={!!errors.formula}
                >
                  <Select.Value placeholder="Pilih Rumus">
                    {formData.formula
                      ? formulaOptions.find(
                          (option) => option.value === formData.formula
                        )?.label
                      : formulaLoading
                        ? "Memuat..."
                        : "Pilih Rumus"}
                  </Select.Value>
                </Select.Trigger>
                <Select.Content searchable searchPlaceholder="Cari Rumus">
                  {formulaLoading ? (
                    <Select.Item value="loading" textValue="Memuat..." disabled>
                      <span className="h-3 truncate text-xs font-medium text-neutral-900">
                        Memuat...
                      </span>
                    </Select.Item>
                  ) : formulaError ? (
                    <Select.Item value="error" textValue="Error" disabled>
                      <span className="h-3 truncate text-xs font-medium text-red-500">
                        Gagal memuat data
                      </span>
                    </Select.Item>
                  ) : formulaOptions.length === 0 ? (
                    <Select.Item
                      value="empty"
                      textValue="Tidak ada data"
                      disabled
                    >
                      <span className="h-3 truncate text-xs font-medium text-neutral-500">
                        Tidak ada data rumus
                      </span>
                    </Select.Item>
                  ) : (
                    formulaOptions.map((option) => (
                      <Select.Item
                        key={option.value}
                        value={option.value}
                        textValue={option.label}
                      >
                        <span className="h-3 truncate text-xs font-medium text-neutral-900">
                          {option.label}
                        </span>
                      </Select.Item>
                    ))
                  )}
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
                  onError={handleChildError}
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
                  onError={handleChildError}
                />
              </>
            )}

            <FormContainer>
              <FormLabel required={!disabled}>Berlaku Mulai</FormLabel>
              <DatePicker
                placeholder="dd/mm/yyyy"
                value={
                  formData.applicableFrom
                    ? new Date(formData.applicableFrom)
                    : null
                }
                onChange={(date) => {
                  const dateString = date
                    ? date.toISOString().split("T")[0]
                    : "";
                  handleInputChange("applicableFrom", dateString);
                }}
                disabled={disabled}
                iconPosition="right"
                errorMessage={errors.applicableFrom}
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
