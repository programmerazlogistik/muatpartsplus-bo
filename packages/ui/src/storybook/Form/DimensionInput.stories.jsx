import { useState } from "react";

import { DimensionInput } from "@muatmuat/ui/Form";

export default {
  title: "Form/DimensionInput",
  component: DimensionInput,
  parameters: {
    docs: {
      description: {
        component:
          "A specialized input component for handling 3D measurements (length x width x height) with numeric formatting and validation.",
      },
    },
  },
  argTypes: {
    disabled: {
      control: { type: "boolean" },
      description: "Whether the input is disabled.",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes for the container.",
    },
    appearance: {
      control: { type: "object" },
      description:
        "Object containing containerClassName and inputClassName for custom styling.",
    },
  },
};

export const Default = {
  render: () => {
    const [dimensions, setDimensions] = useState({
      panjang: "",
      lebar: "",
      tinggi: "",
    });

    const manual = {
      panjang: {
        value: dimensions.panjang,
        setValue: (value) =>
          setDimensions((prev) => ({ ...prev, panjang: value })),
      },
      lebar: {
        value: dimensions.lebar,
        setValue: (value) =>
          setDimensions((prev) => ({ ...prev, lebar: value })),
      },
      tinggi: {
        value: dimensions.tinggi,
        setValue: (value) =>
          setDimensions((prev) => ({ ...prev, tinggi: value })),
      },
    };

    return <DimensionInput manual={manual} />;
  },
};

export const WithValues = {
  render: () => {
    const [dimensions, setDimensions] = useState({
      panjang: 100,
      lebar: 50,
      tinggi: 75,
    });

    const manual = {
      panjang: {
        value: dimensions.panjang,
        setValue: (value) =>
          setDimensions((prev) => ({ ...prev, panjang: value })),
      },
      lebar: {
        value: dimensions.lebar,
        setValue: (value) =>
          setDimensions((prev) => ({ ...prev, lebar: value })),
      },
      tinggi: {
        value: dimensions.tinggi,
        setValue: (value) =>
          setDimensions((prev) => ({ ...prev, tinggi: value })),
      },
    };

    return <DimensionInput manual={manual} />;
  },
};

export const Disabled = {
  render: () => {
    const [dimensions, setDimensions] = useState({
      panjang: 200,
      lebar: 150,
      tinggi: 100,
    });

    const manual = {
      panjang: {
        value: dimensions.panjang,
        setValue: (value) =>
          setDimensions((prev) => ({ ...prev, panjang: value })),
      },
      lebar: {
        value: dimensions.lebar,
        setValue: (value) =>
          setDimensions((prev) => ({ ...prev, lebar: value })),
      },
      tinggi: {
        value: dimensions.tinggi,
        setValue: (value) =>
          setDimensions((prev) => ({ ...prev, tinggi: value })),
      },
    };

    return <DimensionInput manual={manual} disabled={true} />;
  },
};

export const Empty = {
  render: () => {
    const [dimensions, setDimensions] = useState({
      panjang: "",
      lebar: "",
      tinggi: "",
    });

    const manual = {
      panjang: {
        value: dimensions.panjang,
        setValue: (value) =>
          setDimensions((prev) => ({ ...prev, panjang: value })),
      },
      lebar: {
        value: dimensions.lebar,
        setValue: (value) =>
          setDimensions((prev) => ({ ...prev, lebar: value })),
      },
      tinggi: {
        value: dimensions.tinggi,
        setValue: (value) =>
          setDimensions((prev) => ({ ...prev, tinggi: value })),
      },
    };

    return <DimensionInput manual={manual} />;
  },
};

export const Playground = {
  render: (args) => {
    const [dimensions, setDimensions] = useState({
      panjang: 50,
      lebar: 30,
      tinggi: 20,
    });

    const manual = {
      panjang: {
        value: dimensions.panjang,
        setValue: (value) =>
          setDimensions((prev) => ({ ...prev, panjang: value })),
      },
      lebar: {
        value: dimensions.lebar,
        setValue: (value) =>
          setDimensions((prev) => ({ ...prev, lebar: value })),
      },
      tinggi: {
        value: dimensions.tinggi,
        setValue: (value) =>
          setDimensions((prev) => ({ ...prev, tinggi: value })),
      },
    };

    return <DimensionInput {...args} manual={manual} />;
  },
  args: {
    disabled: false,
    className: "",
  },
};
