import { DonutChart } from "@muatmuat/ui/Chart";

export default {
  title: "Components/Charts/DonutChart",
  component: DonutChart,
  parameters: {
    docs: {
      description: {
        component:
          "A responsive donut chart component with interactive tooltips and customizable legends. Ideal for displaying proportional data and percentages.",
      },
    },
  },
  argTypes: {
    data: {
      description: "Array of data objects for the donut chart segments",
      control: "object",
      type: {
        required: true,
        summary:
          "Array<{name: string, value: number, color: string, percentage?: string, unit?: string, price?: number}>",
      },
    },
    className: {
      description: "Additional CSS classes for the main container",
      control: "text",
      type: {
        summary: "string",
      },
    },
    tooltipClassname: {
      description: "CSS classes for the tooltip container",
      control: "text",
      type: {
        summary: "string",
      },
    },
    legendClassname: {
      description: "CSS classes for the legend container",
      control: "text",
      type: {
        summary: "string",
      },
    },
    itemLegendClassname: {
      description: "CSS classes for individual legend items",
      control: "text",
      type: {
        summary: "string",
      },
    },
    chartClassname: {
      description: "CSS classes for the chart container",
      control: "text",
      type: {
        summary: "string",
      },
    },
    textTooltipClassname: {
      description: "CSS classes for tooltip text",
      control: "text",
      type: {
        summary: "string",
      },
    },
    centerTooltipClassname: {
      description: "CSS classes for center tooltip",
      control: "text",
      type: {
        summary: "string",
      },
    },
    centerTextTitleTooltipClassname: {
      description: "CSS classes for center tooltip title text",
      control: "text",
      type: {
        summary: "string",
      },
    },
    centerTextLabelClassname: {
      description: "CSS classes for center tooltip label text",
      control: "text",
      type: {
        summary: "string",
      },
    },
    prefixTooltipCenterText: {
      description: "Prefix text for the center tooltip",
      control: "text",
      defaultValue: "",
      type: {
        summary: "string",
      },
    },
    prefixTooltipCenterValue: {
      description: "Prefix for the center tooltip value",
      control: "text",
      defaultValue: "",
      type: {
        summary: "string",
      },
    },
    showTextLabel: {
      description: "Whether to show text labels in tooltips",
      control: "boolean",
      defaultValue: true,
      type: {
        summary: "boolean",
      },
    },
    showThirdRow: {
      description: "Whether to show a third row in legend items",
      control: "boolean",
      defaultValue: false,
      type: {
        summary: "boolean",
      },
    },
    LegendSecondRowSufix: {
      description: "Whether to show unit suffix in legend second row",
      control: "boolean",
      defaultValue: true,
      type: {
        summary: "boolean",
      },
    },
  },
};

const sampleData = [
  {
    name: "Category A",
    value: 350,
    color: "#FFC217",
    percentage: "35%",
    unit: "items",
  },
  {
    name: "Category B",
    value: 450,
    color: "#4F46E5",
    percentage: "45%",
    unit: "items",
  },
  {
    name: "Category C",
    value: 200,
    color: "#10B981",
    percentage: "20%",
    unit: "items",
  },
];

const sampleDataWithPrice = [
  {
    name: "Premium",
    value: 250,
    color: "#FFC217",
    percentage: "50%",
    unit: "items",
    price: 2500000,
  },
  {
    name: "Standard",
    value: 150,
    color: "#4F46E5",
    percentage: "30%",
    unit: "items",
    price: 900000,
  },
  {
    name: "Basic",
    value: 100,
    color: "#10B981",
    percentage: "20%",
    unit: "items",
    price: 300000,
  },
];

export const Default = {
  args: {
    data: sampleData,
  },
};

export const WithThirdRow = {
  args: {
    data: sampleDataWithPrice,
    showThirdRow: true,
  },
};

export const CustomStyling = {
  args: {
    data: [
      {
        name: "Product A",
        value: 1200,
        color: "#EF4444",
        percentage: "40%",
        unit: "units",
      },
      {
        name: "Product B",
        value: 900,
        color: "#F59E0B",
        percentage: "30%",
        unit: "units",
      },
      {
        name: "Product C",
        value: 600,
        color: "#10B981",
        percentage: "20%",
        unit: "units",
      },
      {
        name: "Product D",
        value: 300,
        color: "#3B82F6",
        percentage: "10%",
        unit: "units",
      },
    ],
    className: "bg-gray-50 rounded-lg",
    legendClassname: "gap-y-2",
    chartClassname: "h-[200px] w-[200px]",
  },
};

export const WithPrefix = {
  args: {
    data: [
      {
        name: "Revenue",
        value: 8500000,
        color: "#10B981",
        percentage: "85%",
        unit: "IDR",
      },
      {
        name: "Cost",
        value: 1500000,
        color: "#EF4444",
        percentage: "15%",
        unit: "IDR",
      },
    ],
    prefixTooltipCenterValue: "Rp",
    prefixTooltipCenterText: "Total: ",
    showTextLabel: false,
  },
};

export const Minimal = {
  args: {
    data: [
      { name: "Active", value: 75, color: "#10B981", percentage: "75%" },
      { name: "Inactive", value: 25, color: "#EF4444", percentage: "25%" },
    ],
    showTextLabel: false,
    className: "p-2",
    chartClassname: "h-[120px] w-[120px]",
  },
};

export const TwoSegments = {
  args: {
    data: [
      {
        name: "Completed",
        value: 85,
        color: "#10B981",
        percentage: "85%",
        unit: "tasks",
      },
      {
        name: "Pending",
        value: 15,
        color: "#F59E0B",
        percentage: "15%",
        unit: "tasks",
      },
    ],
    legendClassname: "gap-y-1",
    itemLegendClassname: "gap-x-2",
  },
};

export const Playground = {
  args: {
    data: sampleData,
    showThirdRow: false,
    showTextLabel: true,
    LegendSecondRowSufix: true,
  },
};
