import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type ChartProps = {
  data: {
    name: string;
    txfee: number;
  }[];
};

export const Chart = ({ data }: ChartProps) => {
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
          dataKey="name"
          name="Time"
          type="number"
          domain={["auto", "auto"]}
          tickFormatter={(unixTime) => {
            const date = new Date(unixTime);
            return `${date.getDate()}/${date.getMonth() + 1}`;
          }}
          tickCount={5}
          tickSize={0}
          tickMargin={12}
          stroke="white"
          strokeWidth={0.5}
        />
        <YAxis
          dataKey="txfee"
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
            // hour minutes and day and month
            return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${
              date.getMonth() + 1
            }`;
          }}
          formatter={(v) => `${Number(v).toFixed(2)} USD`}
        />
        <Area
          type="monotone"
          dataKey="txfee"
          dot={false}
          stroke="#1e40af"
          fillOpacity={1}
          fill="url(#colorTxFee)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
