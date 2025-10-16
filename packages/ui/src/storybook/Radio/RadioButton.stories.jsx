import { RadioButton } from "@muatmuat/ui/Radio";

export default {
  title: "Components/RadioButton",
  component: RadioButton,
  parameters: {
    docs: {
      description: {
        component:
          "A customizable radio button component with enhanced styling and accessibility features. Supports both label text and custom children content with proper keyboard navigation and screen reader support.",
      },
    },
  },
  argTypes: {
    name: {
      control: "text",
      description:
        "Name attribute for the radio input (required for radio groups)",
    },
    label: {
      control: "text",
      description: "Text label for the radio button",
    },
    value: {
      control: "text",
      description: "Value of the radio input",
    },
    checked: {
      control: "boolean",
      description: "Whether the radio button is checked",
      defaultValue: false,
    },
    disabled: {
      control: "boolean",
      description: "Whether the radio button is disabled",
      defaultValue: false,
    },
    onClick: {
      action: "clicked",
      description:
        "Callback function when radio button is clicked. Returns { checked, value }",
    },
    onChange: {
      action: "changed",
      description: "Callback function when radio button state changes",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the container",
    },
    classNameRound: {
      control: "text",
      description: "Additional CSS classes for the radio button visual element",
    },
    classNameLabel: {
      control: "text",
      description: "Additional CSS classes for the label text",
    },
    children: {
      control: "text",
      description: "Custom content to display instead of label text",
    },
  },
};

/**
 * ## Default RadioButton
 *
 * Basic usage with label text and default styling.
 */
export const Default = {
  args: {
    name: "default-radio",
    label: "Option 1",
    value: "option1",
    checked: false,
  },
};

/**
 * ## Checked State
 *
 * Radio button in checked state with primary color styling.
 */
export const Checked = {
  args: {
    name: "checked-radio",
    label: "Selected Option",
    value: "selected",
    checked: true,
  },
};

/**
 * ## Disabled State
 *
 * Radio button in disabled state with reduced opacity and no-drop cursor.
 */
export const Disabled = {
  args: {
    name: "disabled-radio",
    label: "Disabled Option",
    value: "disabled",
    disabled: true,
    checked: false,
  },
};

/**
 * ## Disabled Checked State
 *
 * Radio button that is both disabled and checked.
 */
export const DisabledChecked = {
  args: {
    name: "disabled-checked-radio",
    label: "Disabled & Selected",
    value: "disabled-checked",
    disabled: true,
    checked: true,
  },
};

/**
 * ## With Custom Children
 *
 * Radio button with custom content instead of simple label text.
 */
export const WithChildren = {
  args: {
    name: "children-radio",
    value: "custom",
    checked: false,
    children: (
      <div className="flex items-center gap-2">
        <span className="font-semibold">Custom Content</span>
        <span className="text-xs text-neutral-600">(with icon support)</span>
      </div>
    ),
  },
};

/**
 * ## Radio Group
 *
 * Multiple radio buttons working together as a group.
 */
export const RadioGroup = {
  render: (args) => (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-neutral-900">
        Choose an option:
      </h3>
      <div className="space-y-2">
        <RadioButton
          {...args}
          name="payment-method"
          label="Credit Card"
          value="credit-card"
          checked={true}
        />
        <RadioButton
          {...args}
          name="payment-method"
          label="PayPal"
          value="paypal"
          checked={false}
        />
        <RadioButton
          {...args}
          name="payment-method"
          label="Bank Transfer"
          value="bank-transfer"
          checked={false}
        />
      </div>
    </div>
  ),
  args: {
    onClick: (data) => console.log("Radio clicked:", data),
  },
};

/**
 * ## Custom Styling
 *
 * Radio button with custom CSS classes applied.
 */
export const CustomStyling = {
  args: {
    name: "styled-radio",
    label: "Custom Styled",
    value: "styled",
    className: "border border-neutral-200 rounded-lg p-3 bg-neutral-50",
    classNameRound: "border-2 border-primary-600",
    classNameLabel: "text-primary-700 font-bold",
  },
};

/**
 * ## Form Integration
 *
 * Radio button integrated in a form context with proper accessibility.
 */
export const FormIntegration = {
  render: (args) => (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        alert("Form submitted!");
      }}
    >
      <div>
        <h3 className="mb-2 text-sm font-semibold text-neutral-900">
          Select your subscription plan:
        </h3>
        <div className="space-y-3">
          <RadioButton
            {...args}
            name="subscription"
            label="Basic Plan - $9/month"
            value="basic"
            checked={true}
          />
          <RadioButton
            {...args}
            name="subscription"
            label="Pro Plan - $19/month"
            value="pro"
            checked={false}
          />
          <RadioButton
            {...args}
            name="subscription"
            label="Enterprise Plan - $49/month"
            value="enterprise"
            checked={false}
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-primary-600 hover:bg-primary-700 rounded-md px-4 py-2 text-white"
      >
        Subscribe
      </button>
    </form>
  ),
  args: {
    onClick: (data) => console.log("Plan selected:", data),
  },
};

/**
 * ## Playground
 *
 * Interactive playground with all configurable props.
 */
export const Playground = {
  args: {
    name: "playground-radio",
    label: "Interactive Option",
    value: "playground",
    checked: false,
    disabled: false,
    className: "",
    classNameRound: "",
    classNameLabel: "",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Experiment with all RadioButton props to see how they affect the component's appearance and behavior.",
      },
    },
  },
};

/**
 * ## Props Documentation
 *
 * | Prop | Type | Default | Required | Description |
 * |------|------|---------|----------|-------------|
 * | `name` | `string` | `undefined` | Yes* | Name attribute for radio grouping |
 * | `label` | `string` | `undefined` | No* | Text label for the radio button |
 * | `value` | `string` | `undefined` | Yes* | Value of the radio input |
 * | `checked` | `boolean` | `false` | No | Whether the radio is selected |
 * | `disabled` | `boolean` | `false` | No | Whether the radio is disabled |
 * | `onClick` | `function` | `() => {}` | No | Click handler returning `{ checked, value }` |
 * | `onChange` | `function` | `undefined` | No | Change handler |
 * | `children` | `ReactNode` | `undefined` | No* | Custom content instead of label |
 * | `className` | `string` | `undefined` | No | Container styling classes |
 * | `classNameRound` | `string` | `undefined` | No | Radio visual styling classes |
 * | `classNameLabel` | `string` | `undefined` | No | Label text styling classes |
 *
 * **\* Either `label` or `children` should be provided**
 */

/**
 * ## Accessibility Features
 *
 * - **Semantic HTML**: Uses native `<input type="radio">` element
 * - **Keyboard Navigation**: Full keyboard support with Tab/Space keys
 * - **Screen Reader Support**: Proper ARIA attributes and labeling
 * - **Focus Management**: Visual focus indicators for keyboard users
 * - **High Contrast**: Meets WCAG contrast requirements
 * - **Disabled State**: Proper disabled styling and cursor feedback
 */

/**
 * ## Best Practices
 *
 * ✅ **DO:**
 * - Use descriptive labels that clearly indicate the option
 * - Group related radio buttons with the same `name` attribute
 * - Provide appropriate default selections when applicable
 * - Use radio buttons for single-select options (5-7 items max)
 * - Test keyboard navigation and screen reader compatibility
 * - Use the `disabled` state for unavailable options
 *
 * ❌ **DON'T:**
 * - Use radio buttons for independent choices (use checkboxes instead)
 * - Create radio groups with only one option
 * - Use vague or generic labels like "Option 1", "Option 2"
 * - Override the default radio button styling without maintaining accessibility
 * - Forget to handle click events for proper state management
 */

/**
 * ## Edge Cases
 *
 * ### No Label Provided
 * The component handles missing labels gracefully but should always have either `label` or `children`.
 *
 * ### Mixed Label Types
 * In a radio group, maintain consistency between using `label` and `children`.
 *
 * ### Large Number of Options
 * Consider using a dropdown select component for more than 7 options.
 */

/**
 * ## Performance Tips
 *
 * - The component uses `React.memo` optimization internally
 * - Avoid unnecessary re-renders by keeping click handlers stable
 * - Use React's `useState` for managing radio group state
 * - Consider using `useCallback` for click handlers in parent components
 */
