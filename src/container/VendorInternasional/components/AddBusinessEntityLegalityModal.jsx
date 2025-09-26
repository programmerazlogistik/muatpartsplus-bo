"use client";

import React, { useState } from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import * as v from "valibot";

import { Button } from "@muatmuat/ui/Button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTrigger,
} from "@muatmuat/ui/Modal";
import { useTranslation } from "@/hooks/use-translation";
import { IconComponent } from "@muatmuat/ui/IconComponent";

/**
 * @typedef {Object} LegalityFormData
 * @property {File | null} businessLicense - The business license file.
 * @property {File | null} companyRegistrationCertificate - The company registration certificate file.
 */

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "application/zip",
];

// 1. Define the Valibot schema
const legalitySchema = v.object({
  businessLicense: v.pipe(
    v.instance(File, "AddLegalityModal.validation.required"),
    v.check(
      (file) => file.size <= MAX_FILE_SIZE,
      "AddLegalityModal.validation.fileSize"
    ),
    v.check(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "AddLegalityModal.validation.fileType"
    )
  ),
  companyRegistrationCertificate: v.pipe(
    v.instance(File, "AddLegalityModal.validation.required"),
    v.check(
      (file) => file.size <= MAX_FILE_SIZE,
      "AddLegalityModal.validation.fileSize"
    ),
    v.check(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "AddLegalityModal.validation.fileType"
    )
  ),
});

// 2. Infer the TypeScript type for type safety
/** @type {LegalityFormData} */
// type LegalityFormData = v.InferOutput<typeof legalitySchema>;

// Custom File Upload Field Component
const FileUploadField = ({ field, error, label, helpText, uploadText }) => {
  const fileInputRef = React.useRef(null);
  const { t } = useTranslation();

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      field.onChange(file);
    }
  };

  const translatedError =
    error &&
    t(
      error,
      { fieldName: label },
      "An error occurred with the file upload."
    );

  return (
    <div className="flex items-center justify-center gap-x-5 w-full ">
      <label className="text-right text-sm text-neutral-900 ">{label}</label>
      <div className="">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept=".jpg,.png,.pdf,.zip"
        />
        <Button
          type="button"
          variant="muatparts-primary-secondary"
          onClick={handleButtonClick}
        >
          {uploadText}
        </Button>
      </div>
      <div className="text-left ">
        <p className="text-xs text-neutral-500">
          {field.value ? field.value.name : helpText}
        </p>
        {translatedError && (
          <p className="mt-1 text-xs text-error-500">{translatedError}</p>
        )}
      </div>
    </div>
  );
};

// Main Modal Component
const AddLegalityModal = ({ isOpen, onOpenChange }) => {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: valibotResolver(legalitySchema),
    mode: "onChange",
    defaultValues: {
      businessLicense: null,
      companyRegistrationCertificate: null,
    },
  });

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    // Here you would typically handle the file upload to a server.
    return new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="w-[711px] p-0" withCloseButton={true}>
        <div className="px-8 py-6">
          <h2 className="text-center text-xl font-bold text-neutral-900">
            {t(
              "AddLegalityModal.title",
              {},
              "Tambah Business Entity Legality"
            )}
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6 px-8 py-6">
            <Controller
              name="businessLicense"
              control={control}
              render={({ field }) => (
                <FileUploadField
                  field={field}
                  error={errors.businessLicense?.message}
                  label={t(
                    "AddLegalityModal.label.businessLicense",
                    {},
                    "Business License (USCI / USCC)*"
                  )}
                  helpText={t(
                    "AddLegalityModal.helpText.fileFormat",
                    {},
                    "Format file jpg/png/pdf/zip max. 5MB"
                  )}
                  uploadText={t("AddLegalityModal.button.upload", {}, "Unggah")}
                />
              )}
            />
            <Controller
              name="companyRegistrationCertificate"
              control={control}
              render={({ field }) => (
                <FileUploadField
                  field={field}
                  error={errors.companyRegistrationCertificate?.message}
                  label={t(
                    "AddLegalityModal.label.companyCertificate",
                    {},
                    "Company Registration Certificate*"
                  )}
                  helpText={t(
                    "AddLegalityModal.helpText.fileFormat",
                    {},
                    "Format file jpg/png/pdf/zip max. 5MB"
                  )}
                  uploadText={t("AddLegalityModal.button.upload", {}, "Unggah")}
                />
              )}
            />
          </div>
          <div className="flex justify-center px-8 py-6">
            <Button
              type="submit"
              variant="muatparts-primary"
              disabled={isSubmitting}
              className="w-[180px]"
            >
              {isSubmitting
                ? t("AddLegalityModal.button.saving", {}, "Menyimpan...")
                : t("AddLegalityModal.button.save", {}, "Simpan")}
            </Button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddLegalityModal;