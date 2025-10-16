import { NumberInput } from "@muatmuat/ui/Form";

/**
 * NumberInput component with stepper functionality, numeric formatting, and validation.
 * Supports controlled/uncontrolled modes with customizable formatting and constraints.
 */
export default {
  title: "Form/NumberInput",
  component: NumberInput,
  parameters: {
    docs: {
      description: {
        component: `
A sophisticated number input component with stepper buttons and advanced formatting options.
Perfect for quantity selection, price input, and any numeric data entry with constraints.

## When to use
- When you need numeric input with increment/decrement controls
- When you want formatted numbers (thousands separators, decimal places)
- When you need min/max validation with visual feedback
- When you want controlled or uncontrolled number input behavior

## Design System Category
Form Components / Data Entry

## Prerequisites
Requires react-number-format for numeric formatting.
Uses Tailwind CSS classes from the design system.
        `,
      },
    },
  },
  argTypes: {
    value: {
      control: "number",
      description: "Controlled value of the component",
    },
    defaultValue: {
      control: "number",
      description: "Initial value for uncontrolled component",
      defaultValue: 0,
    },
    min: {
      control: "number",
      description: "Minimum allowed value",
      defaultValue: 0,
    },
    max: {
      control: "number",
      description: "Maximum allowed value",
    },
    stepper: {
      control: "number",
      description: "Increment/decrement step size",
      defaultValue: 1,
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    hideStepper: {
      control: "boolean",
      description: "Whether to hide the +/- stepper buttons",
      defaultValue: true,
    },
    thousandSeparator: {
      control: "text",
      description: "Character for thousand separator",
      defaultValue: ".",
    },
    decimalSeparator: {
      control: "text",
      description: "Character for decimal separator",
      defaultValue: ",",
    },
    decimalScale: {
      control: "number",
      description: "Number of decimal places",
      defaultValue: 0,
    },
    fixedDecimalScale: {
      control: "boolean",
      description: "Always show decimal places",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
      defaultValue: "0",
    },
    errorMessage: {
      control: "text",
      description: "Error message to display",
    },
    t: {
      control: "function",
      description: "Translation function for error messages",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

/**
 * Basic number input with stepper buttons
 */
export const Default = {
  args: {
    defaultValue: 5,
    min: 0,
    max: 100,
    stepper: 1,
  },
};

/**
 * Number input without stepper buttons
 */
export const WithoutStepper = {
  args: {
    defaultValue: 25,
    min: 0,
    max: 100,
    hideStepper: true,
    placeholder: "Enter quantity",
  },
};

/**
 * Number input with decimal places
 */
export const WithDecimals = {
  args: {
    defaultValue: 12.5,
    min: 0,
    max: 100,
    stepper: 0.5,
    decimalScale: 2,
    fixedDecimalScale: true,
    placeholder: "0.00",
  },
};

/**
 * Price input with currency formatting
 */
export const PriceInput = {
  args: {
    defaultValue: 150000,
    min: 0,
    max: 1000000,
    stepper: 10000,
    thousandSeparator: ".",
    decimalSeparator: ",",
    decimalScale: 0,
    placeholder: "0",
  },
};

/**
 * Quantity selector with small range
 */
export const QuantitySelector = {
  args: {
    defaultValue: 1,
    min: 1,
    max: 10,
    stepper: 1,
    placeholder: "Qty",
  },
};

/**
 * Percentage input
 */
export const Percentage = {
  args: {
    defaultValue: 25,
    min: 0,
    max: 100,
    stepper: 5,
    placeholder: "0%",
  },
};

/**
 * Disabled number input
 */
export const Disabled = {
  args: {
    defaultValue: 42,
    disabled: true,
  },
};

/**
 * Number input with error message
 */
export const WithError = {
  args: {
    defaultValue: 150,
    min: 0,
    max: 100,
    errorMessage: "Value cannot exceed 100",
  },
};

/**
 * Number input with validation constraints
 */
export const WithValidation = {
  args: {
    defaultValue: 50,
    min: 10,
    max: 90,
    stepper: 5,
    errorMessage: "Value must be between 10 and 90",
  },
};

/**
 * Controlled number input example
 */
export const Controlled = {
  render: () => {
    const [value, setValue] = React.useState(25);

    return (
      <div className="space-y-4">
        <NumberInput
          value={value}
          onValueChange={setValue}
          min={0}
          max={100}
          stepper={5}
        />
        <p className="text-sm text-neutral-600">
          Current value: <strong>{value}</strong>
        </p>
      </div>
    );
  },
};

/**
 * Custom formatting example
 */
export const CustomFormatting = {
  args: {
    defaultValue: 1234567.89,
    thousandSeparator: ",",
    decimalSeparator: ".",
    decimalScale: 2,
    fixedDecimalScale: true,
    placeholder: "0.00",
  },
};

/**
 * Compact number input
 */
export const Compact = {
  args: {
    defaultValue: 5,
    min: 0,
    max: 20,
    stepper: 1,
    className: "w-20",
  },
};

/**
 * Large range number input
 */
export const LargeRange = {
  args: {
    defaultValue: 50000,
    min: 0,
    max: 100000,
    stepper: 1000,
    thousandSeparator: ".",
    placeholder: "0",
  },
};

/**
 * Number input with custom translation function
 */
export const WithCustomTranslation = {
  args: {
    defaultValue: 150,
    min: 0,
    max: 100,
    errorMessage: "validation.max_exceeded",
    t: (key) => {
      const translations = {
        "validation.max_exceeded": "Nilai maksimal adalah 100",
        "validation.min_required": "Nilai minimal adalah 0",
      };
      return translations[key] || key;
    },
  },
};

/**
 * Interactive playground with all controls
 */
export const Playground = {
  args: {
    defaultValue: 10,
    min: 0,
    max: 100,
    stepper: 1,
    disabled: false,
    hideStepper: true,
    thousandSeparator: ".",
    decimalSeparator: ",",
    decimalScale: 0,
    fixedDecimalScale: false,
    placeholder: "0",
    errorMessage: "",
    t: undefined,
    className: "",
  },
};
