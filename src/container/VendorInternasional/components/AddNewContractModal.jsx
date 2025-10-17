// src/app/add-contract-modal-example/page.js
"use client";

import { useRef } from "react";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { Button } from "@muatmuat/ui/Button";
import { Input, Select, TextArea } from "@muatmuat/ui/Form";
import { IconComponent } from "@muatmuat/ui/IconComponent";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalTitle,
} from "@muatmuat/ui/Modal";
import { Controller, useForm } from "react-hook-form";
import * as v from "valibot";

// src/app/add-contract-modal-example/page.js

// src/app/add-contract-modal-example/page.js

// src/app/add-contract-modal-example/page.js

// src/app/add-contract-modal-example/page.js

/**
 * @typedef {Object} AddContractFormData
 * @property {string} agreementNumber - The cooperation agreement number.
 * @property {File | null} agreementFile - The uploaded agreement file.
 * @property {string} notes - Cooperation notes.
 * @property {string} agreementDate - The date of the agreement.
 * @property {string} contractDuration - The duration of the contract in years.
 */

const addContractSchema = v.object({
  agreementNumber: v.pipe(
    v.string(),
    v.nonEmpty("AddContractModal.validation.agreementNumber.required")
  ),
  agreementFile: v.pipe(
    v.instance(File, "AddContractModal.validation.agreementFile.required"),
    v.check(
      (file) => file.size <= 5 * 1024 * 1024,
      "AddContractModal.validation.agreementFile.maxSize"
    ),
    v.check(
      (file) =>
        [
          "image/jpeg",
          "image/png",
          "application/pdf",
          "application/zip",
        ].includes(file.type),
      "AddContractModal.validation.agreementFile.fileType"
    )
  ),
  notes: v.pipe(
    v.string(),
    v.nonEmpty("AddContractModal.validation.notes.required")
  ),
  agreementDate: v.pipe(
    v.string(),
    v.nonEmpty("AddContractModal.validation.agreementDate.required")
  ),
  contractDuration: v.pipe(
    v.string(),
    v.nonEmpty("AddContractModal.validation.contractDuration.required"),
    v.regex(/^[1-9]\d*$/, "AddContractModal.validation.contractDuration.number")
  ),
});

// type AddContractFormData = v.InferOutput<typeof addContractSchema>;

const AddContractModal = ({ isOpen, onOpenChange, onSubmit }) => {
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
    // } = useForm<AddContractFormData>({
  } = useForm({
    resolver: valibotResolver(addContractSchema),
    mode: "onChange",
    defaultValues: {
      agreementNumber: "",
      agreementFile: null,
      notes: "",
      agreementDate: "",
      contractDuration: "",
    },
  });

  const selectedFile = watch("agreementFile");

  // const handleFormSubmit: SubmitHandler<AddContractFormData> = (data) => {
  //   onSubmit(data);
  // };
  const handleFormSubmit = (data) => {
    alert("Contract added successfully!");
  };

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="w-[711px] p-0">
        <div className="flex items-center justify-between px-6 py-4">
          <ModalClose />
        </div>

        <ModalTitle className="font-bold text-neutral-900">
          "Tambah Kontrak Baru"
        </ModalTitle>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid grid-cols-[max-content_1fr] items-start gap-x-8 gap-y-4 p-6">
            {/* Agreement Number */}
            <label
              htmlFor="agreementNumber"
              className="mt-2 text-sm font-medium text-neutral-700"
            >
              "Nomor Perjanjian Kerjasama" *
            </label>
            <Input
              id="agreementNumber"
              placeholder="Masukkan Nomor Perjanjian Kerjasama"
              error=""
              {...register("agreementNumber")}
            />

            {/* Agreement File */}
            <label className="mt-2 text-sm font-medium text-neutral-700">
              "Perjanjian Kerjasama" *
            </label>
            <div>
              <Controller
                name="agreementFile"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <>
                    <input
                      type="file"
                      ref={fileInputRef}
                      name={name}
                      onChange={(e) => onChange(e.target.files?.[0])}
                      accept=".jpg,.png,.pdf,.zip"
                      className="hidden"
                    />
                    <div className="flex items-center gap-3">
                      <Button
                        type="button"
                        variant="muatparts-primary-secondary"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        "Unggah"
                      </Button>
                      <span className="text-xs text-neutral-500">
                        "Format file jpg/png/pdf/zip max. 5MB"
                      </span>
                    </div>
                  </>
                )}
              />
              {selectedFile && (
                <div className="mt-2 flex items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 p-2 text-sm">
                  <IconComponent
                    src="/icons/document-text.svg"
                    className="size-4 flex-shrink-0"
                  />
                  <span className="truncate text-neutral-700">
                    {selectedFile.name}
                  </span>
                </div>
              )}
              {errors.agreementFile && (
                <p className="mt-1 text-xs text-error-500">""</p>
              )}
            </div>

            {/* Notes */}
            <label
              htmlFor="notes"
              className="mt-2 text-sm font-medium text-neutral-700"
            >
              "Catatan Kerjasama"*
            </label>
            <TextArea
              id="notes"
              placeholder="Masukkan Catatan"
              error=""
              {...register("notes")}
              className="h-[80px]"
            />

            {/* Agreement Date */}
            <label
              htmlFor="agreementDate"
              className="mt-2 text-sm font-medium text-neutral-700"
            >
              "Tanggal Kerjasama" *
            </label>
            <Controller
              name="agreementDate"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Pilih Tanggal"
                  errorMessage=""
                >
                  <Select.Content>
                    <Select.Item value="2025-09-26">
                      26 September 2025
                    </Select.Item>
                    <Select.Item value="2025-09-27">
                      27 September 2025
                    </Select.Item>
                    <Select.Item value="2025-09-28">
                      28 September 2025
                    </Select.Item>
                  </Select.Content>
                </Select>
              )}
            />

            {/* Contract Duration */}
            <label
              htmlFor="contractDuration"
              className="mt-2 text-sm font-medium text-neutral-700"
            >
              "Jangka Lama Kontrak" *
            </label>
            <div className="flex items-center justify-between gap-6">
              <Input
                id="contractDuration"
                type="number"
                placeholder="Masukkan Jangka Lama Kontrak"
                error=""
                {...register("contractDuration")}
              />
              <span className="text-sm text-neutral-700">Tahun</span>
            </div>
          </div>

          <div className="flex justify-center pb-9 pt-3">
            <Button
              type="submit"
              variant="muatparts-primary"
              disabled={isSubmitting}
              className="w-28"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddContractModal;
