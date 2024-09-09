export interface CurrencyRates {
  [key: string]: number;
}

export interface CurrencyApiResponse {
  date: string;
  [currencyCode: string]: CurrencyRates | string;
}
