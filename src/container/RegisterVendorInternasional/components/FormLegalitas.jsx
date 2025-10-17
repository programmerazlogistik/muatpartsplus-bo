"use client";

import React from "react";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { Button } from "@muatmuat/ui/Button";
// Assuming schema is co-located or correctly imported
import { Input, Select } from "@muatmuat/ui/Form";
import { IconComponent } from "@muatmuat/ui/IconComponent";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as v from "valibot";

import { DatePicker } from "@/components/Calendar/DatePicker";
import PageTitle from "@/components/PageTitle/PageTitle";
import { FileInput } from "@/components/Upload/FileInput";

// --- Custom Schemas and Validators ---

// Define the maximum allowed file size
const MAX_FILE_SIZE_MB = 5 * 1024 * 1024; // 5MB in bytes

// Reusable messages based on provided screenshot errors
const REQUIRED_MSG = "Wajib diisi";
const MAX_SIZE_MSG = "Ukuran maksimal 5MB";
const INVALID_FORMAT_MSG = "Format tidak sesuai";

/**
 * Validates a required file input: ensures it's a File instance, size is <= 5MB, and has an allowed format.
 */
const requiredFileSchema = v.pipe(
  v.instance(File, REQUIRED_MSG),
  v.check((file) => file.size <= MAX_FILE_SIZE_MB, MAX_SIZE_MSG),
  v.check(
    (file) =>
      [
        "image/jpeg",
        "image/png",
        "application/pdf",
        "application/zip",
      ].includes(file.type),
    INVALID_FORMAT_MSG
  )
);

/**
 * Validates an optional file input: allows null, undefined, or a valid File instance.
 */
const optionalFileSchema = v.optional(
  v.nullable(
    v.pipe(
      v.instance(File, INVALID_FORMAT_MSG),
      v.check((file) => file.size <= MAX_FILE_SIZE_MB, MAX_SIZE_MSG),
      v.check(
        (file) =>
          [
            "image/jpeg",
            "image/png",
            "application/pdf",
            "application/zip",
          ].includes(file.type),
        INVALID_FORMAT_MSG
      )
    ),
    null
  ),
  null
);

/**
 * Standard required string field validation (matches 'Wajib diisi' error)
 */
const requiredStringSchema = v.pipe(
  v.string(REQUIRED_MSG),
  v.nonEmpty(REQUIRED_MSG)
);

// --- Exporter Legality (Repeatable Brand Section) Schema ---

const brandSchema = v.object({
  brand: v.picklist(["Isuzu", "Toyota", "Honda", "Mitsubishi"], REQUIRED_MSG),
  intellectualPropertyFile: optionalFileSchema,
  // Registration Date logic must handle string input from form fields
  registrationDate: v.pipe(
    v.string(REQUIRED_MSG),
    v.nonEmpty(REQUIRED_MSG),
    v.isoDate("Tanggal tidak valid")
  ),
  certificateOfOriginFile: requiredFileSchema,
});

// --- Main Form Schema Definition ---

export const vendorInternationalSchema = v.object({
  // Business Legal Entity
  businessLicenseFile: requiredFileSchema,
  companyRegistrationFile: requiredFileSchema,
  vatCertificateFile: optionalFileSchema,

  // Director Information
  directorIdFile: requiredFileSchema,
  directorIdNumber: requiredStringSchema, // Simplified
  fullName: requiredStringSchema, // Simplified
  position: requiredStringSchema, // Simplified
  directorStatementFile: requiredFileSchema,

  // Exporter Legality (Array of Brand Schemas)
  brands: v.pipe(
    v.array(brandSchema, "Daftar merek tidak valid."),
    v.minLength(1, "Minimal 1 merek harus ditambahkan.")
  ),

  // Product List
  productCatalogFile: optionalFileSchema,
});

// Ensure the code uses the updated schema

const BrandSection = ({ index, length, register, control, errors, remove }) => {
  const fieldErrors = errors?.brands?.[index];

  const brandOptions = [
    { value: "Isuzu", label: "Isuzu" },
    { value: "Toyota", label: "Toyota" },
    { value: "Honda", label: "Honda" },
    { value: "Mitsubishi", label: "Mitsubishi" },
  ];

  const RequiredIndicator = ({ isRequired }) =>
    isRequired ? <span>*</span> : null;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-end">
        {length > 1 && (
          <button
            type="button"
            onClick={() => remove(index)}
            className="mb-1 text-sm font-medium text-error-600 hover:text-error-700" // Red styling based on Figma
          >
            - Hapus Merek
          </button>
        )}
      </div>

      <div className="space-y-4 rounded-[10px] border border-neutral-300 px-8 py-5">
        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[230px_1fr]">
          {/* Brand* (Select) */}
          <label className="text-sm font-semibold text-neutral-600">
            Brand
            <RequiredIndicator isRequired={true} />
          </label>

          <Controller
            name={`brands.${index}.brand`}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Select
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Isuzu"
                options={brandOptions}
                errorMessage={error?.message}
                className="text-sm"
              />
            )}
          />

          {/* Intellectual Property (IP) / IPR (Optional) (File Upload) */}
          <label className="text-sm font-semibold text-neutral-600">
            Intellectual Property (IP) / IPR (Optional)
          </label>
          <Controller
            name={`brands.${index}.intellectualPropertyFile`}
            control={control}
            render={({ field, fieldState: { error, ref } }) => (
              <FileInput
                ref={ref}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={`brands.${index}.intellectualPropertyFile`}
                error={error?.message}
              />
            )}
          />

          {/* Registration Date* (Date Picker) */}
          <label className="text-sm font-semibold text-neutral-600">
            Registration Date
            <RequiredIndicator isRequired={true} />
          </label>
          <div className="w-full">
            <Controller
              name={`brands.${index}.registrationDate`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Pilih Tanggal"
                  showTime={false}
                  dateFormat="dd MMM yyyy"
                  disabled={false}
                  errorMessage={error?.message}
                />
              )}
            />
          </div>

          {/* Certificate of Origin* (File Upload) */}
          <label className="text-sm font-semibold text-neutral-600">
            Certificate of Origin
            <RequiredIndicator isRequired={true} />
          </label>
          <Controller
            name={`brands.${index}.certificateOfOriginFile`}
            control={control}
            render={({ field, fieldState: { error, ref } }) => (
              <FileInput
                ref={ref}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={`brands.${index}.certificateOfOriginFile`}
                error={error?.message}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

// --- Main Form Component ---

const FormLegalitas = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: valibotResolver(vendorInternationalSchema),
    mode: "onBlur",
    defaultValues: {
      // Business Legal Entity
      businessLicenseFile: null,
      companyRegistrationFile: null,
      vatCertificateFile: null,

      // Director Information
      directorIdFile: null,
      directorIdNumber: "",
      fullName: "",
      position: "",
      directorStatementFile: null,

      // Exporter Legality
      brands: [
        {
          brand: "",
          intellectualPropertyFile: null,
          registrationDate: null,
          certificateOfOriginFile: null,
        },
      ],

      // Product List
      productCatalogFile: null,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "brands",
  });

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    alert("Form submitted! Check console for data structure.");
  };

  const handleAddBrand = () => {
    append({
      brand: "Isuzu",
      intellectualPropertyFile: null,
      registrationDate: null,
      certificateOfOriginFile: null,
    });
  };

  // --- Utility for consistent form layout (Label + Input/Button) ---
  const FormRow = ({ label, required, children }) => {
    const RequiredIndicator = () => (required ? <span>*</span> : null);

    return (
      <React.Fragment>
        <label className="text-sm font-semibold text-neutral-600">
          {label.replace("*", "").trim()} <RequiredIndicator />
        </label>
        <div className="w-full">{children}</div>
      </React.Fragment>
    );
  };
  // --- End of Utility ---

  return (
    <div className="mx-auto flex w-full max-w-[1230px] flex-col items-center">
      <PageTitle className="self-start pl-[15px]">
        Register Vendor International
      </PageTitle>
      <div className="flex w-full items-center justify-end px-[15px]">
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1 text-xs">
          <span className="font-medium text-neutral-600">Informasi Akun</span>
          <IconComponent
            src="/icons/chevron-down.svg"
            className="h-4 w-4 rotate-[-90deg] text-neutral-600"
          />
          <span className="font-semibold text-primary-700">Legalitas</span>
          <IconComponent
            src="/icons/chevron-down.svg"
            className="h-4 w-4 rotate-[-90deg] text-neutral-600"
          />
          <span className="font-semibold text-neutral-600">Kontrak</span>
        </div>

        {/* Figma component: Simpan Draft Button */}
        <Button
          variant="muatparts-primary-secondary"
          className="h-8 rounded-[20px] border-primary-700 px-6 py-2 text-sm font-semibold text-primary-700"
        >
          Simpan Draft
        </Button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex w-full flex-1 flex-col gap-[34px]"
      >
        {/* --- Business Legal Entity --- */}
        <div className="space-y-4 px-[25px]">
          <h2 className="text-base font-medium text-neutral-900">
            Business Legal Entity
          </h2>

          <div className="grid grid-cols-1 items-center gap-4 pl-2.5 md:grid-cols-[230px_1fr]">
            <FormRow label="Business License (USCI / USCC)*" required>
              <Controller
                name="businessLicenseFile"
                control={control}
                render={({ field, fieldState: { error, ref } }) => {
                  console.log("Controller render for businessLicenseFile", {
                    hasRef: !!ref,
                    value: field.value,
                    error: error?.message,
                  });
                  return (
                    <FileInput
                      ref={ref}
                      value={field.value}
                      onChange={(file) => {
                        console.log(
                          "Controller onChange for businessLicenseFile",
                          { file: file?.name }
                        );
                        field.onChange(file);
                      }}
                      onBlur={field.onBlur}
                      name="businessLicenseFile"
                      error={error?.message}
                    />
                  );
                }}
              />
            </FormRow>
            <FormRow label="Company Registration Certificate*" required>
              <Controller
                name="companyRegistrationFile"
                control={control}
                render={({ field, fieldState: { error, ref } }) => (
                  <FileInput
                    ref={ref}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name="companyRegistrationFile"
                    error={error?.message}
                  />
                )}
              />
            </FormRow>
            <FormRow label="VAT Certificate (Opsional)">
              <Controller
                name="vatCertificateFile"
                control={control}
                render={({ field, fieldState: { error, ref } }) => (
                  <FileInput
                    ref={ref}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name="vatCertificateFile"
                    error={error?.message}
                  />
                )}
              />
            </FormRow>
          </div>
        </div>

        {/* --- Director Information --- */}
        <div className="space-y-4 px-[25px]">
          <h2 className="mb-4 text-base font-medium text-neutral-900">
            Director Information
          </h2>
          <div className="grid grid-cols-1 items-center gap-4 pl-2.5 md:grid-cols-[230px_1fr]">
            <FormRow label="Director Identity Card*" required>
              <Controller
                name="directorIdFile"
                control={control}
                render={({ field, fieldState: { error, ref } }) => (
                  <FileInput
                    ref={ref}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name="directorIdFile"
                    error={error?.message}
                  />
                )}
              />
            </FormRow>
            <FormRow label="Director Identity Card Number*" required>
              <Input
                placeholder="No. Identitas Direksi"
                errorMessage={errors.directorIdNumber?.message}
                {...register("directorIdNumber")}
                className="text-sm"
              />
            </FormRow>
            <FormRow label="Full Name*" required>
              <Input
                placeholder="Nama Direksi"
                errorMessage={errors.fullName?.message}
                {...register("fullName")}
                className="text-sm"
              />
            </FormRow>
            <FormRow label="Position*" required>
              <Input
                placeholder="Masukkan Jabatan"
                errorMessage={errors.position?.message}
                {...register("position")}
                className="text-sm"
              />
            </FormRow>
            <FormRow label="Director statement letter*" required>
              <Controller
                name="directorStatementFile"
                control={control}
                render={({ field, fieldState: { error, ref } }) => (
                  <FileInput
                    ref={ref}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name="directorStatementFile"
                    error={error?.message}
                  />
                )}
              />
            </FormRow>
          </div>
        </div>

        {/* --- Exporter Legality --- */}
        <div className="space-y-4">
          <h2 className="mb-4 px-[25px] text-base font-medium text-neutral-900">
            Exporter Legality
          </h2>

          {/* Targeted Border Styling */}
          <div className="flex flex-col items-center gap-4 bg-white">
            {fields.map((field, index) => (
              <BrandSection
                key={field.id}
                index={index}
                length={fields.length}
                register={register}
                control={control}
                errors={errors}
                remove={remove}
              />
            ))}
            {errors.brands?.message && (
              <p className="text-sm text-error-500">{errors.brands?.message}</p>
            )}

            {/* Figma component: Tambah Merek Button */}
            <Button
              type="button"
              variant="muatparts-primary-secondary"
              onClick={handleAddBrand}
              className="h-8 rounded-[20px] border-primary-700 px-6 py-2 text-sm font-semibold text-primary-700"
            >
              + Tambah Merek
            </Button>
          </div>
        </div>

        {/* --- Product List --- */}
        <div className="px-[25px]">
          <h2 className="mb-2.5 text-base font-medium text-neutral-900">
            Product List
          </h2>
          <div className="grid grid-cols-1 items-center gap-4 pl-2.5 md:grid-cols-[230px_1fr]">
            <FormRow label="Product Catalog (Opsional)">
              <Controller
                name="productCatalogFile"
                control={control}
                render={({ field, fieldState: { error, ref } }) => (
                  <FileInput
                    ref={ref}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name="productCatalogFile"
                    error={error?.message}
                  />
                )}
              />
            </FormRow>
          </div>

          {/* --- Footer Buttons --- */}
          <div className="flex w-full justify-center gap-4 pt-6">
            {/* Figma component: Sebelumnya Button */}
            <Button
              variant="muatparts-primary-secondary"
              type="button"
              className="h-8 rounded-[20px] border-primary-700 px-6 py-2 text-sm font-semibold text-primary-700"
            >
              Sebelumnya
            </Button>
            {/* Figma component: Selanjutnya Button */}
            <Button
              variant="muatparts-primary"
              type="submit"
              className="h-8 rounded-[20px] bg-primary-700 px-6 py-2 text-white"
            >
              Selanjutnya
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormLegalitas;
