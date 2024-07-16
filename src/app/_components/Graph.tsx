"use client";

import dynamic from "next/dynamic";
import { Area } from "recharts";

const DynamicAreaChart = dynamic(
  () => import("recharts").then((recharts) => recharts.AreaChart),
  { ssr: false }
);

interface ChartProps {
  dataPoints: number[];
  netDiff: number;
}

export const Chart: React.FC<ChartProps> = ({ dataPoints, netDiff }) => {
  let data: { point: number }[] = [];
  dataPoints.map((point) => data.push({ point: point }));

  let gradientId;
  let strokeColor;

  if (netDiff > 0) {
    gradientId = "greenGradient";
    strokeColor = "#16A34A"; // Green
  } else if (netDiff < 0) {
    gradientId = "redGradient";
    strokeColor = "#FF0000"; // Red
  } else {
    gradientId = "grayGradient"; // Gray for netDiff 0
    strokeColor = "#A9A9A9"; // Gray
  }

  return (
    <DynamicAreaChart
      width={224}
      height={90}
      data={data}
      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
    >
      <defs>
        <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8AF9B2" stopOpacity={1} />
          <stop offset="95%" stopColor="#8AF9B2" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#FF8080" stopOpacity={1} />
          <stop offset="95%" stopColor="#FF8080" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="grayGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#D3D3D3" stopOpacity={1} />
          <stop offset="95%" stopColor="#D3D3D3" stopOpacity={0} />
        </linearGradient>
      </defs>
      <Area
        dataKey="point"
        stroke={strokeColor}
        strokeWidth={1.5}
        fill={`url(#${gradientId})`}
      />
    </DynamicAreaChart>
  );
};