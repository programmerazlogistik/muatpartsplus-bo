import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { tMockFn } from "../../lib/mock-t";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  dataKeys: Array<{ key: string; shorthand?: string }>;
  t?: (key: string, values?: Record<string, any>, fallback?: string) => string;
}

// The CustomTooltip remains unchanged.
const CustomTooltip = ({ active, payload, label, dataKeys, t = tMockFn }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum, entry) => sum + entry.value, 0);
    return (
      <div className="shadow-muat h-[84px] w-[136px] rounded-md bg-white p-2">
        <p className="text-xxs font-bold text-neutral-900">{`${label}`}</p>
        <p className="text-xxs mb-1 font-bold text-neutral-900">{`(${total} ${t("BarChart.unitOrders", {}, "Pesanan")})`}</p>
        <hr className="-ml-2 w-[136px]" />
        <div className="mt-1.5 flex flex-col gap-y-1.5">
          {payload.map((entry, index) => {
            const dataKeyInfo = dataKeys.find((dk) => dk.key === entry.dataKey);
            const shorthand = dataKeyInfo ? dataKeyInfo.shorthand : entry.name;

            return (
              <div
                key={`item-${index}`}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-x-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <p className="text-xxs font-medium text-neutral-600">{`${shorthand} :`}</p>
                </div>
                <p className="text-xxs font-semibold text-neutral-900">
                  {entry.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};

interface DynamicRoundedBarProps {
  payload: Record<string, any>;
  dataKeys: Array<{ key: string; shorthand?: string }>;
  currentDataKey: string;
  radiusValue: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
}

// ✅ ADDED: New shape component with dynamic rounding logic.
// This component checks which bar is visibly on top for each stack and applies the radius.
const DynamicRoundedBar = (props: DynamicRoundedBarProps) => {
  const {
    payload,
    dataKeys,
    currentDataKey,
    radiusValue,
    ...rest // Recharts props like x, y, width, height, fill
  } = props;

  // Find the key of the topmost bar that has a value > 0 for this data point
  let topVisibleKey = null;
  // Iterate from the top of the stack downwards
  for (let i = dataKeys.length - 1; i >= 0; i--) {
    const key = dataKeys[i].key;
    if (payload[key] > 0) {
      topVisibleKey = key;
      break; // Found the highest visible bar, stop searching
    }
  }

  // Apply rounding only if the current bar segment is the topmost visible one
  const shouldBeRounded = currentDataKey === topVisibleKey;

  if (shouldBeRounded) {
    return <Rectangle {...rest} radius={[radiusValue, radiusValue, 0, 0]} />;
  }

  // Otherwise, render a standard, non-rounded rectangle
  return <Rectangle {...rest} />;
};

interface CustomLegendProps {
  payload?: Array<{ value: string; color: string }>;
}

// The CustomLegend remains unchanged.
const CustomLegend = (props: CustomLegendProps) => {
  const { payload } = props;
  return (
    <div className="ml-8 flex items-center justify-center pb-6">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="mr-4 flex items-center last:mr-0">
          <div
            className="mr-2 h-3 w-3"
            style={{
              backgroundColor: entry.color,
              borderRadius: "3px",
            }}
          />
          <span className="text-xs font-medium text-neutral-600">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

interface BarChartProps {
  data: Record<string, any>[];
  xAxisKey: string;
  dataKeys: Array<{ key: string; name: string; shorthand?: string }>;
  colors: string[];
  showXAxisLine?: boolean;
  radiusValue?: number;
  maxBarSize?: number;
  barCategoryGap?: string;
  barSize?: number;
  t?: (key: string, values?: Record<string, any>, fallback?: string) => string;
}

/**
 * BarChart component with stacked bars, tooltips, and legends.
 * Perfect for displaying comparative data with multiple categories.
 */
const CustomBarChart = ({
  data,
  xAxisKey,
  dataKeys,
  colors,
  showXAxisLine = true,
  radiusValue = 6,
  maxBarSize = 60,
  barCategoryGap = "35%",
  barSize,
  t = tMockFn,
}) => {
  const tickFontSize = data && data.length > 3 ? 10 : 12;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 10,
          left: -20,
          bottom: 5,
        }}
        barCategoryGap={barCategoryGap}
        barSize={barSize}
      >
        <CartesianGrid vertical={false} stroke="#d9d9d9" />
        <XAxis
          dataKey={xAxisKey}
          axisLine={showXAxisLine ? { stroke: "#d9d9d9" } : false}
          tickLine={false}
          tick={{ fontSize: tickFontSize.toString(), fill: "#7b7b7b", fontWeight: 500 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: "12", fill: "#7b7b7b", fontWeight: 500 }}
        />
        <Tooltip
          content={({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string | number }) => <CustomTooltip active={active} payload={payload} label={label?.toString()} dataKeys={dataKeys} />}
          cursor={{ fill: "transparent" }}
        />
        <Legend verticalAlign="top" align="center" content={<CustomLegend />} />
        {dataKeys.map((item) => {
          const barColor =
            item.key ===
            t("BarChart.chartKeyInstantOrders", {}, "Pesanan Instan")
              ? colors[0]
              : colors[1];

          return (
            <Bar
              key={item.key}
              dataKey={item.key}
              name={item.name}
              stackId="a"
              fill={barColor}
              maxBarSize={maxBarSize}
              // ✅ UPDATED: Use the new dynamic shape component for every bar segment.
              shape={(props: any) => (
                <DynamicRoundedBar
                  payload={props.payload}
                  dataKeys={dataKeys}
                  currentDataKey={item.key}
                  radiusValue={radiusValue}
                  x={props.x}
                  y={props.y}
                  width={props.width}
                  height={props.height}
                  fill={props.fill}
                />
              )}
              activeBar={false}
            />
          );
        })}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
