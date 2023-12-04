import { ChartHistoryData } from "@/components/Chart";
import { OwlApiResponseType } from "./types";

const formatData = (
  data: OwlApiResponseType,
  count: number
): ChartHistoryData =>
  data.candles
    .slice(0, count)
    .map((d) => ({
      time: new Date(d.timestamp).getTime(),
      txFeeAverage:
        d.txFee.open + d.txFee.close + d.txFee.low + d.txFee.high / 4,
    }))
    .reverse();

export const fetchHistoryData = async (
  days: number,
  timeFrame: number,
  candles: number
) => {
  const key = process.env.API_KEY;
  const fromTimeStamp = new Date().getTime() - days * 24 * 60 * 60 * 1000;
  const res = await fetch(
    `https://api.owlracle.info/v4/eth/history?apikey=${key}&txfee=true&timeframe=${timeFrame}&candles=${candles}&from=${fromTimeStamp}`
  );
  const data = await res.json();
  return formatData(data, candles);
};

export const mapTimeToDays = (time: string) => {
  switch (time) {
    case "day": {
      return {
        days: 1,
        timeFrame: 60,
        candles: 24,
      };
    }
    case "week":
      return {
        days: 7,
        timeFrame: 1440,
        candles: 7,
      };
    case "month":
      return {
        days: 30,
        timeFrame: 1440,
        candles: 30,
      };
    default:
      return {
        days: 7,
        timeFrame: 1440,
        candles: 7,
      };
  }
};
