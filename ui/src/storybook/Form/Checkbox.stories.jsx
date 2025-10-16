import { Checkbox } from "@muatmuat/ui/Form";

export default {
  title: "Form/Checkbox",
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          "A customizable checkbox component with custom styling and accessibility features for form inputs.",
      },
    },
  },
  argTypes: {
    onChange: {
      action: "onChange",
      description: "Callback function triggered when checkbox state changes.",
    },
    label: {
      control: { type: "text" },
      description: "The label text displayed next to the checkbox.",
    },
    value: {
      control: { type: "text" },
      description: "The value associated with the checkbox.",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the checkbox is disabled.",
    },
    checked: {
      control: { type: "boolean" },
      description: "Whether the checkbox is checked.",
    },
    children: {
      control: { type: "text" },
      description: "Custom content to display instead of the label prop.",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes for the container.",
    },
    appearance: {
      control: { type: "object" },
      description:
        "Object containing inputClassName and labelClassName for custom styling.",
    },
  },
};

export const Default = {
  args: {
    label: "Accept terms and conditions",
    value: "terms",
  },
};

export const Checked = {
  args: {
    label: "Subscribe to newsletter",
    value: "newsletter",
    checked: true,
  },
};

export const Disabled = {
  args: {
    label: "Disabled option",
    value: "disabled",
    disabled: true,
  },
};

export const DisabledChecked = {
  args: {
    label: "Disabled checked option",
    value: "disabled-checked",
    checked: true,
    disabled: true,
  },
};

export const WithChildren = {
  args: {
    value: "custom",
    children: (
      <span className="text-primary-700 font-bold">Custom Label Content</span>
    ),
  },
};

export const Playground = {
  args: {
    label: "Interactive checkbox",
    value: "playground",
    checked: false,
    disabled: false,
    className: "",
  },
};
