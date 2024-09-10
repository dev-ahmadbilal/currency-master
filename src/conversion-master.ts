import { CurrencyEnum } from './types/currency.enum';
import { CurrencyApiResponse, CurrencyRates } from './types/currency-converter-api-response';

const API_BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api';
export class ConversionMaster {
  /**
   * Formats the given date into the `YYYY-MM-DD` format.
   *
   * @param date - The date object to format.
   * @returns The formatted date string in `YYYY-MM-DD` format.
   *
   * @example
   * const conversionMaster = new ConversionMaster();
   * const formattedDate = conversionMaster.formatDate(new Date());
   * console.log(formattedDate); // Output: "2024-09-09" (depends on the current date)
   */
  private static formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // Converts to YYYY-MM-DD
  }

  /**
   * Fetches currency rates for a given currency from the API. Optionally, you can pass a specific date for historical rates.
   *
   * @param currency - The base currency you want to fetch rates for (e.g., `CurrencyEnum.USD`).
   * @param date - (Optional) A specific date to fetch historical rates. If omitted, the latest rates will be fetched.
   * @returns A promise that resolves to the currency rates.
   *
   * @example
   * const conversionMaster = new ConversionMaster();
   * const rates = await conversionMaster.getCurrencyRates(CurrencyEnum.USD);
   * console.log(rates); // Output: { "eur": 0.92, "gbp": 0.80, "inr": 73.25, ... }
   *
   * // Fetching historical rates
   * const historicalRates = await conversionMaster.getCurrencyRates(CurrencyEnum.USD, '2024-09-01');
   * console.log(historicalRates); // Output: { "eur": 0.90, "gbp": 0.78, "inr": 72.50, ... }
   */
  static async getCurrencyRates(currency: CurrencyEnum, date?: string): Promise<CurrencyRates> {
    try {
      const formattedDate = date || ConversionMaster.formatDate(new Date());
      const url = `${API_BASE_URL}@${formattedDate}/v1/currencies/${currency.toLowerCase()}.json`;
      const response = await fetch(url);
      const data: CurrencyApiResponse = await response.json();
      return data[currency] as CurrencyRates;
    } catch (error) {
      throw new Error('Error fetching currency rates: ' + error);
    }
  }

  /**
   * Converts a given amount from one currency to another based on real-time or historical exchange rates.
   *
   * @param from - The base currency to convert from (e.g., `CurrencyEnum.USD`).
   * @param to - The target currency to convert to (e.g., `CurrencyEnum.EUR`).
   * @param amount - The amount of base currency to convert.
   * @param date - (Optional) A specific date to fetch historical rates. If omitted, the latest rates will be used.
   * @returns A promise that resolves to the converted amount as a string with two decimal places.
   *
   * @example
   * const conversionMaster = new ConversionMaster();
   * const convertedAmount = await conversionMaster.convertCurrency(CurrencyEnum.USD, CurrencyEnum.EUR, 100);
   * console.log(convertedAmount); // Output: "92.00" (depending on the exchange rate)
   *
   * // Converting with historical rates
   * const historicalConversion = await conversionMaster.convertCurrency(CurrencyEnum.USD, CurrencyEnum.EUR, 100, '2024-09-01');
   * console.log(historicalConversion); // Output: "90.00" (depending on the historical rate)
   */
  static async convert(from: CurrencyEnum, to: CurrencyEnum, amount: number, date?: string): Promise<string> {
    try {
      const fromRates = await ConversionMaster.getCurrencyRates(from, date);

      if (!fromRates[to]) {
        throw new Error(`Conversion rate not available for ${from} to ${to}`);
      }

      const conversionRate = fromRates[to];
      const convertedAmount = amount * conversionRate;

      return convertedAmount.toFixed(2);
    } catch (error) {
      throw new Error('Error converting currency: ' + error);
    }
  }
}
