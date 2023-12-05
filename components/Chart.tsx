import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";

export type ChartHistoryData = {
  time: number;
  txFeeAverage: number;
}[];

type ChartProps = {
  data: ChartHistoryData;
  precision?: "day" | "hour";
};

const buildDateFormater =
  (precision: "day" | "hour" | "full") => (unixTimestamp: number) =>
    format(
      new Date(unixTimestamp),
      precision === "hour"
        ? "HH:mm"
        : precision === "day"
        ? "d MMM"
        : "d MMM HH:mm"
    );

export const Chart = ({ data, precision = "day" }: ChartProps) => {
  return (
    <ResponsiveContainer>
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id="colorTxFee" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f8fafc" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#f8fafc" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="time"
          name="Time"
          type="number"
          domain={["auto", "auto"]}
          tickFormatter={buildDateFormater(precision)}
          tickSize={5}
          tickMargin={12}
          stroke="white"
          strokeWidth={0.5}
        />
        <YAxis
          dataKey="txFeeAverage"
          name="Price"
          stroke="white"
          strokeWidth={0.5}
          tickSize={0}
          tickMargin={12}
          label={{
            value: "Avg Tx fee paid (USD)",
            stroke: "white",
            fill: "white",
            angle: -90,
            position: "insideLeft",
          }}
        />

        <CartesianGrid stroke="#f8fafc" vertical={false} opacity={0.2} />
        <Tooltip
          labelFormatter={buildDateFormater(
            precision === "hour" ? "full" : "day"
          )}
          formatter={(v) => `${Number(v).toFixed(2)} USD`}
          contentStyle={{
            background: "#020617",
          }}
          labelStyle={{
            color: "#ffffff",
          }}
        />

        <Area
          type="monotone"
          dataKey="txFeeAverage"
          dot={false}
          stroke="#f8fafc"
          fillOpacity={1}
          fill="url(#colorTxFee)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
