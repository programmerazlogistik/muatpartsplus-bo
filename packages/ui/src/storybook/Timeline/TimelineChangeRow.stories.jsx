import { TimelineChangeRow } from "@muatmuat/ui/Timeline";

export default {
  title: "Components/Timeline/TimelineChangeRow",
  component: TimelineChangeRow,
  parameters: {
    docs: {
      description: {
        component:
          "Timeline component for displaying route changes with before/after location comparison in logistics applications.",
      },
    },
  },
  argTypes: {
    before: {
      control: "object",
      description: "Original location data",
    },
    after: {
      control: "object",
      description: "Modified location data",
    },
    type: {
      control: "select",
      options: ["pickup", "bongkar"],
      description: "Location type",
    },
    isLast: {
      control: "boolean",
      description: "Whether this is the last item overall",
    },
    isLastInGroup: {
      control: "boolean",
      description: "Whether this is the last item in the current group",
    },
    showPickupHeader: {
      control: "boolean",
      description: "Whether to show pickup header",
    },
    showDropoffHeader: {
      control: "boolean",
      description: "Whether to show dropoff header",
    },
  },
};

export const PickupRouteChange = {
  render: (args) => (
    <div className="max-w-3xl space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Pickup Location Changes</h3>
        <TimelineChangeRow
          before={{
            sequence: 1,
            fullAddress: "Jl. Sudirman No. 123, Jakarta Pusat",
          }}
          after={{
            sequence: 1,
            fullAddress: "Jl. Thamrin No. 456, Jakarta Pusat",
          }}
          type="pickup"
          showPickupHeader={true}
          isLast={false}
          isLastInGroup={false}
          {...args}
        />
        <TimelineChangeRow
          before={{
            sequence: 2,
            fullAddress: "Jl. Gatot Subroto No. 789, Jakarta Selatan",
          }}
          after={{
            sequence: 2,
            fullAddress: "Jl. HR Rasuna Said No. 321, Jakarta Selatan",
          }}
          type="pickup"
          isLast={true}
          isLastInGroup={true}
          {...args}
        />
      </div>
    </div>
  ),
  args: {
    type: "pickup",
    isLast: false,
    isLastInGroup: false,
    showPickupHeader: false,
    showDropoffHeader: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pickup location changes with visual indicators showing modified routes.",
      },
    },
  },
};

export const DropoffRouteChange = {
  render: (args) => (
    <div className="max-w-3xl space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">
          Dropoff Location Changes
        </h3>
        <TimelineChangeRow
          before={{
            sequence: 1,
            fullAddress: "Jl. Ahmad Yani No. 100, Surabaya",
          }}
          after={{
            sequence: 1,
            fullAddress: "Jl. Basuki Rahmat No. 200, Surabaya",
          }}
          type="bongkar"
          showDropoffHeader={true}
          isLast={false}
          isLastInGroup={false}
          {...args}
        />
        <TimelineChangeRow
          before={{
            sequence: 2,
            fullAddress: "Jl. Tunjungan No. 300, Surabaya",
          }}
          after={{
            sequence: 2,
            fullAddress: "Jl. Embong Malang No. 400, Surabaya",
          }}
          type="bongkar"
          isLast={true}
          isLastInGroup={true}
          {...args}
        />
      </div>
    </div>
  ),
  args: {
    type: "bongkar",
    isLast: false,
    isLastInGroup: false,
    showPickupHeader: false,
    showDropoffHeader: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Dropoff location changes with visual indicators showing modified routes.",
      },
    },
  },
};

export const NoChanges = {
  render: (args) => (
    <div className="max-w-3xl space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">No Route Changes</h3>
        <TimelineChangeRow
          before={{
            sequence: 1,
            fullAddress: "Jl. Sudirman No. 123, Jakarta Pusat",
          }}
          after={{
            sequence: 1,
            fullAddress: "Jl. Sudirman No. 123, Jakarta Pusat",
          }}
          type="pickup"
          showPickupHeader={true}
          isLast={false}
          isLastInGroup={false}
          {...args}
        />
        <TimelineChangeRow
          before={{
            sequence: 2,
            fullAddress: "Jl. Gatot Subroto No. 789, Jakarta Selatan",
          }}
          after={{
            sequence: 2,
            fullAddress: "Jl. Gatot Subroto No. 789, Jakarta Selatan",
          }}
          type="pickup"
          isLast={true}
          isLastInGroup={true}
          {...args}
        />
      </div>
    </div>
  ),
  args: {
    type: "pickup",
    isLast: false,
    isLastInGroup: false,
    showPickupHeader: false,
    showDropoffHeader: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Route comparison when no changes were made (addresses are identical).",
      },
    },
  },
};

export const MixedChanges = {
  render: (args) => (
    <div className="max-w-3xl space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Mixed Route Changes</h3>

        {/* Pickup with changes */}
        <TimelineChangeRow
          before={{
            sequence: 1,
            fullAddress: "Jl. Sudirman No. 123, Jakarta Pusat",
          }}
          after={{
            sequence: 1,
            fullAddress: "Jl. Thamrin No. 456, Jakarta Pusat",
          }}
          type="pickup"
          showPickupHeader={true}
          isLast={false}
          isLastInGroup={false}
          {...args}
        />

        {/* Pickup without changes */}
        <TimelineChangeRow
          before={{
            sequence: 2,
            fullAddress: "Jl. Gatot Subroto No. 789, Jakarta Selatan",
          }}
          after={{
            sequence: 2,
            fullAddress: "Jl. Gatot Subroto No. 789, Jakarta Selatan",
          }}
          type="pickup"
          isLast={false}
          isLastInGroup={false}
          {...args}
        />

        {/* Dropoff with changes */}
        <TimelineChangeRow
          before={{
            sequence: 1,
            fullAddress: "Jl. Ahmad Yani No. 100, Surabaya",
          }}
          after={{
            sequence: 1,
            fullAddress: "Jl. Basuki Rahmat No. 200, Surabaya",
          }}
          type="bongkar"
          showDropoffHeader={true}
          isLast={true}
          isLastInGroup={true}
          {...args}
        />
      </div>
    </div>
  ),
  args: {
    isLast: false,
    isLastInGroup: false,
    showPickupHeader: false,
    showDropoffHeader: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Mixed scenario with some pickup locations changed and others unchanged, plus dropoff changes.",
      },
    },
  },
};

export const LongAddresses = {
  render: (args) => (
    <div className="max-w-3xl space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Long Address Comparison</h3>
        <TimelineChangeRow
          before={{
            sequence: 1,
            fullAddress:
              "Kompleks Pergudangan Cilincing Blok A No. 15-17, Jl. Cilincing Raya, Kelurahan Cilincing, Kecamatan Cilincing, Jakarta Utara, DKI Jakarta 14130",
          }}
          after={{
            sequence: 1,
            fullAddress:
              "Kawasan Industri Pulogadung, Jl. Pulo Mas Raya Kav. 12-14, Kelurahan Jatinegara Kaum, Kecamatan Pulo Gadung, Jakarta Timur, DKI Jakarta 13220",
          }}
          type="pickup"
          showPickupHeader={true}
          isLast={true}
          isLastInGroup={true}
          {...args}
        />
      </div>
    </div>
  ),
  args: {
    type: "pickup",
    isLast: true,
    isLastInGroup: true,
    showPickupHeader: false,
    showDropoffHeader: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Route changes with very long addresses to test text truncation and layout.",
      },
    },
  },
};

export const Playground = {
  render: (args) => (
    <div className="max-w-3xl space-y-6">
      <TimelineChangeRow
        before={args.before}
        after={args.after}
        type={args.type}
        isLast={args.isLast}
        isLastInGroup={args.isLastInGroup}
        showPickupHeader={args.showPickupHeader}
        showDropoffHeader={args.showDropoffHeader}
        {...args}
      />
    </div>
  ),
  args: {
    before: {
      sequence: 1,
      fullAddress: "Jl. Sudirman No. 123, Jakarta Pusat",
    },
    after: {
      sequence: 1,
      fullAddress: "Jl. Thamrin No. 456, Jakarta Pusat",
    },
    type: "pickup",
    isLast: false,
    isLastInGroup: false,
    showPickupHeader: false,
    showDropoffHeader: false,
  },
  argTypes: {
    before: {
      control: "object",
      description: "Original location data",
    },
    after: {
      control: "object",
      description: "Modified location data",
    },
    type: {
      control: "select",
      options: ["pickup", "bongkar"],
      description: "Location type",
    },
    isLast: {
      control: "boolean",
      description: "Whether this is the last item overall",
    },
    isLastInGroup: {
      control: "boolean",
      description: "Whether this is the last item in the current group",
    },
    showPickupHeader: {
      control: "boolean",
      description: "Whether to show pickup header",
    },
    showDropoffHeader: {
      control: "boolean",
      description: "Whether to show dropoff header",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground to test all TimelineChangeRow component properties.",
      },
    },
  },
};
