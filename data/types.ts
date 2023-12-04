export type OwlApiResponseType = {
  candles: {
    timestamp: string
    txFee: {
      open: number;
      close: number;
      low: number;
      high: number;
    };
  }[]
};
