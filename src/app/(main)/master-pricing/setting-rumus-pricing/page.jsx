"use client";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import Button from "@/components/Button/Button";
import FormulaCalculator from "@/components/FormulaCalculator";
import PageTitle from "@/components/PageTitle/PageTitle";
import SimulationModal from "@/components/SimulationModal";

export default function SettingRumusPricing() {
  const [variables, setVariables] = useState([]);
  const [rumusData, setRumusData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSimulationModalOpen, setIsSimulationModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRumus, setSelectedRumus] = useState();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    trigger,
    formState: { errors, isDirty, isValid, isSubmitting: formIsSubmitting },
  } = useForm({
    defaultValues: {
      rumus: [], // Will be populated from API
    },
    mode: "onChange", // Validate on change for better UX
  });

  // Watch the form data to get current values
  const watchedRumus = watch("rumus");

  // Mock API call to fetch rumus data - replace with real API
  const fetchRumusData = async () => {
    try {
      // Simulate API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            rumus: [
              {
                id: 1,
                name: "4PL",
                formula: "", // This will be built by user
                variables: [
                  {
                    id: "550e8400-e29b-41d4-a716-446655440001",
                    name: "a",
                    symbol: "a",
                    description: "Variable A",
                  },
                  {
                    id: "550e8400-e29b-41d4-a716-446655440002",
                    name: "b",
                    symbol: "b",
                    description: "Variable B",
                  },
                  {
                    id: "550e8400-e29b-41d4-a716-446655440003",
                    name: "c",
                    symbol: "c",
                    description: "Variable C",
                  },
                  {
                    id: "550e8400-e29b-41d4-a716-446655440004",
                    name: "d",
                    symbol: "d",
                    description: "Variable D",
                  },
                  {
                    id: "550e8400-e29b-41d4-a716-446655440005",
                    name: "Jarak",
                    symbol: "jarak",
                    description: "Distance in KM",
                  },
                  {
                    id: "550e8400-e29b-41d4-a716-446655440006",
                    name: "Tonase",
                    symbol: "tonase",
                    description: "Weight in Tons",
                  },
                  {
                    id: "550e8400-e29b-41d4-a716-446655440007",
                    name: "Volume",
                    symbol: "volume",
                    description: "Volume in m3",
                  },
                ],
              },
              {
                id: 2,
                name: "3PL",
                formula: "",
                variables: [
                  {
                    id: "550e8400-e29b-41d4-a716-446655440011",
                    name: "x",
                    symbol: "x",
                    description: "Variable X",
                  },
                  {
                    id: "550e8400-e29b-41d4-a716-446655440012",
                    name: "y",
                    symbol: "y",
                    description: "Variable Y",
                  },
                  {
                    id: "550e8400-e29b-41d4-a716-446655440013",
                    name: "Jarak",
                    symbol: "jarak",
                    description: "Distance in KM",
                  },
                  {
                    id: "550e8400-e29b-41d4-a716-446655440014",
                    name: "Berat",
                    symbol: "berat",
                    description: "Weight in KG",
                  },
                ],
              },
            ],
          });
        }, 1000);
      });

      return response;
    } catch (error) {
      console.error("Error fetching rumus data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const loadRumusData = async () => {
      try {
        setLoading(true);
        const data = await fetchRumusData();
        setRumusData(data);

        // Set variables for the first rumus (4PL) as default
        const defaultRumus =
          data.rumus.find((r) => r.name === "4PL") || data.rumus[0];
        if (defaultRumus) {
          setVariables(defaultRumus.variables);
        }

        // Reset form with API data
        reset({
          rumus: data.rumus.map((r) => ({
            id: r.id,
            name: r.name,
            formula: r.formula || "",
            displayFormula: r.displayFormula || [],
            variables: r.variables || [],
          })),
        });
      } catch (error) {
        console.error("Failed to load rumus data:", error);
        // Set fallback data
        const fallbackVariables = [
          {
            id: "550e8400-e29b-41d4-a716-446655440001",
            name: "a",
            symbol: "a",
          },
          {
            id: "550e8400-e29b-41d4-a716-446655440002",
            name: "b",
            symbol: "b",
          },
          {
            id: "550e8400-e29b-41d4-a716-446655440003",
            name: "c",
            symbol: "c",
          },
          {
            id: "550e8400-e29b-41d4-a716-446655440004",
            name: "d",
            symbol: "d",
          },
          {
            id: "550e8400-e29b-41d4-a716-446655440005",
            name: "Jarak",
            symbol: "jarak",
          },
          {
            id: "550e8400-e29b-41d4-a716-446655440006",
            name: "Tonase",
            symbol: "tonase",
          },
          {
            id: "550e8400-e29b-41d4-a716-446655440007",
            name: "Volume",
            symbol: "volume",
          },
        ];
        setVariables(fallbackVariables);

        // Reset form with fallback data
        reset({
          rumus: [
            {
              id: 1,
              name: "4PL",
              formula: "",
              displayFormula: [],
              variables: fallbackVariables,
            },
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    loadRumusData();
  }, [reset]);

  const handleFormulaChange = (
    newFormula,
    newDisplayFormula,
    rumusIndex = 0
  ) => {
    // Update the specific rumus formula in the form
    setValue(`rumus.${rumusIndex}.formula`, newFormula);
    setValue(`rumus.${rumusIndex}.displayFormula`, newDisplayFormula);
    console.log(`Formula for rumus ${rumusIndex}:`, newFormula);
    console.log(`Display Formula for rumus ${rumusIndex}:`, newDisplayFormula);
  };

  const handleSimulateClick = (rumusIndex = 0, rumus) => {
    console.log("handleSimulateClick called with:", {
      rumusIndex,
      rumus,
    });
    setSelectedRumus(rumus);
    setIsSimulationModalOpen(true);
  };

  const handleCalculate = (formData, formula, results) => {
    console.log("Calculation completed:", {
      formData,
      formula,
      results,
    });
    // You can handle the results here if needed
  };

  // Comprehensive formula validation function
  const validateFormula = (formula, variables) => {
    try {
      // Check if formula exists and is not empty
      if (!formula || formula.length === 0) {
        return "Formula tidak boleh kosong";
      }

      // Convert formula array to string for validation
      const formulaString = Array.isArray(formula)
        ? formula.join(" ")
        : formula.toString();

      // Basic character validation - only allow safe mathematical characters and UUIDs
      const safePattern = /^[a-zA-Z0-9+\-*/().\s×÷^-]+$/;
      if (!safePattern.test(formulaString)) {
        return "Formula mengandung karakter yang tidak diizinkan";
      }

      // Check for balanced parentheses
      let parenthesesCount = 0;
      for (const char of formulaString) {
        if (char === "(") parenthesesCount++;
        if (char === ")") parenthesesCount--;
        if (parenthesesCount < 0) {
          return "Tanda kurung tidak seimbang";
        }
      }
      if (parenthesesCount !== 0) {
        return "Tanda kurung tidak seimbang";
      }

      // Check for consecutive operators
      const consecutiveOperatorsPattern = /[+\-*/×÷^]{2,}/;
      if (consecutiveOperatorsPattern.test(formulaString)) {
        return "Formula tidak boleh memiliki operator berturut-turut";
      }

      // Check if formula starts or ends with operators (except minus for negative numbers)
      const startsWithOperator = /^[+*/×÷^]/.test(formulaString.trim());
      const endsWithOperator = /[+\-*/×÷^]$/.test(formulaString.trim());
      if (startsWithOperator) {
        return "Formula tidak boleh dimulai dengan operator";
      }
      if (endsWithOperator) {
        return "Formula tidak boleh diakhiri dengan operator";
      }

      // Validate that all variable IDs in formula exist in the variables list
      const variableIds = variables.map((v) => v.id.toString());

      console.log("variableIds", variableIds);

      // Extract all potential variable references from formula
      const tokens = formula.filter((token) => {
        // Skip operators and numbers (including decimals)
        return !/^[+\-*/×÷^()0-9.\s]+$/.test(token) && token.trim() !== "";
      });

      // Check if all variable tokens are valid UUIDs that exist in our variables list
      for (const token of tokens) {
        if (!variableIds.includes(token)) {
          return `Variable dengan ID '${token}' tidak ditemukan dalam daftar variabel yang tersedia`;
        }
      }

      // Try to evaluate the formula with sample values to check mathematical validity
      const sampleVariableValues = {};
      variables.forEach((variable) => {
        sampleVariableValues[variable.id] = 1; // Use 1 as sample value for variable IDs
      });

      try {
        const testExpression = formula
          .map((item) => {
            // Replace variable IDs with sample values
            if (
              Object.prototype.hasOwnProperty.call(sampleVariableValues, item)
            ) {
              return sampleVariableValues[item];
            }
            // Map operators
            const operatorMap = {
              "×": "*",
              "÷": "/",
              "^": "**",
            };
            return operatorMap[item] || item;
          })
          .join(" ");

        // Basic safety check for evaluation
        const evalSafePattern = /^[\d\s+\-*/().]+$/;
        if (!evalSafePattern.test(testExpression)) {
          return "Formula mengandung elemen yang tidak dapat dievaluasi";
        }

        // Test evaluation using Function constructor (safer than eval)
        const testFunc = new Function(`return ${testExpression}`);
        const result = testFunc();

        if (!isFinite(result)) {
          return "Formula menghasilkan nilai tak terhingga atau bukan angka";
        }

        if (isNaN(result)) {
          return "Formula tidak menghasilkan nilai numerik yang valid";
        }
      } catch (evalError) {
        return `Formula tidak dapat dievaluasi: ${evalError.message}`;
      }

      // Check for division by zero scenarios (basic check)
      if (formulaString.includes("/0") || formulaString.includes("÷0")) {
        return "Formula tidak boleh mengandung pembagian dengan nol";
      }

      // All validations passed
      return true;
    } catch (error) {
      return `Kesalahan validasi formula: ${error.message}`;
    }
  };

  // Form submission handler
  const onSubmit = async (data) => {
    console.log("Form submitted with data:", data);
    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      console.log("Rumus data saved:", data);
      alert("Rumus berhasil disimpan!");

      // Optionally reset form dirty state
      // reset(data);
    } catch (error) {
      console.error("Error saving rumus:", error);
      alert("Terjadi kesalahan saat menyimpan rumus. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <PageTitle withBack={false}>Setting Rumus Pricing</PageTitle>
        <Button>Lihat History Perubahan</Button>
      </div>
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-lg">Loading rumus data...</div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          {watchedRumus &&
            watchedRumus.length > 0 &&
            watchedRumus.map((rumus, index) => {
              console.log("rumus", rumus);
              return (
                <div className="flex" key={rumus.id || index}>
                  <div className="flex w-fit min-w-[200px]">
                    <p className="font-semibold">{rumus.name || "4PL"}</p>
                  </div>

                  <div className="flex w-full gap-4">
                    <div className="w-full flex-grow">
                      {/* Register the field */}
                      <input
                        type="hidden"
                        {...register(`rumus.${index}.formula`, {
                          required: "Formula harus diisi",
                          validate: {
                            notEmpty: (value) =>
                              (value && value.length > 0) ||
                              "Formula tidak boleh kosong",
                            validFormula: (value) => {
                              // Get the current formula for this rumus
                              const currentFormula =
                                watchedRumus?.[index]?.formula || [];

                              // Use the comprehensive validation
                              const validationResult = validateFormula(
                                currentFormula,
                                watchedRumus?.[index]?.variables || []
                              );

                              // Return true if validation passed, otherwise return the error message
                              return validationResult === true
                                ? true
                                : validationResult;
                            },
                          },
                        })}
                      />

                      <FormulaCalculator
                        value={watchedRumus[index]?.formula || ""}
                        variables={watchedRumus[index]?.variables || []}
                        onFormulaChange={(formula, displayFormula) => {
                          setValue(`rumus.${index}.formula`, formula);
                          setValue(
                            `rumus.${index}.displayFormula`,
                            displayFormula
                          );
                          // Trigger validation immediately after formula change
                          setTimeout(() => {
                            trigger(`rumus.${index}.formula`);
                          }, 100);
                          handleFormulaChange(formula, displayFormula, index);
                        }}
                        initialFormula={{
                          displayFormula:
                            watchedRumus?.[index]?.displayFormula || [],
                          formula: watchedRumus[index]?.formula || "",
                        }}
                        className={`w-full flex-grow ${
                          errors.rumus?.[index]?.formula
                            ? "border-2 border-red-500"
                            : ""
                        }`}
                      />

                      {errors.rumus?.[index]?.formula && (
                        <div className="mt-2 rounded-md bg-red-50 p-2">
                          <div className="flex">
                            <div className="text-sm text-red-600">
                              <strong>Formula Error:</strong>{" "}
                              {errors.rumus[index].formula.message}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Show validation success when formula is valid */}
                      {!errors.rumus?.[index]?.formula &&
                        watchedRumus?.[index]?.formula?.length > 0 && (
                          <div className="mt-1 text-sm text-green-600">
                            ✓ Formula valid dan siap digunakan
                          </div>
                        )}
                    </div>

                    <Button
                      type="button"
                      className="text-nowrap"
                      onClick={() =>
                        handleSimulateClick(index, watchedRumus?.[index])
                      }
                      disabled={
                        watchedRumus?.[index]?.formula?.length === 0 ||
                        errors.rumus?.[index]?.formula
                      }
                      title={
                        errors.rumus?.[index]?.formula
                          ? "Formula harus valid sebelum dapat disimulasikan"
                          : watchedRumus?.[index]?.formula?.length === 0
                            ? "Formula harus diisi terlebih dahulu"
                            : "Simulasikan rumus dengan data test"
                      }
                    >
                      Simulasikan Rumus
                    </Button>
                  </div>
                </div>
              );
            })}

          <div className="flex items-center justify-center gap-4">
            <Button
              type="submit"
              disabled={formIsSubmitting || !isValid}
              className="mx-auto"
            >
              {formIsSubmitting ? "Menyimpan..." : "Submit"}
            </Button>

            {isDirty && (
              <Button
                type="button"
                variant="outline"
                onClick={() => reset()}
                disabled={formIsSubmitting}
              >
                Reset
              </Button>
            )}
          </div>
        </form>
      )}

      {/* Simulation Modal */}
      <SimulationModal
        isOpen={isSimulationModalOpen}
        onClose={() => setIsSimulationModalOpen(false)}
        onCalculate={handleCalculate}
        formula={selectedRumus?.formula ?? []}
        variables={selectedRumus?.variables} // Pass variables to modal
      />
    </div>
  );
}
