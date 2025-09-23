"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button/Button";
import { FormContainer, FormLabel } from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import { Select } from "@/components/Form/Select";
import Toggle from "@/components/Toggle/Toggle";

import { useTranslation } from "@/hooks/use-translation";
import MultiSelectDropdown from "@/components/MultiSelectDropdown/MultiSelectDropdown";
import { useGetOriginProvinces, useGetDestinationProvinces, transformProvinceDataToMultiSelect } from "@/services/masterpricing/masterrute/getProvinceRoute";
import { useGetCitiesAsFlatList, transformCitiesToDropdownFormat } from "@/services/masterpricing/masterrute/getCityByProvince";

const MasterRutePricingForm = ({ 
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
  
  // API hooks for provinces
  const { data: originProvincesData, error: originError, isLoading: originLoading } = useGetOriginProvinces();
  const { data: destinationProvincesData, error: destinationError, isLoading: destinationLoading } = useGetDestinationProvinces();
  
  // Transform API data to dropdown format
  const originProvinceOptions = transformProvinceDataToMultiSelect(originProvincesData?.data?.Data || []);
  const destinationProvinceOptions = transformProvinceDataToMultiSelect(destinationProvincesData?.data?.Data || []);
  
  
  // Form state
  const [formData, setFormData] = useState({
    alias: "",
    loadingProvince: [],
    unloadingProvince: [],
    isActive: false,
    createSpecialPriceRoute: false,
  });

  // Special price routes state
  const [specialRoutes, setSpecialRoutes] = useState([
    {
      id: 1,
      originLocation: "",
      destinationLocation: "",
    }
  ]);

  // Get selected province IDs
  const selectedOriginProvinceIds = formData.loadingProvince.map(province => province.id || province.value);
  const selectedDestinationProvinceIds = formData.unloadingProvince.map(province => province.id || province.value);
  
  // API hooks for cities based on selected provinces
  const { data: originCitiesData, error: originCitiesError, isLoading: originCitiesLoading } = useGetCitiesAsFlatList(
    selectedOriginProvinceIds,
    { 
      revalidateOnFocus: false,
      // Only fetch if we have province IDs
      shouldRetryOnError: false
    }
  );
  const { data: destinationCitiesData, error: destinationCitiesError, isLoading: destinationCitiesLoading } = useGetCitiesAsFlatList(
    selectedDestinationProvinceIds,
    { 
      revalidateOnFocus: false,
      // Only fetch if we have province IDs
      shouldRetryOnError: false
    }
  );
    
 

  // Load initial data for edit/detail mode
  useEffect(() => {
    if ((mode === "edit" || mode === "detail") && initialData) {
      setFormData({
        alias: initialData.alias || "",
        loadingProvince: initialData.loadingProvince || [],
        unloadingProvince: initialData.unloadingProvince || [],
        isActive: initialData.isActive || false,
        createSpecialPriceRoute: initialData.createSpecialPriceRoute || false,
      });
      
      // Load special routes if they exist
      if (initialData.specialRoutes && initialData.specialRoutes.length > 0) {
        setSpecialRoutes(initialData.specialRoutes);
      }
    }
  }, [mode, initialData]);

  // Smart city management based on province changes
  useEffect(() => {
    if (mode !== "detail") {
      setSpecialRoutes(prev => prev.map(route => {
        const updatedRoute = { ...route };
        
        // Check origin location - only reset if its province is no longer selected
        if (route.originLocation && route.originLocation.provinceId) {
          const isOriginProvinceStillSelected = formData.loadingProvince.some(
            province => province.id === route.originLocation.provinceId
          );
          
          if (!isOriginProvinceStillSelected) {
            updatedRoute.originLocation = "";
          }
        }
        
        // Check destination location - only reset if its province is no longer selected
        if (route.destinationLocation && route.destinationLocation.provinceId) {
          const isDestinationProvinceStillSelected = formData.unloadingProvince.some(
            province => province.id === route.destinationLocation.provinceId
          );
          
          if (!isDestinationProvinceStillSelected) {
            updatedRoute.destinationLocation = "";
          }
        }
        
        return updatedRoute;
      }));
    }
  }, [formData.loadingProvince, formData.unloadingProvince, mode]);

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

  // Handle special routes changes
  const handleSpecialRouteChange = (routeId, field, value) => {
    if (disabled) return; // Don't allow changes in detail mode
    
    setSpecialRoutes(prev => {
      const updated = prev.map(route => 
        route.id === routeId 
          ? { ...route, [field]: value }
          : route
      );
      return updated;
    });
    
    // Notify parent component about data changes
    if (onDataChange) {
      onDataChange(true);
    }
  };

  // Add new special route
  const addSpecialRoute = () => {
    if (disabled) return; // Don't allow changes in detail mode
    
    const newId = Math.max(...specialRoutes.map(r => r.id), 0) + 1;
    setSpecialRoutes(prev => [
      ...prev,
      {
        id: newId,
        originLocation: "",
        destinationLocation: "",
      }
    ]);
    
    // Notify parent component about data changes
    if (onDataChange) {
      onDataChange(true);
    }
  };

  // Filter city options based on selected provinces
  const getFilteredCityOptions = (citiesData, selectedProvinces) => {
    if (!citiesData || !selectedProvinces.length) return [];
    
    const selectedProvinceIds = selectedProvinces.map(province => province.id);
    return citiesData.filter(city => selectedProvinceIds.includes(city.provinceId));
  };

   // Get cities data for dropdown options
  // Filter cities based on selected provinces and transform to dropdown format
  const filteredOriginCities = getFilteredCityOptions(originCitiesData, formData.loadingProvince);
  const filteredDestinationCities = getFilteredCityOptions(destinationCitiesData, formData.unloadingProvince);
  
  const originCityOptions = filteredOriginCities ? transformCitiesToDropdownFormat(filteredOriginCities) : [];
  const destinationCityOptions = filteredDestinationCities ? transformCitiesToDropdownFormat(filteredDestinationCities) : [];

  // Get all available city options (including currently selected ones)
  const getAllCityOptions = (citiesData, selectedProvinces, currentSelection) => {
    const filteredCities = getFilteredCityOptions(citiesData, selectedProvinces);
    
    // If there's a current selection that's not in the filtered list, add it back
    if (currentSelection && currentSelection.provinceId) {
      const isCurrentSelectionInFiltered = filteredCities.some(city => city.id === currentSelection.id);
      if (!isCurrentSelectionInFiltered) {
        filteredCities.push(currentSelection);
      }
    }
    
    return filteredCities;
  };

  // Remove special route
  const removeSpecialRoute = (routeId) => {
    if (disabled) return; // Don't allow changes in detail mode
    
    if (specialRoutes.length > 1) {
      setSpecialRoutes(prev => prev.filter(route => route.id !== routeId));
      
      // Notify parent component about data changes
      if (onDataChange) {
        onDataChange(true);
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (disabled) return; // Don't submit in detail mode
    
    // Basic validation
    // if (!formData.alias.trim()) {
    //   alert("Alias harus diisi");
    //   return;
    // }
    // if (!formData.loadingProvince || formData.loadingProvince.length === 0) {
    //   alert("Provinsi Muat harus dipilih");
    //   return;
    // }
    // if (!formData.unloadingProvince || formData.unloadingProvince.length === 0) {
    //   alert("Provinsi Bongkar harus dipilih");
    //   return;
    // }

    // Validate special routes if enabled
    if (formData.createSpecialPriceRoute) {
      for (const route of specialRoutes) {
        if (!route.originLocation) {
          alert("Lokasi Asal harus dipilih untuk semua rute khusus");
          return;
        }
        if (!route.destinationLocation) {
          alert("Lokasi Tujuan harus dipilih untuk semua rute khusus");
          return;
        }
      }
    }

    // Call parent onSubmit handler
    if (onSubmit) {
      onSubmit({
        ...formData,
        specialRoutes: formData.createSpecialPriceRoute ? specialRoutes : []
      });
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
              <FormLabel required={!disabled}>Alias</FormLabel>
              <Input
                placeholder="Masukkan Alias"
                value={formData.alias}
                onChange={(e) => handleInputChange("alias", e.target.value)}
                required={!disabled}
                disabled={disabled}
              />
            </FormContainer>

            <FormContainer>
              <FormLabel required={!disabled}>Provinsi Muat</FormLabel>
              <MultiSelectDropdown
                maxVisible={5}
                placeholder={originLoading ? "Memuat provinsi..." : "Pilih Provinsi Muat"}
                selectedItems={formData.loadingProvince}
                onSelectionChange={(value) => handleInputChange("loadingProvince", value)}
                options={originProvinceOptions}
                titleModal="Provinsi Muat"
                required={!disabled}
                disabled={disabled || originLoading}
              />
            </FormContainer>

            <FormContainer>
              <FormLabel required={!disabled}>Provinsi Bongkar</FormLabel>
              <MultiSelectDropdown
                placeholder={destinationLoading ? "Memuat provinsi..." : "Pilih Provinsi Bongkar"}
                selectedItems={formData.unloadingProvince}
                onSelectionChange={(value) => handleInputChange("unloadingProvince", value)}
                options={destinationProvinceOptions}
                titleModal="Provinsi Bongkar"
                maxVisible={5}
                required={!disabled}
                disabled={disabled || destinationLoading}
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

            <FormContainer className="items-center">
              <FormLabel>Buat Rute Harga Khusus</FormLabel>
              <div onClick={(e) => e.preventDefault()}>
                <Toggle
                  value={formData.createSpecialPriceRoute}
                  onClick={(value) => handleInputChange("createSpecialPriceRoute", value)}
                  type="primary"
                  disabled={disabled}
                />
              </div>
            </FormContainer>
            {formData.createSpecialPriceRoute && (
              <hr className="border-1 border-[#A8A8A8]" />
            )}
          </div>
        </div>

        {/* Special Price Routes Section */}
        {formData.createSpecialPriceRoute && (
            <div className="pt-6">
            <h3 className="mb-4 font-bold text-gray-900">Rute Harga Khusus</h3>
            <div 
              className={`space-y-4 ${
                specialRoutes.length > 8 
                  ? 'max-h-96 overflow-y-auto pr-2' 
                  : ''
              }`}
            >
              {/* Header with column labels */}
              <div className="grid grid-cols-12 gap-4 items-center mb-4">
                <div className="col-span-2">
                </div>
                <div className="col-span-4">
                  <span className="text-sm font-semibold">Lokasi Asal <span className="text-red-500">*</span></span>
                </div>
                <div className="col-span-1 text-center">                  
                </div>
                <div className="col-span-4">
                  <span className="text-sm font-semibold">Lokasi Tujuan <span className="text-red-500">*</span></span>
                </div>
                <div className="col-span-1">
                </div>
              </div>

              {specialRoutes.map((route, index) => (
                <div key={route.id} className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-2">
                    <span className="font-semibold text-sm">Rute {index + 1}</span>
                  </div>
                  <div className="col-span-4">
                    <Select
                      placeholder={originCitiesLoading ? "Memuat kota..." : "Pilih Kota/Kabupaten"}
                      value={route.originLocation?.value || route.originLocation}
                      onChange={(value) => {
                        const selectedOption = originCityOptions.find(option => option.value === value);
                        if (selectedOption) {
                          handleSpecialRouteChange(route.id, "originLocation", selectedOption);
                        }
                      }}
                      options={originCityOptions}
                      required
                      disabled={originCitiesLoading || disabled}
                    />
                  </div>
                  <div className="col-span-1 p-0 text-center">
                    <span className="text-base font-semibold">ke</span>
                  </div>
                  <div className="col-span-4">
                    <Select
                      placeholder={destinationCitiesLoading ? "Memuat kota..." : "Pilih Kota/Kabupaten"}
                      value={route.destinationLocation?.value || route.destinationLocation}
                      onChange={(value) => {
                        const selectedOption = destinationCityOptions.find(option => option.value === value);
                        if (selectedOption) {
                          handleSpecialRouteChange(route.id, "destinationLocation", selectedOption);
                        }
                      }}
                      options={destinationCityOptions}
                      required
                      disabled={destinationCitiesLoading || disabled}
                    />
                  </div>
                  <div className="col-span-1 flex gap-2">
                    {specialRoutes.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeSpecialRoute(route.id)}
                        className="!h-6 !w-6 !p-0 !text-lg !rounded-lg hover:!bg-red-400 text-red-500 hover:!text-white !border !border-red-500 bg-transparent"
                      >
                        -
                      </Button>
                    )}
                    {index === specialRoutes.length - 1 && (
                      <Button
                        type="button"
                        variant="muatparts-primary-secondary"
                        onClick={addSpecialRoute}
                        className="!h-6 !w-6 !p-0 !rounded-lg"
                      >
                        <span className="text-blue text-lg">+</span>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {mode === "detail" ? (
          <div className="flex justify-end space-x-4 pt-6">
            {/* <Button
              type="button"
              variant="muatparts-primary-secondary"
              onClick={onBack}
            >
              Kembali
            </Button>
            <Button
              type="button"
              variant="muatparts-primary"
              onClick={onEdit}
            >
              Edit
            </Button> */}
            <></>
          </div>
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

export default MasterRutePricingForm;