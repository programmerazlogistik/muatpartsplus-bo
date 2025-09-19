"use client";

import React from "react";

import { ChevronDown } from "lucide-react";

import Button from "@/components/Button/Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/Collapsible/Collapsible";
import Dropdown from "@/components/Form/Dropdown";

import { pricingOptions } from "@/lib/constants/pricingOptions";
import { vehicleTypes } from "@/lib/constants/vehicleTypes";

const SettingDefaultPricingNonRuteKhususHistoryDetail = () => {
  // Mock data for demonstration
  const dropdownValues = {
    cdd: "Tarif Dasar",
    pickup: "Tarif Khusus",
    l300: "Tarif Dasar",
    fuso: "Tarif Khusus",
    wingbox: "Tarif Dasar",
    trailer: "Tarif Khusus",
  };

  return (
    <div className="flex flex-col gap-y-5 font-semibold">
      <div className="flex h-full items-center gap-40">
        <p className="text-sm text-gray-600">Waktu Update</p>
        <p className="text-xs">08/07/2023 10:50 WIB</p>
      </div>

      {/* Collapsible Section */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-t-lg border !border-[#176CF7] bg-blue-100 p-4 text-blue-900">
          <span className="font-medium">Jawa - Jawa</span>
          <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
        </CollapsibleTrigger>

        <CollapsibleContent className="flex flex-col border-x border-b border-[#176CF7]">
          <div className="flex flex-col gap-y-4">
            {/* Header Row */}
            <div className="flex items-center gap-x-6">
              <span className="w-56 text-base font-bold">Jenis Truk</span>
              <span className="text-base font-bold">Tipe Pricing Default</span>
            </div>

            {vehicleTypes.map((vehicle) => (
              <div key={vehicle.key} className="flex items-start gap-x-6">
                {/* Column 1: Vehicle Label */}
                <span className="w-56 flex-shrink-0 pt-2 text-sm font-medium">
                  {vehicle.label}
                </span>

                {/* Column 2: Dropdown Input (Disabled) */}
                <div className="max-w-72 flex-1">
                  <Dropdown
                    placeholder="Pilih Tipe Pricing"
                    options={pricingOptions}
                    value={dropdownValues[vehicle.key] || ""}
                    disabled
                  />
                </div>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default SettingDefaultPricingNonRuteKhususHistoryDetail;
