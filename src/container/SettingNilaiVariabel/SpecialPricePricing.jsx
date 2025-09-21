"use client";

import React, { useState } from "react";

import { ChevronDownIcon } from "public/icons";

import { FormContainer, FormLabel } from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import { NumberInput } from "@/components/Form/NumberInput";

import { IconComponent } from "@/components";

const SpecialPricePricing = ({
  disabled = false,
  onVariableChange,
  onSpecialPriceChange,
  variableValue = "",
  specialPriceValue = "",
  required = false,
}) => {
  // State for expandable sections
  const [expandedSections, setExpandedSections] = useState({
    route: false,
    fixedPrice: false,
    variableValue: false,
  });

  // State for low, medium, high values
  const [priceValues, setPriceValues] = useState({
    low: "",
    medium: "",
    high: "",
  });

  const toggleSection = (section) => {
    if (disabled) return;
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePriceChange = (type, value) => {
    setPriceValues((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <>
      <FormContainer>
        <FormLabel required={required} className={"items-start"}>
          Harga Khusus
        </FormLabel>
        <div className="flex flex-col gap-3">
          <div
            className="flex cursor-pointer items-center"
            onClick={() => toggleSection("route")}
          >
            <span className="text-base font-bold">Kota Surabaya - Malang </span>
            <IconComponent
              src={ChevronDownIcon}
              className="ml-2 rotate-0 transform transition-transform duration-300 data-[expanded=true]:rotate-180"
              width={16}
              height={16}
              data-expanded={expandedSections.route}
            />
          </div>

          {expandedSections.route && (
            <div className="ml-4 flex flex-col gap-3">
              {/* Harga Tetap Section */}
              <div>
                <div
                  className="flex cursor-pointer items-center"
                  onClick={() => toggleSection("fixedPrice")}
                >
                  <span className="text-base font-bold">Harga Tetap</span>
                  <IconComponent
                    src={ChevronDownIcon}
                    className="ml-2 rotate-0 transform transition-transform duration-300 data-[expanded=true]:rotate-180"
                    width={16}
                    height={16}
                    data-expanded={expandedSections.fixedPrice}
                  />
                </div>

                {expandedSections.fixedPrice && (
                  <div className="ml-4 mt-2 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <label className="flex w-[141px] text-base font-medium">
                        Low
                      </label>
                      <div className="flex items-center gap-3">
                        Rp
                        <Input
                          value={priceValues.high}
                          onChange={(e) =>
                            handlePriceChange("high", e.target.value)
                          }
                          placeholder="Masukkan Harga"
                          disabled={disabled}
                          className="w-[267px]"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="flex w-[141px] text-base font-medium">
                        Medium
                      </label>
                      <div className="flex items-center gap-3">
                        Rp
                        <Input
                          value={priceValues.high}
                          onChange={(e) =>
                            handlePriceChange("high", e.target.value)
                          }
                          placeholder="Masukkan Harga"
                          disabled={disabled}
                          className="w-[267px]"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="flex w-[141px] text-base font-medium">
                        High
                      </label>
                      <div className="flex items-center gap-3">
                        Rp
                        <Input
                          value={priceValues.high}
                          onChange={(e) =>
                            handlePriceChange("high", e.target.value)
                          }
                          placeholder="Masukkan Harga"
                          disabled={disabled}
                          className="w-[267px]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Nilai Variabel Section */}
              <div>
                <div
                  className="flex cursor-pointer items-center"
                  onClick={() => toggleSection("variableValue")}
                >
                  <span className="text-base font-bold">Nilai Variabel </span>
                  <IconComponent
                    src={ChevronDownIcon}
                    className="ml-2 rotate-0 transform transition-transform duration-300 data-[expanded=true]:rotate-180"
                    width={16}
                    height={16}
                    data-expanded={expandedSections.variableValue}
                  />
                </div>

                {expandedSections.variableValue && (
                  <div className="ml-4 mt-2 flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-base font-bold">Low</label>
                      <div className="flex items-center gap-2.5">
                        <div className="w-[100px] text-base font-semibold">
                          a
                        </div>
                        <Input
                          value={variableValue}
                          onChange={(e) => onVariableChange(e.target.value)}
                          placeholder="Masukkan nilai variabel"
                          disabled={disabled}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-base font-bold">Medium</label>
                      <div className="flex items-center gap-2.5">
                        <div className="w-[100px] text-base font-semibold">
                          b
                        </div>
                        <Input
                          value={variableValue}
                          onChange={(e) => onVariableChange(e.target.value)}
                          placeholder="Masukkan nilai variabel"
                          disabled={disabled}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-base font-bold">High</label>
                      <div className="flex items-center gap-2.5">
                        <div className="w-[100px] text-base font-semibold">
                          c
                        </div>
                        <Input
                          value={variableValue}
                          onChange={(e) => onVariableChange(e.target.value)}
                          placeholder="Masukkan nilai variabel"
                          disabled={disabled}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </FormContainer>
    </>
  );
};

export default SpecialPricePricing;
