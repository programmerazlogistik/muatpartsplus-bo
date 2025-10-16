import { LineChart } from "@muatmuat/ui/Chart";

export default {
  title: "Components/Charts/LineChart",
  component: LineChart,
  parameters: {
    docs: {
      description: {
        component:
          "A responsive line chart with area fill and interactive tooltips. Perfect for displaying trends over time with smooth animations.",
      },
    },
  },
  argTypes: {
    data: {
      description: "Array of data objects containing date and income values",
      control: "object",
      type: {
        required: true,
        summary:
          "Array<{dateLabel: string, tooltipDateLabel: string, income: number}>",
      },
    },
    width: {
      description: "Width of the chart container",
      control: "text",
      defaultValue: "100%",
      type: {
        summary: "string | number",
      },
    },
    height: {
      description: "Height of the chart container",
      control: "number",
      defaultValue: 182,
      type: {
        summary: "number",
      },
    },
  },
};

const sampleData = [
  { dateLabel: "Jan", tooltipDateLabel: "January 2024", income: 4500000 },
  { dateLabel: "Feb", tooltipDateLabel: "February 2024", income: 5200000 },
  { dateLabel: "Mar", tooltipDateLabel: "March 2024", income: 4800000 },
  { dateLabel: "Apr", tooltipDateLabel: "April 2024", income: 6700000 },
  { dateLabel: "May", tooltipDateLabel: "May 2024", income: 7200000 },
  { dateLabel: "Jun", tooltipDateLabel: "June 2024", income: 6500000 },
];

const weeklyData = [
  {
    dateLabel: "Week 1",
    tooltipDateLabel: "Week 1 - July 2024",
    income: 1200000,
  },
  {
    dateLabel: "Week 2",
    tooltipDateLabel: "Week 2 - July 2024",
    income: 1500000,
  },
  {
    dateLabel: "Week 3",
    tooltipDateLabel: "Week 3 - July 2024",
    income: 1800000,
  },
  {
    dateLabel: "Week 4",
    tooltipDateLabel: "Week 4 - July 2024",
    income: 2100000,
  },
];

const dailyData = [
  {
    dateLabel: "Mon",
    tooltipDateLabel: "Monday, July 1, 2024",
    income: 250000,
  },
  {
    dateLabel: "Tue",
    tooltipDateLabel: "Tuesday, July 2, 2024",
    income: 320000,
  },
  {
    dateLabel: "Wed",
    tooltipDateLabel: "Wednesday, July 3, 2024",
    income: 280000,
  },
  {
    dateLabel: "Thu",
    tooltipDateLabel: "Thursday, July 4, 2024",
    income: 410000,
  },
  {
    dateLabel: "Fri",
    tooltipDateLabel: "Friday, July 5, 2024",
    income: 380000,
  },
  {
    dateLabel: "Sat",
    tooltipDateLabel: "Saturday, July 6, 2024",
    income: 450000,
  },
  {
    dateLabel: "Sun",
    tooltipDateLabel: "Sunday, July 7, 2024",
    income: 290000,
  },
];

export const Default = {
  args: {
    data: sampleData,
    width: "100%",
    height: 182,
  },
};

export const WeeklyData = {
  args: {
    data: weeklyData,
    width: "100%",
    height: 200,
  },
};

export const DailyData = {
  args: {
    data: dailyData,
    width: "100%",
    height: 250,
  },
};

export const CustomDimensions = {
  args: {
    data: sampleData,
    width: 400,
    height: 300,
  },
};

export const CompactView = {
  args: {
    data: [
      { dateLabel: "Q1", tooltipDateLabel: "Q1 2024", income: 15000000 },
      { dateLabel: "Q2", tooltipDateLabel: "Q2 2024", income: 18000000 },
      { dateLabel: "Q3", tooltipDateLabel: "Q3 2024", income: 22000000 },
      { dateLabel: "Q4", tooltipDateLabel: "Q4 2024", income: 25000000 },
    ],
    width: "100%",
    height: 150,
  },
};

export const VolatileData = {
  args: {
    data: [
      { dateLabel: "Jan", tooltipDateLabel: "January 2024", income: 3200000 },
      { dateLabel: "Feb", tooltipDateLabel: "February 2024", income: 5800000 },
      { dateLabel: "Mar", tooltipDateLabel: "March 2024", income: 2100000 },
      { dateLabel: "Apr", tooltipDateLabel: "April 2024", income: 7900000 },
      { dateLabel: "May", tooltipDateLabel: "May 2024", income: 4500000 },
      { dateLabel: "Jun", tooltipDateLabel: "June 2024", income: 9200000 },
      { dateLabel: "Jul", tooltipDateLabel: "July 2024", income: 6800000 },
      { dateLabel: "Aug", tooltipDateLabel: "August 2024", income: 11000000 },
    ],
    width: "100%",
    height: 200,
  },
};

export const SmallValues = {
  args: {
    data: [
      { dateLabel: "Mon", tooltipDateLabel: "Monday", income: 45000 },
      { dateLabel: "Tue", tooltipDateLabel: "Tuesday", income: 67000 },
      { dateLabel: "Wed", tooltipDateLabel: "Wednesday", income: 52000 },
      { dateLabel: "Thu", tooltipDateLabel: "Thursday", income: 89000 },
      { dateLabel: "Fri", tooltipDateLabel: "Friday", income: 73000 },
    ],
    width: "100%",
    height: 180,
  },
};

export const LargeValues = {
  args: {
    data: [
      { dateLabel: "2020", tooltipDateLabel: "Year 2020", income: 450000000 },
      { dateLabel: "2021", tooltipDateLabel: "Year 2021", income: 680000000 },
      { dateLabel: "2022", tooltipDateLabel: "Year 2022", income: 920000000 },
      { dateLabel: "2023", tooltipDateLabel: "Year 2023", income: 1200000000 },
      { dateLabel: "2024", tooltipDateLabel: "Year 2024", income: 1500000000 },
    ],
    width: "100%",
    height: 220,
  },
};

export const Playground = {
  args: {
    data: sampleData,
    width: "100%",
    height: 182,
  },
};
