"use client";

import { useEffect, useState } from "react";

import { Input, Select, TextArea } from "@muatmuat/ui/Form";

import { useGetVendorContract } from "@/services/vendorInternasional/useGetVendorContract";

import Button from "@/components/Button/Button";
import DatetimePicker from "@/components/DatetimePicker/DatetimePicker";
import FileUpload from "@/components/FileUpload/FileUpload";

import AddNewContractModal from "./components/AddNewContractModal";

const EditVendorInternationalContractContainer = ({
  onPrevious,
  onNext,
  activeStep,
}) => {
  const { data: vendorData, isLoading } = useGetVendorContract();

  const [formState, setFormState] = useState({
    swiftBicCode: "",
    accountNumber: "",
    accountHolderName: "",
    picFinancePhoneNumber: "",
    agreementNumber: "",
    agreementFile: null,
    cooperationNotes: "",
    cooperationDate: new Date(),
    contractDuration: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (vendorData) {
      setFormState({
        swiftBicCode: vendorData.bankAccount?.swiftBicCode || "",
        accountNumber: vendorData.bankAccount?.accountNumber || "",
        accountHolderName: vendorData.bankAccount?.accountHolderName || "",
        picFinancePhoneNumber:
          vendorData.bankAccount?.picFinancePhoneNumber || "",
        agreementNumber: vendorData.contracts?.agreementNumber || "",
        agreementFile: vendorData.contracts?.agreementFile || null,
        cooperationNotes: vendorData.contracts?.cooperationNotes || "",
        cooperationDate: vendorData.contracts?.cooperationDate
          ? new Date(vendorData.contracts.cooperationDate)
          : new Date(),
        contractDuration: vendorData.contracts?.contractDuration || 0,
      });
    }
  }, [vendorData]);

  const handleFileChange = (file) => {
    setFormState((prev) => ({ ...prev, agreementFile: file }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Here you would validate and save all the contract data
    console.log("Contract data to save:", formState);
    // Call your save API here
    onNext(); // This will trigger the final save in the parent component
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

  const breadcrumbItems = [
    {
      name: "Informasi Akun",
      isActive: activeStep === 1,
    },
    {
      name: "Legalitas",
      isActive: activeStep === 2,
    },
    {
      name: "Kontrak",
      isActive: activeStep === 3,
    },
  ];

  return (
    <div className="mx-auto bg-white p-8">
      <form className="mt-6 space-y-8" onSubmit={handleSave}>
        {/* Bank Account Section */}
        <section className="space-y-5">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900">
            Bank Account
          </h2>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              SWIFT/BIC Code *
            </label>
            <div className="w-full">
              <Select
                label={"Select Value"}
                options={[
                  { value: "098821312", label: "098821312" },
                  { value: "098821313", label: "098821313" },
                ]}
              />
            </div>
          </div>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              Account Number *
            </label>
            <Input
              value={formState.accountNumber}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  accountNumber: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              Account Holder Name
            </label>
            <Input
              value={formState.accountHolderName}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  accountHolderName: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              PIC Finance Phone Number
            </label>
            <Input
              value={formState.picFinancePhoneNumber}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  picFinancePhoneNumber: e.target.value,
                }))
              }
            />
          </div>
        </section>

        {/* Kontrak Section */}
        <section className="space-y-5">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900">
            Kontrak
          </h2>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              Nomor Perjanjian Kerjasama *
            </label>
            <Input
              value={formState.agreementNumber}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  agreementNumber: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              Perjanjian Kerjasama *
            </label>
            <FileUpload
              variant="muatparts-primary-secondary"
              value={formState.agreementFile}
              onSuccess={handleFileChange}
              buttonText="Ubah"
            />
          </div>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              Catatan Kerjasama *
            </label>
            <TextArea
              value={formState.cooperationNotes}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  cooperationNotes: e.target.value,
                }))
              }
              className="h-[80px] w-full"
            />
          </div>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              Tanggal Kerjasama *
            </label>
            <div className="w-full">
              <DatetimePicker
                datetimeValue={formState.cooperationDate}
                onApply={(date) =>
                  setFormState((prev) => ({ ...prev, cooperationDate: date }))
                }
              />
            </div>
          </div>
          <div className="flex items-center justify-start gap-[21px]">
            <label className="mb-2 block w-[230px] text-sm font-medium text-neutral-700">
              Jangka Lama Kontrak *
            </label>
            <div className="flex w-full items-center gap-2">
              <Input
                type="number"
                value={formState.contractDuration}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    contractDuration: parseInt(e.target.value) || 0,
                  }))
                }
                className="w-full"
              />
              <span className="text-sm text-neutral-700">Tahun</span>
            </div>
          </div>

          <div className="flex items-center justify-start gap-[21px]">
            <div className="w-[230px]"></div>
            <button
              type="button"
              className="text-primary-500 underline hover:text-primary-700"
              onClick={() => setIsModalOpen(true)}
            >
              + Tambah Kontrak Baru
            </button>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            type="button"
            variant="muatparts-primary-secondary"
            className="w-fit"
            onClick={onPrevious}
          >
            Sebelumnya
          </Button>
          <Button type="submit" variant="muatparts-primary" className="w-fit">
            Simpan
          </Button>
        </div>
      </form>

      <AddNewContractModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default EditVendorInternationalContractContainer;
