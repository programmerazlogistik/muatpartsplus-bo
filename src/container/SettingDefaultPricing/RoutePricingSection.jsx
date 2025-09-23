import React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/Collapsible/Collapsible";
import Dropdown from "@/components/Form/Dropdown";

import { pricingOptions } from "@/lib/constants/pricingOptions";

const RoutePricingSection = ({
  route,
  dropdownValues,
  errors,
  openStates,
  handleDropdownChange,
  handleToggleCollapsible,
}) => {
  return (
    <Collapsible
      key={route.routePricingId}
      open={openStates[route.routePricingId]}
      onOpenChange={() => handleToggleCollapsible(route.routePricingId)}
    >
      <CollapsibleTrigger
        className={
          Object.keys(errors).some((key) =>
            key.startsWith(`${route.routePricingId}-`)
          )
            ? "flex w-full items-center justify-between rounded-t-lg !border-[#F71717] bg-[#FEEEEE] p-4 text-[#F71717]"
            : "flex w-full items-center justify-between rounded-t-lg !border-[#176CF7] bg-blue-100 p-4 text-blue-900"
        }
      >
        {({ open }) => (
          <>
            <span className="font-medium">{route.routePricingAlias}</span>
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
        <div className="flex flex-col gap-y-4 py-5">
          {/* Header Row */}
          <div className="flex items-center gap-x-6">
            <span className="w-56 text-base font-bold">Jenis Truck</span>
            <span className="text-base font-bold">Tipe Pricing Default</span>
          </div>
          {route.truckTypes &&
            route.truckTypes.map((truckType) => {
              const dropdownKey = `${route.routePricingId}-${truckType.truckTypeId}`;
              return (
                <div key={dropdownKey} className="flex items-start gap-x-6">
                  {/* Column 1: Vehicle Label */}
                  <span className="w-56 flex-shrink-0 pt-2 text-sm font-medium">
                    {truckType.truckTypeName}
                  </span>

                  {/* Column 2: Dropdown Input */}
                  <div className="max-w-72 flex-1">
                    <Dropdown
                      placeholder="Pilih Tipe Pricing"
                      options={pricingOptions}
                      value={dropdownValues[dropdownKey] || ""}
                      onChange={(value) =>
                        handleDropdownChange(dropdownKey, value)
                      }
                      isError={!!errors[dropdownKey]}
                      searchable={false}
                    />
                    {errors[dropdownKey] && (
                      <p className="mt-1 text-sm text-[#F71717]">
                        {errors[dropdownKey]}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default RoutePricingSection;
