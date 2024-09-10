/* eslint-disable no-console */
import { CountryCurrencyCode } from './country-currency-code';
import Currency from './currency';
import { CurrencyConversion } from './currency-conversion';

import { ToWords } from './to-words';
import { CurrencyEnum } from './types';
import { LocaleEnum } from './types/to-word.type';

// Initialize Currency with a number
const c1 = new Currency('1234.56', {
  toWords: {
    locale: LocaleEnum.EnglishUnitedKingdom,
  },
});
console.log(c1.toWords()); // One Thousand Two Hundred Thirty Four Pounds And Fifty Six Pence Only

const c2 = new Currency('1234.56', {
  toWords: {
    locale: LocaleEnum.EnglishUnitedStates,
    converterOptions: {
      currency: false,
    },
  },
});
console.log(c2.toWords()); // One Thousand Two Hundred Thirty Four Point Fifty Six

const c3 = new Currency('1234.56', {
  toWords: {
    locale: LocaleEnum.UrduPakistan,
  },
});
console.log(c3.toWords()); // ایک ہزار دو سو چونتیس روپے اور چھپن پیسے صرف

const c4 = new Currency('1234.56', {
  toWords: {
    locale: LocaleEnum.EnglishBangladesh,
  },
});
console.log(c4.toWords()); // एक हज़ार दो सौ चौंतीस रुपये और छप्पन पैसे
// // Initialize Currency with a string
// const c2 = new Currency('5678.90');
// console.log(c2.format()); // $5,678.90
// // Output: $5,678.90

// // Add two Currency values
// const c3 = c1.add(c2);
// console.log(c3.format()); // $6,913.46
// // Output: $6,913.46

// Subtract a value
// const c4 = c1.subtract(100);
// console.log(c4.format()); // $1,134.56
// Output: $1,134.56

// Multiply a value
const c5 = c1.multiply(2);
console.log(c5.format()); // $2,469.12
// Output: $2,469.12

// Divide a value
const c6 = c1.divide(2);
console.log(c6.format()); // $617.28
// Output: $617.28

// Distribute a value equally
const c7 = new Currency(100);
const parts = c7.distribute(3);
parts.forEach((part, index) => console.log(`Part ${index + 1}: ${part.format()}`));
// Output:
// Part 1: $33.34
// Part 2: $33.33
// Part 3: $33.33

// Format with custom settings (e.g., using Euros and periods for thousands)
const euroSettings = {
  symbol: '€',
  separator: '.',
  decimal: ',',
};
const c8 = new Currency(98765.43);
console.log(c8.format(euroSettings)); // €98.765,43
// Output: €98.765,43

// Handle invalid value with errorOnInvalid set to true
try {
  const c9 = new Currency('invalid value', { errorOnInvalid: true });
  console.error(c9.format()); // Output: Invalid value
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} catch (error: any) {
  console.error(error.message); // Output: Invalid value
}

// Display dollars and cents separately
const c10 = new Currency(1234.56);
console.log(`Dollars: ${c10.dollars()}, Cents: ${c10.cents()}`);
// Output: Dollars: 1234, Cents: 56

console.log(CountryCurrencyCode.getCurrencyByCountryCode('PK'));
console.log(CountryCurrencyCode.getAllCountryCodes());
console.log(CountryCurrencyCode.getAllCurrencyCodes());
console.log(CountryCurrencyCode.getCountriesByCurrencyCode('INR'));

const toWords = new ToWords({
  locale: 'en-IN',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      // can be used to override defaults for the selected locale
      name: 'Rupee',
      plural: 'Rupees',
      symbol: '₹',
      fractionalUnit: {
        name: 'Paisa',
        plural: 'Paise',
        symbol: '',
      },
    },
  },
});

let words = toWords.convert(123);
// words = One Hundred Twenty Three
console.log(words);
words = toWords.convert(123.45);
// words = One Hundred Twenty Three Point Fourty Five
console.log(words);

words = toWords.convert(123.045, { currency: true });
// words = One Hundred Twenty Three Point Zero Four Five
console.log(words);

CurrencyConversion.convert(CurrencyEnum.UnitedStatesDollar, CurrencyEnum.PakistaniRupee, 10).then((res) => {
  console.log(res);
});
// console.log(CurrencyConversion.convert);

const toWords1 = new ToWords();
words = toWords1.convert(123.045, { currency: false, ignoreDecimal: false });
console.log(words); //  One Hundred Twenty Three Point Zero Four Five

words = toWords1.convert(123.045, { currency: false, ignoreDecimal: true });
console.log(words); //  One Hundred Twenty Three
