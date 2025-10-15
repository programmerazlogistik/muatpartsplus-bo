"use client";

import React from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import * as v from "valibot";

import { useGetBusinessCategoryOptions } from "@/services/vendor-domestik/useGetBusinessCategoryOptions";
import { useGetBusinessEntityOptions } from "@/services/vendor-domestik/useGetBusinessEntityOptions";
import { useGetCityOptions } from "@/services/vendor-domestik/useGetCityOptions";

import { Alert } from "@muatmuat/ui/Alert";
import { Button } from "@muatmuat/ui/Button";
import { DateTimePickerWeb } from "@muatmuat/ui/Calendar";
import { FormContainer, FormLabel, Input, Select } from "@muatmuat/ui/Form";
import { LoadingStatic } from "@muatmuat/ui/Loading";


/**
 * @typedef {Object} FilterFormData
 * @property {string} [namaPerusahaan]
 * @property {string} [email]
 * @property {string} [badanUsaha]
 * @property {string} [kategoriUsaha]
 * @property {string} [kabupatenKota]
 * @property {string} [status]
 * @property {Date} [tanggalRegisterStart]
 * @property {Date} [tanggalRegisterEnd]
 */

const filterSchema = v.pipe(
  v.object({
    namaPerusahaan: v.optional(v.string()),
    email: v.optional(v.pipe(v.string(), v.email("Format email tidak valid."))),
    badanUsaha: v.optional(v.string()),
    kategoriUsaha: v.optional(v.string()),
    kabupatenKota: v.optional(v.string()),
    status: v.optional(v.string()),
    tanggalRegisterStart: v.optional(v.date()),
    tanggalRegisterEnd: v.optional(v.date()),
  }),
  v.check(
    (data) =>
      !data.tanggalRegisterStart ||
      !data.tanggalRegisterEnd ||
      data.tanggalRegisterEnd >= data.tanggalRegisterStart,
    "Tanggal akhir harus setelah tanggal mulai."
  )
);

// type FilterFormData = v.InferOutput<typeof filterSchema>;

const FilterField = ({ activeTab }) => {
  const { data: businessEntityData, isLoading: isLoadingEntities } = useGetBusinessEntityOptions();
  const { data: businessCategoryData, isLoading: isLoadingCategories } = useGetBusinessCategoryOptions();
  const { data: cityData, isLoading: isLoadingCities } = useGetCityOptions();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  // } = useForm<FilterFormData>({
  } = useForm({
    resolver: valibotResolver(filterSchema),
    mode: "onChange",
  });

  // const onSubmit: SubmitHandler<FilterFormData> = (data) => {
  const onSubmit = (data) => {
    console.log("Filter data submitted:", data);
  };

  const handleReset = () => {
    reset({
      namaPerusahaan: "",
      email: "",
      badanUsaha: "",
      kategoriUsaha: "",
      kabupatenKota: "",
      status: "",
      tanggalRegisterStart: undefined,
      tanggalRegisterEnd: undefined,
    });
  };
  
  const isLoading = isLoadingEntities || isLoadingCategories || isLoadingCities;
  if(isLoading) return <LoadingStatic />;

  const businessEntityOptions = businessEntityData?.options.map(opt => ({ value: opt.id, label: opt.name })) || [];
  const businessCategoryOptions = businessCategoryData?.options.map(opt => ({ value: opt.id, label: opt.name })) || [];
  const cityOptions = cityData?.options.map(opt => ({ value: opt.id, label: opt.name })) || [];
  const statusOptions = [
    { value: "AKTIF", label: "AKTIF" },
    { value: "NON AKTIF", label: "NON AKTIF" },
  ];


  return (
    <div className="bg-white p-6 rounded-lg border border-neutral-400 mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Filter</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          <div className="space-y-4">
            <FormContainer>
              <FormLabel>Nama Perusahaan</FormLabel>
              <Input
                placeholder="Masukkan nama perusahaan"
                {...register("namaPerusahaan")}
                errorMessage={errors.namaPerusahaan?.message}
              />
            </FormContainer>
            <FormContainer>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Masukkan email"
                {...register("email")}
                errorMessage={errors.email?.message}
              />
            </FormContainer>
            <FormContainer>
              <FormLabel>Badan Usaha</FormLabel>
              <Controller
                name="badanUsaha"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={businessEntityOptions}
                    placeholder="Pilih badan usaha"
                    errorMessage={errors.badanUsaha?.message}
                  />
                )}
              />
            </FormContainer>
            <FormContainer>
              <FormLabel>Kategori Usaha</FormLabel>
               <Controller
                name="kategoriUsaha"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={businessCategoryOptions}
                    placeholder="Pilih kategori usaha"
                    errorMessage={errors.kategoriUsaha?.message}
                  />
                )}
              />
            </FormContainer>
            <FormContainer>
              <FormLabel>Kabupaten / Kota</FormLabel>
               <Controller
                name="kabupatenKota"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={cityOptions}
                    placeholder="Pilih kabupaten/kota"
                    errorMessage={errors.kabupatenKota?.message}
                  />
                )}
              />
            </FormContainer>
            {activeTab !== "Transaksi" && (
              <FormContainer>
                <FormLabel>Status</FormLabel>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={statusOptions}
                      placeholder="Pilih status"
                      errorMessage={errors.status?.message}
                    />
                  )}
                />
              </FormContainer>
            )}
          </div>
          <div className="space-y-4">
             <FormContainer>
              <FormLabel>Tanggal Register</FormLabel>
              <div className="flex items-center gap-2">
                 <Controller
                  name="tanggalRegisterStart"
                  control={control}
                  render={({ field }) => (
                    <DateTimePickerWeb
                      value={field.value}
                      onChange={field.onChange}
                      showTime={false}
                      dateFormat="dd MMM yyyy"
                    />
                  )}
                />
                <span className="text-gray-500">s/d</span>
                <Controller
                  name="tanggalRegisterEnd"
                  control={control}
                  render={({ field }) => (
                     <DateTimePickerWeb
                      value={field.value}
                      onChange={field.onChange}
                      showTime={false}
                      dateFormat="dd MMM yyyy"
                    />
                  )}
                />
              </div>
               {errors.root?.message && (
                 <Alert variant="error" size="sm">{errors.root.message}</Alert>
               )}
            </FormContainer>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button
            type="button"
            variant="muattrans-error-secondary"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button type="submit" variant="muatparts-primary" disabled={isSubmitting}>
            {isSubmitting ? "Menerapkan..." : "Terapkan"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FilterField;