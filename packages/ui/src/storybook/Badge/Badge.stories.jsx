import {
  BadgeSOSPopover,
  BadgeStatus,
  BadgeStatusPesanan,
  TagBubble,
} from "@muatmuat/ui/Badge";

/**
 * @typedef {import('./badge.d.ts').BadgeStatusProps} BadgeStatusProps
 * @typedef {import('./badge.d.ts').BadgeStatusPesananProps} BadgeStatusPesananProps
 * @typedef {import('./badge.d.ts').TagBubbleProps} TagBubbleProps
 * @typedef {import('./badge.d.ts').BadgeSOSPopoverProps} BadgeSOSPopoverProps
 * @typedef {import('./badge.d.ts').SOSIncidentData} SOSIncidentData
 * @typedef {import('./badge.d.ts').BadgeStatusVariant} BadgeStatusVariant
 * @typedef {import('./badge.d.ts').BadgeStatusPesananVariant} BadgeStatusPesananVariant
 */

export default {
  title: "Components/Badge",
  parameters: {
    docs: {
      description: {
        component: `
## Badge Component System

The Badge component system provides a comprehensive set of badge-style UI elements for displaying status, information, and interactive tags across the MuatMuat applications.

**Design System Category:** Data Display | Feedback | Status Indicators

**Components Included:**
- **BadgeStatus** - Simple status badges with color variants
- **BadgeStatusPesanan** - Order status badges with optional icons
- **TagBubble** - Interactive, removable tag bubbles
- **BadgeSOSPopover** - Complex popover for SOS incident alerts

**When to Use:**
- **BadgeStatus**: Use for general status indicators, labels, and categorization
- **BadgeStatusPesanan**: Use specifically for order/purchase status with optional icons
- **TagBubble**: Use for filter tags, selected items, or removable elements
- **BadgeSOSPopover**: Use for emergency/incident alerts that require detailed information display

**Accessibility:** All components are WCAG 2.1 AA compliant with proper ARIA labels, keyboard navigation, and screen reader support.
        `,
      },
    },
  },
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes for custom styling",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
    children: {
      control: "text",
      description: "Content to display inside the badge",
      table: {
        type: { summary: "React.ReactNode" },
        category: "Content",
      },
    },
  },
  args: {
    children: "Badge",
  },
};

// ============================================================================
// BadgeStatus Component Stories
// ============================================================================

export const BadgeStatusDefault = {
  name: "BadgeStatus - Default",
  render: (args) => <BadgeStatus {...args} />,
  parameters: {
    docs: {
      description: {
        story: "Default BadgeStatus component with neutral variant.",
      },
    },
  },
};

export const BadgeStatusVariants = {
  name: "BadgeStatus - All Variants",
  render: () => (
    <div className="flex flex-wrap gap-4 p-4">
      <BadgeStatus variant="primary">Primary</BadgeStatus>
      <BadgeStatus variant="success">Success</BadgeStatus>
      <BadgeStatus variant="warning">Warning</BadgeStatus>
      <BadgeStatus variant="error">Error</BadgeStatus>
      <BadgeStatus variant="neutral">Neutral</BadgeStatus>
      <BadgeStatus variant="outlineSecondary">Outline</BadgeStatus>
      <BadgeStatus variant="outlineWarning">Outline Warning</BadgeStatus>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All available BadgeStatus variants displayed side by side for comparison.",
      },
    },
  },
};

export const BadgeStatusPlayground = {
  name: "BadgeStatus - Playground",
  args: {
    variant: "primary",
    children: "Custom Badge Status",
  },
  render: (args) => <BadgeStatus {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground for experimenting with BadgeStatus properties.",
      },
    },
  },
};

// ============================================================================
// BadgeStatusPesanan Component Stories
// ============================================================================

export const BadgeStatusPesananDefault = {
  name: "BadgeStatusPesanan - Default",
  render: (args) => <BadgeStatusPesanan {...args} />,
  args: {
    variant: "primary",
    icon: { iconLeft: "" },
    children: "Order Status",
  },
  parameters: {
    docs: {
      description: {
        story: "Default BadgeStatusPesanan component with primary variant.",
      },
    },
  },
};

export const BadgeStatusPesananVariants = {
  name: "BadgeStatusPesanan - All Variants",
  render: () => (
    <div className="flex flex-wrap gap-4 p-4">
      <BadgeStatusPesanan variant="primary">Primary</BadgeStatusPesanan>
      <BadgeStatusPesanan variant="secondary">Secondary</BadgeStatusPesanan>
      <BadgeStatusPesanan variant="success">Success</BadgeStatusPesanan>
      <BadgeStatusPesanan variant="warning">Warning</BadgeStatusPesanan>
      <BadgeStatusPesanan variant="error">Error</BadgeStatusPesanan>
      <BadgeStatusPesanan variant="muted">Muted</BadgeStatusPesanan>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All available BadgeStatusPesanan variants displayed side by side.",
      },
    },
  },
};

export const BadgeStatusPesananPlayground = {
  name: "BadgeStatusPesanan - Playground",
  args: {
    variant: "primary",
    icon: { iconLeft: "/icons/star.svg" },
    children: "Custom Order Status",
  },
  render: (args) => <BadgeStatusPesanan {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground for experimenting with BadgeStatusPesanan properties.",
      },
    },
  },
};

// ============================================================================
// TagBubble Component Stories
// ============================================================================

export const TagBubbleDefault = {
  name: "TagBubble - Default",
  render: (args) => <TagBubble {...args} />,
  args: {
    disabled: false,
    withRemove: null,
    children: "Tag",
  },
  parameters: {
    docs: {
      description: {
        story: "Default TagBubble component without remove functionality.",
      },
    },
  },
};

export const TagBubbleWithRemove = {
  name: "TagBubble - With Remove",
  render: (args) => (
    <TagBubble
      {...args}
      withRemove={{
        onRemove: () => console.log("Tag removed"),
      }}
    />
  ),
  args: {
    children: "Removable Tag",
  },
  parameters: {
    docs: {
      description: {
        story: "TagBubble component with remove button functionality.",
      },
    },
  },
};

export const TagBubbleStates = {
  name: "TagBubble - Different States",
  render: () => (
    <div className="flex flex-wrap gap-4 p-4">
      <TagBubble>Normal Tag</TagBubble>
      <TagBubble withRemove={{ onRemove: () => {} }}>Removable Tag</TagBubble>
      <TagBubble disabled>Disabled Tag</TagBubble>
      <TagBubble disabled withRemove={{ onRemove: () => {} }}>
        Disabled Removable
      </TagBubble>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "TagBubble components demonstrating different states (normal, removable, disabled).",
      },
    },
  },
};

export const TagBubblePlayground = {
  name: "TagBubble - Playground",
  args: {
    disabled: false,
    withRemove: { onRemove: () => console.log("Tag removed from playground") },
    children: "Custom Tag",
  },
  render: (args) => <TagBubble {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground for experimenting with TagBubble properties.",
      },
    },
  },
};

// ============================================================================
// BadgeSOSPopover Component Stories
// ============================================================================

const sampleSOSData = {
  truckIcon: "/icons/armada-truck/truck-blue.png",
  licensePlate: "B 1234 ABC",
  category: "Engine Failure",
  description: "Truck engine suddenly stopped while in transit",
  images: ["/incident1.jpg", "/incident2.jpg"],
  reportTime: "2024-01-15 14:30:00",
  vehicleType: "Colt Diesel Engkel",
  driverName: "Ahmad Wijaya",
  driverPhone: "+62 812-3456-7890",
  lastLocation: "Jl. Sudirman No. 123, Jakarta",
  orderNumber: "ORD-2024-001234",
  pickupLocation: "Warehouse A, Jakarta",
  dropoffLocation: "Customer B, Surabaya",
};

export const BadgeSOSPopoverDefault = {
  name: "BadgeSOSPopover - Default",
  render: (args) => <BadgeSOSPopover {...args} />,
  args: {
    data: sampleSOSData,
    onClose: () => {},
    getStatusPesananMetadata: () => ({ variant: "primary", label: "Loading" }),
    footer: (
      <div className="flex gap-2">
        <button className="flex-1 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white">
          Contact Driver
        </button>
        <button className="flex-1 rounded-lg bg-error-400 px-4 py-2 text-sm font-medium text-white">
          Escalate
        </button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default BadgeSOSPopover component with sample SOS incident data.",
      },
    },
  },
};

// ============================================================================
// Real-world Usage Examples
// ============================================================================

export const OrderStatusDashboard = {
  name: "Real-world - Order Status Dashboard",
  render: () => (
    <div className="rounded-lg bg-gray-50 p-6">
      <h3 className="mb-4 text-lg font-semibold">Order Management Dashboard</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border bg-white p-4">
          <div>
            <p className="font-medium">Order #ORD-001</p>
            <p className="text-sm text-gray-600">
              Electronics Warehouse → Jakarta
            </p>
          </div>
          <BadgeStatusPesanan
            variant="success"
            icon={{ iconLeft: "/icons/check.svg" }}
          >
            Completed
          </BadgeStatusPesanan>
        </div>
        <div className="flex items-center justify-between rounded-lg border bg-white p-4">
          <div>
            <p className="font-medium">Order #ORD-002</p>
            <p className="text-sm text-gray-600">Textile Factory → Surabaya</p>
          </div>
          <BadgeStatusPesanan
            variant="warning"
            icon={{ iconLeft: "/icons/clock.svg" }}
          >
            In Transit
          </BadgeStatusPesanan>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Real-world usage example showing BadgeStatusPesanan in an order management dashboard.",
      },
    },
  },
};

export const FilterTagsExample = {
  name: "Real-world - Filter Tags",
  render: () => (
    <div className="rounded-lg bg-gray-50 p-6">
      <h3 className="mb-4 text-lg font-semibold">Product Filters</h3>
      <div className="mb-4">
        <p className="mb-2 text-sm font-medium">Active Filters:</p>
        <div className="flex flex-wrap gap-2">
          <TagBubble withRemove={{ onRemove: () => {} }}>
            Category: Electronics
          </TagBubble>
          <TagBubble withRemove={{ onRemove: () => {} }}>
            Price: $100-$500
          </TagBubble>
          <TagBubble withRemove={{ onRemove: () => {} }}>
            Rating: 4+ Stars
          </TagBubble>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Real-world usage example showing TagBubble components in a filtering interface.",
      },
    },
  },
};

export const SystemStatusBoard = {
  name: "Real-world - System Status Board",
  render: () => (
    <div className="rounded-lg bg-gray-50 p-6">
      <h3 className="mb-4 text-lg font-semibold">System Status Monitor</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-white p-4">
          <h4 className="mb-2 font-medium">Database</h4>
          <BadgeStatus variant="success">Online</BadgeStatus>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <h4 className="mb-2 font-medium">API Gateway</h4>
          <BadgeStatus variant="success">Operational</BadgeStatus>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <h4 className="mb-2 font-medium">Payment Service</h4>
          <BadgeStatus variant="warning">Maintenance</BadgeStatus>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Real-world usage example showing BadgeStatus components in a system monitoring dashboard.",
      },
    },
  },
};
