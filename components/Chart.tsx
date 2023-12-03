import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
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
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis
          dataKey="name"
          name="Time"
          tickFormatter={(unixTime) => {
            const date = new Date(unixTime);
            return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()}`;
          }}
        />
        <YAxis dataKey="txfee" name="Price" />
        <Tooltip />
        <Line type="monotone" dot={false} dataKey="txfee" stroke="#2563eb" />
      </LineChart>
    </ResponsiveContainer>
  );
};
