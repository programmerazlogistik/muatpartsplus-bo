import { TimelineContainer, TimelineItem } from "@muatmuat/ui/Timeline";

export default {
  title: "Components/Timeline",
  component: TimelineContainer,
  parameters: {
    docs: {
      description: {
        component:
          "Timeline components for displaying sequential events, progress indicators, and status tracking in logistics and transportation applications.",
      },
    },
  },
  argTypes: {
    children: {
      control: false,
      description: "Timeline items to be rendered inside the container",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for styling",
    },
  },
};

export const Default = {
  render: (args) => (
    <TimelineContainer className="max-w-md">
      <TimelineItem
        variant="bullet"
        index={0}
        activeIndex={1}
        title="Order Created"
        timestamp="2024-01-15T10:30:00Z"
        isLast={false}
        {...args}
      />
      <TimelineItem
        variant="bullet"
        index={1}
        activeIndex={1}
        title="Driver Assigned"
        timestamp="2024-01-15T11:45:00Z"
        isLast={false}
        {...args}
      />
      <TimelineItem
        variant="bullet"
        index={2}
        activeIndex={1}
        title="Pickup Completed"
        timestamp="2024-01-15T14:20:00Z"
        isLast={true}
        {...args}
      />
    </TimelineContainer>
  ),
  args: {
    variant: "bullet",
    activeIndex: 1,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Basic timeline showing order processing stages with active item highlighting.",
      },
    },
  },
};

export const DriverStatus = {
  render: (args) => (
    <TimelineContainer className="max-w-md">
      <TimelineItem
        variant="bullet-driver-status"
        index={0}
        activeIndex={2}
        title="Sudah Menuju Lokasi Muat"
        timestamp="2024-01-15T08:00:00Z"
        isLast={false}
        {...args}
      />
      <TimelineItem
        variant="bullet-driver-status"
        index={1}
        activeIndex={2}
        title="Sedang Muat Barang"
        timestamp="2024-01-15T09:30:00Z"
        isLast={false}
        {...args}
      />
      <TimelineItem
        variant="bullet-driver-status"
        index={2}
        activeIndex={2}
        title="Selesai Muat Barang"
        timestamp="2024-01-15T10:45:00Z"
        isLast={true}
        {...args}
      />
    </TimelineContainer>
  ),
  args: {
    variant: "bullet-driver-status",
    activeIndex: 2,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Driver status timeline showing current active state and previous completed stages.",
      },
    },
  },
};

export const NumberedVariants = {
  render: (args) => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 font-semibold">Muat Locations</h3>
        <TimelineContainer className="max-w-md">
          <TimelineItem
            variant="number-muat"
            index={0}
            activeIndex={0}
            title="Warehouse A - Jakarta"
            timestamp="2024-01-15T08:00:00Z"
            isLast={false}
            {...args}
          />
          <TimelineItem
            variant="number-muat"
            index={1}
            activeIndex={0}
            title="Warehouse B - Surabaya"
            timestamp="2024-01-15T10:00:00Z"
            isLast={true}
            {...args}
          />
        </TimelineContainer>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">Bongkar Locations</h3>
        <TimelineContainer className="max-w-md">
          <TimelineItem
            variant="number-bongkar"
            index={0}
            activeIndex={0}
            title="Distribution Center X"
            timestamp="2024-01-15T14:00:00Z"
            isLast={false}
            {...args}
          />
          <TimelineItem
            variant="number-bongkar"
            index={1}
            activeIndex={0}
            title="Customer Location Y"
            timestamp="2024-01-15T16:00:00Z"
            isLast={true}
            {...args}
          />
        </TimelineContainer>
      </div>
    </div>
  ),
  args: {
    activeIndex: 0,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Numbered timeline variants for pickup (muat) and drop-off (bongkar) locations with sequence numbers.",
      },
    },
  },
};

export const WithButtons = {
  render: (args) => (
    <TimelineContainer className="max-w-md">
      <TimelineItem
        variant="bullet-driver-status"
        index={0}
        activeIndex={1}
        title="Sedang Muat Barang"
        timestamp="2024-01-15T09:30:00Z"
        isLast={false}
        buttonDetail={
          <button className="text-sm text-blue-600 hover:text-blue-800">
            Lihat Bukti Muat
          </button>
        }
        {...args}
      />
      <TimelineItem
        variant="bullet-driver-status"
        index={1}
        activeIndex={1}
        title="Selesai Muat Barang"
        timestamp="2024-01-15T10:45:00Z"
        isLast={true}
        buttonDetail={
          <button className="text-sm text-blue-600 hover:text-blue-800">
            Lihat Bukti Muat
          </button>
        }
        {...args}
      />
    </TimelineContainer>
  ),
  args: {
    variant: "bullet-driver-status",
    activeIndex: 1,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Timeline items with action buttons for viewing proof of completion.",
      },
    },
  },
};

export const CustomStyling = {
  render: (args) => (
    <TimelineContainer className="max-w-md">
      <TimelineItem
        variant="bullet-yellow"
        index={0}
        activeIndex={1}
        title="Emergency Alert"
        timestamp="2024-01-15T12:00:00Z"
        isLast={false}
        appearance={{
          titleClassname: "font-bold text-yellow-800",
          timestampClassname: "text-yellow-600",
        }}
        {...args}
      />
      <TimelineItem
        variant="bullet-brown"
        index={1}
        activeIndex={1}
        title="Issue Resolved"
        timestamp="2024-01-15T13:30:00Z"
        isLast={true}
        appearance={{
          titleClassname: "font-bold text-amber-800",
          timestampClassname: "text-amber-600",
        }}
        {...args}
      />
    </TimelineContainer>
  ),
  args: {
    activeIndex: 1,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Custom colored timeline items for different status types (emergency alerts, resolved issues).",
      },
    },
  },
};

export const Playground = {
  render: (args) => (
    <TimelineContainer className="max-w-md">
      <TimelineItem
        variant={args.variant}
        index={args.index}
        activeIndex={args.activeIndex}
        title={args.title}
        timestamp={args.timestamp}
        isLast={args.isLast}
        onClick={args.onClick}
        appearance={args.appearance}
        buttonDetail={args.buttonDetail}
        withDivider={args.withDivider}
      />
      <TimelineItem
        variant={args.variant}
        index={args.index + 1}
        activeIndex={args.activeIndex}
        title={`${args.title} - Next`}
        timestamp={new Date(
          new Date(args.timestamp).getTime() + 3600000
        ).toISOString()}
        isLast={true}
        onClick={args.onClick}
        appearance={args.appearance}
        buttonDetail={args.buttonDetail}
        withDivider={args.withDivider}
      />
    </TimelineContainer>
  ),
  args: {
    variant: "bullet",
    index: 0,
    activeIndex: 0,
    title: "Timeline Item",
    timestamp: new Date().toISOString(),
    isLast: false,
    onClick: () => console.log("Timeline item clicked"),
    appearance: {
      contentClassname: "",
      titleClassname: "",
      timestampClassname: "",
    },
    buttonDetail: null,
    withDivider: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "bullet",
        "bullet-driver-status",
        "bullet-yellow",
        "bullet-brown",
        "number-muat",
        "number-bongkar",
        "field-muat",
        "field-bongkar",
      ],
      description: "Timeline variant type",
    },
    index: {
      control: "number",
      description: "Item index in the timeline",
    },
    activeIndex: {
      control: "number",
      description: "Currently active timeline item index",
    },
    title: {
      control: "text",
      description: "Item title text",
    },
    timestamp: {
      control: "text",
      description: "Timestamp for the item",
    },
    isLast: {
      control: "boolean",
      description: "Whether this is the last item",
    },
    onClick: {
      action: "clicked",
      description: "Click handler for the item",
    },
    appearance: {
      control: "object",
      description: "Appearance customization",
    },
    buttonDetail: {
      control: false,
      description: "Detail button component",
    },
    withDivider: {
      control: "boolean",
      description: "Whether to show divider after the item",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground to test all timeline item variants and properties.",
      },
    },
  },
};
