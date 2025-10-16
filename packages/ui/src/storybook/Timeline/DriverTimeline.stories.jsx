import { DriverTimeline } from "@muatmuat/ui/Timeline";

export default {
  title: "Components/Timeline/DriverTimeline",
  component: DriverTimeline,
  parameters: {
    docs: {
      description: {
        component:
          "Comprehensive driver timeline component for tracking shipment status, driver activities, and proof of delivery in logistics applications.",
      },
    },
  },
  argTypes: {
    dataTimeline: {
      control: "object",
      description:
        "Timeline data object containing status definitions and shipping evidence",
    },
    onClickProof: {
      action: "proofClicked",
      description: "Handler for proof button clicks on mobile",
    },
  },
};

const mockTimelineData = {
  statusDefinitions: [
    {
      mappedOrderStatus: "ORDER_CREATED",
      statusCode: "ORDER_CREATED",
      date: "2024-01-15T08:00:00Z",
      children: [
        {
          statusCode: "DRIVER_ASSIGNED",
          date: "2024-01-15T08:30:00Z",
          requiresPhoto: false,
          beforeStatusCode: null,
          photoEvidences: null,
        },
        {
          statusCode: "SUDAH_MENUJU_LOKASI_MUAT",
          date: "2024-01-15T09:00:00Z",
          requiresPhoto: false,
          beforeStatusCode: null,
          photoEvidences: null,
        },
      ],
    },
    {
      mappedOrderStatus: "PICKUP_PROCESSING",
      statusCode: "SEDANG_MUAT_BARANG",
      date: "2024-01-15T10:00:00Z",
      children: [
        {
          statusCode: "SEDANG_MUAT_BARANG",
          date: "2024-01-15T10:30:00Z",
          requiresPhoto: true,
          beforeStatusCode: "SUDAH_MENUJU_LOKASI_MUAT",
          photoEvidences: {
            packages: [
              {
                url: "https://via.placeholder.com/300x200?text=Package+1",
                fileName: "package1.jpg",
              },
            ],
            pods: [],
            photo: [],
          },
        },
      ],
      shippingEvidence: {
        packages: [
          {
            url: "https://via.placeholder.com/300x200?text=Package+1",
            fileName: "package1.jpg",
          },
          {
            url: "https://via.placeholder.com/300x200?text=Package+2",
            fileName: "package2.jpg",
          },
        ],
        pods: [
          {
            url: "https://via.placeholder.com/300x200?text=POD+1",
            fileName: "pod1.jpg",
          },
        ],
        photo: [],
      },
    },
    {
      mappedOrderStatus: "IN_TRANSIT",
      statusCode: "SELESAI_MUAT_BARANG",
      date: "2024-01-15T11:00:00Z",
      children: [
        {
          statusCode: "SELESAI_MUAT_BARANG",
          date: "2024-01-15T11:30:00Z",
          requiresPhoto: false,
          beforeStatusCode: "SEDANG_MUAT_BARANG",
          photoEvidences: null,
        },
        {
          statusCode: "SUDAH_MENUJU_LOKASI_BONGKAR",
          date: "2024-01-15T12:00:00Z",
          requiresPhoto: false,
          beforeStatusCode: null,
          photoEvidences: null,
        },
      ],
    },
    {
      mappedOrderStatus: "DELIVERY_PROCESSING",
      statusCode: "SEDANG_BONGKAR_BARANG",
      date: "2024-01-15T13:00:00Z",
      children: [
        {
          statusCode: "SEDANG_BONGKAR_BARANG",
          date: "2024-01-15T13:30:00Z",
          requiresPhoto: true,
          beforeStatusCode: "SUDAH_MENUJU_LOKASI_BONGKAR",
          photoEvidences: {
            packages: [
              {
                url: "https://via.placeholder.com/300x200?text=Unload+1",
                fileName: "unload1.jpg",
              },
            ],
            pods: [],
            photo: [],
          },
        },
      ],
      shippingEvidence: {
        packages: [
          {
            url: "https://via.placeholder.com/300x200?text=Unload+1",
            fileName: "unload1.jpg",
          },
        ],
        pods: [
          {
            url: "https://via.placeholder.com/300x200?text=POD+Final",
            fileName: "pod_final.jpg",
          },
        ],
        photo: [],
      },
    },
    {
      mappedOrderStatus: "DELIVERY_COMPLETED",
      statusCode: "SELESAI_BONGKAR_BARANG",
      date: "2024-01-15T14:00:00Z",
      children: [],
      shippingEvidence: {
        packages: [],
        pods: [],
        photo: [
          {
            url: "https://via.placeholder.com/300x200?text=Delivery+Proof",
            fileName: "delivery_proof.jpg",
          },
        ],
      },
    },
  ],
};

export const Default = {
  render: (args) => (
    <div className="max-w-2xl rounded-lg bg-gray-50 p-4">
      <DriverTimeline
        dataTimeline={mockTimelineData}
        onClickProof={args.onClickProof}
        {...args}
      />
    </div>
  ),
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Complete driver timeline showing all shipment stages from order creation to delivery completion with proof of delivery options.",
      },
    },
  },
};

export const ActivePickup = {
  render: (args) => {
    const activePickupData = {
      ...mockTimelineData,
      statusDefinitions: mockTimelineData.statusDefinitions.map(
        (status, index) => ({
          ...status,
          children: status.children?.map((child, childIndex) => ({
            ...child,
            date:
              index === 1 && childIndex === 0
                ? "2024-01-15T10:30:00Z"
                : child.date,
          })),
        })
      ),
    };

    return (
      <div className="max-w-2xl rounded-lg bg-gray-50 p-4">
        <DriverTimeline
          dataTimeline={activePickupData}
          onClickProof={args.onClickProof}
          {...args}
        />
      </div>
    );
  },
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Timeline with active pickup process showing current driver status and photo evidence requirements.",
      },
    },
  },
};

export const InTransit = {
  render: (args) => {
    const inTransitData = {
      ...mockTimelineData,
      statusDefinitions: mockTimelineData.statusDefinitions.map(
        (status, index) => ({
          ...status,
          children: status.children?.map((child, childIndex) => ({
            ...child,
            date:
              index === 2 && childIndex === 1
                ? "2024-01-15T12:00:00Z"
                : child.date,
          })),
        })
      ),
    };

    return (
      <div className="max-w-2xl rounded-lg bg-gray-50 p-4">
        <DriverTimeline
          dataTimeline={inTransitData}
          onClickProof={args.onClickProof}
          {...args}
        />
      </div>
    );
  },
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Timeline showing shipment in transit status between pickup and delivery locations.",
      },
    },
  },
};

export const DeliveryCompleted = {
  render: (args) => {
    const completedData = {
      ...mockTimelineData,
      statusDefinitions: mockTimelineData.statusDefinitions.map(
        (status, index) => ({
          ...status,
          date: index === 4 ? "2024-01-15T14:00:00Z" : status.date,
        })
      ),
    };

    return (
      <div className="max-w-2xl rounded-lg bg-gray-50 p-4">
        <DriverTimeline
          dataTimeline={completedData}
          onClickProof={args.onClickProof}
          {...args}
        />
      </div>
    );
  },
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Completed delivery timeline with all proof of delivery photos and final status confirmation.",
      },
    },
  },
};

export const CanceledOrder = {
  render: (args) => {
    const canceledData = {
      ...mockTimelineData,
      statusDefinitions: [
        {
          mappedOrderStatus: "ORDER_CANCELED",
          statusCode: "ORDER_CANCELED",
          date: "2024-01-15T09:00:00Z",
          children: [
            {
              statusCode: "DRIVER_ASSIGNED",
              date: "2024-01-15T08:30:00Z",
              requiresPhoto: false,
              beforeStatusCode: null,
              photoEvidences: null,
            },
          ],
        },
      ],
    };

    return (
      <div className="max-w-2xl rounded-lg bg-gray-50 p-4">
        <DriverTimeline
          dataTimeline={canceledData}
          onClickProof={args.onClickProof}
          {...args}
        />
      </div>
    );
  },
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Canceled order timeline showing the cancellation status and any completed prior steps.",
      },
    },
  },
};

export const MinimalTimeline = {
  render: (args) => {
    const minimalData = {
      statusDefinitions: [
        {
          mappedOrderStatus: "ORDER_CREATED",
          statusCode: "ORDER_CREATED",
          date: "2024-01-15T08:00:00Z",
          children: [
            {
              statusCode: "DRIVER_ASSIGNED",
              date: "2024-01-15T08:30:00Z",
              requiresPhoto: false,
              beforeStatusCode: null,
              photoEvidences: null,
            },
          ],
        },
        {
          mappedOrderStatus: "DELIVERY_COMPLETED",
          statusCode: "DELIVERY_COMPLETED",
          date: "2024-01-15T14:00:00Z",
          children: [],
        },
      ],
    };

    return (
      <div className="max-w-2xl rounded-lg bg-gray-50 p-4">
        <DriverTimeline
          dataTimeline={minimalData}
          onClickProof={args.onClickProof}
          {...args}
        />
      </div>
    );
  },
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Minimal timeline with only essential status steps (order created and delivery completed).",
      },
    },
  },
};

export const WithMultiplePhotos = {
  render: (args) => {
    const multiPhotoData = {
      ...mockTimelineData,
      statusDefinitions: mockTimelineData.statusDefinitions.map((status) => ({
        ...status,
        shippingEvidence: status.shippingEvidence
          ? {
              packages: Array(5)
                .fill(0)
                .map((_, i) => ({
                  url: `https://via.placeholder.com/300x200?text=Package+${i + 1}`,
                  fileName: `package${i + 1}.jpg`,
                })),
              pods: Array(3)
                .fill(0)
                .map((_, i) => ({
                  url: `https://via.placeholder.com/300x200?text=POD+${i + 1}`,
                  fileName: `pod${i + 1}.jpg`,
                })),
              photo: Array(2)
                .fill(0)
                .map((_, i) => ({
                  url: `https://via.placeholder.com/300x200?text=Photo+${i + 1}`,
                  fileName: `photo${i + 1}.jpg`,
                })),
            }
          : null,
      })),
    };

    return (
      <div className="max-w-2xl rounded-lg bg-gray-50 p-4">
        <DriverTimeline
          dataTimeline={multiPhotoData}
          onClickProof={args.onClickProof}
          {...args}
        />
      </div>
    );
  },
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Timeline with multiple photos per stage to test photo gallery functionality.",
      },
    },
  },
};

export const Playground = {
  render: (args) => (
    <div className="max-w-2xl rounded-lg bg-gray-50 p-4">
      <DriverTimeline
        dataTimeline={args.dataTimeline || mockTimelineData}
        onClickProof={args.onClickProof}
        {...args}
      />
    </div>
  ),
  args: {
    dataTimeline: mockTimelineData,
  },
  argTypes: {
    dataTimeline: {
      control: "object",
      description: "Timeline data object",
    },
    onClickProof: {
      action: "proofClicked",
      description: "Handler for proof button clicks on mobile",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground to test DriverTimeline component with different data scenarios.",
      },
    },
  },
};
