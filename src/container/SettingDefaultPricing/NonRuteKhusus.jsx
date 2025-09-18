"use client";

import React, { useState } from "react";

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

const NonRuteKhusus = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownValues, setDropdownValues] = useState(
    vehicleTypes.reduce((acc, vehicle) => {
      acc[vehicle.key] = "";
      return acc;
    }, {})
  );
  const [errors, setErrors] = useState({});

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
    setIsModalOpen(true);
  };

  const handleConfirmSimpan = () => {
    alert("Data saved!");
    setIsModalOpen(false);
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

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form className="flex flex-col gap-y-5">
      <div className="flex justify-end">
        <button
          type="button"
          className="rounded-md border border-gray-100 p-2 text-xs font-semibold shadow-sm"
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
        <CollapsibleContent>
          <div className="grid grid-cols-[224px_1fr] items-center gap-x-6 gap-y-4">
            {/* Header Row */}
            <span className="text-base font-bold">Jenis Truck</span>
            <span className="text-base font-bold">Tipe Pricing Default</span>
            {vehicleTypes.map((vehicle) => (
              <React.Fragment key={vehicle.key}>
                {/* Column 1: Vehicle Label */}
                <span className="text-sm font-medium">{vehicle.label}</span>

                {/* Column 2: Dropdown Input */}
                <div className="w-72">
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
              </React.Fragment>
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

      <ConfirmationModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
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
    </form>
  );
};

export default NonRuteKhusus;
