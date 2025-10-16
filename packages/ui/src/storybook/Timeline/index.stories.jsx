import {
  TimelineChangeRow,
  TimelineContainer,
  TimelineItem,
  TimelinePICData,
} from "@muatmuat/ui/Timeline";

export default {
  title: "Components/Timeline",
  component: TimelineContainer,
  parameters: {
    docs: {
      description: {
        component:
          "Timeline components for displaying sequential events, progress indicators, and location-based data visualization in logistics and transportation applications.",
      },
    },
  },
};

export const DefaultTimeline = {
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
};

export const NumberedTimeline = {
  render: (args) => (
    <TimelineContainer className="max-w-md">
      <TimelineItem
        variant="number-muat"
        index={0}
        activeIndex={0}
        title="Lokasi Muat 1"
        timestamp="2024-01-15T10:30:00Z"
        isLast={false}
        {...args}
      />
      <TimelineItem
        variant="number-bongkar"
        index={1}
        activeIndex={0}
        title="Lokasi Bongkar 1"
        timestamp="2024-01-15T14:20:00Z"
        isLast={true}
        {...args}
      />
    </TimelineContainer>
  ),
  args: {
    variant: "number-muat",
  },
};

export const PICDataTimeline = {
  render: (args) => (
    <TimelineContainer className="max-w-lg">
      <TimelinePICData
        variant="bullet"
        index={0}
        activeIndex={1}
        title="Pickup Location"
        isLast={false}
        data={{
          address: "Jl. Sudirman No. 123, Jakarta Pusat",
          details: "Gedung A, Lantai 3",
          picName: "Ahmad Wijaya",
          picPhone: "0812-3456-7890",
        }}
        {...args}
      />
      <TimelinePICData
        variant="bullet"
        index={1}
        activeIndex={1}
        title="Dropoff Location"
        isLast={true}
        data={{
          address: "Jl. Gatot Subroto No. 456, Jakarta Selatan",
          details: "Depan Mall Taman Anggrek",
          picName: "Siti Nurhaliza",
          picPhone: "0821-9876-5432",
        }}
        {...args}
      />
    </TimelineContainer>
  ),
  args: {
    variant: "bullet",
  },
};

export const RouteChangeTimeline = {
  render: (args) => (
    <div className="max-w-2xl">
      <TimelineChangeRow
        before={{
          sequence: 1,
          fullAddress: "Jl. Sudirman No. 123, Jakarta Pusat",
        }}
        after={{
          sequence: 1,
          fullAddress: "Jl. Thamrin No. 789, Jakarta Pusat",
        }}
        type="pickup"
        isLast={false}
        isLastInGroup={false}
        showPickupHeader={true}
        {...args}
      />
      <TimelineChangeRow
        before={{
          sequence: 2,
          fullAddress: "Jl. Gatot Subroto No. 456, Jakarta Selatan",
        }}
        after={{
          sequence: 2,
          fullAddress: "Jl. Sudirman No. 500, Jakarta Pusat",
        }}
        type="bongkar"
        isLast={true}
        isLastInGroup={true}
        showDropoffHeader={true}
        {...args}
      />
    </div>
  ),
  args: {
    type: "pickup",
  },
};

export const InteractiveTimeline = {
  render: (args) => (
    <TimelineContainer className="max-w-md">
      <TimelineItem
        variant="bullet"
        index={0}
        activeIndex={args.activeIndex}
        title="Order Placed"
        timestamp="2024-01-15T10:30:00Z"
        isLast={false}
        onClick={() => console.log("Item clicked")}
        {...args}
      />
      <TimelineItem
        variant="bullet"
        index={1}
        activeIndex={args.activeIndex}
        title="Driver Assigned"
        timestamp="2024-01-15T11:45:00Z"
        isLast={false}
        onClick={() => console.log("Item clicked")}
        {...args}
      />
      <TimelineItem
        variant="bullet"
        index={2}
        activeIndex={args.activeIndex}
        title="In Transit"
        timestamp="2024-01-15T13:00:00Z"
        isLast={false}
        onClick={() => console.log("Item clicked")}
        {...args}
      />
      <TimelineItem
        variant="bullet"
        index={3}
        activeIndex={args.activeIndex}
        title="Delivered"
        timestamp="2024-01-15T15:30:00Z"
        isLast={true}
        onClick={() => console.log("Item clicked")}
        {...args}
      />
    </TimelineContainer>
  ),
  args: {
    variant: "bullet",
    activeIndex: 2,
  },
  argTypes: {
    activeIndex: {
      control: { type: "range", min: 0, max: 3 },
      description: "Index of the currently active timeline item",
    },
  },
};

export const CustomVariants = {
  render: (args) => (
    <TimelineContainer className="max-w-md">
      <TimelineItem
        variant="bullet-yellow"
        index={0}
        activeIndex={0}
        title="Warning Status"
        timestamp="2024-01-15T10:30:00Z"
        isLast={false}
        {...args}
      />
      <TimelineItem
        variant="bullet-brown"
        index={1}
        activeIndex={0}
        title="Completed Status"
        timestamp="2024-01-15T14:20:00Z"
        isLast={true}
        {...args}
      />
    </TimelineContainer>
  ),
  args: {
    variant: "bullet-yellow",
  },
};
