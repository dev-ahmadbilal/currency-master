import { CurrencySettings } from './types/currency-settings';

const defaultSettings: CurrencySettings = {
  symbol: '$',
  separator: ',',
  decimal: '.',
  errorOnInvalid: false,
  precision: 2,
  pattern: '!#',
  negativePattern: '-!#',
  fromCents: false,
  groups: /(\d)(?=(\d{3})+\b)/g,
  format: formatCurrency,
};

class Currency {
  public intValue: number;
  public value: number;
  private settings: CurrencySettings;
  private precisionFactor: number;

  constructor(value: number | string | Currency, options?: Partial<CurrencySettings>) {
    this.settings = { ...defaultSettings, ...options };
    this.precisionFactor = Math.pow(10, this.settings.precision);
    this.intValue = this.parseValue(value);
    this.value = this.intValue / this.precisionFactor;
    this.settings.increment ||= 1 / this.precisionFactor;

    if (this.settings.useVedic) {
      this.settings.groups = /(\d)(?=(\d\d)+\d\b)/g;
    }
  }

  /**
   * Parses the input value into an integer representation suitable for currency calculations.
   * @param value - The value to parse (number, string, or Currency instance).
   * @returns Parsed integer value.
   */
  private parseValue(value: number | string | Currency): number {
    if (value instanceof Currency) {
      return value.intValue;
    }

    if (typeof value === 'number') {
      return Math.round(value * (this.settings.fromCents ? 1 : this.precisionFactor));
    }

    const regex = new RegExp('[^-\\d' + this.settings.decimal + ']', 'g');
    const cleanedValue = parseFloat(
      value
        .replace(/\((.*)\)/, '-$1')
        .replace(regex, '')
        .replace(this.settings.decimal, '.'),
    );

    if (isNaN(cleanedValue)) {
      if (this.settings.errorOnInvalid) {
        throw new Error('Invalid input');
      }
      return 0;
    }

    return Math.round(cleanedValue * (this.settings.fromCents ? 1 : this.precisionFactor));
  }

  /**
   * Adds a specified amount to the currency value.
   * @param amount - The amount to add (number, string, or Currency instance).
   * @returns New Currency instance with the summed value.
   * @example
   * const currency = new Currency(10);
   * const result = currency.add(5); // Result is a new Currency instance with value 15
   */
  add(amount: number | string | Currency): Currency {
    const result = this.intValue + this.parseValue(amount);
    return new Currency(result / this.precisionFactor, this.settings);
  }

  /**
   * Subtracts a specified amount from the currency value.
   * @param amount - The amount to subtract (number, string, or Currency instance).
   * @returns New Currency instance with the difference.
   * @example
   * const currency = new Currency(10);
   * const result = currency.subtract(5); // Result is a new Currency instance with value 5
   */
  subtract(amount: number | string | Currency): Currency {
    const result = this.intValue - this.parseValue(amount);
    return new Currency(result / this.precisionFactor, this.settings);
  }

  /**
   * Multiplies the currency value by a specified factor.
   * @param factor - The factor to multiply by.
   * @returns New Currency instance with the multiplied value.
   * @example
   * const currency = new Currency(10);
   * const result = currency.multiply(2); // Result is a new Currency instance with value 20
   */
  multiply(factor: number): Currency {
    const result = this.intValue * factor;
    return new Currency(result / this.precisionFactor, this.settings);
  }

  /**
   * Divides the currency value by a specified divisor.
   * @param divisor - The divisor to divide by.
   * @returns New Currency instance with the divided value.
   * @example
   * const currency = new Currency(10);
   * const result = currency.divide(2); // Result is a new Currency instance with value 5
   */
  divide(divisor: number): Currency {
    const result = this.intValue / divisor;
    return new Currency(result / this.precisionFactor, this.settings);
  }

  /**
   * Distributes the currency value into an array of Currency instances evenly.
   * @param parts - The number of parts to distribute into.
   * @returns Array of Currency instances with the distributed values.
   * @example
   * const currency = new Currency(100);
   * const parts = currency.distribute(3); // Returns an array of 3 Currency instances with values [33.34, 33.33, 33.33]
   */
  distribute(parts: number): Currency[] {
    const splitValue = Math.floor(this.intValue / parts);
    const remainder = Math.abs(this.intValue - splitValue * parts);
    const distributed = [];

    for (let i = 0; i < parts; i++) {
      const amount = splitValue + (i < remainder ? Math.sign(this.intValue) : 0);
      distributed.push(new Currency(amount / this.precisionFactor, this.settings));
    }

    return distributed;
  }

  /**
   * Returns the dollar portion of the currency value.
   * @returns The dollar value as an integer.
   * @example
   * const currency = new Currency(123.45);
   * const dollars = currency.dollars(); // Returns 123
   */
  dollars(): number {
    return Math.floor(this.value);
  }

  /**
   * Returns the cent portion of the currency value.
   * @returns The cent value as an integer.
   * @example
   * const currency = new Currency(123.45);
   * const cents = currency.cents(); // Returns 45
   */
  cents(): number {
    return Math.floor(this.intValue % this.precisionFactor);
  }

  /**
   * Formats the currency value as a string according to the formatting settings.
   * @param options - Optional formatting options.
   * @returns The formatted currency string.
   * @example
   * const currency = new Currency(1234.56);
   * const formatted = currency.format(); // Returns '$1,234.56'
   */
  format(options?: Partial<CurrencySettings>): string {
    return this.settings.format(this, { ...this.settings, ...options });
  }

  /**
   * Converts the currency value to a string.
   * @returns String representation of the currency value.
   * @example
   * const currency = new Currency(1234.56);
   * const value = currency.toString(); // Returns '1234.56'
   */
  toString(): string {
    return (this.intValue / this.precisionFactor).toFixed(this.settings.precision);
  }

  /**
   * Returns the currency value for JSON serialization.
   * @returns The numeric value for serialization.
   * @example
   * const currency = new Currency(1234.56);
   * JSON.stringify(currency); // Returns '1234.56'
   */
  toJSON(): number {
    return this.value;
  }
}

/**
 * Formats a currency object.
 * @param currency - The Currency object to format.
 * @param settings - Settings for formatting.
 * @returns The formatted currency string.
 * @example
 * const currency = new Currency(1234.56);
 * const formatted = formatCurrency(currency, currency.settings); // Returns '$1,234.56'
 */
function formatCurrency(currency: Currency, settings: CurrencySettings): string {
  const { pattern, negativePattern, symbol, separator, decimal, groups } = settings;
  const [dollars, cents] = currency.value.toFixed(settings.precision).split('.');

  return (currency.value >= 0 ? pattern : negativePattern)
    .replace('!', symbol)
    .replace('#', dollars.replace(groups, '$1' + separator) + (cents ? decimal + cents : ''));
}

export default Currency;
