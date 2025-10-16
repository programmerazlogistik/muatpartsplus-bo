import { IconComponent } from "@muatmuat/ui/IconComponent";

/** @type {import('@storybook/react').Meta<typeof IconComponent>} */
const meta = {
  title: "Components/IconComponent",
  component: IconComponent,
  parameters: {
    docs: {
      description: {
        component:
          "A versatile icon component that renders SVG icons with customizable colors, sizes, and rotation. Perfect for displaying icons throughout your application with consistent styling and accessibility features.",
      },
    },
  },
  argTypes: {
    src: {
      control: "text",
      description: "Icon source path or object with src property",
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "danger", "white", "gray", "default"],
      description: "Color variant for the icon stroke",
    },
    size: {
      control: "select",
      options: ["xsmall", "small", "medium", "large"],
      description: "Predefined size for the icon",
    },
    width: {
      control: "number",
      description: "Custom width in pixels (used when size is not specified)",
    },
    height: {
      control: "number",
      description: "Custom height in pixels (used when size is not specified)",
    },
    rotate: {
      control: "number",
      description: "Rotation angle in degrees",
    },
    loader: {
      control: "boolean",
      description: "Show loading skeleton while icon loads",
    },
    title: {
      control: "text",
      description: "Accessibility title for the icon",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    onClick: {
      action: "clicked",
      description: "Click handler function",
    },
  },
};

export default meta;

export const Default = {
  args: {
    src: "/icons/default-icon.svg",
    color: "default",
    size: "medium",
    title: "Default Icon",
  },
};

export const Colors = {
  render: (args) => (
    <div className="flex gap-4 rounded-lg bg-gray-100 p-4">
      <IconComponent {...args} color="primary" title="Primary Icon" />
      <IconComponent {...args} color="secondary" title="Secondary Icon" />
      <IconComponent {...args} color="danger" title="Danger Icon" />
      <IconComponent
        {...args}
        color="white"
        title="White Icon"
        className="rounded bg-gray-800 p-2"
      />
      <IconComponent {...args} color="gray" title="Gray Icon" />
    </div>
  ),
  args: {
    src: "/icons/sample-icon.svg",
    size: "medium",
  },
  parameters: {
    docs: {
      description: {
        story:
          "All available color variants for the IconComponent. Each color uses Tailwind CSS stroke classes for consistent theming.",
      },
    },
  },
};

export const Sizes = {
  render: (args) => (
    <div className="flex flex-col gap-4 rounded-lg bg-gray-100 p-4">
      <div className="flex items-center gap-2">
        <IconComponent {...args} size="xsmall" title="X-Small" />
        <span className="text-sm">X-Small (12px)</span>
      </div>
      <div className="flex items-center gap-2">
        <IconComponent {...args} size="small" title="Small" />
        <span className="text-sm">Small (16px)</span>
      </div>
      <div className="flex items-center gap-2">
        <IconComponent {...args} size="medium" title="Medium" />
        <span className="text-sm">Medium (24px)</span>
      </div>
      <div className="flex items-center gap-2">
        <IconComponent {...args} size="large" title="Large" />
        <span className="text-sm">Large (32px)</span>
      </div>
    </div>
  ),
  args: {
    src: "/icons/sample-icon.svg",
    color: "primary",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Predefined size variants from x-small to large. Custom sizes can be set using width and height props.",
      },
    },
  },
};

export const Rotation = {
  render: (args) => (
    <div className="flex items-center gap-4 rounded-lg bg-gray-100 p-4">
      <IconComponent {...args} rotate={0} title="0°" />
      <IconComponent {...args} rotate={45} title="45°" />
      <IconComponent {...args} rotate={90} title="90°" />
      <IconComponent {...args} rotate={180} title="180°" />
      <IconComponent {...args} rotate={270} title="270°" />
    </div>
  ),
  args: {
    src: "/icons/sample-icon.svg",
    color: "primary",
    size: "medium",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Icon rotation using the rotate prop. Supports any degree value for custom orientation.",
      },
    },
  },
};

export const Interactive = {
  args: {
    src: "/icons/interactive-icon.svg",
    color: "primary",
    size: "medium",
    title: "Clickable Icon",
    onClick: () => console.log("Icon clicked!"),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive icon that becomes clickable when onClick prop is provided. Renders as a button element for accessibility.",
      },
    },
  },
};

export const LoadingState = {
  render: (args) => (
    <div className="flex gap-4 rounded-lg bg-gray-100 p-4">
      <IconComponent {...args} loader={true} title="Loading Icon" />
      <IconComponent {...args} loader={false} title="Loaded Icon" />
    </div>
  ),
  args: {
    src: "/icons/sample-icon.svg",
    color: "primary",
    size: "medium",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Loading state with animated skeleton placeholder. The loader prop controls whether to show loading state.",
      },
    },
  },
};

export const CustomDimensions = {
  render: (args) => (
    <div className="flex flex-col gap-4 rounded-lg bg-gray-100 p-4">
      <div className="flex items-center gap-2">
        <IconComponent {...args} width={20} height={20} title="20x20" />
        <span className="text-sm">20x20px</span>
      </div>
      <div className="flex items-center gap-2">
        <IconComponent {...args} width={40} height={40} title="40x40" />
        <span className="text-sm">40x40px</span>
      </div>
      <div className="flex items-center gap-2">
        <IconComponent {...args} width={60} height={30} title="60x30" />
        <span className="text-sm">60x30px (Rectangular)</span>
      </div>
    </div>
  ),
  args: {
    src: "/icons/sample-icon.svg",
    color: "secondary",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Custom dimensions using width and height props. Useful when predefined sizes don't meet your needs.",
      },
    },
  },
};

export const Playground = {
  args: {
    src: "/icons/sample-icon.svg",
    color: "primary",
    size: "medium",
    title: "Sample Icon",
    loader: true,
    rotate: 0,
    width: 24,
    height: 24,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground to test all IconComponent props. Try different combinations to see how the component behaves.",
      },
    },
  },
};
