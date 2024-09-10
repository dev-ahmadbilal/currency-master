import { CountryCurrencyCode } from '../src/country-currency-code';
import { CountryCurrencyMap } from '../src/types/country-currency.map';

describe('CountryCurrencyCode', () => {
  describe('getCurrencyByCountryCode', () => {
    it('should return the correct currency code for a valid country code', () => {
      const currency = CountryCurrencyCode.getCurrencyByCountryCode('US');
      expect(currency).toBe('USD');
    });

    it('should return null for an invalid country code', () => {
      const currency = CountryCurrencyCode.getCurrencyByCountryCode('XYZ');
      expect(currency).toBeNull();
    });

    it('should handle case-insensitive country codes', () => {
      const currency = CountryCurrencyCode.getCurrencyByCountryCode('us');
      expect(currency).toBe('USD');
    });
  });

  describe('getCountriesByCurrencyCode', () => {
    it('should return an array of countries that use the given currency code', () => {
      const countries = CountryCurrencyCode.getCountriesByCurrencyCode('USD');
      expect(countries).toEqual(['EC', 'FM', 'MH', 'SV', 'TC', 'TL', 'US']);
    });

    it('should return null if no country uses the given currency code', () => {
      const countries = CountryCurrencyCode.getCountriesByCurrencyCode('XYZ');
      expect(countries).toBeNull();
    });

    it('should handle case-insensitive currency codes', () => {
      const countries = CountryCurrencyCode.getCountriesByCurrencyCode('usd');
      expect(countries).toEqual(['EC', 'FM', 'MH', 'SV', 'TC', 'TL', 'US']);
    });
  });

  describe('getAllCountryCodes', () => {
    it('should return an array of all country codes', () => {
      const countryCodes = CountryCurrencyCode.getAllCountryCodes();
      const expectedCountryCodes = Object.keys(CountryCurrencyMap);
      expect(countryCodes).toEqual(expectedCountryCodes);
    });
  });

  describe('getAllCurrencyCodes', () => {
    it('should return an array of all unique currency codes', () => {
      const currencyCodes = CountryCurrencyCode.getAllCurrencyCodes();
      const uniqueCurrencyCodes = Array.from(new Set(Object.values(CountryCurrencyMap)));
      expect(currencyCodes).toEqual(uniqueCurrencyCodes);
    });
  });
});
