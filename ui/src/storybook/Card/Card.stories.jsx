import { Card, CardContent, CardFooter, CardHeader, ListContent } from "@muatmuat/ui/Card";

export default {
  title: "Components/Card",
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          "A versatile card component system with header, content, and footer sections. " +
          "Cards are container components that group related information and actions. " +
          "Use cards to organize content in a clean, scannable format with clear visual hierarchy.",
      },
    },
  },
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the card",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    keys: {
      control: "text",
      description: "React key prop for list rendering optimization",
      table: {
        type: { summary: "string | number" },
        defaultValue: { summary: "undefined" },
      },
    },
    children: {
      control: false,
      description: "Content to be rendered inside the card",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
  },
};

// Basic Card Stories
export const Default = {
  args: {
    children: "This is a basic card with default styling",
  },
};

export const BasicCard = {
  render: () => (
    <Card>
      <p className="p-4">This is a simple card with some content inside.</p>
    </Card>
  ),
};

export const WithCustomClass = {
  args: {
    className: "max-w-md mx-auto shadow-lg",
    children: "Card with custom styling classes",
  },
};

// Card with Header, Content, Footer
export const CompleteCard = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <h2 className="text-lg font-semibold">Order #12345</h2>
        <p className="text-sm text-neutral-600">Status: In Progress</p>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm">
          Your shipment is currently being processed and will be ready for
          pickup soon.
        </p>
        <div className="flex justify-between text-xs">
          <span>Origin: Jakarta</span>
          <span>Destination: Surabaya</span>
        </div>
      </CardContent>
      <CardFooter>
        <button className="bg-primary-500 rounded px-4 py-2 text-sm text-white">
          Track Order
        </button>
        <button className="ml-2 rounded border border-neutral-300 px-4 py-2 text-sm">
          Contact Support
        </button>
      </CardFooter>
    </Card>
  ),
};

export const HeaderOnly = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <h3 className="text-base font-semibold">Document Upload</h3>
        <p className="text-xs text-neutral-600">
          Upload required shipping documents
        </p>
      </CardHeader>
    </Card>
  ),
};

export const ContentOnly = {
  render: () => (
    <Card className="max-w-md">
      <CardContent>
        <h4 className="mb-2 font-medium">Shipment Details</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-600">Weight:</span>
            <span className="font-medium">2.5 tons</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Distance:</span>
            <span className="font-medium">450 km</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Estimated Time:</span>
            <span className="font-medium">8 hours</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const FooterOnly = {
  render: () => (
    <Card className="max-w-md">
      <CardFooter>
        <div className="flex w-full items-center justify-between">
          <span className="text-sm font-medium">Total: Rp 2,500,000</span>
          <button className="bg-success-500 rounded px-6 py-2 text-sm text-white">
            Confirm Order
          </button>
        </div>
      </CardFooter>
    </Card>
  ),
};

// ListContent Component Stories
export const WithListContent = {
  render: () => (
    <Card className="max-w-md">
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <ListContent
            icon="/icons/map-pin24.svg"
            title="Origin"
            value="Jakarta Pusat"
          />
          <ListContent
            icon="/icons/map-pin24.svg"
            title="Destination"
            value="Surabaya"
          />
          <ListContent
            icon="/icons/box16.svg"
            title="Weight"
            value="2.5 tons"
          />
          <ListContent
            icon="/icons/24-hours.svg"
            title="Duration"
            value="8 hours"
          />
        </div>
      </CardContent>
    </Card>
  ),
};

export const ListContentVariants = {
  render: () => (
    <div className="space-y-4">
      <Card className="max-w-sm">
        <CardContent>
          <ListContent
            icon="/icons/transporter16.svg"
            title="Transporter"
            value="PT Angkutan Jaya"
          />
        </CardContent>
      </Card>

      <Card className="max-w-sm">
        <CardContent>
          <ListContent
            icon="/icons/profile16.svg"
            title="Driver"
            value="Ahmad Subagyo"
            className="border-primary-400 border-l-4 pl-3"
          />
        </CardContent>
      </Card>

      <Card className="max-w-sm">
        <CardContent>
          <ListContent
            icon="/icons/contact.svg"
            title="Phone"
            value="+62 812-3456-7890"
            className="rounded bg-neutral-50 p-3"
          />
        </CardContent>
      </Card>
    </div>
  ),
};

// Real-world Examples
export const ShipmentCard = {
  render: () => (
    <Card className="max-w-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-bold">Shipment #SH-001234</h3>
            <p className="text-xs text-neutral-600">
              Created on March 15, 2024
            </p>
          </div>
          <span className="bg-warning-100 text-warning-800 rounded px-2 py-1 text-xs font-medium">
            In Transit
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <ListContent
            icon="/icons/map-pin24.svg"
            title="From"
            value="Jakarta Warehouse"
          />
          <ListContent
            icon="/icons/map-pin24.svg"
            title="To"
            value="Surabaya Distribution Center"
          />
          <ListContent
            icon="/icons/box16.svg"
            title="Cargo"
            value="Electronics (50 boxes)"
          />
          <ListContent
            icon="/icons/24-hours.svg"
            title="ETA"
            value="March 16, 2024 14:00"
          />
        </div>
        <div className="border-t border-neutral-200 pt-3">
          <div className="flex justify-between text-xs">
            <span className="text-neutral-600">Progress</span>
            <span className="font-medium">65%</span>
          </div>
          <div className="mt-1 h-2 w-full rounded-full bg-neutral-200">
            <div
              className="bg-primary-500 h-2 rounded-full"
              style={{ width: "65%" }}
            ></div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-between">
          <button className="rounded border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-50">
            View Details
          </button>
          <button className="bg-primary-500 hover:bg-primary-600 rounded px-4 py-2 text-sm text-white">
            Track Live
          </button>
        </div>
      </CardFooter>
    </Card>
  ),
};

export const FleetStatusCard = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-success-100 flex h-8 w-8 items-center justify-center rounded-full">
              <img
                src="/icons/transporter16.svg"
                alt="truck"
                className="h-4 w-4"
              />
            </div>
            <span className="font-bold">B 1234 XYZ</span>
          </div>
          <span className="bg-success-100 text-success-800 rounded px-2 py-1 text-xs font-medium">
            Active
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <ListContent
            icon="/icons/profile16.svg"
            title="Driver"
            value="Budi Santoso"
          />
          <ListContent
            icon="/icons/map-pin24.svg"
            title="Current Location"
            value="Tol Jakarta-Cikampek KM 25"
          />
          <ListContent
            icon="/icons/contact.svg"
            title="Contact"
            value="+62 812-9876-5432"
          />
        </div>
      </CardContent>
      <CardFooter>
        <button className="bg-primary-500 hover:bg-primary-600 w-full rounded py-2 text-sm text-white">
          Contact Driver
        </button>
      </CardFooter>
    </Card>
  ),
};

// Playground Story for Interactive Testing
export const Playground = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <h3 className="font-semibold">Interactive Card</h3>
        <p className="text-sm text-neutral-600">
          Customize this card using the controls panel
        </p>
      </CardHeader>
      <CardContent>
        <p className="mb-3 text-sm">
          This is an interactive playground where you can test different card
          configurations.
        </p>
        <ListContent
          icon="/icons/box16.svg"
          title="Sample Data"
          value="Interactive Content"
        />
      </CardContent>
      <CardFooter>
        <button className="bg-primary-500 rounded px-4 py-2 text-sm text-white">
          Action Button
        </button>
      </CardFooter>
    </Card>
  ),
  args: {
    className: "max-w-md",
  },
};
