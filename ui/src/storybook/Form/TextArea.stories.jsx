import { TextArea } from "@muatmuat/ui/Form";

export default {
  title: "Form/TextArea",
  component: TextArea,
  parameters: {
    docs: {
      description: {
        component:
          "A customizable textarea component with error handling, character counting, and accessibility features. Perfect for multi-line text input in forms.",
      },
    },
  },
  argTypes: {
    value: {
      control: "text",
      description: "The current value of the textarea",
    },
    errorMessage: {
      control: "text",
      description: "Error message to display below the textarea",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when textarea is empty",
    },
    disabled: {
      control: "boolean",
      description: "Whether the textarea is disabled",
    },
    maxLength: {
      control: "number",
      description: "Maximum number of characters allowed",
    },
    withCharCount: {
      control: "boolean",
      description: "Whether to show character count",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the wrapper",
    },
    appearance: {
      control: "object",
      description: "Appearance customization object",
    },
  },
};

export const Default = {
  args: {
    placeholder: "Enter your message here...",
    value: "",
  },
};

export const WithValue = {
  args: {
    value: "This is some sample text in the textarea.",
    placeholder: "Enter your message here...",
  },
};

export const WithError = {
  args: {
    value: "Invalid input",
    errorMessage: "This field is required",
    placeholder: "Enter your message here...",
  },
};

export const WithCharacterCount = {
  args: {
    value: "Sample text",
    maxLength: 100,
    withCharCount: true,
    placeholder: "Enter your message here...",
  },
};

export const Disabled = {
  args: {
    value: "Disabled textarea",
    disabled: true,
    placeholder: "Enter your message here...",
  },
};

export const FullExample = {
  args: {
    value: "This is a comprehensive example showing all features.",
    maxLength: 200,
    withCharCount: true,
    placeholder: "Enter your detailed message here...",
    className: "max-w-md",
    appearance: {
      inputClassName: "min-h-[120px]",
    },
  },
};

export const Playground = {
  args: {
    value: "Play around with the controls to see different states",
    placeholder: "Customize me using the controls below...",
    disabled: false,
    maxLength: 500,
    withCharCount: true,
    errorMessage: "",
    className: "",
    appearance: {
      inputClassName: "",
    },
  },
};
