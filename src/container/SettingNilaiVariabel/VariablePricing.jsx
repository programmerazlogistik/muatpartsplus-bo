"use client";

import React, { useState } from "react";

import { ChevronDownIcon } from "public/icons";

import { FormContainer, FormLabel } from "@/components/Form/Form";
import Input from "@/components/Form/Input";

import { IconComponent } from "@/components";

const VariablePricing = ({
  disabled = false,
  onVariableChange,
  onSpecialPriceChange,
  variableValue = "",
  specialPriceValue = "",
  required = false,
}) => {
  // State for expandable sections
  const [expandedSections, setExpandedSections] = useState({
    low: false,
    medium: false,
    high: false,
  });

  const toggleSection = (section) => {
    if (disabled) return;
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <>
      <FormContainer>
        <FormLabel required={required} className={"items-start"}>
          Variabel
        </FormLabel>
        <div className="flex flex-col gap-3">
          <div
            className="flex cursor-pointer items-center"
            onClick={() => toggleSection("low")}
          >
            <span className="text-base font-bold">Low</span>
            <IconComponent
              src={ChevronDownIcon}
              className="ml-2 rotate-0 transform transition-transform duration-300 data-[expanded=true]:rotate-180"
              width={16}
              height={16}
            />
          </div>
          {/* {low expanded content} */}
          {expandedSections.low && (
            <div className="ml-4 flex items-center gap-10">
              <label className="">a</label>
              <Input
                placeholder="Masukkan nilai variabel a"
                value={variableValue}
                onChange={(e) => onVariableChange(e.target.value)}
                required={required}
                disabled={disabled}
                className="flex-1"
              />
            </div>
          )}

          <div
            className="flex cursor-pointer items-center"
            onClick={() => toggleSection("medium")}
          >
            <span className="text-base font-bold">Medium</span>
            <IconComponent
              src={ChevronDownIcon}
              className="ml-2 rotate-0 transform transition-transform duration-300 data-[expanded=true]:rotate-180"
              width={16}
              height={16}
            />
          </div>
          {/* {medium expanded content} */}
          {expandedSections.medium && (
            <div className="ml-4 flex items-center gap-10">
              <label className="whitespace-nowrap">a</label>
              <Input
                placeholder="Masukkan nilai variabel"
                value={variableValue}
                onChange={(e) => onVariableChange(e.target.value)}
                required={required}
                disabled={disabled}
                className="flex-1"
              />
            </div>
          )}

          <div
            className="flex cursor-pointer items-center"
            onClick={() => toggleSection("high")}
          >
            <span className="text-base font-bold">High</span>
            <IconComponent
              src={ChevronDownIcon}
              className="ml-2 rotate-0 transform transition-transform duration-300 data-[expanded=true]:rotate-180"
              width={16}
              height={16}
            />
          </div>
          {/* {high expanded content} */}
          {expandedSections.high && (
            <div className="ml-4 flex items-center gap-10">
              <label className="whitespace-nowrap">a</label>
              <Input
                placeholder="Masukkan nilai variabel"
                value={variableValue}
                onChange={(e) => onVariableChange(e.target.value)}
                required={required}
                disabled={disabled}
                className="flex-1"
              />
            </div>
          )}
        </div>
      </FormContainer>
    </>
  );
};

export default VariablePricing;
