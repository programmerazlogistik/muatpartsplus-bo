// src/app/edit-vendor-international/components/EditVendorInternationalLegalityContainer.jsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useGetVendorLegality } from "@/services/vendorInternasional/useGetVendorLegality";

import Button from "@/components/Button/Button";

import AddBusinessEntityLegalityModal from "./components/AddBusinessEntityLegalityModal";

// src/app/edit-vendor-international/components/EditVendorInternationalLegalityContainer.jsx

// import { AddBusinessEntityLegalityModal } from "./components/AddBusinessEntityLegalityModal";
// import AddBusinessEntityLegalityModal from "./components/AddBusinessEntityLegalityModal";

// src/app/edit-vendor-international/components/EditVendorInternationalLegalityContainer.jsx

const FileDisplayField = ({ label, file, isOptional = false }) => {
  return (
    <div className="flex items-center justify-start gap-[21px]">
      <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
        {label}
        {isOptional && <span className="text-neutral-500"> (Opsional)</span>}
        {!isOptional && <span className="text-neutral-700">*</span>}
      </label>
      <div className="flex items-center gap-4">
        {file?.name && (
          <a
            href={file?.url || "#"}
            className="text-link w-[118px] text-sm font-semibold underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {file.name}
          </a>
        )}
        <Button
          variant="muatparts-primary-secondary"
          size="sm"
          className="ml-4 h-8 w-[88px] !text-sm"
        >
          Ubah
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
  const { data: vendorData, isLoading } = useGetVendorLegality();

  const [directorInfo, setDirectorInfo] = useState({
    identityCardNumber: "",
    name: "",
    position: "",
  });
  const [brands, setBrands] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const breadcrumbItems = [
    { name: "Informasi Akun", isActive: activeStep === 1 },
    { name: "Legalitas", isActive: activeStep === 2 },
    { name: "Kontrak", isActive: activeStep === 3 },
  ];

  useEffect(() => {
    if (vendorData) {
      setDirectorInfo(vendorData.directorInfo);
      setBrands(vendorData.exporterLegality?.brands || []);
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

  const removeBrand = (indexToRemove) => {
    setBrands(brands.filter((_, index) => index !== indexToRemove));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    // Here you would validate and save the legality data
    console.log("Legality data:", { directorInfo, brands });
    onNext();
  };

  if (isLoading) {
    return (
      <div className="mx-auto bg-white p-8">
        <div className="flex items-center justify-center py-12">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto bg-white p-8">
      <form className="mt-6 space-y-8" onSubmit={handleNextStep}>
        {/* Business Legal Entity */}
        <section className="space-y-5">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900">
            Business Legal Entity
          </h2>
          <FileDisplayField
            label="Business License (USCI / USCC)"
            file={vendorData?.businessLegalEntity?.businessLicense}
          />
          <FileDisplayField
            label="Company Registration Certificate"
            file={vendorData?.businessLegalEntity?.companyRegistration}
          />
          <FileDisplayField
            label="VAT Certificate"
            file={vendorData?.businessLegalEntity?.vatCertificate}
            isOptional
          />
          <button
            type="button"
            className="flex items-center text-sm text-primary-600 underline"
            onClick={() => setIsModalOpen(true)}
          >
            + Bussiness Legal Entity
          </button>
          <div className="w-[619px] rounded-lg border border-neutral-300 p-4">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-300 text-neutral-700">
                  <th className="py-2 font-medium italic">last update</th>
                  <th className="py-2 font-medium italic">
                    Business License (USCI / USCC) *
                  </th>
                  <th className="py-2 font-medium italic">
                    Company Registration Certificate *
                  </th>
                </tr>
              </thead>
              <tbody>
                {vendorData?.businessLegalEntity?.history?.map(
                  (item) => (
                    console.log({ item }),
                    (
                      <tr key={item.id}>
                        <td className="py-2">{item.date}</td>
                        <td className="text-link p-2">
                          <Link
                            href={item.businessLicense.url}
                            className="text-green-500 underline"
                          >
                            {item.businessLicense.name}
                          </Link>
                        </td>
                        <td className="text-link p-2">
                          <Link
                            href={item.companyRegistration.url}
                            className="text-green-500 underline"
                          >
                            {item.companyRegistration.name}
                          </Link>
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-center"></div>
        </section>

        {/* Director Information */}
        <section className="space-y-5">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900">
            Director Information
          </h2>
          <FileDisplayField
            label="Director Identity Card"
            file={vendorData?.directorInfo?.idCard}
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
            label="Director Statement Letter"
            file={vendorData?.directorInfo?.statementLetter}
          />
        </section>

        {/* Legalitas Dagang */}
        <section className="space-y-2">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900">
            Legalitas Dagang
          </h2>
          {brands.map((brand, index) => (
            <div key={brand.id}>
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  className="text-[#F71717] underline"
                  onClick={() => removeBrand(index)}
                >
                  - Hapus Merek
                </button>
              </div>
              <div className="space-y-5 rounded-lg border border-neutral-300 p-4">
                <div className="flex items-center justify-start gap-[21px]">
                  <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
                    Brand *
                  </label>
                  <input
                    type="text"
                    value={brand.name}
                    onChange={(e) => {
                      const updatedBrands = [...brands];
                      updatedBrands[index].name = e.target.value;
                      setBrands(updatedBrands);
                    }}
                    className="w-full rounded-md border border-neutral-300 p-2"
                  />
                </div>
                <FileDisplayField
                  label="Intellectual Property (IP) / IPR"
                  file={brand.ipr}
                  isOptional
                />
                <div className="flex items-center justify-start gap-[21px]">
                  <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
                    Registration Date *
                  </label>
                  <input
                    type="date"
                    value={brand.registrationDate}
                    onChange={(e) => {
                      const updatedBrands = [...brands];
                      updatedBrands[index].registrationDate = e.target.value;
                      setBrands(updatedBrands);
                    }}
                    className="w-full rounded-md border border-neutral-300 p-2"
                  />
                </div>
                <FileDisplayField
                  label="Certificate of Origin"
                  file={brand.originCertificate}
                />
              </div>
            </div>
          ))}
          <div className="flex items-center justify-center">
            <Button
              type="button"
              variant="muatparts-primary-secondary"
              className="h-9"
              onClick={addBrand}
            >
              + Tambah Merek
            </Button>
          </div>
        </section>

        {/* Product List */}
        <section className="space-y-5">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900">
            Product List
          </h2>
          <FileDisplayField
            label="Product Catalog"
            file={vendorData?.productList?.productCatalog}
            isOptional
          />
        </section>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4">
          <Button
            type="button"
            variant="muatparts-primary-secondary"
            className="w-32"
            onClick={onPrevious}
          >
            Sebelumnya
          </Button>
          <Button type="submit" variant="muatparts-primary" className="w-32">
            Selanjutnya
          </Button>
        </div>
      </form>

      <AddBusinessEntityLegalityModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
};

export default EditVendorInternationalLegalityContainer;
