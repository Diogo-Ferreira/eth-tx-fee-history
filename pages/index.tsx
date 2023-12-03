import { Chart } from "@/components/Chart";
import { mockOwlApiWeek } from "@/data/mock";
import { OwlApiResponseType } from "@/data/types";

type HomeProps = {
  data: {
    name: string;
    txfee: number;
  }[];
};

export default function Home({ data }: HomeProps) {
  return (
    <main>
      <div className="flex flex-col items-center gap-10 justify-center mt-10">
        <h1 className="text-5xl font-black text-stone-50">
          Ethereum transaction fee history
        </h1>
        <div className="w-[800px] h-[400px] mx-auto">
          <Chart data={data} />
        </div>
      </div>
    </main>
  );
}

const processData = (data: OwlApiResponseType) => {
  console.log(data);
  const chartData = data.candles
    .slice(0, 30)
    .map((d) => ({
      name: new Date(d.timestamp).getTime(),
      txfee: d.txFee.low + d.txFee.high / 2,
    }))
    .reverse();
  return chartData;
};

export const getServerSideProps = async () => {
  /*const key = process.env.API_KEY;
  const threeMonthAgoTimeStamp = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
  const res = await fetch(
    `https://api.owlracle.info/v4/eth/history?apikey=${key}&txfee=true&timeframe=1440&from=${threeMonthAgoTimeStamp}`
  );
  const data = await res.json();*/
  const data = mockOwlApiWeek;
  return {
    props: {
      data: processData(data),
      data2: data,
    },
  };
};
