import { Chart, ChartHistoryData } from "@/components/Chart";
import { FilterButton } from "@/components/FilterButton";
import { fetchHistoryData, mapTimeToDays } from "@/data/history";
import { NextPageContext } from "next";

type HomeProps = {
  data: ChartHistoryData;
  time?: string;
};

export default function Home({ data, time }: HomeProps) {
  return (
    <main>
      <div className="flex flex-col items-center gap-10 justify-center mt-20">
        <h1 className="text-5xl font-black text-stone-50">
          Ethereum average paid TX fee
        </h1>
        <div className="flex gap-4">
          <FilterButton href="/?time=day" active={time === "day"}>
            24 hours
          </FilterButton>
          <FilterButton href="/?time=week" active={time === "week"}>
            7 days
          </FilterButton>
          <FilterButton href="/?time=month" active={time === "month"}>
            30 days
          </FilterButton>
        </div>
        <div className="w-[800px] h-[400px] mx-auto">
          <Chart data={data} precision={time === "day" ? "hour" : "day"} />
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps = async (context: NextPageContext) => {
  const { days, timeFrame, candles } = mapTimeToDays(
    context.query.time as string
  );
  const data = await fetchHistoryData(days, timeFrame, candles);
  return {
    props: {
      data,
      time: context.query.time ?? "day",
    },
  };
};
