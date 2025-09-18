"use client";

import React from "react";

import Button from "@/components/Button/Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/Collapsible/Collapsible";
import Dropdown from "@/components/Form/Dropdown";

import { pricingOptions } from "@/lib/constants/pricingOptions";
import { vehicleTypes } from "@/lib/constants/vehicleTypes";

const NonRuteKhusus = () => {
  return (
    <form className="flex flex-col gap-y-5">
      <div className="flex justify-end">
        <button className="rounded-md border border-gray-100 p-2 text-xs font-semibold shadow-sm">
          Tampilkan Semua
        </button>
      </div>
      {/* Collapsible Section */}
      <Collapsible className="rounded-lg border border-blue-500">
        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-t-lg bg-blue-100 p-4">
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
        <CollapsibleContent className="border-t border-blue-500 p-4">
          <div className="grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-4">
            {vehicleTypes.map((vehicle) => (
              <React.Fragment key={vehicle.key}>
                {/* Column 1: Vehicle Label */}
                <span className="text-sm font-medium">{vehicle.label}</span>

                {/* Column 2: Dropdown Input */}
                <div className="w-72">
                  <Dropdown
                    placeholder="Pilih Jarak Tempuh"
                    options={pricingOptions}
                    value=""
                    onChange={() => {}}
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="flex justify-center">
        <Button variant="muatparts-primary">Simpan</Button>
      </div>
    </form>
  );
};

export default NonRuteKhusus;
