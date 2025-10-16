import { TimelineField } from "@muatmuat/ui/Timeline";

export default {
  title: "Components/TimelineField",
  component: TimelineField,
  parameters: {
    docs: {
      description: {
        component:
          "Compound TimelineField component for managing location inputs with add/remove functionality. Perfect for logistics applications requiring multiple location entries.",
      },
    },
  },
};

export const MuatLocations = {
  render: (args) => {
    const mockValues = [
      { name: "Jakarta Pusat - Sudirman", address: "Jl. Sudirman No. 123" },
      {
        name: "Jakarta Selatan - Gatot Subroto",
        address: "Jl. Gatot Subroto No. 456",
      },
    ];

    return (
      <TimelineField.Root
        variant="muat"
        values={mockValues}
        maxLocation={args.maxLocation}
        onAddLocation={() => console.log("Add location clicked")}
        onEditLocation={(index) => console.log("Edit location", index)}
        errorMessage={args.errorMessage}
        disabled={args.disabled}
        {...args}
      >
        {mockValues.map((_, index) => (
          <TimelineField.Item index={index} key={index}>
            <TimelineField.RemoveButton
              onClick={() => console.log("Remove location", index)}
            />
          </TimelineField.Item>
        ))}
        <TimelineField.AddButton />
      </TimelineField.Root>
    );
  },
  args: {
    variant: "muat",
    maxLocation: 5,
    errorMessage: "",
    disabled: false,
  },
  argTypes: {
    variant: {
      control: { type: "select", options: ["muat", "bongkar"] },
      description: "Type of location field",
    },
    maxLocation: {
      control: { type: "range", min: 1, max: 10 },
      description: "Maximum number of locations allowed",
    },
    errorMessage: {
      control: { type: "text" },
      description: "Error message to display",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the field is disabled",
    },
  },
};

export const BongkarLocations = {
  render: (args) => {
    const mockValues = [
      { name: "Bekasi - Industrial Area", address: "Kawasan Industri Bekasi" },
      { name: "Depok - Warehouse", address: "Gudang Depok Jaya" },
      {
        name: "Tangerang - Distribution Center",
        address: "DC Tangerang Selatan",
      },
    ];

    return (
      <TimelineField.Root
        variant="bongkar"
        values={mockValues}
        maxLocation={args.maxLocation}
        onAddLocation={() => console.log("Add location clicked")}
        onEditLocation={(index) => console.log("Edit location", index)}
        {...args}
      >
        {mockValues.map((_, index) => (
          <TimelineField.Item index={index} key={index}>
            <TimelineField.RemoveButton
              onClick={() => console.log("Remove location", index)}
            />
          </TimelineField.Item>
        ))}
        <TimelineField.AddButton />
      </TimelineField.Root>
    );
  },
  args: {
    variant: "bongkar",
    maxLocation: 5,
  },
};

export const EmptyState = {
  render: (args) => (
    <TimelineField.Root
      variant="muat"
      values={[{}]}
      maxLocation={5}
      onAddLocation={() => console.log("Add location clicked")}
      onEditLocation={(index) => console.log("Edit location", index)}
      {...args}
    >
      <TimelineField.Item index={0} />
      <TimelineField.AddButton />
    </TimelineField.Root>
  ),
  args: {
    variant: "muat",
  },
};

export const ErrorState = {
  render: (args) => {
    const mockValues = [{ name: "Invalid Location", address: "" }];

    return (
      <TimelineField.Root
        variant="muat"
        values={mockValues}
        maxLocation={5}
        onAddLocation={() => console.log("Add location clicked")}
        onEditLocation={(index) => console.log("Edit location", index)}
        errorMessage="Please select a valid location"
        {...args}
      >
        {mockValues.map((_, index) => (
          <TimelineField.Item index={index} key={index}>
            <TimelineField.RemoveButton
              onClick={() => console.log("Remove location", index)}
            />
          </TimelineField.Item>
        ))}
        <TimelineField.AddButton />
      </TimelineField.Root>
    );
  },
  args: {
    variant: "muat",
    errorMessage: "Please select a valid location",
  },
};

export const DisabledState = {
  render: (args) => {
    const mockValues = [
      { name: "Jakarta Pusat - Sudirman", address: "Jl. Sudirman No. 123" },
      {
        name: "Jakarta Selatan - Gatot Subroto",
        address: "Jl. Gatot Subroto No. 456",
      },
    ];

    return (
      <TimelineField.Root
        variant="muat"
        values={mockValues}
        maxLocation={5}
        onAddLocation={() => console.log("Add location clicked")}
        onEditLocation={(index) => console.log("Edit location", index)}
        disabled={true}
        {...args}
      >
        {mockValues.map((_, index) => (
          <TimelineField.Item index={index} key={index}>
            <TimelineField.RemoveButton
              onClick={() => console.log("Remove location", index)}
            />
          </TimelineField.Item>
        ))}
        <TimelineField.AddButton />
      </TimelineField.Root>
    );
  },
  args: {
    variant: "muat",
    disabled: true,
  },
};

export const MaxLocationsReached = {
  render: (args) => {
    const mockValues = [
      { name: "Location 1", address: "Address 1" },
      { name: "Location 2", address: "Address 2" },
      { name: "Location 3", address: "Address 3" },
      { name: "Location 4", address: "Address 4" },
      { name: "Location 5", address: "Address 5" },
    ];

    return (
      <TimelineField.Root
        variant="muat"
        values={mockValues}
        maxLocation={5}
        onAddLocation={() => console.log("Add location clicked")}
        onEditLocation={(index) => console.log("Edit location", index)}
        {...args}
      >
        {mockValues.map((_, index) => (
          <TimelineField.Item index={index} key={index}>
            <TimelineField.RemoveButton
              onClick={() => console.log("Remove location", index)}
            />
          </TimelineField.Item>
        ))}
        <TimelineField.AddButton />
      </TimelineField.Root>
    );
  },
  args: {
    variant: "muat",
    maxLocation: 5,
  },
};
