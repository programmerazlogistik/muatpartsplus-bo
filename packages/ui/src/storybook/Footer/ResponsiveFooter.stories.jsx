import { ResponsiveFooter } from "@muatmuat/ui/Footer";

export default {
  title: "Components/Footer/ResponsiveFooter",
  component: ResponsiveFooter,
  parameters: {
    docs: {
      description: {
        component:
          "A responsive footer component that is fixed at the bottom of the screen with rounded corners and shadow effects. Designed for mobile-first layouts and includes proper positioning for Toaster components.",
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the footer",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
    children: {
      control: "text",
      description: "Content to render inside the footer",
      table: {
        type: { summary: "React.ReactNode" },
        defaultValue: { summary: "null" },
      },
    },
  },
};

export const Default = {
  args: {
    children: (
      <div className="flex items-center justify-between">
        <span className="text-sm text-neutral-700">© 2024 MuatMuat</span>
        <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
          Learn More
        </button>
      </div>
    ),
  },
};

export const WithNavigation = {
  args: {
    children: (
      <nav className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-900">
            Quick Links
          </span>
          <button className="text-sm text-primary-600 hover:text-primary-700">
            View All
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <a
            href="#"
            className="text-xs text-neutral-600 hover:text-neutral-900"
          >
            About
          </a>
          <a
            href="#"
            className="text-xs text-neutral-600 hover:text-neutral-900"
          >
            Contact
          </a>
          <a
            href="#"
            className="text-xs text-neutral-600 hover:text-neutral-900"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-xs text-neutral-600 hover:text-neutral-900"
          >
            Terms
          </a>
        </div>
      </nav>
    ),
  },
};

export const WithActions = {
  args: {
    children: (
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-neutral-500">Total Amount</span>
          <span className="text-lg font-semibold text-neutral-900">
            $125.00
          </span>
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg bg-neutral-200 px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-300">
            Cancel
          </button>
          <button className="rounded-lg bg-primary-600 px-3 py-2 text-sm font-medium text-white hover:bg-primary-700">
            Confirm
          </button>
        </div>
      </div>
    ),
  },
};

export const Minimal = {
  args: {
    children: (
      <div className="flex items-center justify-center">
        <span className="text-xs text-neutral-500">Loading...</span>
      </div>
    ),
  },
};

export const Playground = {
  args: {
    className: "",
    children: (
      <div className="flex items-center justify-between">
        <span className="text-sm text-neutral-700">Footer Content</span>
        <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
          Action
        </button>
      </div>
    ),
  },
  parameters: {
    docs: {
      storyDescription:
        "Interactive playground to test different footer configurations. Use the controls below to customize the component.",
    },
  },
};
