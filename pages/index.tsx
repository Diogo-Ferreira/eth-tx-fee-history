import { Chart, ChartHistoryData } from "@/components/Chart";
import { fetchHistoryData } from "@/data/history";

type HomeProps = {
  data: ChartHistoryData;
};

export default function Home({ data }: HomeProps) {
  return (
    <main>
      <div className="flex flex-col items-center gap-20 justify-center mt-20">
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

export const getServerSideProps = async () => {
  const data = await fetchHistoryData();
  return {
    props: {
      data,
    },
  };
};
