"use client";

import { useEffect, useState } from "react";

import Button from "@/components/Button/Button";
import FormulaCalculator from "@/components/FormulaCalculator";
import PageTitle from "@/components/PageTitle/PageTitle";
import SimulationModal from "@/components/SimulationModal";

export default function SettingRumusPricing() {
  const [variables, setVariables] = useState([]);
  const [rumusData, setRumusData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formula, setFormula] = useState("");
  const [displayFormula, setDisplayFormula] = useState([]);
  const [isSimulationModalOpen, setIsSimulationModalOpen] = useState(false);

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
                  { id: 1, name: "a", symbol: "a", description: "Variable A" },
                  { id: 2, name: "b", symbol: "b", description: "Variable B" },
                  { id: 3, name: "c", symbol: "c", description: "Variable C" },
                  { id: 4, name: "d", symbol: "d", description: "Variable D" },
                  {
                    id: 5,
                    name: "Jarak",
                    symbol: "jarak",
                    description: "Distance in KM",
                  },
                  {
                    id: 6,
                    name: "Tonase",
                    symbol: "tonase",
                    description: "Weight in Tons",
                  },
                  {
                    id: 7,
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
                  { id: 1, name: "x", symbol: "x", description: "Variable X" },
                  { id: 2, name: "y", symbol: "y", description: "Variable Y" },
                  {
                    id: 3,
                    name: "Jarak",
                    symbol: "jarak",
                    description: "Distance in KM",
                  },
                  {
                    id: 4,
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
      } catch (error) {
        console.error("Failed to load rumus data:", error);
        // Set fallback data
        setVariables([
          { id: 1, name: "a", symbol: "a" },
          { id: 2, name: "b", symbol: "b" },
          { id: 3, name: "c", symbol: "c" },
          { id: 4, name: "d", symbol: "d" },
          { id: 5, name: "Jarak", symbol: "jarak" },
          { id: 6, name: "Tonase", symbol: "tonase" },
          { id: 7, name: "Volume", symbol: "volume" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadRumusData();
  }, []);

  const handleFormulaChange = (newFormula, newDisplayFormula) => {
    setFormula(newFormula);
    setDisplayFormula(newDisplayFormula);
    console.log("Formula:", newFormula);
    console.log("Display Formula:", newDisplayFormula);
  };

  const handleSimulateClick = () => {
    if (displayFormula.length === 0) {
      alert("Silakan buat rumus terlebih dahulu sebelum melakukan simulasi.");
      return;
    }
    setIsSimulationModalOpen(true);
  };

  const handleCalculate = (formData, displayFormula, results) => {
    console.log("Calculation completed:", {
      formData,
      displayFormula,
      results,
    });
    // You can handle the results here if needed
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-lg">Loading rumus data...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <PageTitle withBack={false}>Setting Rumus Pricing</PageTitle>
        <Button>Lihat History Perubahan</Button>
      </div>
      <div className="flex flex-col gap-4">
        {rumusData &&
          rumusData.rumus &&
          rumusData.rumus.length > 0 &&
          rumusData.rumus.map((r) => (
            <div className="flex" key={r.id}>
              <div className="flex w-fit min-w-[200px]">
                <p className="font-semibold">4PL </p>
              </div>

              <div className="flex w-full gap-4">
                <FormulaCalculator
                  variables={variables}
                  onFormulaChange={handleFormulaChange}
                  initialFormula=""
                  className="w-full flex-grow"
                />
                <Button className="text-nowrap" onClick={handleSimulateClick}>
                  Simulasikan Rumus
                </Button>
              </div>
            </div>
          ))}
      </div>

      {/* Simulation Modal */}
      <SimulationModal
        isOpen={isSimulationModalOpen}
        onClose={() => setIsSimulationModalOpen(false)}
        onCalculate={handleCalculate}
        displayFormula={displayFormula}
        variables={variables} // Pass variables to modal
      />
    </div>
  );
}
