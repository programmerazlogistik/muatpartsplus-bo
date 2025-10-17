import { Button } from "@muatmuat/ui/Button";
import Dropdown, {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  SimpleDropdown,
  SimpleDropdownContent,
  SimpleDropdownItem,
  SimpleDropdownTrigger,
} from "@muatmuat/ui/Dropdown";
import { IconComponent } from "@muatmuat/ui/IconComponent";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    docs: {
      description: {
        component: `
A comprehensive dropdown component library built on Radix UI primitives, providing flexible menu systems with hover interactions, filter triggers, and simple dropdown patterns for the MuatMuat design system.

**Design System Category:** Navigation / Interactive Components

**When to Use:**
- Displaying contextual menus and action lists
- Creating filter dropdowns with multiple levels
- Building navigation menus with hover submenus
- Providing simple dropdown menus for basic actions
- Showing options that appear on click or hover

**Prerequisites:**
- Built on Radix UI Popover and DropdownMenu primitives
- Uses design system color tokens and spacing
- Supports both click and hover interactions
- Responsive design with proper positioning
- Accessibility features with keyboard navigation
        `,
      },
    },
  },
  argTypes: {
    trigger: {
      control: { type: "object" },
      description: "Trigger button configuration",
    },
    align: {
      control: { type: "select" },
      options: ["start", "center", "end"],
      description: "Dropdown alignment relative to trigger",
    },
    side: {
      control: { type: "select" },
      options: ["top", "right", "bottom", "left"],
      description: "Which side of the trigger to place the dropdown",
    },
  },
};

export const BasicDropdown = {
  render: () => (
    <Dropdown
      trigger={
        <Button variant="primary">
          <IconComponent name="chevron-down" className="ml-2 h-4 w-4" />
          Open Dropdown
        </Button>
      }
    >
      <DropdownMenuItem onClick={() => console.log("Profile")}>
        <IconComponent name="user" className="mr-2 h-4 w-4" />
        Profile
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => console.log("Settings")}>
        <IconComponent name="settings" className="mr-2 h-4 w-4" />
        Settings
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => console.log("Logout")}>
        <IconComponent name="log-out" className="mr-2 h-4 w-4" />
        Logout
      </DropdownMenuItem>
    </Dropdown>
  ),
  parameters: {
    docs: {
      description: {
        story: "Basic dropdown menu with icons and actions.",
      },
    },
  },
};

export const FilterDropdown = {
  render: () => (
    <div className="space-y-4">
      <Dropdown
        trigger={
          <Button variant="secondary">
            <IconComponent name="filter" className="mr-2 h-4 w-4" />
            Filter by Status
          </Button>
        }
        align="start"
      >
        <DropdownMenuItem onClick={() => console.log("All")}>
          All Status
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("Active")}>
          <div className="mr-2 h-2 w-2 rounded-full bg-green-500" />
          Active
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("Pending")}>
          <div className="mr-2 h-2 w-2 rounded-full bg-yellow-500" />
          Pending
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("Inactive")}>
          <div className="mr-2 h-2 w-2 rounded-full bg-gray-500" />
          Inactive
        </DropdownMenuItem>
      </Dropdown>

      <Dropdown
        trigger={
          <Button variant="secondary">
            <IconComponent name="calendar" className="mr-2 h-4 w-4" />
            Date Range
          </Button>
        }
        align="start"
      >
        <DropdownMenuItem onClick={() => console.log("Today")}>
          Today
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("This Week")}>
          This Week
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("This Month")}>
          This Month
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("Custom")}>
          Custom Range
        </DropdownMenuItem>
      </Dropdown>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Dropdown menus used for filtering with visual indicators.",
      },
    },
  },
};

export const SimpleDropdownDemo = {
  render: () => (
    <SimpleDropdown>
      <SimpleDropdownTrigger asChild>
        <Button variant="outline">Simple Menu</Button>
      </SimpleDropdownTrigger>
      <SimpleDropdownContent>
        <SimpleDropdownItem onClick={() => console.log("View")}>
          View Details
        </SimpleDropdownItem>
        <SimpleDropdownItem onClick={() => console.log("Edit")}>
          Edit Item
        </SimpleDropdownItem>
        <SimpleDropdownItem onClick={() => console.log("Delete")}>
          Delete Item
        </SimpleDropdownItem>
      </SimpleDropdownContent>
    </SimpleDropdown>
  ),
  parameters: {
    docs: {
      description: {
        story: "Simple dropdown components for basic use cases.",
      },
    },
  },
};

export const NavigationMenu = {
  render: () => (
    <div className="flex space-x-4">
      <Dropdown
        trigger={
          <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
            Products
            <IconComponent name="chevron-down" className="ml-1 h-4 w-4" />
          </Button>
        }
        align="start"
      >
        <DropdownMenuItem onClick={() => console.log("Electronics")}>
          Electronics
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("Clothing")}>
          Clothing
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("Books")}>
          Books
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("Home")}>
          Home & Garden
        </DropdownMenuItem>
      </Dropdown>

      <Dropdown
        trigger={
          <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
            Support
            <IconComponent name="chevron-down" className="ml-1 h-4 w-4" />
          </Button>
        }
        align="start"
      >
        <DropdownMenuItem onClick={() => console.log("Help Center")}>
          Help Center
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("Contact")}>
          Contact Us
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("FAQ")}>
          FAQ
        </DropdownMenuItem>
      </Dropdown>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Navigation-style dropdown menus for site navigation.",
      },
    },
  },
};

export const UserMenu = {
  render: () => (
    <Dropdown
      trigger={
        <Button variant="ghost" className="p-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 font-semibold text-white">
            JD
          </div>
        </Button>
      }
      align="end"
      side="bottom"
    >
      <div className="border-b px-4 py-2">
        <p className="font-semibold">John Doe</p>
        <p className="text-sm text-gray-600">john.doe@example.com</p>
      </div>
      <DropdownMenuItem onClick={() => console.log("Profile")}>
        <IconComponent name="user" className="mr-2 h-4 w-4" />
        My Profile
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => console.log("Account")}>
        <IconComponent name="settings" className="mr-2 h-4 w-4" />
        Account Settings
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => console.log("Billing")}>
        <IconComponent name="credit-card" className="mr-2 h-4 w-4" />
        Billing
      </DropdownMenuItem>
      <div className="my-1 border-t" />
      <DropdownMenuItem onClick={() => console.log("Logout")}>
        <IconComponent name="log-out" className="mr-2 h-4 w-4" />
        Sign Out
      </DropdownMenuItem>
    </Dropdown>
  ),
  parameters: {
    docs: {
      description: {
        story: "User account dropdown with profile information.",
      },
    },
  },
};

export const ActionsMenu = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div>
          <h3 className="font-semibold">Project Documentation</h3>
          <p className="text-sm text-gray-600">Last updated 2 hours ago</p>
        </div>
        <Dropdown
          trigger={
            <Button variant="ghost" size="sm">
              <IconComponent name="more-horizontal" className="h-4 w-4" />
            </Button>
          }
          align="end"
        >
          <DropdownMenuItem onClick={() => console.log("View")}>
            <IconComponent name="eye" className="mr-2 h-4 w-4" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Edit")}>
            <IconComponent name="edit" className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Download")}>
            <IconComponent name="download" className="mr-2 h-4 w-4" />
            Download
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Share")}>
            <IconComponent name="share" className="mr-2 h-4 w-4" />
            Share
          </DropdownMenuItem>
          <div className="my-1 border-t" />
          <DropdownMenuItem onClick={() => console.log("Delete")}>
            <IconComponent name="trash-2" className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </Dropdown>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Actions menu for item operations.",
      },
    },
  },
};

export const DisabledStates = {
  render: () => (
    <div className="space-y-4">
      <Dropdown
        trigger={
          <Button variant="primary" disabled>
            Disabled Trigger
          </Button>
        }
      >
        <DropdownMenuItem>This won't open</DropdownMenuItem>
      </Dropdown>

      <SimpleDropdown>
        <SimpleDropdownTrigger asChild>
          <Button variant="outline" disabled>
            Disabled Simple
          </Button>
        </SimpleDropdownTrigger>
        <SimpleDropdownContent>
          <SimpleDropdownItem>Item 1</SimpleDropdownItem>
          <SimpleDropdownItem>Item 2</SimpleDropdownItem>
        </SimpleDropdownContent>
      </SimpleDropdown>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Dropdown components in disabled states.",
      },
    },
  },
};

export const Playground = {
  args: {
    align: "start",
    side: "bottom",
  },
  render: (args) => (
    <Dropdown
      trigger={
        <Button variant="primary">
          <IconComponent name="chevron-down" className="ml-2 h-4 w-4" />
          Custom Dropdown
        </Button>
      }
      align={args.align}
      side={args.side}
    >
      <DropdownMenuItem onClick={() => console.log("Action 1")}>
        Action 1
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => console.log("Action 2")}>
        Action 2
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => console.log("Action 3")}>
        Action 3
      </DropdownMenuItem>
    </Dropdown>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to test dropdown configurations.",
      },
    },
  },
};
