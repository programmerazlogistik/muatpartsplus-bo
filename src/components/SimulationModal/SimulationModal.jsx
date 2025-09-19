"use client";

import { useState } from "react";

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
 * @param {Array} props.displayFormula - The formula to calculate
 * @param {Array} props.variables - Dynamic variables from backend
 */
const SimulationModal = ({
  isOpen,
  onClose,
  onCalculate,
  displayFormula = [],
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
  };

  // Mock API call to fetch variable values
  const fetchVariableValues = async (rute, jenisTruk) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Create dynamic variable values based on the variables from props
        const dynamicVariables = {};
        variables.forEach((variable) => {
          // Set different values based on variable type
          if (variable.symbol === "jarak") {
            dynamicVariables[variable.symbol] = parseFloat(formData.jarak) || 0;
          } else if (
            variable.symbol === "tonase" ||
            variable.symbol === "berat"
          ) {
            dynamicVariables[variable.symbol] = formData.tonase;
          } else if (variable.symbol === "volume") {
            dynamicVariables[variable.symbol] = 50; // Mock value
          } else {
            // For a, b, c, d, x, y etc - use mock values
            const mockValues = {
              a: 150,
              b: 200,
              c: 300,
              d: 100,
              x: 120,
              y: 180,
            };
            dynamicVariables[variable.symbol] =
              mockValues[variable.symbol] || 100;
          }
        });

        resolve({
          variables: dynamicVariables,
          jarakMinimum: 100,
        });
      }, 1000);
    });
  };

  // Calculate formula result
  const calculateFormula = (variableValues, formula) => {
    // This is a mock calculation - in real app, you'd implement proper formula evaluation
    // You can use the dynamic variables and formula for actual calculation
    console.log("Calculating with variables:", variableValues);
    console.log("Using formula:", formula);

    // Mock calculation based on some variables
    const basePrice = 800000;
    const jarakMultiplier = variableValues.jarak || 0;
    const tonaseMultiplier = variableValues.tonase || 1;

    return {
      low: Math.round(
        basePrice + jarakMultiplier * 1000 + tonaseMultiplier * 50000
      ),
      medium: Math.round(
        (basePrice + jarakMultiplier * 1000 + tonaseMultiplier * 50000) * 1.25
      ),
      high: Math.round(
        (basePrice + jarakMultiplier * 1000 + tonaseMultiplier * 50000) * 1.5
      ),
      lowSpecial: Math.round(
        (basePrice + jarakMultiplier * 1000 + tonaseMultiplier * 50000) * 0.9
      ),
    };
  };

  const handleCalculate = async () => {
    if (!formData.rute || !formData.jenisTruk || !formData.jarak) {
      alert("Please fill in all required fields");
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
      const results = calculateFormula(finalVariables, displayFormula);

      setVariableValues(finalVariables);
      setCalculationResults(results);

      // Call parent callback if provided
      onCalculate?.(formData, displayFormula, results);
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (!isOpen) return null;

  // Get the label for selected options
  const getSelectedLabel = (options, value) => {
    const selected = options.find((option) => option.value === value);
    return selected ? selected.label : value;
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
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
                  className="w-full"
                />
              </div>
            </div>

            {/* Rute Field */}
            <div className="flex items-center gap-[25px]">
              <label className="w-[140px] text-base font-semibold leading-[19px] text-[#1B1B1B]">
                Rute*
              </label>
              <div className="flex-1">
                <Select
                  options={ruteOptions}
                  value={formData.rute}
                  onChange={(value) => handleInputChange("rute", value)}
                  placeholder="Pilih Rute"
                  className="w-full"
                />
              </div>
            </div>

            {/* Jenis Truk Field */}
            <div className="flex items-center gap-[25px]">
              <label className="w-[140px] text-base font-semibold leading-[19px] text-[#1B1B1B]">
                Jenis Truk*
              </label>
              <div className="flex-1">
                <Select
                  options={trukOptions}
                  value={formData.jenisTruk}
                  onChange={(value) => handleInputChange("jenisTruk", value)}
                  placeholder="Pilih Jenis Truk"
                  className="w-full"
                />
              </div>
            </div>

            {/* Jenis Carrier Field */}
            <div className="flex items-center gap-[25px]">
              <label className="w-[140px] text-base font-semibold leading-[19px] text-[#1B1B1B]">
                Jenis Carrier*
              </label>
              <div className="flex-1">
                <Select
                  options={carrierOptions}
                  value={formData.jenisCarrier}
                  onChange={(value) => handleInputChange("jenisCarrier", value)}
                  placeholder="Pilih Jenis Carrier"
                  className="w-full"
                />
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
                    className="w-full"
                  />
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
              <h3 className="text-base font-bold leading-[19px] text-[#1B1B1B]">
                Hasil Perhitungan Harga
              </h3>

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
  displayFormula: PropTypes.array,
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
