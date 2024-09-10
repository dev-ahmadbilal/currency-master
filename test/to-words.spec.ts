/* eslint-disable @typescript-eslint/no-explicit-any */
import LOCALES from '../src/locales';
import { ToWords, DefaultToWordsOptions } from '../src/to-words';

describe('ToWords', () => {
  let toWords: ToWords;

  beforeEach(() => {
    toWords = new ToWords();
  });

  describe('constructor', () => {
    it('should initialize with default options', () => {
      const toWordsInstance = new ToWords();
      expect((toWordsInstance as any).options).toEqual(DefaultToWordsOptions);
    });

    it('should override default options when custom options are passed', () => {
      const customOptions = {
        locale: 'fr',
        converterOptions: {
          currency: false,
        },
      };
      const toWordsInstance = new ToWords(customOptions);
      expect((toWordsInstance as any).options.locale).toBe('fr');
      expect((toWordsInstance as any).options.converterOptions.currency).toBe(false);
    });
  });

  describe('getLocaleClass', () => {
    it('should return the correct locale class', () => {
      const toWordsInstance = new ToWords({ locale: 'en-US' });
      const localeClass = (toWordsInstance as any).getLocaleClass();
      expect(localeClass).toBe(LOCALES['en-US']);
    });

    it('should throw an error for unknown locale', () => {
      const toWordsInstance = new ToWords({ locale: 'unknown' });
      expect(() => (toWordsInstance as any).getLocaleClass()).toThrow('Unknown Locale "unknown"');
    });
  });

  describe('convert', () => {
    it('should convert a number to words', () => {
      const result = toWords.convert(123);
      expect(result).toBe('One Hundred Twenty Three Dollars Only');
    });

    it('should handle negative numbers', () => {
      const result = toWords.convert(-123);
      expect(result).toBe('Minus One Hundred Twenty Three Dollars Only');
    });

    it('should convert a number without currency to words', () => {
      const toWordsInstance = new ToWords({
        locale: 'en-US',
        converterOptions: { currency: false },
      });
      const result = toWordsInstance.convert(123.45);
      expect(result).toBe('One Hundred Twenty Three Point Forty Five');
    });

    it('should throw an error for invalid numbers', () => {
      expect(() => toWords.convert(NaN)).toThrow('Invalid Number "NaN"');
    });
  });

  describe('convertCurrency', () => {
    it('should convert a number with currency correctly', () => {
      const result = (toWords as any).convertCurrency(123.45);
      expect(result).toEqual(['One', 'Hundred', 'Twenty', 'Three', 'Dollars', 'And', 'Forty', 'Five', 'Cents', 'Only']);
    });

    it('should handle zero currency correctly', () => {
      const result = (toWords as any).convertCurrency(0);
      expect(result).toEqual(['Zero', 'Dollars', 'Only']);
    });

    it('should handle negative currency correctly', () => {
      const result = (toWords as any).convertCurrency(-123.45);
      expect(result).toEqual([
        'Minus',
        'One',
        'Hundred',
        'Twenty',
        'Three',
        'Dollars',
        'And',
        'Forty',
        'Five',
        'Cents',
        'Only',
      ]);
    });
  });

  describe('convertNumber', () => {
    it('should convert a number without currency to words', () => {
      const result = (toWords as any).convertNumber(123);
      expect(result).toEqual(['One', 'Hundred', 'Twenty', 'Three']);
    });

    it('should handle decimal numbers correctly', () => {
      const result = (toWords as any).convertNumber(123.45);
      expect(result).toEqual(['One', 'Hundred', 'Twenty', 'Three', 'Point', 'Forty', 'Five']);
    });
  });

  describe('convertInternal', () => {
    it('should recursively convert a number to words', () => {
      const result = (toWords as any).convertInternal(123);
      expect(result).toEqual(['One', 'Hundred', 'Twenty', 'Three']);
    });
  });

  describe('isFloat', () => {
    it('should return true for a float number', () => {
      expect((toWords as any).isFloat(123.45)).toBe(true);
    });

    it('should return false for an integer number', () => {
      expect((toWords as any).isFloat(123)).toBe(false);
    });
  });

  describe('isValidNumber', () => {
    it('should return true for a valid number', () => {
      expect((toWords as any).isValidNumber(123)).toBe(true);
    });

    it('should return false for an invalid number', () => {
      expect((toWords as any).isValidNumber(NaN)).toBe(false);
    });
  });

  describe('toFixed', () => {
    it('should return the number rounded to 2 decimal places', () => {
      expect((toWords as any).toFixed(123.456)).toBe(123.46);
    });

    it('should return the number as-is if already at 2 decimal places', () => {
      expect((toWords as any).toFixed(123.45)).toBe(123.45);
    });
  });
});
