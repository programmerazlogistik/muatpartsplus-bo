"use client";

import { useEffect, useState } from "react";

import PropTypes from "prop-types";

import Button from "@/components/Button/Button";
import { Select } from "@/components/Form/Select";
import IconComponent from "@/components/IconComponent/IconComponent";
import Input from "@/components/Input/Input";
import { Modal, ModalContent, ModalTitle } from "@/components/Modal/Modal";

/**
 * SimulationModal - Modal for inputting simulation data for 4PL formula
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {function} props.onClose - Function to close modal
 * @param {function} props.onCalculate - Function called when "Hitung Harga" is clicked
 * @param {Array} props.formula - The formula to calculate (with variable IDs)
 * @param {Array} props.variables - Dynamic variables from backend
 */
const SimulationModal = ({
  isOpen,
  onClose,
  onCalculate,
  formula = [],
  variables = [],
}) => {
  const [formData, setFormData] = useState({
    jarak: "",
    rute: "",
    jenisTruk: "",
    jenisCarrier: "",
    tonase: 2.5,
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationResults, setCalculationResults] = useState(null);
  const [variableValues, setVariableValues] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // Sample data - in real app, these would come from API
  const ruteOptions = [
    { value: "jawa-jawa", label: "Jawa - Jawa" },
    { value: "jakarta-surabaya", label: "Jakarta - Surabaya" },
    { value: "jakarta-bandung", label: "Jakarta - Bandung" },
    { value: "surabaya-malang", label: "Surabaya - Malang" },
  ];

  const trukOptions = [
    { value: "colt-diesel-engkel", label: "Colt Diesel Engkel" },
    { value: "cdd", label: "CDD" },
    { value: "cde", label: "CDE" },
    { value: "tronton", label: "Tronton" },
  ];

  const carrierOptions = [
    { value: "box", label: "Box" },
    { value: "internal", label: "Internal" },
    { value: "external", label: "External" },
    { value: "partner", label: "Partner" },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear validation error for this field when user starts typing
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Mock API call to fetch variable values
  const fetchVariableValues = async (rute, jenisTruk) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Create dynamic variable values based on the variables from props
        const dynamicVariables = {};

        variables.forEach((variable) => {
          let value;

          // Set different values based on variable type
          if (variable.symbol === "jarak") {
            value = parseFloat(formData.jarak) || 0;
          } else if (
            variable.symbol === "tonase" ||
            variable.symbol === "berat"
          ) {
            value = parseFloat(formData.tonase) || 1;
          } else if (variable.symbol === "volume") {
            value = 50; // Mock value
          } else {
            // Generate mock values dynamically based on the variable symbol and route/truck type
            const baseValue = variable.symbol.charCodeAt(0) * 10; // Base value from ASCII code
            const routeModifier =
              rute === "jawa-jawa" ? 50 : rute === "jakarta-surabaya" ? 30 : 0;
            const trukModifier =
              jenisTruk === "colt-diesel-engkel"
                ? 20
                : jenisTruk === "tronton"
                  ? 40
                  : 0;

            value = baseValue + routeModifier + trukModifier;
          }

          // Store by both symbol and ID for flexible access
          dynamicVariables[variable.symbol] = value;
          dynamicVariables[variable.id] = value;
        });

        resolve({
          variables: dynamicVariables,
          jarakMinimum: 100,
        });
      }, 1000);
    });
  };

  // Calculate formula result using the actual displayFormula
  const calculateFormula = (variableValues, formula) => {
    console.log("Calculating with variables:", variableValues);
    console.log("Using formula:", formula);

    if (!formula || formula.length === 0) {
      console.warn("No formula provided, using fallback calculation");
      return getFallbackCalculation(variableValues);
    }

    try {
      // Convert the formula array to a mathematical expression
      const formulaExpression = convertFormulaToExpression(
        formula,
        variableValues
      );
      console.log("Formula expression:", formulaExpression);

      // Evaluate the formula
      const baseResult = evaluateFormula(formulaExpression);
      console.log("Base calculation result:", baseResult);

      if (isNaN(baseResult) || baseResult <= 0) {
        console.warn("Invalid calculation result, using fallback");
        return getFallbackCalculation(variableValues);
      }

      // Return different pricing tiers based on the calculated result
      return {
        low: Math.round(baseResult * 0.9),
        medium: Math.round(baseResult),
        high: Math.round(baseResult * 1.25),
        lowSpecial: Math.round(baseResult * 0.8),
      };
    } catch (error) {
      console.error("Error calculating formula:", error);
      console.warn("Using fallback calculation due to error");
      return getFallbackCalculation(variableValues);
    }
  };

  // Convert formula array to mathematical expression string
  const convertFormulaToExpression = (formula, variableValues) => {
    return formula
      .map((item) => {
        // Check if the item is a variable ID that exists in our variableValues
        if (Object.prototype.hasOwnProperty.call(variableValues, item)) {
          return variableValues[item];
        }

        // Map operator symbols to JavaScript operators (for display operators in formula)
        const operatorMap = {
          "×": "*",
          "÷": "/",
          "^": "**", // JavaScript exponentiation operator
        };

        // Return mapped operator or the item as-is (for basic operators and numbers)
        return operatorMap[item] || item;
      })
      .join(" ");
  };

  // Safe formula evaluation using Function constructor
  const evaluateFormula = (expression) => {
    // Basic safety check - only allow numbers, basic operators, and parentheses
    const safePattern = /^[\d\s+\-*/().]+$/;
    if (!safePattern.test(expression)) {
      throw new Error("Formula contains unsafe characters");
    }

    // Use Function constructor for safer evaluation than eval
    const func = new Function(`return ${expression}`);
    const result = func();

    if (!isFinite(result)) {
      throw new Error("Formula evaluation resulted in infinite or NaN value");
    }

    return result;
  };

  // Fallback calculation when formula evaluation fails
  const getFallbackCalculation = (variableValues) => {
    const basePrice = 800000;
    const jarakMultiplier = variableValues.jarak || 0;
    const tonaseMultiplier = variableValues.tonase || 1;
    const calculatedBase =
      basePrice + jarakMultiplier * 1000 + tonaseMultiplier * 50000;

    return {
      low: Math.round(calculatedBase),
      medium: Math.round(calculatedBase),
      high: Math.round(calculatedBase * 1.25),
      lowSpecial: Math.round(calculatedBase * 0.8),
    };
  };

  const handleCalculate = async () => {
    // Reset previous validation errors
    setValidationErrors({});

    // Validate required fields
    const errors = {};

    if (!formData.jarak || formData.jarak.trim() === "") {
      errors.jarak = "Jarak wajib diisi";
    }

    if (!formData.rute) {
      errors.rute = "Rute wajib diisi";
    }

    if (!formData.jenisTruk) {
      errors.jenisTruk = "Jenis Truk wajib diisi";
    }

    if (!formData.jenisCarrier) {
      errors.jenisCarrier = "Jenis Carrier wajib diisi";
    }

    if (!formData.tonase || parseFloat(formData.tonase) <= 0) {
      errors.tonase = "Tonase wajib diisi";
    }

    // If there are validation errors, set them and return
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsCalculating(true);

    try {
      // Step 1: Fetch variable values from API
      const apiResponse = await fetchVariableValues(
        formData.rute,
        formData.jenisTruk
      );

      // Step 2: Apply jarak minimum logic
      const finalJarak = Math.max(
        parseFloat(formData.jarak),
        apiResponse.jarakMinimum
      );

      // Step 3: Update variables with final values
      const finalVariables = {
        ...apiResponse.variables,
        jarak: finalJarak,
      };

      // Step 4: Calculate using formula
      const results = calculateFormula(finalVariables, formula);

      setVariableValues(finalVariables);
      setCalculationResults(results);

      // Call parent callback if provided
      onCalculate?.(formData, formula, results);
    } catch (error) {
      console.error("Calculation error:", error);
      alert("Error during calculation");
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setCalculationResults(null);
    setVariableValues(null);
    setFormData({
      jarak: "",
      rute: "",
      jenisTruk: "",
      jenisCarrier: "",
      tonase: 2.5,
    });
  };

  const handleClose = () => {
    // Clear all form data and calculation results when modal closes
    setCalculationResults(null);
    setVariableValues(null);
    setValidationErrors({});
    setFormData({
      jarak: "",
      rute: "",
      jenisTruk: "",
      jenisCarrier: "",
      tonase: 2.5,
    });
    setIsCalculating(false);

    // Call the original onClose callback
    onClose();
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Helper function to convert formula with IDs to display formula with variable names
  const convertFormulaToDisplayString = (formula, variables) => {
    return formula
      .map((item) => {
        // Check if the item is a variable ID
        const variable = variables.find((v) => v.id === item);
        if (variable) {
          return variable.name;
        }
        // Return the item as-is for operators and numbers
        return item;
      })
      .join(" ");
  };
  useEffect(() => {
    console.log("formula", formula);
  }, [formula]);
  if (!isOpen) return null;

  // Get the label for selected options
  const getSelectedLabel = (options, value) => {
    const selected = options.find((option) => option.value === value);
    return selected ? selected.label : value;
  };

  return (
    <Modal open={isOpen} onOpenChange={handleClose}>
      <ModalContent
        size="medium"
        type="muattrans"
        className={`w-full max-w-[500px]`}
        withCloseButton={true}
        closeOnOutsideClick={true}
        appearance={{
          closeButtonClassname: "size-3 text-black",
        }}
      >
        {/* Modal Content */}
        <div className={`flex w-full flex-col items-center gap-5 px-2 py-8`}>
          {/* Title */}
          <div className="flex flex-col items-center justify-center">
            <ModalTitle>Masukkan Data Simulasi Rumus 4PL</ModalTitle>
          </div>

          {/* Form Fields */}
          <div className="flex w-full flex-col gap-[10px] px-5">
            {/* Jarak Field */}
            <div className="flex items-center gap-[25px]">
              <label className="w-[140px] text-base font-semibold leading-[19px] text-[#1B1B1B]">
                Jarak*
              </label>
              <div className="flex-1">
                <Input
                  placeholder="Masukkan Nilai Jarak"
                  value={formData.jarak}
                  onChange={(e) => handleInputChange("jarak", e.target.value)}
                  className={`w-full ${validationErrors.jarak ? "border-red-500" : ""}`}
                />
                {validationErrors.jarak && (
                  <div className="mt-1 text-sm text-red-600">
                    {validationErrors.jarak}
                  </div>
                )}
              </div>
            </div>

            {/* Rute Field */}
            <div className="flex items-center gap-[25px]">
              <label className="w-[140px] text-base font-semibold leading-[19px] text-[#1B1B1B]">
                Rute*
              </label>
              <div className="flex-1">
                <Select
                  placeholder="Pilih Rute"
                  value={formData.rute}
                  onValueChange={(value) => handleInputChange("rute", value)}
                  className={validationErrors.rute ? "border-red-500" : ""}
                  options={[
                    { value: "jakarta-bandung", label: "Jakarta - Bandung" },
                    { value: "jakarta-surabaya", label: "Jakarta - Surabaya" },
                    { value: "jakarta-medan", label: "Jakarta - Medan" },
                    { value: "surabaya-bandung", label: "Surabaya - Bandung" },
                  ]}
                />
                {validationErrors.rute && (
                  <div className="mt-1 text-sm text-red-600">
                    {validationErrors.rute}
                  </div>
                )}
              </div>
            </div>

            {/* Jenis Truk Field */}
            <div className="flex items-center gap-[25px]">
              <label className="w-[140px] text-base font-semibold leading-[19px] text-[#1B1B1B]">
                Jenis Truk*
              </label>
              <div className="flex-1">
                <Select
                  placeholder="Pilih Jenis Truk"
                  value={formData.jenisTruk}
                  onValueChange={(value) =>
                    handleInputChange("jenisTruk", value)
                  }
                  className={validationErrors.jenisTruk ? "border-red-500" : ""}
                  options={[
                    { value: "pickup", label: "Pickup" },
                    { value: "cdd", label: "CDD" },
                    { value: "cde", label: "CDE" },
                    { value: "truck", label: "Truck" },
                    { value: "tronton", label: "Tronton" },
                    { value: "trailer", label: "Trailer" },
                  ]}
                />
                {validationErrors.jenisTruk && (
                  <div className="mt-1 text-sm text-red-600">
                    {validationErrors.jenisTruk}
                  </div>
                )}
              </div>
            </div>

            {/* Jenis Carrier Field */}
            <div className="flex items-center gap-[25px]">
              <label className="w-[140px] text-base font-semibold leading-[19px] text-[#1B1B1B]">
                Jenis Carrier*
              </label>
              <div className="flex-1">
                <Select
                  placeholder="Pilih Jenis Carrier"
                  value={formData.jenisCarrier}
                  onValueChange={(value) =>
                    handleInputChange("jenisCarrier", value)
                  }
                  className={
                    validationErrors.jenisCarrier ? "border-red-500" : ""
                  }
                  options={[
                    { value: "bak-terbuka", label: "Bak Terbuka" },
                    { value: "engkel", label: "Engkel Box" },
                    { value: "cdd-box", label: "CDD Box" },
                    { value: "cde-box", label: "CDE Box" },
                    { value: "truck-box", label: "Truck Box" },
                    { value: "container", label: "Container" },
                    { value: "tanki", label: "Tanki" },
                  ]}
                />
                {validationErrors.jenisCarrier && (
                  <div className="mt-1 text-sm text-red-600">
                    {validationErrors.jenisCarrier}
                  </div>
                )}
              </div>
            </div>

            {/* Tonase Field */}
            <div className="flex items-center gap-[25px]">
              <label className="w-[140px] text-base font-semibold leading-[19px] text-[#1B1B1B]">
                Tonase*
              </label>
              <div className="flex flex-1 items-center gap-[10px]">
                <div className="flex-1">
                  <Input
                    type="number"
                    value={formData.tonase}
                    onChange={(e) =>
                      handleInputChange("tonase", e.target.value)
                    }
                    className={`w-full ${validationErrors.tonase ? "border-red-500" : ""}`}
                    disabled
                  />
                  {validationErrors.tonase && (
                    <div className="mt-1 text-sm text-red-600">
                      {validationErrors.tonase}
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium leading-[17px] text-[#1B1B1B]">
                  Ton
                </span>
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <div className="flex gap-3">
            <Button
              variant="muatparts-primary"
              onClick={handleCalculate}
              disabled={isCalculating}
              className="w-[135px] rounded-[20px] px-6 py-2"
            >
              {isCalculating
                ? "Menghitung..."
                : calculationResults
                  ? "Hitung Ulang"
                  : "Hitung Harga"}
            </Button>
          </div>

          {/* Results Section */}
          {calculationResults && (
            <div className="flex w-full flex-col gap-[15px] px-5">
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-bold leading-[19px] text-[#1B1B1B]">
                  Hasil Perhitungan Harga
                </h3>

                {/* Show the formula that was used */}
                {formula && formula.length > 0 && (
                  <div className="rounded bg-gray-50 p-2">
                    <p className="mb-1 text-xs text-gray-600">
                      Formula yang digunakan:
                    </p>
                    <p className="font-mono text-sm text-gray-800">
                      {convertFormulaToDisplayString(formula, variables)}
                    </p>
                  </div>
                )}

                {/* Show variable values used */}
                {variableValues && (
                  <div className="rounded bg-blue-50 p-2">
                    <p className="mb-1 text-xs text-blue-600">
                      Nilai variabel:
                    </p>
                    <div className="grid grid-cols-2 gap-1 text-xs text-blue-800">
                      {Object.entries(variableValues)
                        .filter(([key]) =>
                          variables.some(
                            (v) => v.symbol === key || v.id === key
                          )
                        )
                        .slice(0, 6) // Show first 6 to avoid clutter
                        .map(([key, value]) => (
                          <span key={key}>
                            {key}: {value}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-[100px] text-base font-semibold leading-[19px] text-[#1B1B1B]">
                    Low
                  </span>
                  <span className="text-base font-semibold leading-[19px] text-[#1B1B1B]">
                    : {formatCurrency(calculationResults.low)}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-[100px] text-base font-semibold leading-[19px] text-[#1B1B1B]">
                    Medium
                  </span>
                  <span className="text-base font-semibold leading-[19px] text-[#1B1B1B]">
                    : {formatCurrency(calculationResults.medium)}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-[100px] text-base font-semibold leading-[19px] text-[#1B1B1B]">
                    High
                  </span>
                  <span className="text-base font-semibold leading-[19px] text-[#1B1B1B]">
                    : {formatCurrency(calculationResults.high)}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-[100px] text-base font-semibold leading-[19px] text-[#1B1B1B]">
                    Low Special
                  </span>
                  <span className="text-base font-semibold leading-[19px] text-[#1B1B1B]">
                    : {formatCurrency(calculationResults.lowSpecial)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ModalContent>
    </Modal>
  );
};

SimulationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCalculate: PropTypes.func,
  formula: PropTypes.array,
  variables: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ),
};

export default SimulationModal;
