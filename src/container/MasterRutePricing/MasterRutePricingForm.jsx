"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button/Button";
import { FormContainer, FormLabel } from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import { Select } from "@/components/Form/Select";
import Toggle from "@/components/Toggle/Toggle";

import { useTranslation } from "@/hooks/use-translation";

const MasterRutePricingForm = ({ 
  mode = "add", // "add" or "edit"
  initialData = null, // Data for edit mode
  onSubmit,
  loading = false 
}) => {
  const { t = (key, _, fallback) => fallback || key } = useTranslation() || {};
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState({
    alias: "",
    loadingProvince: "",
    unloadingProvince: "",
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

  // Province options (dummy data - in real app, this would come from API)
  const provinceOptions = [
    { value: "aceh", label: "Aceh" },
    { value: "sumatera-utara", label: "Sumatera Utara" },
    { value: "sumatera-barat", label: "Sumatera Barat" },
    { value: "riau", label: "Riau" },
    { value: "kepulauan-riau", label: "Kepulauan Riau" },
    { value: "jambi", label: "Jambi" },
    { value: "sumatera-selatan", label: "Sumatera Selatan" },
    { value: "bangka-belitung", label: "Bangka Belitung" },
    { value: "lampung", label: "Lampung" },
    { value: "banten", label: "Banten" },
    { value: "dki-jakarta", label: "DKI Jakarta" },
    { value: "jawa-barat", label: "Jawa Barat" },
    { value: "jawa-tengah", label: "Jawa Tengah" },
    { value: "diy-yogyakarta", label: "Daerah Istimewa Yogyakarta" },
    { value: "jawa-timur", label: "Jawa Timur" },
    { value: "bali", label: "Bali" },
    { value: "nusa-tenggara-barat", label: "Nusa Tenggara Barat" },
    { value: "nusa-tenggara-timur", label: "Nusa Tenggara Timur" },
    { value: "kalimantan-barat", label: "Kalimantan Barat" },
    { value: "kalimantan-tengah", label: "Kalimantan Tengah" },
    { value: "kalimantan-selatan", label: "Kalimantan Selatan" },
    { value: "kalimantan-timur", label: "Kalimantan Timur" },
    { value: "kalimantan-utara", label: "Kalimantan Utara" },
    { value: "sulawesi-utara", label: "Sulawesi Utara" },
    { value: "gorontalo", label: "Gorontalo" },
    { value: "sulawesi-tengah", label: "Sulawesi Tengah" },
    { value: "sulawesi-selatan", label: "Sulawesi Selatan" },
    { value: "sulawesi-tenggara", label: "Sulawesi Tenggara" },
    { value: "sulawesi-barat", label: "Sulawesi Barat" },
    { value: "maluku", label: "Maluku" },
    { value: "maluku-utara", label: "Maluku Utara" },
    { value: "papua", label: "Papua" },
    { value: "papua-barat", label: "Papua Barat" },
    { value: "papua-selatan", label: "Papua Selatan" },
    { value: "papua-tengah", label: "Papua Tengah" },
    { value: "papua-pegunungan", label: "Papua Pegunungan" },
  ];

  // City/Regency options (dummy data - in real app, this would come from API)
  const cityOptions = [
    { value: "kota-surabaya", label: "Kota Surabaya" },
    { value: "kota-malang", label: "Kota Malang" },
    { value: "kab-malang", label: "Kab. Malang" },
    { value: "kota-yogyakarta", label: "Kota Yogyakarta" },
    { value: "kota-jakarta-barat", label: "Kota Jakarta Barat" },
    { value: "kota-jakarta-pusat", label: "Kota Jakarta Pusat" },
    { value: "kota-jakarta-selatan", label: "Kota Jakarta Selatan" },
    { value: "kota-jakarta-timur", label: "Kota Jakarta Timur" },
    { value: "kota-jakarta-utara", label: "Kota Jakarta Utara" },
    { value: "kota-semarang", label: "Kota Semarang" },
    { value: "kota-bandung", label: "Kota Bandung" },
    { value: "kota-bogor", label: "Kota Bogor" },
    { value: "kota-depok", label: "Kota Depok" },
    { value: "kota-tangerang", label: "Kota Tangerang" },
    { value: "kota-bekasi", label: "Kota Bekasi" },
  ];

  // Load initial data for edit mode
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        alias: initialData.alias || "",
        loadingProvince: initialData.loadingProvince || "",
        unloadingProvince: initialData.unloadingProvince || "",
        isActive: initialData.isActive || false,
        createSpecialPriceRoute: initialData.createSpecialPriceRoute || false,
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

  // Handle special routes changes
  const handleSpecialRouteChange = (routeId, field, value) => {
    setSpecialRoutes(prev => 
      prev.map(route => 
        route.id === routeId 
          ? { ...route, [field]: value }
          : route
      )
    );
  };

  // Add new special route
  const addSpecialRoute = () => {
    const newId = Math.max(...specialRoutes.map(r => r.id), 0) + 1;
    setSpecialRoutes(prev => [
      ...prev,
      {
        id: newId,
        originLocation: "",
        destinationLocation: "",
      }
    ]);
  };

  // Remove special route
  const removeSpecialRoute = (routeId) => {
    if (specialRoutes.length > 1) {
      setSpecialRoutes(prev => prev.filter(route => route.id !== routeId));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    // if (!formData.alias.trim()) {
    //   alert("Alias harus diisi");
    //   return;
    // }
    // if (!formData.loadingProvince) {
    //   alert("Provinsi Muat harus dipilih");
    //   return;
    // }
    // if (!formData.unloadingProvince) {
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
              <FormLabel required>Alias</FormLabel>
              <Input
                placeholder="Masukkan Alias"
                value={formData.alias}
                onChange={(e) => handleInputChange("alias", e.target.value)}
                required
              />
            </FormContainer>

            <FormContainer>
              <FormLabel required>Provinsi Muat</FormLabel>
              <Select
                placeholder="Pilih Provinsi Muat"
                value={formData.loadingProvince}
                onChange={(value) => handleInputChange("loadingProvince", value)}
                options={provinceOptions}
                required
              />
            </FormContainer>

            <FormContainer>
              <FormLabel required>Provinsi Bongkar</FormLabel>
              <Select
                placeholder="Pilih Provinsi Bongkar"
                value={formData.unloadingProvince}
                onChange={(value) => handleInputChange("unloadingProvince", value)}
                options={provinceOptions}
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

            <FormContainer className="items-center">
              <FormLabel>Buat Rute Harga Khusus</FormLabel>
              <Toggle
                value={formData.createSpecialPriceRoute}
                onClick={(value) => handleInputChange("createSpecialPriceRoute", value)}
                type="primary"
              />
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
                      placeholder="Pilih Kota/Kabupaten"
                      value={route.originLocation}
                      onChange={(value) => handleSpecialRouteChange(route.id, "originLocation", value)}
                      options={cityOptions}
                      required
                    />
                  </div>
                  <div className="col-span-1 p-0 text-center">
                    <span className="text-base font-semibold">ke</span>
                  </div>
                  <div className="col-span-4">
                    <Select
                      placeholder="Pilih Kota/Kabupaten"
                      value={route.destinationLocation}
                      onChange={(value) => handleSpecialRouteChange(route.id, "destinationLocation", value)}
                      options={cityOptions}
                      required
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

export default MasterRutePricingForm;