"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { useGetMasterPricingSettingFormulaPricing } from "@/services/masterpricing/setting-formula-pricing/getMasterPricingSettingFormulaPricing";
import { usePostSettingFormulaPricing } from "@/services/masterpricing/setting-formula-pricing/postSettingFormulaPricing";

import Button from "@/components/Button/Button";
import FormulaCalculator from "@/components/FormulaCalculator/FormulaCalculator";
import PageTitle from "@/components/PageTitle/PageTitle";
import SimulationModal from "@/components/SimulationModal/SimulationModal";

export default function SettingRumusPricingContainer() {
  const [variables, setVariables] = useState([]);
  const [rumusData, setRumusData] = useState(null);
  const [isSimulationModalOpen, setIsSimulationModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRumus, setSelectedRumus] = useState();

  // Fetch formula pricing data using SWR
  const {
    data: formulaData,
    error: formulaError,
    isLoading: formulaLoading,
  } = useGetMasterPricingSettingFormulaPricing(
    "v1/bo/pricing/setting/formula-pricing"
  );

  // Post formula pricing data using SWR Mutation
  const {
    trigger: saveFormulaPricing,
    isMutating: isSaving,
    error: saveError,
  } = usePostSettingFormulaPricing();

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

  useEffect(() => {
    // Handle API data when it's loaded
    if (formulaData?.Data?.formulas) {
      // console.log("Setting formula from API:", formulaData.Data.formulas);
      // console.log(
      //   "Display",
      //   formulaData.Data.formulas.map((r) => r.expressionDisplay.split(" "))
      // );
      setRumusData(formulaData.Data.formulas);

      // Map API data structure to form structure
      reset({
        rumus: formulaData.Data.formulas.map((r) => ({
          id: r.id,
          name: r.name,
          formula: r.expression ? r.expression.split(" ") : [],
          displayFormula: r.expressionDisplay
            ? r.expressionDisplay.split(" ")
            : [],
          variables: r.variables || [],
        })),
      });
    }

    console.log("formulaData", formulaData);
  }, [formulaData, reset]);

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
      // Note: API uses 'variableName' instead of 'name' or 'symbol'
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
      // Transform form data to match API payload structure
      const payload = {
        formulas: data.rumus.map((rumus) => ({
          formulaId: rumus.id,
          expression: Array.isArray(rumus.formula)
            ? rumus.formula.join(" ")
            : rumus.formula,
        })),
      };

      console.log("Sending payload to API:", payload);

      // Call the API using SWR mutation
      const result = await saveFormulaPricing(payload);

      console.log("API Response:", result);
      alert("Rumus berhasil disimpan!");

      // Optionally reset form dirty state to reflect saved state
      reset(data);
    } catch (error) {
      console.error("Error saving rumus:", error);

      // Handle different types of errors
      let errorMessage =
        "Terjadi kesalahan saat menyimpan rumus. Silakan coba lagi.";

      if (error?.response?.data?.Message?.Text) {
        errorMessage = error.response.data.Message.Text;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <PageTitle withBack={false}>Setting Rumus Pricing</PageTitle>
        <Link href="/master-pricing/setting-rumus-pricing/history">
          <Button>Lihat History Perubahan</Button>
        </Link>
      </div>

      {/* Loading State */}
      {formulaLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <p className="text-gray-600">Memuat data formula...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {formulaError && (
        <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Terjadi Kesalahan
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>Gagal memuat data formula pricing. Silakan coba lagi.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Error State */}
      {saveError && (
        <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Gagal Menyimpan Formula
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>
                  {saveError?.response?.data?.Message?.Text ||
                    saveError?.message ||
                    "Terjadi kesalahan saat menyimpan formula. Silakan coba lagi."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form Content - Only show when data is loaded */}
      {!formulaLoading && !formulaError && watchedRumus && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          {watchedRumus &&
            watchedRumus.length > 0 &&
            watchedRumus.map((rumus, index) => {
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
                          required: `Rumus ${rumus.name} wajib diisi`,
                          validate: {
                            notEmpty: (value) =>
                              (value && value.length > 0) ||
                              `Rumus ${rumus.name} wajib diisi`,
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
                        hasError={!!errors.rumus?.[index]?.formula}
                      />

                      {errors.rumus?.[index]?.formula && (
                        <div className="mt-2 text-sm text-red-600">
                          {errors.rumus[index].formula.message}
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
              disabled={isSubmitting || isSaving || !isValid}
              className="mx-auto"
            >
              {isSubmitting || isSaving ? "Menyimpan..." : "Simpan"}
            </Button>

            {isDirty && (
              <Button
                type="button"
                variant="outline"
                onClick={() => reset()}
                disabled={isSubmitting || isSaving}
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
        formulaId={selectedRumus?.id || " "} // Pass formula ID to modal
        formulaName={selectedRumus?.name || ""} // Pass formula name to modal
      />
    </div>
  );
}
