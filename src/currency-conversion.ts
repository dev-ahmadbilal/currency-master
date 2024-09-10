import { CurrencyEnum } from './types/currency.enum';
import { CurrencyApiResponse, CurrencyRates } from './types/currency-converter-api-response';

const API_BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api';
const FALLBACK_API_BASE_URL = 'https://{date}.currency-api.pages.dev';

export class CurrencyConversion {
  /**
   * Formats the given date into the `YYYY-MM-DD` format.
   *
   * @param date - The date object to format.
   * @returns The formatted date string in `YYYY-MM-DD` format.
   *
   * @example
   * const currencyConversion = new CurrencyConversion();
   * const formattedDate = currencyConversion.formatDate(new Date());
   * console.log(formattedDate); // Output: "2024-09-09" (depends on the current date)
   */
  private static formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // Converts to YYYY-MM-DD
  }

  /**
   * Attempts to fetch currency rates from the primary and fallback APIs.
   *
   * @param url - The API URL to fetch data from.
   * @returns A promise that resolves to the fetched currency rates.
   */
  private static async fetchRates(url: string): Promise<CurrencyApiResponse> {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch from primary API');
      return await response.json();
    } catch (primaryError) {
      console.warn('Primary API failed. Attempting fallback API.');
      throw primaryError;
    }
  }

  /**
   * Fetches currency rates for a given currency from the API. Optionally, you can pass a specific date for historical rates.
   *
   * @param currency - The base currency you want to fetch rates for (e.g., `CurrencyEnum.USD`).
   * @param date - (Optional) A specific date to fetch historical rates. If omitted, the latest rates will be fetched.
   * @returns A promise that resolves to the currency rates.
   *
   * @example
   * const currencyConversion = new CurrencyConversion();
   * const rates = await currencyConversion.getCurrencyRates(CurrencyEnum.USD);
   * console.log(rates); // Output: { "eur": 0.92, "gbp": 0.80, "inr": 73.25, ... }
   *
   * // Fetching historical rates
   * const historicalRates = await currencyConversion.getCurrencyRates(CurrencyEnum.USD, '2024-09-01');
   * console.log(historicalRates); // Output: { "eur": 0.90, "gbp": 0.78, "inr": 72.50, ... }
   */
  static async getCurrencyRates(currency: CurrencyEnum, date?: string): Promise<CurrencyRates> {
    const sourceCurrency = currency.toLowerCase();
    const formattedDate = date || CurrencyConversion.formatDate(new Date());
    const primaryUrl = `${API_BASE_URL}@${formattedDate}/v1/currencies/${sourceCurrency}.json`;
    const fallbackUrl = `${FALLBACK_API_BASE_URL.replace('{date}', formattedDate)}/v1/currencies/${sourceCurrency}.json`;

    try {
      const data = await CurrencyConversion.fetchRates(primaryUrl);
      return data[sourceCurrency] as CurrencyRates;
    } catch {
      try {
        const data = await CurrencyConversion.fetchRates(fallbackUrl);
        return data[sourceCurrency] as CurrencyRates;
      } catch (error) {
        throw new Error('Error fetching currency rates from both primary and fallback APIs: ' + error);
      }
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
   * const currencyConversion = new CurrencyConversion();
   * const convertedAmount = await currencyConversion.convert(CurrencyEnum.USD, CurrencyEnum.EUR, 100);
   * console.log(convertedAmount); // Output: "92.00" (depending on the exchange rate)
   *
   * // Converting with historical rates
   * const historicalConversion = await currencyConversion.convert(CurrencyEnum.USD, CurrencyEnum.EUR, 100, '2024-09-01');
   * console.log(historicalConversion); // Output: "90.00" (depending on the historical rate)
   */
  static async convert(from: CurrencyEnum, to: CurrencyEnum, amount: number, date?: string): Promise<string> {
    try {
      const targetCurrency = to.toLowerCase();
      const fromRates = await CurrencyConversion.getCurrencyRates(from, date);

      if (!fromRates[targetCurrency]) {
        throw new Error(`Conversion rate not available for ${from} to ${to}`);
      }

      const conversionRate = fromRates[targetCurrency];
      const convertedAmount = amount * conversionRate;

      return convertedAmount.toFixed(2);
    } catch (error) {
      throw new Error('Error converting currency: ' + error);
    }
  }
}
