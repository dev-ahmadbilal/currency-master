import { CountryCurrencyMap } from './types/country-currency.map';

// Define a type for valid country codes (keys of the object)
type CountryCode = keyof typeof CountryCurrencyMap;

export class CountryCurrencyCode {
  // Object containing country codes as keys and currency codes as values
  private static countryCurrencyMap = CountryCurrencyMap;

  /**
   * Returns the currency code for a given country code.
   *
   * @param {string} countryCode - The ISO 3166-1 alpha-2 country code.
   * @returns {string | null} - The ISO 4217 currency code or null if the country code is invalid.
   *
   * @example
   * ```ts
   * const currency = CountryCurrencyCode.getCurrencyByCountryCode('US');
   * console.log(currency); // Output: 'USD'
   *
   * const invalidCurrency = CountryCurrencyCode.getCurrencyByCountryCode('XYZ');
   * console.log(invalidCurrency); // Output: null
   * ```
   */
  public static getCurrencyByCountryCode(countryCode: string): string | null {
    const upperCaseCountryCode = countryCode.toUpperCase() as CountryCode;
    return CountryCurrencyCode.countryCurrencyMap[upperCaseCountryCode] || null;
  }

  /**
   * Returns the list of country codes associated with a given currency code.
   *
   * @param {string} currencyCode - The ISO 4217 currency code.
   * @returns {string[] | null} - An array of country codes that use this currency or null if none are found.
   *
   * @example
   * ```ts
   * const countries = CountryCurrencyCode.getCountriesByCurrencyCode('USD');
   * console.log(countries); // Output: ['US', 'UM']
   * ```
   */
  public static getCountriesByCurrencyCode(currencyCode: string): string[] | null {
    const countries = Object.keys(CountryCurrencyCode.countryCurrencyMap).filter(
      (country) => CountryCurrencyCode.countryCurrencyMap[country as CountryCode] === currencyCode.toUpperCase(),
    );

    return countries.length ? countries : null;
  }

  /**
   * Returns a list of all available country codes.
   *
   * @returns {string[]} - An array of all available country codes.
   *
   * @example
   * ```ts
   * const countries = CountryCurrencyCode.getAllCountryCodes();
   * console.log(countries); // Output: ['AF', 'AL', 'DZ', ...]
   * ```
   */
  public static getAllCountryCodes(): string[] {
    return Object.keys(CountryCurrencyCode.countryCurrencyMap);
  }

  /**
   * Returns a list of all unique currency codes.
   *
   * @returns {string[]} - An array of unique currency codes.
   *
   * @example
   * ```ts
   * const currencies = CountryCurrencyCode.getAllCurrencyCodes();
   * console.log(currencies); // Output: ['AFN', 'ALL', 'USD', ...]
   * ```
   */
  public static getAllCurrencyCodes(): string[] {
    const currencySet = new Set(Object.values(CountryCurrencyCode.countryCurrencyMap));
    return Array.from(currencySet);
  }
}
