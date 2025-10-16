import { TimelineContainer, TimelinePICData } from "@muatmuat/ui/Timeline";

export default {
  title: "Components/Timeline/TimelinePICData",
  component: TimelinePICData,
  parameters: {
    docs: {
      description: {
        component:
          "Timeline component for displaying Person in Charge (PIC) contact information and location details in logistics workflows.",
      },
    },
  },
  argTypes: {
    title: {
      control: "text",
      description: "Timeline title for the PIC section",
    },
    data: {
      control: "object",
      description:
        "PIC data object containing contact and location information",
    },
    variant: {
      control: "select",
      options: [
        "bullet",
        "bullet-driver-status",
        "number-muat",
        "number-bongkar",
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
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    isLast: {
      control: "boolean",
      description: "Whether this is the last item",
    },
  },
};

export const Default = {
  render: (args) => (
    <TimelineContainer className="max-w-lg">
      <TimelinePICData
        title="Lokasi Muat"
        data={{
          address: "Jl. Sudirman No. 123, Jakarta Pusat",
          details: "Gedung A, Lantai 3, Ruang 301",
          picName: "Budi Santoso",
          picPhone: "+62 812-3456-7890",
        }}
        variant="number-muat"
        index={0}
        activeIndex={0}
        isLast={false}
        {...args}
      />
      <TimelinePICData
        title="Lokasi Bongkar"
        data={{
          address: "Jl. Gatot Subroto No. 456, Jakarta Selatan",
          details: "Warehouse B, Area C2",
          picName: "Siti Rahayu",
          picPhone: "+62 813-9876-5432",
        }}
        variant="number-bongkar"
        index={1}
        activeIndex={0}
        isLast={true}
        {...args}
      />
    </TimelineContainer>
  ),
  args: {
    variant: "bullet",
    index: 0,
    activeIndex: 0,
    isLast: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default PIC timeline showing complete location and contact information for both pickup and drop-off locations.",
      },
    },
  },
};

export const MinimalData = {
  render: (args) => (
    <TimelineContainer className="max-w-lg">
      <TimelinePICData
        data={{
          address: "Jl. Thamrin No. 10, Jakarta",
          details: "",
          picName: "Ahmad Wijaya",
          picPhone: "+62 811-1234-5678",
        }}
        variant="bullet"
        index={0}
        activeIndex={0}
        isLast={true}
        {...args}
      />
    </TimelineContainer>
  ),
  args: {
    variant: "bullet",
    index: 0,
    activeIndex: 0,
    isLast: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Minimal PIC data with only essential information.",
      },
    },
  },
};

export const InactiveState = {
  render: (args) => (
    <TimelineContainer className="max-w-lg">
      <TimelinePICData
        title="Lokasi Muat"
        data={{
          address: "Jl. Sudirman No. 123, Jakarta Pusat",
          details: "Gedung A, Lantai 3",
          picName: "Budi Santoso",
          picPhone: "+62 812-3456-7890",
        }}
        variant="number-muat"
        index={0}
        activeIndex={1}
        isLast={false}
        {...args}
      />
      <TimelinePICData
        title="Lokasi Bongkar"
        data={{
          address: "Jl. Gatot Subroto No. 456, Jakarta Selatan",
          details: "Warehouse B, Area C2",
          picName: "Siti Rahayu",
          picPhone: "+62 813-9876-5432",
        }}
        variant="number-bongkar"
        index={1}
        activeIndex={1}
        isLast={false}
        {...args}
      />
    </TimelineContainer>
  ),
  args: {
    variant: "bullet",
    index: 0,
    activeIndex: 1,
    isLast: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Inactive PIC timeline items showing non-active states in a multi-step process.",
      },
    },
  },
};

export const LongAddresses = {
  render: (args) => (
    <TimelineContainer className="max-w-lg">
      <TimelinePICData
        title="Warehouse Complex"
        data={{
          address:
            "Kompleks Pergudangan Cilincing Blok A No. 15-17, Jl. Cilincing Raya, Kelurahan Cilincing, Kecamatan Cilincing, Jakarta Utara, DKI Jakarta 14130",
          details: "Area Penerimaan Barang, Gate 3, Petugas Shift Malam",
          picName: "Muhammad Fachrul Rozi",
          picPhone: "+62 878-8812-3456",
        }}
        variant="number-muat"
        index={0}
        activeIndex={0}
        isLast={false}
        {...args}
      />
      <TimelinePICData
        title="Distribution Center"
        data={{
          address:
            "Kawasan Industri Pulogadung, Jl. Pulo Mas Raya Kav. 12-14, Kelurahan Jatinegara Kaum, Kecamatan Pulo Gadung, Jakarta Timur, DKI Jakarta 13220",
          details: "Warehouse Utama, Zona B, Pintu Keluar 2",
          picName: "Dewi Lestari",
          picPhone: "+62 857-1234-5678",
        }}
        variant="number-bongkar"
        index={1}
        activeIndex={0}
        isLast={true}
        {...args}
      />
    </TimelineContainer>
  ),
  args: {
    variant: "bullet",
    index: 0,
    activeIndex: 0,
    isLast: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "PIC timeline with very long addresses to test text wrapping and layout handling.",
      },
    },
  },
};

export const Playground = {
  render: (args) => (
    <TimelineContainer className="max-w-lg">
      <TimelinePICData
        title={args.title}
        data={args.data}
        variant={args.variant}
        index={args.index}
        activeIndex={args.activeIndex}
        isLast={args.isLast}
        className={args.className}
        {...args}
      />
    </TimelineContainer>
  ),
  args: {
    title: "Lokasi",
    data: {
      address: "Jl. Sudirman No. 123, Jakarta",
      details: "Gedung A, Lantai 3",
      picName: "John Doe",
      picPhone: "+62 812-3456-7890",
    },
    variant: "bullet",
    index: 0,
    activeIndex: 0,
    isLast: true,
    className: "",
  },
  argTypes: {
    title: {
      control: "text",
      description: "Timeline title for the PIC section",
    },
    data: {
      control: "object",
      description: "PIC data object",
    },
    variant: {
      control: "select",
      options: [
        "bullet",
        "bullet-driver-status",
        "number-muat",
        "number-bongkar",
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
    isLast: {
      control: "boolean",
      description: "Whether this is the last item",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground to test all TimelinePICData component properties.",
      },
    },
  },
};
