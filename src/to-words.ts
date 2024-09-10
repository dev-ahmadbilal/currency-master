import LOCALES from './locales';
import { ConverterOptions, ToWordsOptions, ConstructorOf, LocaleInterface, NumberWordMap } from './types/to-word.type';

export { LOCALES };

export const DefaultConverterOptions: ConverterOptions = {
  currency: true,
  ignoreDecimal: false,
  ignoreZeroCurrency: false,
  doNotAddOnly: false,
};

export const DefaultToWordsOptions: ToWordsOptions = {
  locale: 'en-US',
  converterOptions: DefaultConverterOptions,
};

export class ToWords {
  private options: ToWordsOptions = {};

  private locale: InstanceType<ConstructorOf<LocaleInterface>> | undefined = undefined;

  /**
   * Initializes a new instance of the `ToWords` class with the specified options.
   *
   * @param {ToWordsOptions} options - Options for configuring locale and converter behavior.
   *
   * @example
   * ```ts
   * const toWords = new ToWords({ localeCode: 'en-US' });
   * ```
   */
  constructor(options: ToWordsOptions = {}) {
    this.options = Object.assign({}, DefaultToWordsOptions, options);
  }

  /**
   * Returns the locale class based on the current locale code.
   * Throws an error if the locale is not found.
   *
   * @returns {ConstructorOf<LocaleInterface>} The class constructor for the specified locale.
   * @throws Will throw an error if the locale code is invalid.
   *
   * @example
   * ```ts
   * const localeClass = toWords.getLocaleClass();
   * ```
   */
  private getLocaleClass(): ConstructorOf<LocaleInterface> {
    if (!(this.options.locale! in LOCALES)) {
      throw new Error(`Unknown Locale "${this.options.locale}"`);
    }
    return LOCALES[this.options.locale!];
  }

  /**
   * Returns an instance of the locale class for the specified locale code.
   *
   * @returns {InstanceType<ConstructorOf<LocaleInterface>>} The instance of the locale interface.
   *
   * @example
   * ```ts
   * const localeInstance = toWords.getLocale();
   * ```
   */
  private getLocale(): InstanceType<ConstructorOf<LocaleInterface>> {
    if (this.locale === undefined) {
      const LocaleClass = this.getLocaleClass();
      this.locale = new LocaleClass();
    }
    return this.locale;
  }

  /**
   * Converts a number to words, with options for handling currency and decimals.
   *
   * @param {number} number - The number to convert.
   * @param {ConverterOptions} options - Options for controlling the conversion.
   * @returns {string} The number in words.
   *
   * @throws Will throw an error if the number is invalid.
   *
   * @example
   * ```ts
   * const result = toWords.convert(123);
   * console.log(result); // "one hundred twenty-three"
   * ```
   */
  public convert(number: number, options: ConverterOptions = {}): string {
    options = Object.assign({}, this.options.converterOptions, options);

    if (!this.isValidNumber(number)) {
      throw new Error(`Invalid Number "${number}"`);
    }

    if (options.ignoreDecimal) {
      number = Number.parseInt(number.toString());
    }

    let words: string[] = [];
    if (options.currency) {
      words = this.convertCurrency(number, options);
    } else {
      words = this.convertNumber(number);
    }

    if (this.locale?.config.trim) {
      return words.join('');
    }

    return words.join(' ');
  }

  /**
   * Converts a number (without currency) to words.
   *
   * @param {number} number - The number to convert.
   * @returns {string[]} The array of words representing the number.
   *
   * @example
   * ```ts
   * const words = toWords.convertNumber(123);
   * console.log(words); // ['one', 'hundred', 'twenty-three']
   * ```
   */
  private convertNumber(number: number): string[] {
    const locale = this.getLocale();

    const isNegativeNumber = number < 0;
    if (isNegativeNumber) {
      number = Math.abs(number);
    }

    const split = number.toString().split('.');
    const ignoreZero = this.isNumberZero(number) && locale.config.ignoreZeroInDecimals;
    let words = this.convertInternal(Number(split[0]), true);
    const isFloat = this.isFloat(number);
    if (isFloat && ignoreZero) {
      words = [];
    }
    const wordsWithDecimal = [];
    if (isFloat) {
      if (!ignoreZero) {
        wordsWithDecimal.push(locale.config.texts.point);
      }
      if (split[1].startsWith('0') && !locale.config?.decimalLengthWordMapping) {
        const zeroWords = [];
        for (const num of split[1]) {
          zeroWords.push(...this.convertInternal(Number(num), true));
        }
        wordsWithDecimal.push(...zeroWords);
      } else {
        wordsWithDecimal.push(...this.convertInternal(Number(split[1]), true));
        const decimalLengthWord = locale.config?.decimalLengthWordMapping?.[split[1].length];
        if (decimalLengthWord) {
          wordsWithDecimal.push(decimalLengthWord);
        }
      }
    }
    const isEmpty = words.length <= 0;
    if (!isEmpty && isNegativeNumber) {
      words.unshift(locale.config.texts.minus);
    }
    words.push(...wordsWithDecimal);
    return words;
  }

  /**
   * Converts a number representing currency to words, including major and fractional units.
   *
   * @param {number} number - The number to convert.
   * @param {ConverterOptions} options - Conversion options for currency.
   * @returns {string[]} The array of words representing the currency.
   *
   * @example
   * ```ts
   * const words = toWords.convertCurrency(123.45);
   * console.log(words); // ['one', 'hundred', 'twenty-three', 'dollars', 'and', 'forty-five', 'cents']
   * ```
   */
  private convertCurrency(number: number, options: ConverterOptions = {}): string[] {
    const locale = this.getLocale();

    const currencyOptions = options.currencyOptions ?? locale.config.currency;

    const isNegativeNumber = number < 0;
    if (isNegativeNumber) {
      number = Math.abs(number);
    }

    number = this.toFixed(number);
    // Extra check for isFloat to overcome 1.999 rounding off to 2
    const split = number.toString().split('.');
    let words = [...this.convertInternal(Number(split[0]))];
    // Determine if the main currency should be in singular form
    // e.g. 1 Dollar Only instead of 1 Dollars Only

    if (Number(split[0]) === 1 && currencyOptions.singular) {
      words.push(currencyOptions.singular);
    } else if (currencyOptions.plural) {
      words.push(currencyOptions.plural);
    }
    const ignoreZero =
      this.isNumberZero(number) &&
      (options.ignoreZeroCurrency || (locale.config?.ignoreZeroInDecimals && number !== 0));

    if (ignoreZero) {
      words = [];
    }

    const wordsWithDecimal = [];
    const isFloat = this.isFloat(number);
    if (isFloat) {
      if (!ignoreZero) {
        wordsWithDecimal.push(locale.config.texts.and);
      }
      const decimalPart =
        Number(split[1]) * (!locale.config.decimalLengthWordMapping ? Math.pow(10, 2 - split[1].length) : 1);
      wordsWithDecimal.push(...this.convertInternal(decimalPart));
      const decimalLengthWord = locale.config?.decimalLengthWordMapping?.[split[1].length];
      if (decimalLengthWord?.length) {
        wordsWithDecimal.push(decimalLengthWord);
      }
      // Determine if the fractional unit should be in singular form
      // e.g. 1 Dollar and 1 Cent Only instead of 1 Dollar and 1 Cents Only
      if (decimalPart === 1 && currencyOptions.fractionalUnit.singular) {
        wordsWithDecimal.push(currencyOptions.fractionalUnit.singular);
      } else {
        wordsWithDecimal.push(currencyOptions.fractionalUnit.plural);
      }
    } else if (locale.config.decimalLengthWordMapping && words.length) {
      wordsWithDecimal.push(currencyOptions.fractionalUnit.plural);
    }
    const isEmpty = words.length <= 0 && wordsWithDecimal.length <= 0;
    if (!isEmpty && isNegativeNumber) {
      words.unshift(locale.config.texts.minus);
    }
    if (!isEmpty && locale.config.texts.only && !options.doNotAddOnly && !locale.config.onlyInFront) {
      wordsWithDecimal.push(locale.config.texts.only);
    }
    if (wordsWithDecimal.length) {
      words.push(...wordsWithDecimal);
    }

    if (!isEmpty && !options.doNotAddOnly && locale.config.onlyInFront) {
      words.splice(0, 0, locale.config.texts.only);
    }

    return words;
  }

  /**
   * Recursively converts a number into words.
   *
   * @param {number} number - The number to convert.
   * @param {boolean} [trailing=false] - Whether to consider trailing digits.
   * @returns {string[]} The array of words representing the number.
   *
   * @example
   * ```ts
   * const words = toWords.convertInternal(123);
   * console.log(words); // ['one', 'hundred', 'twenty-three']
   * ```
   */
  private convertInternal(number: number, trailing: boolean = false): string[] {
    const locale = this.getLocale();

    if (locale.config.exactWordsMapping) {
      const exactMatch = locale.config?.exactWordsMapping?.find((elem) => {
        return number === elem.number;
      });
      if (exactMatch) {
        return [Array.isArray(exactMatch.value) ? exactMatch.value[+trailing] : exactMatch.value];
      }
    }

    const match = locale.config.numberWordsMapping.find((elem) => {
      return number >= elem.number;
    }) as NumberWordMap;

    const words: string[] = [];
    if (number <= 100 || (number < 1000 && locale.config.namedLessThan1000)) {
      words.push(Array.isArray(match.value) ? match.value[0] : match.value);
      number -= match.number;
      if (number > 0) {
        if (locale.config?.splitWord?.length) {
          words.push(locale.config.splitWord);
        }
        words.push(...this.convertInternal(number, trailing));
      }
      return words;
    }

    const quotient = Math.floor(number / match.number);
    const remainder = number % match.number;
    let matchValue = match.value;
    if (quotient > 1 && locale.config?.pluralWords?.find((word) => word === match.value) && locale.config?.pluralMark) {
      matchValue += locale.config.pluralMark;
    }
    if (
      quotient === 1 &&
      locale.config?.ignoreOneForWords?.includes(Array.isArray(matchValue) ? matchValue[0] : matchValue)
    ) {
      words.push(Array.isArray(matchValue) ? matchValue[1] : matchValue);
    } else {
      words.push(...this.convertInternal(quotient, false), Array.isArray(matchValue) ? matchValue[0] : matchValue);
    }

    if (remainder > 0) {
      if (locale.config?.splitWord?.length) {
        if (!locale.config?.noSplitWordAfter?.find((word) => word === match.value)) {
          words.push(locale.config.splitWord);
        }
      }
      words.push(...this.convertInternal(remainder, trailing));
    }
    return words;
  }

  private toFixed(number: number, precision = 2): number {
    return Number(Number(number).toFixed(precision));
  }

  private isFloat(number: number | string): boolean {
    return Number(number) === number && number % 1 !== 0;
  }

  private isValidNumber(number: number | string): boolean {
    return !isNaN(parseFloat(number as string)) && isFinite(number as number);
  }

  private isNumberZero(number: number): boolean {
    return number >= 0 && number < 1;
  }
}
