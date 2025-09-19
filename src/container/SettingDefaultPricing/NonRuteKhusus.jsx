"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import Button from "@/components/Button/Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/Collapsible/Collapsible";
import Dropdown from "@/components/Form/Dropdown";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";

import { pricingOptions } from "@/lib/constants/pricingOptions";
import { vehicleTypes } from "@/lib/constants/vehicleTypes";
import { validateRequiredDropdowns } from "@/lib/utils/valibot";

const NonRuteKhusus = ({ onFormChange }) => {
  const router = useRouter();
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isNavigationModalOpen, setIsNavigationModalOpen] = useState(false);
  const [dropdownValues, setDropdownValues] = useState(
    vehicleTypes.reduce((acc, vehicle) => {
      acc[vehicle.key] = "";
      return acc;
    }, {})
  );
  const [errors, setErrors] = useState({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Check if form has any values
  useEffect(() => {
    const hasValues = Object.values(dropdownValues).some(
      (value) => value !== ""
    );
    setHasUnsavedChanges(hasValues);
    // Notify parent component about form changes
    if (onFormChange) {
      onFormChange(hasValues);
    }
  }, [dropdownValues, onFormChange]);

  // Handle browser back/refresh
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleSimpanClick = (e) => {
    e.stopPropagation();

    // Validate dropdowns
    const requiredFields = vehicleTypes.map((vehicle) => vehicle.key);
    const validationErrors = validateRequiredDropdowns(
      dropdownValues,
      requiredFields
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear errors if validation passes
    setErrors({});
    setIsSaveModalOpen(true);
  };

  const handleConfirmSimpan = () => {
    // In a real app, you would save the data here
    // For now, we'll just show the success modal
    setIsSaveModalOpen(false);
    setIsSuccessModalOpen(true);
    setHasUnsavedChanges(false);
    // Notify parent that form is now saved
    if (onFormChange) {
      onFormChange(false);
    }
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
  };

  const handleDropdownChange = (vehicleKey, value) => {
    setDropdownValues((prev) => ({
      ...prev,
      [vehicleKey]: value,
    }));

    // Clear error for this field when user selects a value
    if (errors[vehicleKey]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[vehicleKey];
        return newErrors;
      });
    }
  };

  // Handle navigation away with confirmation
  const handleNavigationAttempt = (path) => {
    if (hasUnsavedChanges) {
      setIsNavigationModalOpen(true);
    } else {
      if (path) {
        router.push(path);
      } else {
        router.back();
      }
    }
  };

  const handleConfirmNavigation = () => {
    setIsNavigationModalOpen(false);
    setHasUnsavedChanges(false);
    // Notify parent that form changes are discarded
    if (onFormChange) {
      onFormChange(false);
    }
    // In a real app, you would navigate to the target page
    // For now, we'll just go back as an example
    router.back();
  };

  const handleCancelNavigation = () => {
    setIsNavigationModalOpen(false);
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form className="flex flex-col gap-y-5">
      <div className="flex justify-end">
        <button
          type="button"
          className="rounded-md border border-gray-100 p-2 text-xs font-semibold shadow-sm"
          onClick={() => handleNavigationAttempt("/master-pricing")}
        >
          Tampilkan Semua
        </button>
      </div>
      {/* Collapsible Section */}

      <Collapsible>
        <CollapsibleTrigger
          className={
            hasErrors
              ? "flex w-full items-center justify-between rounded-t-lg !border-[#F71717] bg-[#FEEEEE] p-4 text-[#F71717]"
              : "flex w-full items-center justify-between rounded-t-lg !border-[#176CF7] bg-blue-100 p-4 text-blue-900"
          }
        >
          {({ open }) => (
            <>
              <span className="font-medium">Jawa - Jawa</span>
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </>
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col">
          <div className="flex flex-col gap-y-4">
            {/* Header Row */}
            <div className="flex items-center gap-x-6">
              <span className="w-56 text-base font-bold">Jenis Truck</span>
              <span className="text-base font-bold">Tipe Pricing Default</span>
            </div>

            {vehicleTypes.map((vehicle) => (
              <div key={vehicle.key} className="flex items-start gap-x-6">
                {/* Column 1: Vehicle Label */}
                <span className="w-56 flex-shrink-0 pt-2 text-sm font-medium">
                  {vehicle.label}
                </span>

                {/* Column 2: Dropdown Input */}
                <div className="max-w-72 flex-1">
                  <Dropdown
                    placeholder="Pilih Tipe Pricing"
                    options={pricingOptions}
                    value={dropdownValues[vehicle.key]}
                    onChange={(value) =>
                      handleDropdownChange(vehicle.key, value)
                    }
                    isError={!!errors[vehicle.key]}
                  />
                  {errors[vehicle.key] && (
                    <p className="mt-1 text-sm text-[#F71717]">
                      {errors[vehicle.key]}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="flex justify-center">
        <Button
          variant="muatparts-primary"
          onClick={handleSimpanClick}
          type="button"
        >
          Simpan
        </Button>
      </div>

      {/* Save Confirmation Modal */}
      <ConfirmationModal
        isOpen={isSaveModalOpen}
        setIsOpen={setIsSaveModalOpen}
        title={{ text: "Pemberitahuan" }}
        description={{ text: "Apakah Anda yakin ingin menyimpan data?" }}
        confirm={{
          text: "Simpan",
          onClick: handleConfirmSimpan,
        }}
        cancel={{
          text: "Batal",
        }}
      />

      {/* Success Notification Modal */}
      <ConfirmationModal
        isOpen={isSuccessModalOpen}
        setIsOpen={setIsSuccessModalOpen}
        title={{ text: "Pemberitahuan" }}
        description={{ text: "Data berhasil disimpan." }}
        withCancel={false}
        withButtons={false}
      />

      {/* Navigation Confirmation Modal */}
      <ConfirmationModal
        isOpen={isNavigationModalOpen}
        setIsOpen={setIsNavigationModalOpen}
        title={{ text: "Warning" }}
        description={{
          text: "Apakah kamu yakin ingin berpindah halaman?<br/>Data yang telah diisi tidak akan disimpan",
        }}
        cancel={{
          text: "Batal",
          onClick: handleCancelNavigation,
        }}
        confirm={{
          text: "Ya",
          onClick: handleConfirmNavigation,
        }}
      />
    </form>
  );
};

export default NonRuteKhusus;
