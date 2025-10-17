"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { cn } from "@muatmuat/lib/utils";
import { Button } from "@muatmuat/ui/Button";
import { Input, TextArea } from "@muatmuat/ui/Form";
import { IconComponent } from "@muatmuat/ui/IconComponent";
import { Controller, useForm } from "react-hook-form";
import * as v from "valibot";

import { DatePicker } from "@/components/Calendar/DatePicker";
import { ModalSuccess } from "@/components/Modal/ModalSuccess";
import { ModalWarning } from "@/components/Modal/ModalWarning";
import PageTitle from "@/components/PageTitle/PageTitle";
import { FileInput } from "@/components/Upload/FileInput";

/**
 * @typedef {import('valibot').InferOutput<typeof contractSchema>} ContractFormData
 */

// --- Validation Schema ---
const contractSchema = v.object({
  // Bank Account
  swiftBicCode: v.pipe(v.string(), v.nonEmpty("Wajib diisi")),
  accountNumber: v.pipe(v.string(), v.nonEmpty("Wajib diisi")),
  accountHolderName: v.pipe(v.string(), v.nonEmpty("Wajib diisi")),
  picFinancePhoneNumber: v.pipe(v.string(), v.nonEmpty("Wajib diisi")),

  // Contract
  agreementNumber: v.pipe(v.string(), v.nonEmpty("Wajib diisi")),
  agreementFile: v.instance(File, "Wajib diisi"),
  cooperationNotes: v.optional(v.string()),
  agreementDate: v.date("Wajib diisi"),
  contractDuration: v.number("Wajib diisi"),
});

// --- Main Form Component ---
const FormKontrak = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: valibotResolver(contractSchema),
    mode: "onBlur",
    defaultValues: {
      swiftBicCode: "",
      accountNumber: "",
      accountHolderName: "",
      picFinancePhoneNumber: "",
      agreementNumber: "",
      agreementFile: undefined,
      cooperationNotes: "",
      agreementDate: undefined,
      contractDuration: undefined,
    },
  });

  /** @param {ContractFormData} data */
  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    alert("Form submitted successfully! Check console for data.");
  };

  const FormRow = ({ label, required, children, className }) => (
    <>
      <label
        className={cn("pt-2 text-sm font-semibold text-neutral-600", className)}
      >
        {label}
        {required && <span>*</span>}
      </label>
      <div className="w-full">{children}</div>
    </>
  );

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
          <span className="font-semibold text-neutral-600">Legalitas</span>
          <IconComponent
            src="/icons/chevron-down.svg"
            className="h-4 w-4 rotate-[-90deg] text-neutral-600"
          />
          <span className="font-semibold text-primary-700">Kontrak</span>
        </div>
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
        {/* --- Bank Account Section --- */}
        <div className="space-y-4 px-[25px]">
          <h2 className="text-base font-medium text-neutral-900">
            Bank Account
          </h2>
          <div className="grid grid-cols-1 gap-4 pl-2.5 md:grid-cols-[230px_1fr]">
            <FormRow label="SWIFT/BIC Code" required>
              <Input
                placeholder="Masukkan Nomor Rekening"
                errorMessage={errors.swiftBicCode?.message}
                {...register("swiftBicCode")}
              />
            </FormRow>
            <FormRow label="Account Number" required>
              <Input
                placeholder="Masukkan Nama PIC Finance"
                errorMessage={errors.accountNumber?.message}
                {...register("accountNumber")}
              />
            </FormRow>
            <FormRow label="Account Holder Name" required>
              <Input
                placeholder="Masukkan Nama Rekening"
                errorMessage={errors.accountHolderName?.message}
                {...register("accountHolderName")}
              />
            </FormRow>
            <FormRow label="PIC Finance Phone Number" required>
              <Input
                placeholder="Masukkan Nama PIC Finance"
                errorMessage={errors.picFinancePhoneNumber?.message}
                {...register("picFinancePhoneNumber")}
              />
            </FormRow>
          </div>
        </div>

        {/* --- Kontrak Section --- */}
        <div className="space-y-4 px-[25px]">
          <h2 className="text-base font-medium text-neutral-900">Kontrak</h2>
          <div className="grid grid-cols-1 gap-4 pl-2.5 md:grid-cols-[230px_1fr]">
            <FormRow label="Nomor Perjanjian Kerjasama" required>
              <Input
                placeholder="Masukkan Nomor Perjanjian Kerjasama"
                errorMessage={errors.agreementNumber?.message}
                {...register("agreementNumber")}
              />
            </FormRow>
            <FormRow label="Perjanjian Kerjasama" required>
              <Controller
                name="agreementFile"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FileInput
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name="agreementFile"
                    error={error?.message}
                    helperText="Format file jpg/png/pdf/zip max. 5MB"
                  />
                )}
              />
            </FormRow>
            <FormRow label="Catatan Kerjasama" className="pt-4">
              <TextArea
                placeholder="Masukkan Catatan"
                errorMessage={errors.cooperationNotes?.message}
                {...register("cooperationNotes")}
                className="h-[45px]"
              />
            </FormRow>
            <FormRow label="Tanggal Kerjasama" required>
              <Controller
                name="agreementDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Pilih Tanggal"
                    dateFormat="dd MMM yyyy"
                    errorMessage={error?.message}
                  />
                )}
              />
            </FormRow>
            <FormRow label="Jangka Lama Kontrak" required>
              <div className="flex gap-5">
                <Input
                  type="number"
                  placeholder="Masukkan Jangka Lama Kontrak"
                  errorMessage={errors.contractDuration?.message}
                  {...register("contractDuration", { valueAsNumber: true })}
                />
                <span className="pt-4 text-sm font-semibold text-[#868686]">
                  Tahun
                </span>
              </div>
            </FormRow>
          </div>

          {/* --- Footer Buttons --- */}
          <div className="flex w-full justify-center gap-4">
            <Button
              type="button"
              variant="muatparts-primary-secondary"
              className="h-8 rounded-[20px] border-primary-700 px-6 py-2 text-sm font-semibold text-primary-700"
            >
              Sebelumnya
            </Button>
            <Button
              type="submit"
              variant="muatparts-primary"
              className="h-8 rounded-[20px] bg-primary-700 px-6 py-2 text-sm font-semibold text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </div>
      </form>

      <ModalWarning
        open={false}
        description="Nama perusahaan telah terdaftar"
      />
      <ModalWarning open={false} description="Email  telah terdaftar" />
      <ModalWarning
        open={false}
        description="Nomor whatsapp  telah terdaftar"
      />
      <ModalSuccess open={false} />
    </div>
  );
};

export default FormKontrak;
