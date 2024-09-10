import { CurrencySettings } from '../src';
import Currency from '../src/currency';

describe('Currency', () => {
  test('should initialize with a number', () => {
    const c = new Currency(1234.56);
    expect(c.value).toBe(1234.56);
    expect(c.intValue).toBe(123456);
  });

  test('should initialize with a string', () => {
    const c = new Currency('5678.90');
    expect(c.value).toBe(5678.9);
    expect(c.intValue).toBe(567890);
  });

  test('should initialize with a Currency instance', () => {
    const c1 = new Currency(100);
    const c2 = new Currency(c1);
    expect(c2.value).toBe(100);
    expect(c2.intValue).toBe(10000);
  });

  test('should add two Currency values', () => {
    const c1 = new Currency(1234.56);
    const c2 = new Currency(5678.9);
    const result = c1.add(c2);
    expect(result.value).toBe(6913.46);
    expect(result.intValue).toBe(691346);
  });

  test('should subtract two Currency values', () => {
    const c1 = new Currency(1000);
    const result = c1.subtract(100);
    expect(result.value).toBe(900);
    expect(result.intValue).toBe(90000);
  });

  test('should multiply a Currency value', () => {
    const c = new Currency(100);
    const result = c.multiply(2);
    expect(result.value).toBe(200);
    expect(result.intValue).toBe(20000);
  });

  test('should divide a Currency value', () => {
    const c = new Currency(100);
    const result = c.divide(2);
    expect(result.value).toBe(50);
    expect(result.intValue).toBe(5000);
  });

  test('should distribute Currency evenly', () => {
    const c = new Currency(100);
    const parts = c.distribute(3);
    expect(parts.length).toBe(3);
    expect(parts[0].value).toBe(33.34);
    expect(parts[1].value).toBe(33.33);
    expect(parts[2].value).toBe(33.33);
  });

  test('should format with default settings', () => {
    const c = new Currency(1234.56);
    expect(c.format()).toBe('$1,234.56');
  });

  test('should format with custom settings', () => {
    const euroSettings: Partial<CurrencySettings> = {
      symbol: '€',
      separator: '.',
      decimal: ',',
    };
    const c = new Currency(98765.43);
    expect(c.format(euroSettings)).toBe('€98.765,43');
  });

  test('should return dollars and cents separately', () => {
    const c = new Currency(1234.56);
    expect(c.dollars()).toBe(1234);
    expect(c.cents()).toBe(56);
  });

  test('should handle invalid input gracefully without throwing', () => {
    const c = new Currency('invalid value');
    expect(c.value).toBe(0);
    expect(c.intValue).toBe(0);
  });

  test('should throw error for invalid input when errorOnInvalid is set', () => {
    expect(() => {
      new Currency('invalid value', { errorOnInvalid: true });
    }).toThrow('Invalid input');
  });

  test('should convert currency to words', () => {
    const c = new Currency(1234.56);
    expect(c.toWords()).toBe('One Thousand Two Hundred Thirty Four Dollars And Fifty Six Cents Only');
  });
});
