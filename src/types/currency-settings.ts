import Currency from '../currency';

export type CurrencySettings = {
  symbol: string;
  separator: string;
  decimal: string;
  errorOnInvalid: boolean;
  precision: number;
  pattern: string;
  negativePattern: string;
  fromCents: boolean;
  increment?: number;
  useVedic?: boolean;
  groups: RegExp;
  format: (currency: Currency, settings: CurrencySettings) => string;
};
