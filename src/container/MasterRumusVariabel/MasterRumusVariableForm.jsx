"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button/Button";
import { FormContainer, FormLabel } from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import Toggle from "@/components/Toggle/Toggle";

import { useTranslation } from "@/hooks/use-translation";

const MasterRumusVariableForm = ({ 
  mode = "add", // "add" or "edit"
  initialData = null, // Data for edit mode
  onSubmit,
  loading = false 
}) => {
  const { t = (key, _, fallback) => fallback || key } = useTranslation() || {};
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
    }
  ]);

  // Load initial data for edit mode
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        formulaName: initialData.formulaName || "",
        isActive: initialData.isActive || false,
      });
      
      // Load variables if they exist
      if (initialData.variables && initialData.variables.length > 0) {
        setVariables(initialData.variables);
      }
    }
  }, [mode, initialData]);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle variable changes
  const handleVariableChange = (variableId, value) => {
    setVariables(prev => 
      prev.map(variable => 
        variable.id === variableId 
          ? { ...variable, name: value }
          : variable
      )
    );
  };

  // Add new variable
  const addVariable = () => {
    const newId = Math.max(...variables.map(v => v.id), 0) + 1;
    setVariables(prev => [
      ...prev,
      {
        id: newId,
        name: "",
      }
    ]);
  };

  // Remove variable
  const removeVariable = (variableId) => {
    if (variables.length > 1) {
      setVariables(prev => prev.filter(variable => variable.id !== variableId));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.formulaName.trim()) {
      alert("Nama Rumus harus diisi");
      return;
    }

    // Validate variables
    for (const variable of variables) {
      if (!variable.name.trim()) {
        alert("Nama Variabel harus diisi untuk semua variabel");
        return;
      }
    }

    // Call parent onSubmit handler
    if (onSubmit) {
      onSubmit({
        ...formData,
        variables: variables
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
              <FormLabel required>Nama Rumus</FormLabel>
              <Input
                placeholder="Masukkan Nama Rumus"
                value={formData.formulaName}
                onChange={(e) => handleInputChange("formulaName", e.target.value)}
                required
              />
            </FormContainer>

            <FormContainer className="items-center">
              <FormLabel>Status</FormLabel>
              <Toggle
                value={formData.isActive}
                onClick={(value) => handleInputChange("isActive", value)}
                type="primary"
              />
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
                          value={variable.name}
                          onChange={(e) => handleVariableChange(variable.id, e.target.value)}
                          required
                        />
                      </FormContainer>
                    </div>
                    <div className="flex items-center gap-2">
                      {variables.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeVariable(variable.id)}
                          className="!h-6 !w-6 !p-0 !text-lg !rounded-lg hover:!bg-red-400 text-red-500 hover:!text-white !border !border-red-500 bg-transparent"
                        >
                          −
                        </Button>
                      )}
                      {index === variables.length - 1 && (
                        <Button
                          type="button"
                          variant="muatparts-primary-secondary"
                          onClick={addVariable}
                          className="!h-6 !w-6 !p-0 !rounded-lg"
                        >
                          <span className="text-blue text-lg">+</span>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 pt-6">
          <Button
            type="submit"
            variant="muatparts-primary"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MasterRumusVariableForm;