"use client";

import { useEffect, useRef, useState } from "react";

import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

import IconComponent from "../IconComponent/IconComponent";

/**
 * FormulaCalculator component for building mathematical formulas
 * Allows users to input variables and operators to create formulas
 *
 * @param {Object} props
 * @param {Array} props.variables - Array of variable objects with { id, name, symbol }
 * @param {function} props.onFormulaChange - Callback when formula changes
 * @param {string} props.initialFormula - Initial formula value
 * @param {string} props.className - Additional CSS classes
 */
const FormulaCalculator = ({
  variables = [],
  onFormulaChange,
  initialFormula = "",
  className,
  placeholder = "Masukkan Rumus",
}) => {
  const [formula, setFormula] = useState(
    initialFormula
      ? initialFormula.split(" ").filter((item) => item !== "")
      : []
  );
  const [displayFormula, setDisplayFormula] = useState(
    initialFormula
      ? initialFormula.split(" ").filter((item) => item !== "")
      : []
  );
  const inputRef = useRef(null);

  // Operators available for the calculator
  const operators = [
    { id: "add", symbol: "+", display: "+" },
    { id: "subtract", symbol: "-", display: "-" },
    { id: "multiply", symbol: "*", display: "×" },
    { id: "divide", symbol: "/", display: "÷" },
    { id: "power", symbol: "^", display: "^" },
    { id: "openParen", symbol: "(", display: "(" },
    { id: "closeParen", symbol: ")", display: ")" },
  ];

  // Number buttons (0-9)
  const numbers = Array.from({ length: 10 }, (_, i) => i.toString());

  // Focus the input on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleVariableClick = (variable) => {
    const newFormula = [...formula, variable.id];

    const newDisplayFormula = [...displayFormula, variable.name];

    setFormula(newFormula);
    setDisplayFormula(newDisplayFormula);
    onFormulaChange?.(newFormula, newDisplayFormula);
  };

  const handleOperatorClick = (operator) => {
    const newFormula = [...formula, operator.id];
    const newDisplayFormula = [...displayFormula, operator.display];

    setFormula(newFormula);
    setDisplayFormula(newDisplayFormula);
    onFormulaChange?.(newFormula, newDisplayFormula);
  };

  const handleNumberClick = (number) => {
    const newFormula = [...formula, number];
    const newDisplayFormula = [...displayFormula, number];

    setFormula(newFormula);
    setDisplayFormula(newDisplayFormula);
    onFormulaChange?.(newFormula, newDisplayFormula);
  };

  const handleDelete = (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }

    // Remove last character from formula
    const newFormula = formula.slice(0, -1);
    const newDisplayFormula = displayFormula.slice(0, -1);

    setFormula(newFormula);
    setDisplayFormula(newDisplayFormula);
    onFormulaChange?.(newFormula, newDisplayFormula);
  };

  const handleFocusInput = () => {
    // Focus on the container itself to capture keyboard events
    inputRef.current?.focus();
  };

  const handleClear = () => {
    setFormula("");
    setDisplayFormula([]);
    onFormulaChange?.("", []);
  };

  const handleKeyDown = (e) => {
    e.preventDefault(); // Prevent default behavior

    const key = e.key;

    // Handle numbers (0-9)
    if (/^[0-9]$/.test(key)) {
      handleNumberClick(key);
      return;
    }

    // Handle operators
    const operatorMap = {
      "+": operators.find((op) => op.symbol === "+"),
      "-": operators.find((op) => op.symbol === "-"),
      "*": operators.find((op) => op.symbol === "*"),
      "/": operators.find((op) => op.symbol === "/"),
      "^": operators.find((op) => op.symbol === "^"),
      "(": operators.find((op) => op.symbol === "("),
      ")": operators.find((op) => op.symbol === ")"),
    };

    if (operatorMap[key]) {
      handleOperatorClick(operatorMap[key]);
      return;
    }

    // Handle variables (a, b, c, d keys)
    const variableMap = variables.reduce((acc, variable) => {
      // Map first letter of variable name to the variable
      const firstLetter = variable.name.toLowerCase().charAt(0);
      if (!acc[firstLetter]) {
        acc[firstLetter] = variable;
      }
      return acc;
    }, {});

    if (variableMap[key.toLowerCase()]) {
      handleVariableClick(variableMap[key.toLowerCase()]);
      return;
    }

    // Handle backspace/delete
    if (key === "Backspace" || key === "Delete") {
      handleDelete();
      return;
    }

    // Handle clear (Escape key)
    if (key === "Escape") {
      handleClear();
      return;
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Display Area */}
      <div
        ref={inputRef}
        tabIndex={0}
        className="border-dark-gray flex w-full items-center justify-between rounded-md border px-4 py-3 hover:cursor-text focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={handleFocusInput}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center">
          {displayFormula.length > 0 ? (
            displayFormula.map((item, index) => <span key={index}>{item}</span>)
          ) : (
            <p className="text-lg text-gray-500">{placeholder}</p>
          )}
        </div>
        {/* Delete Button */}

        <button
          onClick={handleDelete}
          disabled={!formula}
          className="flex items-center justify-center gap-2 rounded-lg text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <IconComponent src="/icons/clear26.svg" width={26} height={24} />
        </button>
      </div>

      {/* Main Calculator Layout */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Variables Section */}
        <div className="border-stroke-data rounded-lg border p-4">
          <h4 className="mb-4 text-base font-semibold text-gray-900">
            Variabel:
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {variables.map((variable) => (
              <button
                key={variable.id}
                onClick={() => handleVariableClick(variable)}
                className="flex items-center justify-center rounded-lg bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
              >
                {variable.name}
              </button>
            ))}
          </div>
        </div>

        {/* Operators & Numbers Section */}
        <div className="border-stroke-data rounded-lg border p-4">
          <h4 className="mb-4 text-base font-semibold text-gray-900">
            Operator:
          </h4>

          {/* Operators Grid */}
          <div className="mb-4 grid grid-cols-4 gap-2">
            {operators.map((operator) => (
              <button
                key={operator.id}
                onClick={() => handleOperatorClick(operator)}
                className="flex h-10 items-center justify-center rounded-lg bg-blue-500 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
              >
                {operator.display}
              </button>
            ))}
          </div>

          {/* Numbers Grid */}
          {/* <div className="mb-4">
            <h5 className="mb-2 text-sm font-medium text-gray-700">Angka:</h5>
            <div className="grid grid-cols-5 gap-2">
              {numbers.map((number) => (
                <button
                  key={number}
                  onClick={() => handleNumberClick(number)}
                  className="flex h-10 items-center justify-center rounded-lg bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-300"
                >
                  {number}
                </button>
              ))}
            </div>
          </div> */}
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      {/* <div className="rounded-md bg-gray-50 p-3 text-xs text-gray-500">
        <div className="mb-1 font-semibold">Pintasan Keyboard:</div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          <div>
            <kbd className="rounded border bg-white px-1">0-9</kbd> Angka
          </div>
          <div>
            <kbd className="rounded border bg-white px-1">+,-,*,/</kbd> Operator
          </div>
          <div>
            <kbd className="rounded border bg-white px-1">a,b,c,d</kbd> Variabel
          </div>
          <div>
            <kbd className="rounded border bg-white px-1">Backspace</kbd> Hapus
          </div>
          <div>
            <kbd className="rounded border bg-white px-1">(,)</kbd> Kurung
          </div>
          <div>
            <kbd className="rounded border bg-white px-1">^</kbd> Pangkat
          </div>
          <div>
            <kbd className="rounded border bg-white px-1">Esc</kbd> Bersihkan
          </div>
        </div>
      </div> */}
    </div>
  );
};

FormulaCalculator.propTypes = {
  variables: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
    })
  ),
  onFormulaChange: PropTypes.func,
  initialFormula: PropTypes.string,
  className: PropTypes.string,
};

export default FormulaCalculator;
