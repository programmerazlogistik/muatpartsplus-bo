"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button/Button";
import DatePicker from "@/components/DatePicker/DatePicker";
import { FormContainer, FormLabel } from "@/components/Form/Form";
import Input from "@/components/Form/Input";

export default function SettingTarifMinimalForm({ 
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
      coltDieselEngkel: "",
      coltDieselDouble: "",
      mediumTruckRigid4x2: "",
      mediumTruck6x2Rigid: "",
      mediumTruckRigid6x4: "",
      mediumTruck4x2Gandengan: "",
      tractorHead4x2SemiTrailer: "",
      tractorHead6x4SemiTrailer: "",
      effectiveDate: null
    },
    mode: isDetailMode ? "onSubmit" : "onChange" // Disable real-time validation for detail mode
  });

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
    
    // Check if any field has meaningful data (not empty, not null, not undefined)
    const hasChanges = Object.entries(watchedValues).some(([key, value]) => {
      if (key === 'effectiveDate') {
        return value !== null && value !== undefined;
      }
      // For number fields, only consider it changed if it's a positive number
      return value !== "" && value !== null && value !== undefined && value > 0;
    });
    
    console.log("Form values:", watchedValues);
    console.log("Has changes:", hasChanges);
    onDataChange(hasChanges);
  }, [watchedValues, onDataChange, isDetailMode]);

  const vehicleTypes = [
    {
      key: "coltDieselEngkel",
      label: "Colt Diesel Engkel"
    },
    {
      key: "coltDieselDouble", 
      label: "Colt Diesel Double"
    },
    {
      key: "mediumTruckRigid4x2",
      label: "Medium truck Rigid 4 x 2"
    },
    {
      key: "mediumTruck6x2Rigid",
      label: "Medium truck 6 x 2 (Rigid)"
    },
    {
      key: "mediumTruckRigid6x4",
      label: "Medium Truck Rigid 6 x 4"
    },
    {
      key: "mediumTruck4x2Gandengan",
      label: "Medium truck 4 x 2 + gandengan"
    },
    {
      key: "tractorHead4x2SemiTrailer",
      label: "Tractor Head 4x2 dan Medium Semi Trailer"
    },
    {
      key: "tractorHead6x4SemiTrailer",
      label: "Tractor head 6 x 4 dan Semi Trailer"
    }
  ];

  return (
    <div>
      <form onSubmit={handleSubmitClick} className="space-y-6">
        {/* Vehicle Type Fields */}
        {vehicleTypes.map((vehicle) => (
          <div key={vehicle.key} className="flex items-start space-x-4">
            <div className="w-48 flex-shrink-0 pt-2">
              <FormLabel>{vehicle.label}</FormLabel>
            </div>
            <div className="flex-1 mt-1.5">
              <div className="flex items-center w-72">
                <Input
                  type="number"
                  placeholder="Masukkan Minimal Jarak Tempuh"
                  disabled={isDetailMode}
                  {...register(vehicle.key, { 
                    valueAsNumber: true,
                    required: isDetailMode ? false : `${vehicle.label} wajib diisi`,
                    min: {
                      value: 0,
                      message: "Jarak tempuh harus lebih dari atau sama dengan 0"
                    }
                  })}
                  className={`flex-1 ${errors[vehicle.key] ? "border-red-500" : ""} ${isDetailMode ? "bg-gray-50" : ""}`}
                />
                <span className="ml-2 text-gray-600 font-medium">km</span>
              </div>
              {!isDetailMode && errors[vehicle.key] && (
                <span className="text-red-500 text-sm">{errors[vehicle.key].message}</span>
              )}
            </div>
          </div>
        ))}

        {/* Effective Date Field */}
        <div className="flex items-start space-x-4">
          <div className="w-48 flex-shrink-0 pt-2">
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
              className={`w-72 ${isDetailMode ? "bg-gray-50" : ""}`}
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