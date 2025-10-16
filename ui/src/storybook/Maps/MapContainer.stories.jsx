import { MapContainer } from "@muatmuat/ui/Maps";

export default {
  title: "Components/Maps/MapContainer",
  component: MapContainer,
  parameters: {
    docs: {
      description: {
        component:
          "An interactive Google Maps container with marker placement and location selection capabilities. Perfect for address selection, location picking, and coordinate management interfaces.",
      },
    },
  },
  argTypes: {
    coordinates: {
      control: "object",
      description: "Initial map coordinates with latitude and longitude",
      table: {
        type: { summary: "{latitude: number, longitude: number}" },
        defaultValue: { summary: "{latitude: -7.2575, longitude: 112.7521}" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the map container",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
    viewOnly: {
      control: "boolean",
      description:
        "Whether the map is in view-only mode (disables interaction)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    textLabel: {
      control: "text",
      description:
        "Text label to display in the info window when marker is clicked",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
    draggableMarker: {
      control: "boolean",
      description: "Whether the marker can be dragged (only when not viewOnly)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    markerIcon: {
      control: "text",
      description: "Custom marker icon URL",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"/icons/marker-lokasi-muat.svg"' },
      },
    },
    onPositionChange: {
      action: "positionChanged",
      description:
        "Callback function triggered when position changes via click or drag",
      table: {
        type: { summary: "function" },
      },
    },
  },
};

export const Default = {
  args: {
    coordinates: { latitude: -7.2575, longitude: 112.7521 },
    className: "h-[400px] w-full",
    viewOnly: false,
    textLabel: "Selected Location",
    draggableMarker: true,
    markerIcon: "/icons/marker-lokasi-muat.svg",
  },
};

export const Interactive = {
  args: {
    coordinates: { latitude: -7.2575, longitude: 112.7521 },
    className: "h-[500px] w-full",
    viewOnly: false,
    textLabel: "Click to set location",
    draggableMarker: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive map where users can click to place markers or drag existing markers to new positions.",
      },
    },
  },
};

export const ViewOnly = {
  args: {
    coordinates: { latitude: -7.2575, longitude: 112.7521 },
    className: "h-[400px] w-full",
    viewOnly: true,
    textLabel: "Location Preview",
    draggableMarker: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "View-only mode that disables all map interactions. Perfect for displaying static locations.",
      },
    },
  },
};

export const WithCustomLabel = {
  args: {
    coordinates: { latitude: -7.2575, longitude: 112.7521 },
    className: "h-[400px] w-full",
    viewOnly: false,
    textLabel: "MuatParts Headquarters\nSurabaya, Indonesia",
    draggableMarker: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Map with custom text label displayed in the info window when marker is clicked.",
      },
    },
  },
};

export const DifferentLocations = {
  args: {
    coordinates: { latitude: -6.2088, longitude: 106.8456 }, // Jakarta
    className: "h-[400px] w-full",
    viewOnly: false,
    textLabel: "Jakarta, Indonesia",
    draggableMarker: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Map centered on different location to demonstrate coordinate flexibility.",
      },
    },
  },
};

export const CustomSize = {
  args: {
    coordinates: { latitude: -7.2575, longitude: 112.7521 },
    className: "h-[300px] w-[600px] rounded-lg border-2 border-gray-300",
    viewOnly: false,
    textLabel: "Custom Styled Map",
    draggableMarker: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Map with custom container styling using Tailwind CSS classes.",
      },
    },
  },
};

export const Playground = {
  args: {
    coordinates: { latitude: -7.2575, longitude: 112.7521 },
    className: "h-[400px] w-full",
    viewOnly: false,
    textLabel: "Selected Location",
    draggableMarker: true,
    markerIcon: "/icons/marker-lokasi-muat.svg",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground to test all MapContainer props and combinations.",
      },
    },
  },
};
