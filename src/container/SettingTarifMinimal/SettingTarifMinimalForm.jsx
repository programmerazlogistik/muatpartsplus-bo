"use client";
import { useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button/Button";
import DatePicker from "@/components/DatePicker/DatePicker";
import { FormContainer, FormLabel } from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import { useGetTruckTypes, transformTruckTypesToFormData } from "@/services/masterpricing/settingMinimumRate/getTruckTypes";
import { useGetMinRatesList } from "@/services/masterpricing/settingMinimumRate/getMinRatesList";

export default function SettingTarifMinimalForm({ 
  mode = "add", 
  initialData = null, 
  onSaveClick, 
  isSubmitting, 
  onDataChange 
}) {
  const isDetailMode = mode === "detail";
  
  // Get truck types from API
  const { data: truckTypesResponse, error: truckTypesError, isLoading: truckTypesLoading } = useGetTruckTypes();
  const truckTypesData = truckTypesResponse?.data?.Data || [];
  const vehicleTypes = transformTruckTypesToFormData(truckTypesData);

  // Get existing min rates data
  const { data: minRatesResponse, error: minRatesError, isLoading: minRatesLoading } = useGetMinRatesList();
  const existingMinRates = useMemo(() => minRatesResponse?.data?.Data?.data || [], [minRatesResponse]);
  
  // Ref to prevent loading data multiple times
  const hasLoadedExistingData = useRef(false);
  
  // Ref to prevent callback loops
  const lastChangeDetection = useRef(null);
  
  // Ref to prevent detail mode data loading multiple times
  const hasLoadedDetailData = useRef(false);
  
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

  // Load data from detail page API (for detail mode)
  useEffect(() => {
    if (mode === "detail" && initialData && !hasLoadedDetailData.current) {
      console.log("Form Detail Mode - Initial Data:", initialData);
      console.log("Form Detail Mode - Mode:", mode);
      
      // For detail mode, use the data passed from the parent component
      // which comes from the history detail API
      Object.keys(initialData).forEach(key => {
        console.log(`Setting ${key} to:`, initialData[key]);
        setValue(key, initialData[key]);
      });
      
      // Mark as loaded to prevent re-loading
      hasLoadedDetailData.current = true;
    }
  }, [initialData, mode, setValue]);

  // Load existing data from API when available (only for add mode)
  useEffect(() => {
    if (existingMinRates.length > 0 && !initialData && vehicleTypes.length > 0 && !hasLoadedExistingData.current && mode === "add") {
      // Create a map of existing data by truckTypeId
      const existingDataMap = {};
      let validFromDate = null;

      existingMinRates.forEach(rate => {
        existingDataMap[rate.truckTypeId] = rate.minDistance;
        // Use the first validFrom date (they should all be the same)
        if (!validFromDate) {
          validFromDate = new Date(rate.validFrom);
        }
      });

      // Set form values for each vehicle type
      vehicleTypes.forEach(vehicle => {
        if (existingDataMap[vehicle.id]) {
          setValue(vehicle.id, existingDataMap[vehicle.id]);
        }
      });

      // Set effective date from validFrom
      if (validFromDate) {
        setValue("effectiveDate", validFromDate);
      }

      // Mark as loaded to prevent re-loading
      hasLoadedExistingData.current = true;
    }
  }, [existingMinRates, vehicleTypes, setValue, initialData, mode]);

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
  
  // Memoize the change detection to prevent unnecessary recalculations
  const changeDetection = useMemo(() => {
    if (isDetailMode) return { hasChanges: false, formData: null };
    
    // Check if any field has meaningful data (not empty, not null, not undefined)
    const hasChanges = Object.entries(watchedValues).some(([key, value]) => {
      if (key === 'effectiveDate') {
        return value !== null && value !== undefined;
      }
      // For number fields, only consider it changed if it's a positive number
      return value !== "" && value !== null && value !== undefined && value > 0;
    });
    
    return { hasChanges, formData: hasChanges ? watchedValues : null };
  }, [watchedValues, isDetailMode]);
  
  useEffect(() => {
    if (isDetailMode) return; // Don't watch changes in detail mode
    
    const timeoutId = setTimeout(() => {
      // Check if the change detection result is different from the last one
      const currentDetection = JSON.stringify(changeDetection);
      if (lastChangeDetection.current === currentDetection) {
        return; // Skip if same as last detection
      }
      
      lastChangeDetection.current = currentDetection;
      
      console.log("Form values:", watchedValues);
      console.log("Has changes:", changeDetection.hasChanges);
      onDataChange(changeDetection.hasChanges, changeDetection.formData);
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [changeDetection, onDataChange, isDetailMode]); // eslint-disable-line react-hooks/exhaustive-deps


  // Show loading state while fetching data
  if (truckTypesLoading || minRatesLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-500">Memuat data...</div>
      </div>
    );
  }

  // Show error state if data failed to load
  if (truckTypesError || minRatesError) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-500">Gagal memuat data. Silakan coba lagi.</div>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmitClick} className="space-y-6">
        {/* Vehicle Type Fields */}
        {vehicleTypes.map((vehicle) => (
          <div key={vehicle.id} className="flex items-start space-x-4">
            <div className="w-48 flex-shrink-0 pt-2">
              <FormLabel>{vehicle.description}</FormLabel>
            </div>
            <div className="flex-1 mt-1.5">
              <div className="flex items-center w-72">
                <Input
                  type="number"
                  placeholder="Masukkan Minimal Jarak Tempuh"
                  disabled={isDetailMode}
                  {...register(vehicle.id, { 
                    valueAsNumber: true,
                    required: isDetailMode ? false : `${vehicle.description} wajib diisi`,
                    min: {
                      value: 0,
                      message: "Jarak tempuh harus lebih dari atau sama dengan 0"
                    }
                  })}
                  className={`flex-1 ${errors[vehicle.id] ? "border-red-500" : ""} ${isDetailMode ? "bg-gray-50" : ""}`}
                />
                <span className="ml-2 text-gray-600 font-medium">km</span>
              </div>
              {!isDetailMode && errors[vehicle.id] && (
                <span className="text-red-500 text-sm">{errors[vehicle.id].message}</span>
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