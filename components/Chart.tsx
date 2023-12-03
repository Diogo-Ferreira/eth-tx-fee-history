import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type ChartHistoryData = {
  time: number;
  txFeeAverage: number;
}[];

type ChartProps = {
  data: ChartHistoryData;
  precision?: "day" | "hour";
};

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
            <stop offset="5%" stopColor="#1e40af" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#1e40af" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="time"
          name="Time"
          type="number"
          domain={[data[0].time, data[data.length - 1].time]}
          tickFormatter={(unixTime) => {
            const date = new Date(unixTime);
            return precision === "hour"
              ? `${date.getHours()}:${date.getMinutes()}`
              : `${date.getDate()}/${date.getMonth() + 1}`;
          }}
          tickCount={5}
          tickSize={0}
          tickMargin={12}
          stroke="white"
          strokeWidth={0.5}
        />
        <YAxis
          dataKey="txFeeAverage"
          name="Price"
          label={{
            value: "Transaction Cost (USD)",
            angle: -90,
            position: "insideLeft",
            stroke: "white",
          }}
          stroke="white"
          strokeWidth={0.5}
          tickSize={0}
          tickMargin={12}
        />
        <Tooltip
          labelFormatter={(unixTimestamp) => {
            const date = new Date(unixTimestamp);
            return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${
              date.getMonth() + 1
            }`;
          }}
          formatter={(v) => `${Number(v).toFixed(2)} USD`}
        />
        <Area
          type="monotone"
          dataKey="txFeeAverage"
          dot={false}
          stroke="#1e40af"
          fillOpacity={1}
          fill="url(#colorTxFee)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
