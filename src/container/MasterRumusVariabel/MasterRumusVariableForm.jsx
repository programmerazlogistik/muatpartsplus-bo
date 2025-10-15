"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/Button/Button";
import { FormContainer, FormLabel } from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import Toggle from "@/components/Toggle/Toggle";

const MasterRumusVariableForm = ({
  mode = "add", // "add", "edit", or "detail"
  initialData = null, // Data for edit/detail mode
  onSubmit,
  loading = false,
  onDataChange,
  disabled = false, // For detail mode
  onEdit, // Callback for edit button in detail mode
  onBack, // Callback for back button in detail mode
}) => {
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    formulaName: "",
    isActive: false,
  });

  // Variables state
  const [variables, setVariables] = useState([
    {
      id: 1,
      name: "",
    },
  ]);

  // Error state
  const [errors, setErrors] = useState({});

  // Load initial data for edit/detail mode
  useEffect(() => {
    if ((mode === "edit" || mode === "detail") && initialData) {
      setFormData({
        formulaName: initialData.formulaName || "",
        isActive: initialData.isActive || false,
      });

      // Load variables if they exist
      if (initialData.variables && initialData.variables.length > 0) {
        setVariables(initialData.variables);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, initialData?.id]); // Only reload when mode changes or initialData.id changes

  // Handle form input changes
  const handleInputChange = (field, value) => {
    if (disabled) return; // Don't allow changes in detail mode

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Notify parent component about data changes
    if (onDataChange) {
      onDataChange(true);
    }
  };

  // Handle variable changes
  const handleVariableChange = (variableId, value) => {
    if (disabled) return; // Don't allow changes in detail mode

    setVariables((prev) =>
      prev.map((variable) =>
        variable.id === variableId ? { ...variable, name: value } : variable
      )
    );

    // Notify parent component about data changes
    if (onDataChange) {
      onDataChange(true);
    }
  };

  // Add new variable
  const addVariable = () => {
    if (disabled || mode === "edit") return; // Don't allow changes in detail mode or edit mode

    const newId = Math.max(...variables.map((v) => v.id), 0) + 1;
    setVariables((prev) => [
      ...prev,
      {
        id: newId,
        name: "",
      },
    ]);

    // Notify parent component about data changes
    if (onDataChange) {
      onDataChange(true);
    }
  };

  // Remove variable
  const removeVariable = (variableId) => {
    if (disabled || mode === "edit") return; // Don't allow changes in detail mode or edit mode

    if (variables.length > 1) {
      setVariables((prev) =>
        prev.filter((variable) => variable.id !== variableId)
      );

      // Notify parent component about data changes
      if (onDataChange) {
        onDataChange(true);
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (disabled) return; // Don't submit in detail mode

    // Clear previous errors
    setErrors({});

    // Basic validation
    if (!formData.formulaName.trim()) {
      setErrors({ formulaName: "Nama Rumus harus diisi" });
      return;
    }

    // Validate variables only for add mode (not for edit mode)
    if (mode === "add") {
      const variableErrors = {};
      for (let i = 0; i < variables.length; i++) {
        const variable = variables[i];
        if (!variable.name || !variable.name.trim()) {
          variableErrors[`variable_${i}`] = "Nama Variabel harus diisi";
        }
      }

      if (Object.keys(variableErrors).length > 0) {
        setErrors({ ...errors, ...variableErrors });
        return;
      }
    }

    // Call parent onSubmit handler
    if (onSubmit) {
      onSubmit({
        ...formData,
        variables: variables,
      });
    }
  };

  // Handle cancel
  const handleCancel = () => {
    router.back();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1">
          <div className="space-y-6">
            <FormContainer>
              <FormLabel required={!disabled}>Nama Rumus</FormLabel>
              <Input
                placeholder="Masukkan Nama Rumus"
                value={formData.formulaName}
                onChange={(e) =>
                  handleInputChange("formulaName", e.target.value)
                }
                required={!disabled}
                disabled={disabled}
                className={errors.formulaName ? "border-red-500" : ""}
              />
              {errors.formulaName && (
                <span className="mt-1 text-sm text-red-500">
                  {errors.formulaName}
                </span>
              )}
            </FormContainer>

            <FormContainer className="items-center">
              <FormLabel>Status</FormLabel>
              <div onClick={(e) => e.preventDefault()}>
                <Toggle
                  value={formData.isActive}
                  onClick={(value) => handleInputChange("isActive", value)}
                  type="primary"
                  disabled={disabled}
                />
              </div>
            </FormContainer>

            {/* Variables Section */}
            <div className="pt-6">
              <h3 className="mb-4 font-bold text-gray-900">Variabel</h3>
              <div className="space-y-4">
                {variables.map((variable, index) => (
                  <div key={variable.id} className="flex items-center gap-3">
                    <div className="w-[500px]">
                      <FormContainer>
                        <FormLabel required>Nama Variabel</FormLabel>
                        <Input
                          placeholder="Masukkan Nama Variabel"
                          value={variable.variableName}
                          onChange={(e) =>
                            handleVariableChange(variable.id, e.target.value)
                          }
                          required={!disabled}
                          disabled={disabled || mode === "edit"}
                          className={
                            errors[`variable_${index}`] ? "border-red-500" : ""
                          }
                        />
                        {errors[`variable_${index}`] && (
                          <span className="mt-1 text-sm text-red-500">
                            {errors[`variable_${index}`]}
                          </span>
                        )}
                      </FormContainer>
                    </div>
                    {mode !== "edit" && (
                      <div className="flex items-center gap-2">
                        {variables.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => removeVariable(variable.id)}
                            className="!h-6 !w-6 !rounded-lg !border !border-red-500 bg-transparent !p-0 !text-lg text-red-500 hover:!bg-red-400 hover:!text-white"
                          >
                            −
                          </Button>
                        )}
                        {index === variables.length - 1 && (
                          <Button
                            type="button"
                            variant="muatparts-primary-secondary"
                            onClick={addVariable}
                            className="!h-6 !w-6 !rounded-lg !p-0"
                          >
                            <span className="text-blue text-lg">+</span>
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {mode === "detail" ? (
          //   <div className="flex justify-end space-x-4 pt-6">
          //     <Button
          //       type="button"
          //       variant="muatparts-primary-secondary"
          //       onClick={onBack}
          //     >
          //       Kembali
          //     </Button>
          //     <Button
          //       type="button"
          //       variant="muatparts-primary"
          //       onClick={onEdit}
          //     >
          //       Edit
          //     </Button>
          //   </div>
          <></>
        ) : (
          <div className="flex justify-center space-x-4 pt-6">
            <Button
              type="submit"
              variant="muatparts-primary"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default MasterRumusVariableForm;
