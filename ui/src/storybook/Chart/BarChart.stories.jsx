import { BarChart } from "@muatmuat/ui/Chart";

export default {
  title: "Components/Charts/BarChart",
  component: BarChart,
  parameters: {
    docs: {
      description: {
        component:
          "A customizable bar chart component with stacked bars, tooltips, and legends. Perfect for displaying comparative data with multiple categories.",
      },
    },
  },
  argTypes: {
    data: {
      description: "Array of data objects to display in the chart",
      control: "object",
      type: {
        required: true,
        summary: "Array<Object>",
      },
    },
    xAxisKey: {
      description: "Key to use for the X-axis labels",
      control: "text",
      type: {
        required: true,
        summary: "string",
      },
    },
    dataKeys: {
      description: "Configuration for data series to display",
      control: "object",
      type: {
        required: true,
        summary: "Array<{key: string, name: string, shorthand: string}>",
      },
    },
    colors: {
      description: "Colors to use for the data series",
      control: "array",
      type: {
        required: true,
        summary: "Array<string>",
      },
    },
    showXAxisLine: {
      description: "Whether to show the X-axis line",
      control: "boolean",
      defaultValue: true,
      type: {
        summary: "boolean",
      },
    },
    radiusValue: {
      description: "Border radius value for the top of bars",
      control: "number",
      defaultValue: 6,
      type: {
        summary: "number",
      },
    },
    maxBarSize: {
      description: "Maximum size of individual bars",
      control: "number",
      defaultValue: 60,
      type: {
        summary: "number",
      },
    },
    barCategoryGap: {
      description: "Gap between bar categories",
      control: "text",
      defaultValue: "35%",
      type: {
        summary: "string",
      },
    },
    barSize: {
      description: "Size of individual bars",
      control: "number",
      type: {
        summary: "number",
      },
    },
  },
};

const sampleData = [
  { month: "Jan", instantOrders: 45, scheduledOrders: 30 },
  { month: "Feb", instantOrders: 52, scheduledOrders: 35 },
  { month: "Mar", instantOrders: 48, scheduledOrders: 40 },
  { month: "Apr", instantOrders: 67, scheduledOrders: 38 },
  { month: "May", instantOrders: 72, scheduledOrders: 45 },
  { month: "Jun", instantOrders: 65, scheduledOrders: 42 },
];

const sampleDataKeys = [
  { key: "instantOrders", name: "Pesanan Instan", shorthand: "Instan" },
  { key: "scheduledOrders", name: "Pesanan Terjadwal", shorthand: "Terjadwal" },
];

const sampleColors = ["#FFC217", "#4F46E5"];

export const Default = {
  args: {
    data: sampleData,
    xAxisKey: "month",
    dataKeys: sampleDataKeys,
    colors: sampleColors,
    showXAxisLine: true,
    radiusValue: 6,
    maxBarSize: 60,
    barCategoryGap: "35%",
  },
};

export const WithoutXAxisLine = {
  args: {
    data: sampleData,
    xAxisKey: "month",
    dataKeys: sampleDataKeys,
    colors: sampleColors,
    showXAxisLine: false,
    radiusValue: 6,
    maxBarSize: 60,
    barCategoryGap: "35%",
  },
};

export const CustomStyling = {
  args: {
    data: sampleData,
    xAxisKey: "month",
    dataKeys: sampleDataKeys,
    colors: ["#10B981", "#EF4444"],
    showXAxisLine: true,
    radiusValue: 8,
    maxBarSize: 80,
    barCategoryGap: "25%",
  },
};

export const SingleCategory = {
  args: {
    data: [
      { category: "A", value: 100 },
      { category: "B", value: 150 },
      { category: "C", value: 80 },
    ],
    xAxisKey: "category",
    dataKeys: [{ key: "value", name: "Value", shorthand: "Val" }],
    colors: ["#6366F1"],
    showXAxisLine: true,
    radiusValue: 4,
    maxBarSize: 50,
    barCategoryGap: "20%",
  },
};

export const ManyDataPoints = {
  args: {
    data: [
      { day: "Mon", sales: 20, returns: 5 },
      { day: "Tue", sales: 35, returns: 8 },
      { day: "Wed", sales: 28, returns: 3 },
      { day: "Thu", sales: 42, returns: 10 },
      { day: "Fri", sales: 55, returns: 12 },
      { day: "Sat", sales: 68, returns: 15 },
      { day: "Sun", sales: 45, returns: 7 },
    ],
    xAxisKey: "day",
    dataKeys: [
      { key: "sales", name: "Sales", shorthand: "Sale" },
      { key: "returns", name: "Returns", shorthand: "Ret" },
    ],
    colors: ["#059669", "#DC2626"],
    showXAxisLine: true,
    radiusValue: 3,
    maxBarSize: 40,
    barCategoryGap: "15%",
  },
};

export const Playground = {
  args: {
    data: sampleData,
    xAxisKey: "month",
    dataKeys: sampleDataKeys,
    colors: sampleColors,
    showXAxisLine: true,
    radiusValue: 6,
    maxBarSize: 60,
    barCategoryGap: "35%",
  },
};
