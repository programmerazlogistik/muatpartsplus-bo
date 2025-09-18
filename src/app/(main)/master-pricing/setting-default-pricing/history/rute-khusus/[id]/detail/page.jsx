"use client";

import { useRouter } from "next/navigation";
import React from "react";

import Button from "@/components/Button/Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/Collapsible/Collapsible";
import Dropdown from "@/components/Form/Dropdown";
import PageTitle from "@/components/PageTitle/PageTitle";

import { pricingOptions } from "@/lib/constants/pricingOptions";
import { vehicleTypes } from "@/lib/constants/vehicleTypes";

const DetailPerubahanPage = () => {
  const router = useRouter();

  // Sample data - in a real implementation, this would come from an API based on the history item ID
  const waktuUpdate = "12/09/2025, 14:30";

  // Sample dropdown values - in a real implementation, these would come from the history data
  const dropdownValues = {
    coltDieselEngkel: "20",
    coltDieselDouble: "30",
    mediumTruckRigid4x2: "10",
    mediumTruck6x2Rigid: "20",
    mediumTruckRigid6x4: "30",
    mediumTruck4x2Gandengan: "10",
    tractorHead4x2SemiTrailer: "20",
    tractorHead6x4SemiTrailer: "30",
  };

  return (
    <div className="flex h-full flex-col">
      <PageTitle withBack={true} onBackClick={() => router.back()}>
        Detail Perubahan Data (Non Rute Khusus)
      </PageTitle>

      <div className="mb-4 rounded-lg bg-gray-100 p-3">
        <span className="text-sm font-semibold">
          Waktu Update: {waktuUpdate}
        </span>
      </div>

      <form className="flex flex-col gap-y-5">
        {/* Collapsible Section */}
        <Collapsible defaultOpen={true}>
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-t-lg !border-[#176CF7] bg-blue-100 p-4 text-blue-900">
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
            <div className="flex flex-col gap-y-4 p-4">
              {/* Header Row */}
              <div className="flex items-center gap-x-6">
                <span className="w-56 text-base font-bold">Jenis Truck</span>
                <span className="text-base font-bold">
                  Tipe Pricing Default
                </span>
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
                      value={dropdownValues[vehicle.key]}
                      onChange={() => {}} // No-op since dropdown is disabled
                      disabled={true}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="flex justify-center">
          <Button variant="muatparts-primary" type="button" disabled={true}>
            Simpan
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DetailPerubahanPage;
