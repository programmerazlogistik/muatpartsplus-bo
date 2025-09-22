"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button/Button";
import DatePicker from "@/components/DatePicker/DatePicker";
import { FormContainer, FormLabel } from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import Radio from "@/components/Form/Radio";

export default function SettingMarginForm({ 
  mode = "add", 
  initialData = null, 
  onSaveClick, 
  isSubmitting, 
  onDataChange 
}) {
  const isDetailMode = mode === "detail";

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    defaultValues: initialData || {
      margin: "",
      modelMargin: "",
      effectiveDate: null
    },
    mode: isDetailMode ? "onSubmit" : "onChange" // Disable real-time validation for detail mode
  });

  const watchedModelMargin = watch("modelMargin");

  // Load initial data for edit/detail mode
  useEffect(() => {
    if (initialData && (mode === "edit" || mode === "detail")) {
      Object.keys(initialData).forEach(key => {
        setValue(key, initialData[key]);
      });
    }
  }, [initialData, mode, setValue]);

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (isDetailMode) return; // Don't submit in detail mode
    
    handleSubmit((data) => {
      console.log("Form data:", data);
      onDataChange(false); // Reset unsaved changes after successful save
      onSaveClick();
    })();
  };

  // Watch for form changes (only for add/edit mode)
  const watchedValues = watch();
  
  useEffect(() => {
    if (isDetailMode) return; // Don't watch changes in detail mode
    
    // Check if any field has meaningful data
    const hasChanges = Object.entries(watchedValues).some(([key, value]) => {
      if (key === 'effectiveDate') {
        return value !== null && value !== undefined;
      }
      if (key === 'margin') {
        return value !== "" && value !== null && value !== undefined && value > 0;
      }
      if (key === 'modelMargin') {
        return value !== "" && value !== null && value !== undefined;
      }
      return false;
    });
    
    console.log("Form values:", watchedValues);
    console.log("Has changes:", hasChanges);
    onDataChange(hasChanges);
  }, [watchedValues, onDataChange, isDetailMode]);

  return (
    <div>
      <form onSubmit={handleSubmitClick} className="space-y-6">
        {/* Margin Field */}
        <div className="flex items-start space-x-4">
          <div className="w-32 flex-shrink-0 pt-2">
            <FormLabel required={!isDetailMode}>Margin</FormLabel>
          </div>
          <div className="flex-1 mt-1.5">
            <div className="flex items-center">
              <Input
                type="number"
                placeholder="Masukkan Nilai Margin"
                disabled={isDetailMode}
                {...register("margin", { 
                  valueAsNumber: true,
                  required: isDetailMode ? false : "Margin wajib diisi",
                  min: {
                    value: 0,
                    message: "Margin harus lebih dari atau sama dengan 0"
                  },
                  max: {
                    value: 100,
                    message: "Margin tidak boleh lebih dari 100%"
                  }
                })}
                className={`flex-1 ${errors.margin ? "border-red-500" : ""} ${isDetailMode ? "bg-gray-50" : ""}`}
              />
              <span className="ml-2 text-gray-600 font-medium">%</span>
            </div>
            {!isDetailMode && errors.margin && (
              <span className="text-red-500 text-sm">{errors.margin.message}</span>
            )}
          </div>
        </div>

        {/* Model Margin Field */}
        <div className="flex items-start space-x-4">
          <div className="w-32 flex-shrink-0 pt-2">
            <FormLabel required={!isDetailMode}>Model Margin</FormLabel>
          </div>
          <div className="flex-1 mt-4">
            <input
              type="hidden"
              {...register("modelMargin", { required: isDetailMode ? false : "Model Margin wajib dipilih" })}
            />
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Radio
                  id="added-to-formula"
                  name="modelMargin"
                  value="added"
                  checked={watchedModelMargin === "added"}
                  onChange={(e) => !isDetailMode && setValue("modelMargin", e.target.value, { shouldValidate: true })}
                  disabled={isDetailMode}
                  className="mr-3"
                />
                <label 
                  htmlFor="added-to-formula" 
                  className={`text-sm text-gray-700 ${isDetailMode ? "cursor-default" : "cursor-pointer"}`}
                >
                  Ditambahkan ke hasil rumus pricing
                </label>
              </div>
              
              <div className="flex items-center">
                <Radio
                  id="included-in-formula"
                  name="modelMargin"
                  value="included"
                  checked={watchedModelMargin === "included"}
                  onChange={(e) => !isDetailMode && setValue("modelMargin", e.target.value, { shouldValidate: true })}
                  disabled={isDetailMode}
                  className="mr-3"
                />
                <label 
                  htmlFor="included-in-formula" 
                  className={`text-sm text-gray-700 ${isDetailMode ? "cursor-default" : "cursor-pointer"}`}
                >
                  Termasuk di dalam hasil rumus pricing
                </label>
              </div>
            </div>
            {!isDetailMode && errors.modelMargin && (
              <span className="text-red-500 text-sm">{errors.modelMargin.message}</span>
            )}
          </div>
        </div>

        {/* Effective Date Field */}
        <div className="flex items-start space-x-4">
          <div className="w-32 flex-shrink-0 pt-2">
            <FormLabel required={!isDetailMode}>Berlaku Mulai</FormLabel>
          </div>
          <div className="flex-1 mt-1.5">
            <input
              type="hidden"
              {...register("effectiveDate", { required: isDetailMode ? false : "Berlaku Mulai wajib diisi" })}
            />
            <DatePicker
              value={watch("effectiveDate")}
              onChange={(date) => !isDetailMode && setValue("effectiveDate", date, { shouldValidate: true })}
              placeholder="dd/mm/yyyy"
              errorMessage={!isDetailMode ? errors.effectiveDate?.message : undefined}
              className={`w-full ${isDetailMode ? "bg-gray-50" : ""}`}
              disabled={isDetailMode}
            />
          </div>
        </div>

        {/* Submit Button - Only show in add/edit mode */}
        {!isDetailMode && (
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              variant="muatparts-primary"
              disabled={isSubmitting}
              className="px-8 py-2"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}