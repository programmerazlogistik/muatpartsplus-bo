import { MapWithPath } from "@muatmuat/ui/Maps";

export default {
  title: "Components/Maps/MapWithPath",
  component: MapWithPath,
  parameters: {
    docs: {
      description: {
        component:
          "Advanced Google Maps component with path visualization, multiple markers, and animated truck tracking. Perfect for logistics, delivery tracking, and route optimization interfaces.",
      },
    },
  },
  argTypes: {
    apiKey: {
      control: "text",
      description: "Google Maps API key",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"AIzaSyDw_9D9-4zTechHn1wMEILZqiBv51Q7jHU"' },
      },
    },
    mapContainerStyle: {
      control: "object",
      description: "Custom CSS styles for the map container",
      table: {
        type: { summary: "React.CSSProperties" },
        defaultValue: { summary: '{ width: "100%", height: "400px" }' },
      },
    },
    center: {
      control: "object",
      description: "Map center coordinates",
      table: {
        type: { summary: "{lat: number, lng: number}" },
        defaultValue: { summary: "{ lat: -7.2575, lng: 112.7521 }" },
      },
    },
    zoom: {
      control: "number",
      description: "Map zoom level",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "13" },
      },
    },
    locationMarkers: {
      control: "array",
      description: "Array of location markers to display on the map",
      table: {
        type: { summary: "Array<LocationMarker>" },
        defaultValue: { summary: "[]" },
      },
    },
    locationPolyline: {
      control: "array",
      description: "Array of coordinates forming the path between locations",
      table: {
        type: { summary: "Array<{lat: number, lng: number}>" },
        defaultValue: { summary: "[]" },
      },
    },
    encodedTruckPolyline: {
      control: "text",
      description:
        "Encoded polyline string for truck route from Google Maps API",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '""' },
      },
    },
    pathOptions: {
      control: "object",
      description: "Custom styling options for the location path",
      table: {
        type: { summary: "google.maps.PolylineOptions" },
      },
    },
    truckPathOptions: {
      control: "object",
      description: "Custom styling options for the truck path",
      table: {
        type: { summary: "google.maps.PolylineOptions" },
      },
    },
    mapOptions: {
      control: "object",
      description: "Additional Google Maps options",
      table: {
        type: { summary: "google.maps.MapOptions" },
      },
    },
    showTruck: {
      control: "boolean",
      description: "Whether to show the animated truck marker",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    truckIcon: {
      control: "text",
      description: "Custom truck icon URL",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"/icons/truck-icon.svg"' },
      },
    },
  },
};

// Mock location data for examples
const mockLocationMarkers = [
  {
    title: "Warehouse",
    position: { lat: -7.2575, lng: 112.7521 },
    type: "pickup",
    icon: "/icons/warehouse-icon.svg",
    onClick: (marker) => console.log("Warehouse clicked:", marker),
  },
  {
    title: "Customer Location",
    position: { lat: -7.2755, lng: 112.7631 },
    type: "dropoff",
    icon: "/icons/customer-icon.svg",
    onClick: (marker) => console.log("Customer location clicked:", marker),
  },
  {
    title: "Distribution Center",
    position: { lat: -7.2405, lng: 112.7451 },
    type: "pickup",
    icon: "/icons/distribution-icon.svg",
    onClick: (marker) => console.log("Distribution center clicked:", marker),
  },
];

const mockLocationPolyline = [
  { lat: -7.2575, lng: 112.7521 },
  { lat: -7.2605, lng: 112.7551 },
  { lat: -7.2655, lng: 112.7581 },
  { lat: -7.2705, lng: 112.7611 },
  { lat: -7.2755, lng: 112.7631 },
];

const mockEncodedTruckPolyline = "_p~iF~ps|U_ulLnnqC_mqNvxq`@";

export const Default = {
  args: {
    apiKey: "AIzaSyDw_9D9-4zTechHn1wMEILZqiBv51Q7jHU",
    mapContainerStyle: { width: "100%", height: "500px" },
    center: { lat: -7.2575, lng: 112.7521 },
    zoom: 13,
    locationMarkers: [],
    locationPolyline: [],
    encodedTruckPolyline: "",
    showTruck: true,
    truckIcon: "/icons/truck-icon.svg",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default MapWithPath component with basic configuration. Shows an empty map ready for customization.",
      },
    },
  },
};

export const WithMarkers = {
  args: {
    apiKey: "AIzaSyDw_9D9-4zTechHn1wMEILZqiBv51Q7jHU",
    mapContainerStyle: { width: "100%", height: "500px" },
    center: { lat: -7.2575, lng: 112.7521 },
    zoom: 12,
    locationMarkers: mockLocationMarkers,
    locationPolyline: [],
    encodedTruckPolyline: "",
    showTruck: false,
    truckIcon: "/icons/truck-icon.svg",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Map displaying multiple location markers with custom icons. Markers are clickable and show appropriate labels.",
      },
    },
  },
};

export const WithPath = {
  args: {
    apiKey: "AIzaSyDw_9D9-4zTechHn1wMEILZqiBv51Q7jHU",
    mapContainerStyle: { width: "100%", height: "500px" },
    center: { lat: -7.2575, lng: 112.7521 },
    zoom: 12,
    locationMarkers: mockLocationMarkers,
    locationPolyline: mockLocationPolyline,
    encodedTruckPolyline: "",
    showTruck: false,
    truckIcon: "/icons/truck-icon.svg",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Map showing a path connecting multiple locations. The path represents the route between pickup and dropoff points.",
      },
    },
  },
};

export const WithTruckTracking = {
  args: {
    apiKey: "AIzaSyDw_9D9-4zTechHn1wMEILZqiBv51Q7jHU",
    mapContainerStyle: { width: "100%", height: "500px" },
    center: { lat: -7.2575, lng: 112.7521 },
    zoom: 12,
    locationMarkers: mockLocationMarkers,
    locationPolyline: mockLocationPolyline,
    encodedTruckPolyline: mockEncodedTruckPolyline,
    showTruck: true,
    truckIcon: "/icons/truck-icon.svg",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Complete logistics view with location markers, route path, and animated truck tracking. The truck rotates based on direction of travel.",
      },
    },
  },
};

export const CustomStyling = {
  args: {
    apiKey: "AIzaSyDw_9D9-4zTechHn1wMEILZqiBv51Q7jHU",
    mapContainerStyle: {
      width: "100%",
      height: "600px",
      borderRadius: "12px",
      border: "2px solid #e5e7eb",
    },
    center: { lat: -7.2575, lng: 112.7521 },
    zoom: 11,
    locationMarkers: mockLocationMarkers,
    locationPolyline: mockLocationPolyline,
    encodedTruckPolyline: mockEncodedTruckPolyline,
    pathOptions: {
      strokeColor: "#059669",
      strokeOpacity: 1,
      strokeWeight: 4,
    },
    truckPathOptions: {
      strokeColor: "#dc2626",
      strokeOpacity: 1,
      strokeWeight: 4,
      strokeDashArray: "15,5",
    },
    showTruck: true,
    truckIcon: "/icons/truck-icon.svg",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Map with custom styling including different colors for location paths and truck routes, plus enhanced container styling.",
      },
    },
  },
};

export const ComplexRoute = {
  args: {
    apiKey: "AIzaSyDw_9D9-4zTechHn1wMEILZqiBv51Q7jHU",
    mapContainerStyle: { width: "100%", height: "600px" },
    center: { lat: -7.2575, lng: 112.7521 },
    zoom: 11,
    locationMarkers: [
      ...mockLocationMarkers,
      {
        title: "Secondary Pickup",
        position: { lat: -7.2305, lng: 112.7351 },
        type: "pickup",
        icon: "/icons/pickup-icon.svg",
        onClick: (marker) => console.log("Secondary pickup clicked:", marker),
      },
      {
        title: "Final Destination",
        position: { lat: -7.2855, lng: 112.7751 },
        type: "dropoff",
        icon: "/icons/destination-icon.svg",
        onClick: (marker) => console.log("Final destination clicked:", marker),
      },
    ],
    locationPolyline: [
      { lat: -7.2575, lng: 112.7521 },
      { lat: -7.2655, lng: 112.7581 },
      { lat: -7.2755, lng: 112.7631 },
      { lat: -7.2855, lng: 112.7751 },
    ],
    encodedTruckPolyline: mockEncodedTruckPolyline,
    showTruck: true,
    truckIcon: "/icons/truck-icon.svg",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Complex multi-stop route with multiple pickup and dropoff locations, demonstrating advanced logistics scenarios.",
      },
    },
  },
};

export const LoadingState = {
  args: {
    apiKey: "invalid-key-for-testing",
    mapContainerStyle: { width: "100%", height: "500px" },
    center: { lat: -7.2575, lng: 112.7521 },
    zoom: 13,
    locationMarkers: [],
    locationPolyline: [],
    encodedTruckPolyline: "",
    showTruck: false,
    truckIcon: "/icons/truck-icon.svg",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates loading and error states when Google Maps fails to load or API key is invalid.",
      },
    },
  },
};

export const Playground = {
  args: {
    apiKey: "AIzaSyDw_9D9-4zTechHn1wMEILZqiBv51Q7jHU",
    mapContainerStyle: { width: "100%", height: "500px" },
    center: { lat: -7.2575, lng: 112.7521 },
    zoom: 13,
    locationMarkers: mockLocationMarkers,
    locationPolyline: mockLocationPolyline,
    encodedTruckPolyline: mockEncodedTruckPolyline,
    pathOptions: {
      strokeColor: "#DD7B02",
      strokeOpacity: 1,
      strokeWeight: 6,
    },
    truckPathOptions: {
      strokeColor: "#DD7B02",
      strokeOpacity: 1,
      strokeWeight: 6,
      strokeDashArray: "10,5",
    },
    mapOptions: {},
    showTruck: true,
    truckIcon: "/icons/truck-icon.svg",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground to test all MapWithPath props and combinations. Customize every aspect of the map appearance and behavior.",
      },
    },
  },
};
