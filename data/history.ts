import { ChartHistoryData } from "@/components/Chart";
import { mockOwlApiWeek } from "./mock";
import { OwlApiResponseType } from "./types";

const formatData = (data: OwlApiResponseType): ChartHistoryData =>
  data.candles
    .map((d) => ({
      time: new Date(d.timestamp).getTime(),
      txFeeAverage:
        d.txFee.open + d.txFee.close + d.txFee.low + d.txFee.high / 4,
    }))
    .reverse();

export const fetchHistoryData = async () => {
  // we have mocking data because of api rate limit
  if (process.env.MOCK_DATA === "true") return formatData(mockOwlApiWeek);

  const key = process.env.API_KEY;
  const aWeekAgoTimeStamp = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
  const res = await fetch(
    `https://api.owlracle.info/v4/eth/history?apikey=${key}&txfee=true&timeframe=1440&candles=7&from=${aWeekAgoTimeStamp}`
  );
  const data = await res.json();
  return formatData(data);
};
