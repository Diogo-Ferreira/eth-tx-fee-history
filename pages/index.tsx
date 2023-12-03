import { Chart } from "@/components/Chart";
import { mockOwlApi } from "@/data/mock";
import { OwlApiResponseType } from "@/data/types";

type HomeProps = {
  data: {
    name: string;
    txfee: number;
  }[];
}

export default function Home({ data }: HomeProps) {
  return (
    <main>
      <div className="flex flex-col items-center gap-10 justify-center mt-10">
        <h1>Ethereum average paid transaction fee over time</h1>
        <div className="w-96 h-80 mx-auto">
          <Chart data={data} />
        </div>
      </div>
    </main>
  );
}

const processData = (data: OwlApiResponseType) => {
  const chartData = data.candles.map((d) => ({
    name: new Date(d.timestamp).toLocaleDateString(),
    txfee: d.txFee.low + d.txFee.high / 2,
  })).reverse();
  return chartData;
}

export const getServerSideProps = async () => {
  const key = process.env.API_KEY;
  const aDayAgoTimeStamp = new Date().getTime() - 24 * 60 * 60 * 1000;
  // TODO: uncomment this when api is fixed
  /*const res = await fetch(
    `https://api.owlracle.info/v4/eth/history?apikey=${key}&txfee=true&timeframe=60&from=${aDayAgoTimeStamp}`
  );
  const data = await res.json();*/
  const data = processData(mockOwlApi)
  return {
    props: {
      data,
    },
  };
};
