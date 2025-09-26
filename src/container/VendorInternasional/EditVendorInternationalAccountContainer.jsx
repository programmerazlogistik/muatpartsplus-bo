// src/app/edit-vendor-international/components/EditVendorInternationalAccountContainer.jsx
"use client";

import { useEffect } from "react";

import { valibotResolver } from "@hookform/resolvers/valibot";
import {
  Alert,
  Breadcrumb,
  Button,
  IconComponent,
  ImageComponent,
  Input,
  LoadingStatic,
  MapContainer,
  Select,
} from "@muatmuat/ui";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as v from "valibot";

import { useGetVendorsInternational } from "@/services/vendorInternasional/useGetVendorsInternasional";


/**
 * @typedef {Object} VendorFormData
 * @property {string} email
 * @property {string} phoneNumber
 * @property {string} picName
 * @property {string} picEmail
 * @property {string} picPhoneNumber
 * @property {string} position
 * @property {string} companyName
 * @property {string} companyType
 * @property {string} productType
 * @property {string} addressDetail
 * @property {string} city
 * @property {string} postalCode
 * @property {{latitude: number, longitude: number}} pinPoint
 * @property {{number: string}[]} companyPhoneNumbers
 */

const vendorSchema = v.object({
  email: v.pipe(
    v.string(),
    v.nonEmpty("EditVendorInternationalAccountContainer.error.emailRequired"),
    v.email("EditVendorInternationalAccountContainer.error.emailInvalid")
  ),
  phoneNumber: v.pipe(
    v.string(),
    v.nonEmpty("EditVendorInternationalAccountContainer.error.phoneRequired")
  ),
  picName: v.pipe(
    v.string(),
    v.nonEmpty("EditVendorInternationalAccountContainer.error.picNameRequired")
  ),
  picEmail: v.pipe(
    v.string(),
    v.nonEmpty(
      "EditVendorInternationalAccountContainer.error.picEmailRequired"
    ),
    v.email("EditVendorInternationalAccountContainer.error.picEmailInvalid")
  ),
  picPhoneNumber: v.pipe(
    v.string(),
    v.nonEmpty("EditVendorInternationalAccountContainer.error.picPhoneRequired")
  ),
  position: v.pipe(
    v.string(),
    v.nonEmpty("EditVendorInternationalAccountContainer.error.positionRequired")
  ),
  companyName: v.pipe(
    v.string(),
    v.nonEmpty(
      "EditVendorInternationalAccountContainer.error.companyNameRequired"
    )
  ),
  companyType: v.pipe(
    v.string(),
    v.nonEmpty(
      "EditVendorInternationalAccountContainer.error.companyTypeRequired"
    )
  ),
  productType: v.pipe(
    v.string(),
    v.nonEmpty(
      "EditVendorInternationalAccountContainer.error.productTypeRequired"
    )
  ),
  addressDetail: v.pipe(
    v.string(),
    v.nonEmpty("EditVendorInternationalAccountContainer.error.addressRequired")
  ),
  city: v.pipe(
    v.string(),
    v.nonEmpty("EditVendorInternationalAccountContainer.error.cityRequired")
  ),
  postalCode: v.pipe(
    v.string(),
    v.nonEmpty(
      "EditVendorInternationalAccountContainer.error.postalCodeRequired"
    )
  ),
  pinPoint: v.object({
    latitude: v.number(),
    longitude: v.number(),
  }),
  companyPhoneNumbers: v.array(
    v.object({
      number: v.pipe(
        v.string(),
        v.nonEmpty(
          "EditVendorInternationalAccountContainer.error.companyPhoneRequired"
        )
      ),
    })
  ),
});

const PhoneNumberInput = ({ register, fieldName, error, placeholder }) => {
  return (
    <div className="flex w-full">
      <div className="flex w-fit items-center justify-center gap-2 rounded-l-lg border border-r-0 border-neutral-300 bg-neutral-100 px-2">
        <ImageComponent
          src="https://flagcdn.com/id.svg"
          width={20}
          alt="Indonesia Flag"
          className="rounded"
        />
        <span className="text-sm font-medium text-neutral-900">+62</span>
        <IconComponent src="/icons/chevron-down.svg" className="size-4" />
      </div>
      <Input
        {...register(fieldName)}
        type="tel"
        placeholder={placeholder}
        className="rounded-l-none"
        errorMessage={error || ""}
      />
    </div>
  );
};

const EditVendorInternationalAccountContainer = ({ onNext, activeStep }) => {
  const {
    data: vendorData,
    isLoading,
    error: isError,
  } = useGetVendorsInternational();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm({
    resolver: valibotResolver(vendorSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "companyPhoneNumbers",
  });

  const pinPointValue = watch("pinPoint");

  useEffect(() => {
    if (vendorData) {
      reset({
        email: vendorData.accountInformation.email,
        phoneNumber: vendorData.accountInformation.phoneNumber,
        picName: vendorData.picInformation.name,
        picEmail: vendorData.picInformation.email,
        picPhoneNumber: vendorData.picInformation.phoneNumber,
        position: vendorData.picInformation.position,
        companyName: vendorData.companyInformation.name,
        companyType: vendorData.companyInformation.type,
        productType: vendorData.companyInformation.productType,
        addressDetail: vendorData.companyInformation.addressDetail,
        city: vendorData.companyInformation.city,
        postalCode: vendorData.companyInformation.postalCode,
        pinPoint: vendorData.companyInformation.pinPoint,
        companyPhoneNumbers: vendorData.companyInformation.phoneNumbers.map(
          (p) => ({ number: p.number })
        ),
      });
    }
  }, [vendorData, reset]);

  const onSubmit = (data) => {
    console.log("Form data submitted:", data);
    // Here you would save the data and proceed to next step
    onNext();
  };

  const breadcrumbData = [
    { name: "Informasi Akun", isActive: activeStep === 1 },
    { name: "Legalitas", isActive: activeStep === 2 },
    { name: "Kontrak", isActive: activeStep === 3 },
  ];

  if (isLoading) return <LoadingStatic />;
  if (isError)
    return <Alert variant="error">Failed to load vendor data.</Alert>;

  return (
    <div className="mx-auto bg-white p-8">
      

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-8">
        {/* Account Information Section */}
        <section className="space-y-5">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900">
            Account Information
          </h2>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              Email *
            </label>
            <Input
              {...register("email")}
              placeholder="example@email.com"
              errorMessage={errors.email ? errors.email.message : ""}
            />
          </div>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              Phone Number *
            </label>
            <PhoneNumberInput
              register={register}
              fieldName="phoneNumber"
              error={errors.phoneNumber?.message}
              placeholder="81234567890"
            />
          </div>
        </section>

        {/* PIC Information Section */}
        <section className="space-y-5">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900">
            PIC Information
          </h2>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              PIC Name *
            </label>
            <Input
              {...register("picName")}
              placeholder="Enter PIC name"
              errorMessage={errors.picName ? errors.picName.message : ""}
            />
          </div>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              PIC Email *
            </label>
            <Input
              {...register("picEmail")}
              placeholder="pic@example.com"
              errorMessage={errors.picEmail ? errors.picEmail.message : ""}
            />
          </div>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              PIC Phone Number *
            </label>
            <PhoneNumberInput
              register={register}
              fieldName="picPhoneNumber"
              error={errors.picPhoneNumber?.message}
              placeholder="81234567890"
            />
          </div>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              Position *
            </label>
            <Input
              {...register("position")}
              placeholder="Enter position"
              errorMessage={errors.position ? errors.position.message : ""}
            />
          </div>
        </section>

        {/* Company Information Section */}
        <section className="space-y-5">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900">
            Company Information
          </h2>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              Company Name *
            </label>
            <Input
              {...register("companyName")}
              placeholder="Enter company name"
              errorMessage={
                errors.companyName ? errors.companyName.message : ""
              }
            />
          </div>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              Company Type *
            </label>
            <div className="w-full">
              <Select
                label={"Company Type"}
                options={[
                  { value: "Ltd", label: "Ltd" },
                  { value: "Corp", label: "Corp" },
                ]}
                errorMessage={errors.companyType?.message}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              Product Type *
            </label>
            <div className="w-full">
              <Select
                {...register("productType")}
                options={[
                  { label: "OEM", value: "oem" },
                  { label: "Retail", value: "retail" },
                ]}
              />
            </div>
          </div>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              Address Detail *
            </label>
            <Input
              {...register("addressDetail")}
              placeholder="Enter full address"
              errorMessage={
                errors.addressDetail ? errors.addressDetail.message : ""
              }
            />
          </div>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              City *
            </label>
            <Input
              {...register("city")}
              placeholder="Enter city"
              errorMessage={errors.city ? errors.city.message : ""}
            />
          </div>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              Postal Code *
            </label>
            <div className="w-full">
              <Select
                {...register("postalCode")}
                options={[
                  { label: "612312", value: "612312" },
                  { label: "60241", value: "60241" },
                ]}
              />
            </div>
          </div>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              Pin Point *
            </label>
            <div className="flex flex-col gap-4">
              <Controller
                name="pinPoint"
                control={control}
                render={({ field }) => (
                  <div className="relative col-span-2 w-[262px] overflow-hidden rounded-lg">
                    <div className="relative h-36 w-full">
                      <MapContainer
                        coordinates={field.value}
                        className="h-full w-full rounded-lg"
                        onPositionChange={field.onChange}
                        draggableMarker
                        viewOnly={true}
                        textLabel={"Lokasi Perusahaan"}
                      />
                    </div>
                    <Button
                      type="button"
                      className="w-full rounded-none bg-primary-600 py-4 text-center font-sans text-neutral-50 transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2"
                    >
                      Atur Pin Lokasi
                    </Button>
                  </div>
                )}
              />
            </div>
          </div>
          <div className="flex-col items-center justify-start gap-[21px]">
            <div className="flex w-full">
              <label className="mb-2 block w-[262px] text-sm font-medium text-neutral-700">
                Company Phone Number *
              </label>
              {fields.map((field, index) => (
                <div key={field.id} className="flex w-full items-start gap-2">
                  <PhoneNumberInput
                    register={register}
                    fieldName={`companyPhoneNumbers.${index}.number`}
                    error={errors.companyPhoneNumbers?.[index]?.number?.message}
                    placeholder="81234567890"
                  />
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="muatparts-primary-secondary"
                      onClick={() => remove(index)}
                      className="mt-1 h-10 px-3"
                    >
                      <IconComponent
                        src="/icons/trash.svg"
                        className="size-5"
                      />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center">
              <Button
                type="button"
                variant="muatparts-primary-secondary"
                className="w-fit"
                onClick={() => append({ number: "" })}
              >
                + Tambah
              </Button>
            </div>
          </div>
        </section>

        <div className="flex flex-col items-center justify-center space-y-4">
          <Button type="submit" variant="muatparts-primary" className="w-fit">
            Selanjutnya
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditVendorInternationalAccountContainer;
