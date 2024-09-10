import Currency from '../currency';
import { ToWordsOptions } from './to-word.type';

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
  toWords?: ToWordsOptions;
};
