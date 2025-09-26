// src/app/ubah-vendor-international/page.js
"use client";

import React, { useEffect, useState } from "react";

import { useGetVendorLegality } from "@/services/vendorInternasional/useGetVendorLegality";

// import { useGetVendorInternationalDetail } from "@/services/useGetVendorInternationalDetail";
import BreadCrumb from "@/components/Breadcrumb/Breadcrumb";
import Button from "@/components/Button/Button";
import FileUpload from "@/components/FileUpload/FileUpload";
import IconComponent from "@/components/IconComponent/IconComponent";

import { useTranslation } from "@/hooks/use-translation";

// src/app/ubah-vendor-international/page.js

// src/app/ubah-vendor-international/page.js

// A simple sub-component for file fields to reduce repetition
const FileDisplayField = ({ label, fileName, isOptional = false }) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-start gap-[21px]">
      <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
        {label}
        {isOptional && (
          <span className="text-neutral-500">
            {" "}
            {t("UbahVendorInternationalPage.labelOptional", {}, "(Opsional)")}
          </span>
        )}
        {!isOptional && <span className="text-neutral-700">*</span>}
      </label>
      <div className="flex items-center gap-4">
        {fileName && (
          <span className="text-link w-[118px] text-sm font-semibold">
            {fileName}
          </span>
        )}
        <Button
          variant="muatparts-primary-secondary"
          size="sm"
          className="ml-4 h-8 w-[88px] !text-sm"
        >
          {t("UbahVendorInternationalPage.buttonUbah", {}, "Ubah")}
        </Button>
      </div>
    </div>
  );
};

const EditVendorInternationalLegalityContainer = ({
  onPrevious,
  onNext,
  activeStep,
}) => {
  const { t } = useTranslation();
  const { data: vendorData, isLoading } = useGetVendorLegality();

  const [directorInfo, setDirectorInfo] = useState({
    identityCardNumber: "",
    name: "",
    position: "",
  });
  const [brands, setBrands] = useState([]);

  const breadcrumbItems = [
    { name: "Informasi Akun", isActive: activeStep === 1 },
    { name: "Legalitas", isActive: activeStep === 2 },
    { name: "Kontrak", isActive: activeStep === 3 },
  ];

  useEffect(() => {
    if (vendorData) {
      setDirectorInfo(vendorData.directorInformation);
      setBrands(vendorData.brands);
    }
  }, [vendorData]);

  const addBrand = () => {
    setBrands([
      ...brands,
      {
        id: `new_brand_${Date.now()}`,
        name: "",
        iprFile: "",
        registrationDate: "",
        originCertificateFile: "",
      },
    ]);
  };

  if (isLoading) {
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
        {/* Business Legal Entity */}
        <section className="space-y-5">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900">
            {t(
              "UbahVendorInternationalPage.titleBusinessLegal",
              {},
              "Business Legal Entity"
            )}
          </h2>
          <FileDisplayField
            label={t(
              "UbahVendorInternationalPage.labelBusinessLicense",
              {},
              "Business License (USCI / USCC)"
            )}
            fileName={vendorData?.businessLegalEntity?.businessLicense}
          />
          <FileDisplayField
            label={t(
              "UbahVendorInternationalPage.labelCompanyRegistration",
              {},
              "Company Registration Certificate"
            )}
            fileName={vendorData?.businessLegalEntity?.companyRegistration}
          />
          <FileDisplayField
            label={t(
              "UbahVendorInternationalPage.labelVatCertificate",
              {},
              "VAT Certificate"
            )}
            fileName={vendorData?.businessLegalEntity?.vatCertificate}
            isOptional
          />
          <div className="rounded-lg border border-neutral-300 p-4">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-300">
                  <th className="py-2 font-semibold">
                    {t(
                      "UbahVendorInternationalPage.tableHeaderLastUpdate",
                      {},
                      "last update"
                    )}
                  </th>
                  <th className="py-2 font-semibold">
                    {t(
                      "UbahVendorInternationalPage.labelBusinessLicense",
                      {},
                      "Business License (USCI / USCC)"
                    )}
                  </th>
                  <th className="py-2 font-semibold">
                    {t(
                      "UbahVendorInternationalPage.labelCompanyRegistration",
                      {},
                      "Company Registration Certificate"
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {vendorData?.businessLegalEntity?.history.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2">{item.lastUpdate}</td>
                    <td className="text-link py-2">
                      {item.businessLicenseFile}
                    </td>
                    <td className="text-link py-2">
                      {item.companyRegistrationFile}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Director Information */}
        <section className="space-y-5">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900">
            {t(
              "UbahVendorInternationalPage.titleDirectorInfo",
              {},
              "Director Information"
            )}
          </h2>
          <FileDisplayField
            label={t(
              "UbahVendorInternationalPage.labelDirectorIdCard",
              {},
              "Director Identity Card"
            )}
            fileName={vendorData?.directorInformation?.identityCardFile}
          />
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              Director Identity Card Number *
            </label>
            <input
              type="text"
              value={directorInfo?.identityCardNumber || ""}
              onChange={(e) =>
                setDirectorInfo({
                  ...directorInfo,
                  identityCardNumber: e.target.value,
                })
              }
              className="w-full rounded-md border border-neutral-300 p-2"
            />
          </div>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              Director Name *
            </label>
            <input
              type="text"
              value={directorInfo?.name || ""}
              onChange={(e) =>
                setDirectorInfo({ ...directorInfo, name: e.target.value })
              }
              className="w-full rounded-md border border-neutral-300 p-2"
            />
          </div>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              Position *
            </label>
            <input
              type="text"
              value={directorInfo?.position || ""}
              onChange={(e) =>
                setDirectorInfo({ ...directorInfo, position: e.target.value })
              }
              className="w-full rounded-md border border-neutral-300 p-2"
            />
          </div>
          <FileDisplayField
            label={t(
              "UbahVendorInternationalPage.labelDirectorStatement",
              {},
              "Director Statement Letter"
            )}
            fileName={vendorData?.directorInformation?.statementLetterFile}
          />
        </section>

        {/* Legalitas Dagang */}
        <section className="space-y-2">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900">
            {t(
              "UbahVendorInternationalPage.titleTradingLegality",
              {},
              "Legalitas Dagang"
            )}
          </h2>
          {brands.map((brand, index) => (
            <>
            <div className="flex justify-end items-center">
              <button className="text-[#F71717] underline">- Hapus Merek</button>
            </div>
            {/* <div className="space-y-5"> */}
              <div
                key={brand.id}
                className="space-y-5 rounded-lg border border-neutral-300 p-4"
              >
                <div className="flex items-center justify-start gap-[21px]">
                  <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
                    Brand *
                  </label>
                  <input
                    type="text"
                    value={brand.name}
                    className="w-full rounded-md border border-neutral-300 p-2"
                  />
                </div>
                <FileDisplayField
                  label={t(
                    "UbahVendorInternationalPage.labelIPR",
                    {},
                    "Intellectual Property (IP) / IPR"
                  )}
                  fileName={brand.iprFile}
                  isOptional
                />
                <div className="flex items-center justify-start gap-[21px]">
                  <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
                    Registration Date *
                  </label>
                  <input
                    type="date"
                    value={brand.registrationDate}
                    className="w-full rounded-md border border-neutral-300 p-2"
                  />
                </div>
                <FileDisplayField
                  label={t(
                    "UbahVendorInternationalPage.labelOriginCertificate",
                    {},
                    "Certificate of Origin"
                  )}
                  fileName={brand.originCertificateFile}
                />
              </div>
            {/* </div> */}
            </>
          ))}
          <div className="flex items-center justify-center">
            <Button
              variant="muatparts-primary-secondary"
              className="h-9"
              onClick={addBrand}
            >
              {t(
                "UbahVendorInternationalPage.buttonAddBrand",
                {},
                "+ Tambah Merek"
              )}
            </Button>
          </div>
        </section>

        {/* Product List */}
        <section className="space-y-5">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900">
            {t(
              "UbahVendorInternationalPage.titleProductList",
              {},
              "Product List"
            )}
          </h2>
          <FileDisplayField
            label={t(
              "UbahVendorInternationalPage.labelProductCatalog",
              {},
              "Product Catalog"
            )}
            fileName={vendorData?.productCatalog}
            isOptional
          />
        </section>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="muatparts-primary-secondary"
            className="w-32"
            onClick={onPrevious}
          >
            Sebelumnya
          </Button>
          <Button variant="muatparts-primary" className="w-32" onClick={onNext}>
            Selanjutnya
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditVendorInternationalLegalityContainer;
