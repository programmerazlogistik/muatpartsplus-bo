import { ButtonPlusMinus } from "@muatmuat/ui/Form";

export default {
  title: "Form/ButtonPlusMinus",
  component: ButtonPlusMinus,
  parameters: {
    docs: {
      description: {
        component:
          "A compact input component with increment and decrement buttons for numeric values, commonly used for quantity selection or counters.",
      },
    },
  },
  argTypes: {
    value: {
      control: { type: "number" },
      description: "The current numeric value displayed in the input.",
    },
    onChange: {
      action: "onChange",
      description: "Callback function triggered when the value changes.",
    },
    onIncrement: {
      action: "onIncrement",
      description:
        "Callback function triggered when the increment button is clicked.",
    },
    onDecrement: {
      action: "onDecrement",
      description:
        "Callback function triggered when the decrement button is clicked.",
    },
    minValue: {
      control: { type: "number" },
      description: "The minimum allowed value.",
    },
    maxValue: {
      control: { type: "number" },
      description: "The maximum allowed value.",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the component is disabled.",
    },
  },
};

export const Default = {
  args: {
    value: 5,
    minValue: 0,
    maxValue: 10,
  },
};

export const Disabled = {
  args: {
    value: 5,
    disabled: true,
  },
};

export const AtMinValue = {
  args: {
    value: 0,
    minValue: 0,
    maxValue: 10,
  },
};

export const AtMaxValue = {
  args: {
    value: 10,
    minValue: 0,
    maxValue: 10,
  },
};

export const Playground = {
  args: {
    value: 5,
    minValue: 0,
    maxValue: 10,
    disabled: false,
  },
};
