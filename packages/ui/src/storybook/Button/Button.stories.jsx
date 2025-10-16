import { Button } from "@muatmuat/ui/Button";

export default {
  title: "Components/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `
# 🔘 Button Component

A versatile button component designed for both MuatTrans and MuatParts applications with comprehensive variant support and accessibility features.

## When to Use

- **Primary actions**: Main call-to-action buttons (submit forms, confirm dialogs)
- **Secondary actions**: Supporting actions that complement primary buttons
- **Error states**: Delete, cancel, or destructive actions
- **Warning states**: Caution actions that require user attention
- **Navigation**: Link-style buttons for internal navigation
- **Icon actions**: Buttons with contextual icons for better UX

## Design System Category

**Data Entry & Actions** - Essential interactive element for user input and navigation.

## Prerequisites

- Requires \`class-variance-authority\` for variant management
- Uses custom Tailwind CSS configuration with MuatTrans/MuatParts color palette
- IconComponent dependency for icon rendering
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "muattrans-primary",
        "muattrans-outline-primary",
        "muattrans-primary-secondary",
        "muattrans-error",
        "muattrans-error-secondary",
        "muattrans-warning",
        "muatparts-primary",
        "muatparts-primary-secondary",
        "muatparts-error",
        "muatparts-error-secondary",
        "muatparts-warning",
        "link",
      ],
      description: "Visual variant of the button",
      table: {
        type: { summary: "ButtonVariant" },
        defaultValue: { summary: "muattrans-primary" },
      },
    },
    children: {
      control: "text",
      description: "Content to be rendered inside the button",
      table: {
        type: { summary: "React.ReactNode" },
        defaultValue: { summary: "Button" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes to be applied",
      table: {
        type: { summary: "string" },
      },
    },
    iconLeft: {
      control: "text",
      description:
        "Icon to be rendered on the left side (string path or React node)",
      table: {
        type: { summary: "string | React.ReactNode" },
      },
    },
    iconRight: {
      control: "text",
      description:
        "Icon to be rendered on the right side (string path or React node)",
      table: {
        type: { summary: "string | React.ReactNode" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    keepDisabledStyle: {
      control: "boolean",
      description: "Whether to keep the original variant style when disabled",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
};

// Default story
export const Default = {
  args: {
    children: "Default Button",
    variant: "muattrans-primary",
  },
};

// MuatTrans Variants
export const MuatTransPrimary = {
  args: {
    children: "MuatTrans Primary",
    variant: "muattrans-primary",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Primary button for MuatTrans application with yellow brand color.",
      },
    },
  },
};

export const MuatTransOutlinePrimary = {
  args: {
    children: "Outline Primary",
    variant: "muattrans-outline-primary",
  },
  parameters: {
    docs: {
      description: {
        story: "Outlined primary button for MuatTrans with neutral styling.",
      },
    },
  },
};

export const MuatTransSecondary = {
  args: {
    children: "MuatTrans Secondary",
    variant: "muattrans-primary-secondary",
  },
  parameters: {
    docs: {
      description: {
        story: "Secondary button for MuatTrans with outline styling.",
      },
    },
  },
};

export const MuatTransError = {
  args: {
    children: "Delete Item",
    variant: "muattrans-error",
  },
  parameters: {
    docs: {
      description: {
        story: "Error button for destructive actions in MuatTrans.",
      },
    },
  },
};

export const MuatTransErrorSecondary = {
  args: {
    children: "Cancel",
    variant: "muattrans-error-secondary",
  },
  parameters: {
    docs: {
      description: {
        story: "Secondary error button with outline styling.",
      },
    },
  },
};

export const MuatTransWarning = {
  args: {
    children: "Proceed with Caution",
    variant: "muattrans-warning",
  },
  parameters: {
    docs: {
      description: {
        story: "Warning button for actions requiring user attention.",
      },
    },
  },
};

// MuatParts Variants
export const MuatPartsPrimary = {
  args: {
    children: "MuatParts Primary",
    variant: "muatparts-primary",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Primary button for MuatParts application with blue brand color.",
      },
    },
  },
};

export const MuatPartsSecondary = {
  args: {
    children: "MuatParts Secondary",
    variant: "muatparts-primary-secondary",
  },
  parameters: {
    docs: {
      description: {
        story: "Secondary button for MuatParts with outline styling.",
      },
    },
  },
};

export const MuatPartsError = {
  args: {
    children: "Remove Item",
    variant: "muatparts-error",
  },
  parameters: {
    docs: {
      description: {
        story: "Error button for destructive actions in MuatParts.",
      },
    },
  },
};

export const MuatPartsErrorSecondary = {
  args: {
    children: "Discard Changes",
    variant: "muatparts-error-secondary",
  },
  parameters: {
    docs: {
      description: {
        story: "Secondary error button with outline styling.",
      },
    },
  },
};

export const MuatPartsWarning = {
  args: {
    children: "Continue Anyway",
    variant: "muatparts-warning",
  },
  parameters: {
    docs: {
      description: {
        story: "Warning button for actions requiring user attention.",
      },
    },
  },
};

// Link Variant
export const LinkButton = {
  args: {
    children: "Navigate to Page",
    variant: "link",
  },
  parameters: {
    docs: {
      description: {
        story: "Link-style button for navigation without background styling.",
      },
    },
  },
};

// States
export const DisabledStates = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>Disabled Primary</Button>
      <Button variant="muattrans-primary-secondary" disabled>
        Disabled Secondary
      </Button>
      <Button variant="muattrans-error" disabled>
        Disabled Error
      </Button>
      <Button variant="link" disabled>
        Disabled Link
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Disabled states automatically apply neutral styling and cursor-not-allowed.",
      },
    },
  },
};

export const KeepDisabledStyle = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled keepDisabledStyle>
        Disabled but Styled
      </Button>
      <Button variant="muattrans-error" disabled keepDisabledStyle>
        Keep Error Style
      </Button>
      <Button variant="muatparts-primary-secondary" disabled keepDisabledStyle>
        Keep Secondary Style
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use keepDisabledStyle to maintain visual variant while keeping disabled behavior.",
      },
    },
  },
};

// With Icons
export const WithIcons = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button iconLeft="/icons/add-image20.svg">Add Image</Button>
      <Button variant="muattrans-error" iconLeft="/icons/trash.svg">
        Delete
      </Button>
      <Button variant="muatparts-primary" iconRight="/icons/arrow-right.svg">
        Continue
      </Button>
      <Button variant="link" iconLeft="/icons/arrow-left24.svg">
        Go Back
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Buttons support both left and right icons using string paths or React nodes.",
      },
    },
  },
};

// Size Variations (responsive)
export const ResponsiveSizing = {
  render: () => (
    <div className="space-y-4">
      <div className="block md:hidden">
        <h3 className="mb-2 text-sm font-semibold">Mobile (h-10)</h3>
        <Button>Mobile Button</Button>
      </div>
      <div className="hidden md:block">
        <h3 className="mb-2 text-sm font-semibold">Desktop (h-8)</h3>
        <Button>Desktop Button</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Buttons automatically adjust height: 40px on mobile, 32px on desktop.",
      },
    },
  },
};

// Long Text Handling
export const LongTextHandling = {
  render: () => (
    <div className="max-w-xs space-y-4">
      <Button>
        This is a very long button text that might wrap or truncate
      </Button>
      <Button variant="muattrans-primary-secondary">
        Another extremely long button text example for testing
      </Button>
      <Button variant="link">
        This link button has very long text to demonstrate handling
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Buttons handle long text gracefully with proper spacing and layout.",
      },
    },
  },
};

// Interactive Playground
export const Playground = {
  args: {
    children: "Interactive Button",
    variant: "muattrans-primary",
    disabled: false,
    keepDisabledStyle: false,
    iconLeft: "",
    iconRight: "",
    className: "",
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to test all button configurations.",
      },
    },
  },
};

// Usage Examples
export const UsageExamples = {
  render: () => (
    <div className="space-y-8">
      {/* Form Actions */}
      <div>
        <h3 className="mb-3 text-lg font-semibold">Form Actions</h3>
        <div className="flex gap-3">
          <Button variant="muattrans-primary">Submit</Button>
          <Button variant="muattrans-primary-secondary">Cancel</Button>
        </div>
      </div>

      {/* Destructive Actions */}
      <div>
        <h3 className="mb-3 text-lg font-semibold">Destructive Actions</h3>
        <div className="flex gap-3">
          <Button variant="muattrans-error">Delete Account</Button>
          <Button variant="muattrans-error-secondary">Remove Item</Button>
        </div>
      </div>

      {/* Navigation */}
      <div>
        <h3 className="mb-3 text-lg font-semibold">Navigation</h3>
        <div className="flex gap-3">
          <Button variant="link" iconLeft="/icons/arrow-left24.svg">
            Back to Dashboard
          </Button>
          <Button
            variant="muatparts-primary"
            iconRight="/icons/arrow-right.svg"
          >
            Next Step
          </Button>
        </div>
      </div>

      {/* Warning Actions */}
      <div>
        <h3 className="mb-3 text-lg font-semibold">Warning Actions</h3>
        <div className="flex gap-3">
          <Button variant="muattrans-warning">Proceed Anyway</Button>
          <Button variant="muatparts-warning">Override Settings</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Common usage patterns for different button variants and use cases.",
      },
    },
  },
};
