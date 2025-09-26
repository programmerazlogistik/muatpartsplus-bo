"use client";

import React, { useEffect, useState } from "react";

import { useGetCompanyTypes } from "@/services/vendorInternasional/useGetCompanyTypes";
import { useGetPostalCodes } from "@/services/vendorInternasional/useGetPostalCodes";
import { useGetProductTypes } from "@/services/vendorInternasional/useGetProductTypes";
import { useGetVendorDetail } from "@/services/vendorInternasional/useGetVendorDetail";

import BreadCrumb from "@/components/Breadcrumb/Breadcrumb";
import Button from "@/components/Button/Button";
// Assuming a generic Input component
import Dropdown from "@/components/Dropdown/Dropdown";
import Input from "@/components/Form/Input";
import IconComponent from "@/components/IconComponent/IconComponent";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import { MapContainer } from "@/components/MapContainer/MapContainer";
import TextArea from "@/components/TextArea/TextArea";

import { useTranslation } from "@/hooks/use-translation";

// Mock Phone Input Component for demonstration
const PhoneInput = ({ label, value, onChange, required }) => (
  <div className="w-full">
    {label && (
      <label className="mb-2 block text-sm font-medium text-neutral-900">
        {label}
        {required && <span className="text-error-500">*</span>}
      </label>
    )}
    <div className="flex">
      <div className="flex items-center rounded-l-lg border border-r-0 border-neutral-300 bg-neutral-200 px-3">
        <ImageComponent
          src="https://flagcdn.com/id.svg"
          width={24}
          alt="Indonesia Flag"
        />
        <span className="ml-2 text-sm text-neutral-900">+62</span>
      </div>
      <input
        type="tel"
        value={value}
        onChange={onChange}
        className="w-full rounded-r-lg border border-neutral-300 p-2 text-sm"
      />
    </div>
  </div>
);

const EditVendorInternationalContainer = ({ onNext, activeStep }) => {
  const { t } = useTranslation();
  const [formState, setFormState] = useState({
    email: "",
    phoneNumber: "",
    picName: "",
    picEmail: "",
    picPhoneNumber: "",
    position: "",
    companyName: "",
    companyType: "",
    productType: "",
    addressDetail: "",
    companyLocationGmaps: "",
    city: "",
    postalCode: "",
    pinPoint: { latitude: -7.2926, longitude: 112.727 },
    companyPhoneNumbers: [{ id: 1, number: "" }],
  });

  const { data: vendorData, isLoading: isLoadingVendor } = useGetVendorDetail();
  const { data: companyTypesData } = useGetCompanyTypes();
  const { data: productTypesData } = useGetProductTypes();
  const { data: postalCodesData } = useGetPostalCodes(formState.city);

  useEffect(() => {
    if (vendorData) {
      setFormState((prevState) => ({ ...prevState, ...vendorData }));
    }
  }, [vendorData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDropdownChange = (name, value) => {
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const breadcrumbItems = [
    { name: "Informasi Akun", isActive: activeStep === 1 },
    { name: "Legalitas", isActive: activeStep === 2 },
    { name: "Kontrak", isActive: activeStep === 3 },
  ];

  if (isLoadingVendor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto bg-white p-8">
      <div className="mb-6 flex items-center">
        <IconComponent
          src="/icons/arrow-left.svg"
          alt="Back"
          className="mr-4 cursor-pointer"
        />
        <h1 className="text-xl font-bold text-neutral-900">
          {t(
            "UbahVendorInternationalPage.title",
            {},
            "Ubah Vendor International"
          )}
        </h1>
      </div>
      <div className="flex items-center justify-center">
        <BreadCrumb data={breadcrumbItems} separator="›" />
      </div>

      <form className="mt-6 space-y-8" onSubmit={(e) => e.preventDefault()}>
        {/* Account Information */}
        <section className="space-y-5">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900">
            Account Information
          </h2>
          <div className="flex items-center justify-start">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              Email *
            </label>
            <Input
              label={t("UbahVendorInternationalPage.labelEmail", {}, "Email*")}
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-start">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              Phone Number *
            </label>
            <PhoneInput
              value={formState.phoneNumber}
              onChange={(e) =>
                setFormState({ ...formState, phoneNumber: e.target.value })
              }
              className="w-full"
            />
          </div>
        </section>

        {/* PIC Information */}
        <section className="space-y-5">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900">
            {t(
              "UbahVendorInternationalPage.sectionTitlePicInformation",
              {},
              "PIC Information"
            )}
          </h2>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              PIC Name *
            </label>
            <Input
              name="picName"
              value={formState.picName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              PIC Email *
            </label>
            <Input
              name="picEmail"
              value={formState.picEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              PIC Phone Number *
            </label>
            <PhoneInput
              value={formState.picPhoneNumber}
              onChange={(e) =>
                setFormState({ ...formState, picPhoneNumber: e.target.value })
              }
              required
            />
          </div>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              Position *
            </label>
            <Input
              name="position"
              value={formState.position}
              onChange={handleChange}
              required
            />
          </div>
        </section>

        {/* Company Information */}
        <section className="space-y-5">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900">
            {t(
              "UbahVendorInternationalPage.sectionTitleCompanyInformation",
              {},
              "Company Information"
            )}
          </h2>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              Company Name *
            </label>
            <Input
              name="companyName"
              value={formState.companyName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              Company Type *
            </label>
            <Dropdown
              className="w-full"
              options={companyTypesData?.types || []}
              placeholder={t(
                "UbahVendorInternationalPage.placeholderSelect",
                {},
                "Select"
              )}
              onSelected={(selected) =>
                handleDropdownChange("companyType", selected.value)
              }
              value={formState.companyType}
            />
          </div>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              Product Type *
            </label>
            <Dropdown
              className="w-full"
              options={productTypesData?.types || []}
              placeholder={t(
                "UbahVendorInternationalPage.placeholderSelect",
                {},
                "Select"
              )}
              onSelected={(selected) =>
                handleDropdownChange("productType", selected.value)
              }
              value={formState.productType}
            />
          </div>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              Address Detail *
            </label>
            <TextArea
              name="addressDetail"
              value={formState.addressDetail}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              Company Location (Gmaps) *
            </label>
            <Input
              name="companyLocationGmaps"
              value={formState.companyLocationGmaps}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              City *
            </label>
            <Input
              name="city"
              value={formState.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              Postal Code *
            </label>
            <Dropdown
              className="w-full"
              options={postalCodesData?.codes || []}
              placeholder={t(
                "UbahVendorInternationalPage.placeholderSelect",
                {},
                "Select"
              )}
              onSelected={(selected) =>
                handleDropdownChange("postalCode", selected.value)
              }
              value={formState.postalCode}
            />
          </div>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              {t("UbahVendorInternationalPage.labelPinPoint", {}, "Pin Point*")}
            </label>
            <div className="relative col-span-2 w-[262px] overflow-hidden rounded-lg">
              <div className="relative h-36 w-full">
                <MapContainer
                  coordinates={formState.pinPoint}
                  className="h-full w-full rounded-lg"
                  viewOnly={true}
                  textLabel={t(
                    "CompanyProfileInfo.companyLocation",
                    {},
                    "Lokasi Perusahaan"
                  )}
                  draggableMarker={false}
                />
              </div>
              <Button
                // onClick={handleOpenModal}
                className="w-full rounded-none bg-primary-600 py-4 text-center font-sans text-neutral-50 transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2"
              >
                Atur Pin Lokasi
              </Button>
            </div>
          </div>
          <div>
            {formState.companyPhoneNumbers.map((phone, index) => (
              <div
                key={phone.id}
                className="mb-3 flex items-center justify-start gap-[21px]"
              >
                <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
                  Company Phone Number {index + 1} *
                </label>
                <PhoneInput
                  value={phone.number}
                  onChange={(e) => {
                    /* handle individual phone number change */
                  }}
                  required
                />
              </div>
            ))}
            <div className="flex items-center justify-center">
              <Button variant="muatparts-primary-secondary" className="w-fit">
                + Tambah
              </Button>
            </div>
          </div>
        </section>

        <div className="flex flex-col items-center justify-center space-y-4">
           <Button variant="muatparts-primary" className="w-fit" onClick={onNext}>
             Selanjutnya
           </Button>
         </div>
      </form>
    </div>
  );
};

export default EditVendorInternationalContainer;
