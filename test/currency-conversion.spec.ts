/* eslint-disable @typescript-eslint/no-explicit-any */
import { CurrencyConversion, CurrencyEnum } from '../src';

describe('CurrencyConversion (Real API Calls)', () => {
  describe('formatDate', () => {
    it('should format the date as YYYY-MM-DD', () => {
      const date = new Date('2024-09-09T12:34:56Z');
      const formattedDate = (CurrencyConversion as any).formatDate(date);
      expect(formattedDate).toBe('2024-09-09');
    });
  });

  describe('getCurrencyRates', () => {
    it('should fetch the latest currency rates from the real API', async () => {
      const rates = await CurrencyConversion.getCurrencyRates(CurrencyEnum.UnitedStatesDollar);
      expect(rates).toHaveProperty('eur'); // Test against EUR rate
      expect(rates).toHaveProperty('gbp'); // Test against GBP rate
    });

    it('should fetch historical currency rates from the real API', async () => {
      const rates = await CurrencyConversion.getCurrencyRates(CurrencyEnum.UnitedStatesDollar, '2024-03-06');
      expect(rates).toHaveProperty('eur'); // Test against EUR rate
      expect(rates).toHaveProperty('gbp'); // Test against GBP rate
    });
  });

  describe('convert', () => {
    it('should convert 100 USD to EUR using the real API', async () => {
      const convertedAmount = await CurrencyConversion.convert(CurrencyEnum.UnitedStatesDollar, CurrencyEnum.Euro, 100);
      expect(typeof convertedAmount).toBe('string');
      expect(parseFloat(convertedAmount)).toBeGreaterThan(0);
    });

    it('should convert 100 USD to EUR using historical rates from the real API', async () => {
      const convertedAmount = await CurrencyConversion.convert(
        CurrencyEnum.UnitedStatesDollar,
        CurrencyEnum.Euro,
        100,
        '2024-03-06',
      );
      expect(typeof convertedAmount).toBe('string');
      expect(parseFloat(convertedAmount)).toBeGreaterThan(0);
    });
  });
});
