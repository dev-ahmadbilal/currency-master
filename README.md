# Currency Master
[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][download-img]][npm-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

`Currency Master` is a comprehensive TypeScript library that provides utilities for working with various currency-related tasks, such as formatting currency strings, converting amounts between different currencies, converting numerical values to words, and mapping country codes to their respective currency codes.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Currency](#currency-class)
  - [ToWords](#towords)
  - [CountryCurrencyCode](#countrycurrencycode)
  - [CurrencyConversion](#currencyconversion)
  - [UsefulEnums](#useful-enums)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Credits](#credits)


## Installation

To install the package, use npm:

```bash
npm install currency-master
```

## Usage

You can use any of the four classes provided by Currency Master to perform various currency-related tasks.

### `Currency` Class

The `Currency` class provides a comprehensive set of utilities for handling currency values with various operations such as addition, subtraction, multiplication, division, formatting, and converting values to words. This class is designed to handle different currency formats and supports customizable settings.

#### Features

- **Arithmetic Operations**: Add, subtract, multiply, and divide currency values.
- **Formatting**: Convert currency values to formatted strings.
- **Distribution**: Evenly distribute a currency value into parts.
- **Conversion to Words**: Convert currency values to their word representation.
- **Customizable Settings**: Configure symbol, decimal separator, precision, grouping, and more.

#### Constructor

##### `Currency(value: number | string | Currency, options?: Partial<CurrencySettings>)`

Initializes a new instance of the `Currency` class.

- **`value`**: The initial value for the currency. It can be a number, string, or another `Currency` instance.
- **`options`**: An optional configuration object to customize currency settings.

##### Example

```typescript
const currency1 = new Currency(1234.56);
const currency2 = new Currency('1234.56');
const currency3 = new Currency(new Currency(1234.56));
```

#### Methods

##### `add(amount: number | string | Currency): Currency`

Adds a specified amount to the currency value.

**Example:**

```typescript
const currency = new Currency(10);
const result = currency.add(5); // Result is a new Currency instance with value 15
```

##### `subtract(amount: number | string | Currency): Currency`

Subtracts a specified amount from the currency value.

**Example:**

```typescript
const currency = new Currency(10);
const result = currency.subtract(5); // Result is a new Currency instance with value 5
```

##### `multiply(factor: number): Currency`

Multiplies the currency value by a specified factor.

**Example:**

```typescript
const currency = new Currency(10);
const result = currency.multiply(2); // Result is a new Currency instance with value 20
```

##### `divide(divisor: number): Currency`

Divides the currency value by a specified divisor.

**Example:**

```typescript
const currency = new Currency(10);
const result = currency.divide(2); // Result is a new Currency instance with value 5
```

##### `distribute(parts: number): Currency[]`

Distributes the currency value evenly into an array of `Currency` instances.

**Example:**

```typescript
const currency = new Currency(100);
const parts = currency.distribute(3); // an array of 3 Currency instances with values [33.34, 33.33, 33.33]
```

##### `dollars(): number`

Returns the dollar portion of the currency value.

**Example:**

```typescript
const currency = new Currency(123.45);
const dollars = currency.dollars(); // 123
```

##### `cents(): number`

Returns the cent portion of the currency value.

**Example:**

```typescript
const currency = new Currency(123.45);
const cents = currency.cents(); // 45
```

##### `format(options?: Partial<CurrencySettings>): string`

Formats the currency value as a string according to the specified settings.

**Example:**

```typescript
const currency = new Currency(1234.56);
const formatted = currency.format(); // '$1,234.56'
```

##### `toString(): string`

Converts the currency value to a string.

**Example:**

```typescript
const currency = new Currency(1234.56);
const value = currency.toString(); // '1234.56'
```

##### `toWords(): string`

Converts the currency value into its word representation.

**Default Behavior:**

By default, the `toWords` method converts the currency amount to words using US dollars:
```typescript
const currency = new Currency(1234.56);
const words = currency.toWords(); // 'one thousand two hundred thirty-four dollars and fifty-six cents'
```

**Customizing Currency Type:**

You can customize the currency type and locale in the constructor by passing `toWords` options:
```typescript
const c1 = new Currency('1234.56', {
  toWords: {
    locale: LocaleEnum.EnglishUnitedKingdom, // Specify the locale
  },
});
console.log(c1.toWords()); // 'One Thousand Two Hundred Thirty Four Pounds And Fifty Six Pence Only'
```

**Converting Number Only:**

To convert just the numeric part to words without currency formatting, use:
```typescript
const c2 = new Currency('1234.56', {
  toWords: {
    locale: LocaleEnum.EnglishUnitedStates,
    converterOptions: {
      currency: false, // Disable currency formatting
    },
  },
});
console.log(c2.toWords()); // 'One Thousand Two Hundred Thirty Four Point Fifty Six'
```

**Support for Multiple Locales:**

The `toWords` method supports various locales for diverse languages and regions:

**Urdu (Pakistan):**
```typescript
const c3 = new Currency('1234.56', {
  toWords: {
    locale: LocaleEnum.UrduPakistan,
  },
});
console.log(c3.toWords()); // 'ایک ہزار دو سو چونتیس روپے اور چھپن پیسے صرف'
```

**Hindi (India):**
```typescript
const c4 = new Currency('1234.56', {
  toWords: {
    locale: LocaleEnum.HindiIndia,
  },
});
console.log(c4.toWords()); // 'एक हज़ार दो सौ चौंतीस रुपये और छप्पन पैसे'
```

The `toWords` method is highly versatile and supports various locales, enabling you to format numbers into words in different languages and regional formats.
#### Configuration

The `Currency` class supports various configuration options through the `CurrencySettings` type:

- **`symbol`**: Currency symbol (default: `$`).
- **`separator`**: Thousands separator (default: `,`).
- **`decimal`**: Decimal separator (default: `.`).
- **`errorOnInvalid`**: Whether to throw an error on invalid input (default: `false`).
- **`precision`**: Number of decimal places (default: `2`).
- **`pattern`**: Format pattern for positive values (default: `!#`).
- **`negativePattern`**: Format pattern for negative values (default: `-!#`).
- **`fromCents`**: Whether the initial value is in cents (default: `false`).
- **`groups`**: Regular expression for grouping digits (default: `/(\d)(?=(\d{3})+\b)/g`).
- **`format`**: Function to format the currency object (default: `formatCurrency`).
- **`toWords`**: Custom settings for currency to words (optional).

#### Example: Using Custom Currency Settings

In this example, we'll create a `Currency` instance with custom settings and perform various operations.

#### Custom Settings

Let's define custom settings for the `Currency` class:

```typescript
const customSettings: CurrencySettings = {
  symbol: '€',
  separator: '.',
  decimal: ',',
  precision: 2,
  pattern: '!# €',
  negativePattern: '-!# €',
  fromCents: false,
  groups: /(\d)(?=(\d{3})+(?!\d))/g,
};
```

#### Creating a Currency Instance with Custom Settings

Now we'll create a `Currency` instance using the custom settings and perform some operations:

```typescript
import Currency from './currency';

// Create a Currency instance with a value of 1234.56 and custom settings
const customCurrency = new Currency(1234.56, customSettings);

// Display the value formatted according to the custom settings
console.log(customCurrency.format()); // '1.234,56 €'

// Perform arithmetic operations
const addedCurrency = customCurrency.add(765.44);
console.log(addedCurrency.format()); // '2.000,00 €'

const subtractedCurrency = customCurrency.subtract(234.56);
console.log(subtractedCurrency.format()); // '1.000,00 €'

// Multiply and divide
const multipliedCurrency = customCurrency.multiply(1.5);
console.log(multipliedCurrency.format()); // '1.851,84 €'

const dividedCurrency = customCurrency.divide(2);
console.log(dividedCurrency.format()); // '617,28 €'

// Distribute the currency into 3 parts
const distributedCurrencies = customCurrency.distribute(3);
distributedCurrencies.forEach((currency, index) => {
  console.log(`Part ${index + 1}: ${currency.format()}`);
});
//
// Part 1: '411,52 €'
// Part 2: '411,52 €'
// Part 3: '411,52 €'

// Convert to words
console.log(customCurrency.toWords()); // 'one thousand two hundred thirty-four euros and fifty-six cents'
```

### ToWords

The `ToWords` class provides methods to convert numerical values to their word representations.

#### Example

```typescript
import { ToWords } from 'currency-master';

// Convert a number to words
const words = ToWords.convert(123);
console.log(words); // "one hundred and twenty-three"

// Convert a negative number
const negativeWords = ToWords.convert(-123);
console.log(negativeWords); // "minus one hundred and twenty-three"
```
Options can be set at instance level, or along with individual call to `convert` method.

```ts
const toWords = new ToWords();

words = toWords1.convert(123.045, { currency: false, ignoreDecimal: false });
console.log(words); //  One Hundred Twenty Three Point Zero Four Five

words = toWords1.convert(123.045, { currency: false, ignoreDecimal: true });
console.log(words); //  One Hundred Twenty Three
```

#### Config Options

The `ToWords` class suppose following custom options 

- **`locale` (LocaleEnum, default: `LocaleEnum.EnglishUnitedStates`)**:
  - Sets the locale for internationalization (i18n), determining the language and regional formatting for the words.

- **`currency` (boolean, default: `true`)**:
  - Indicates if the number should be converted into words formatted as currency.
  - When set to `true`, the number will be rounded to two decimal places before conversion.
  - Includes currency symbols and adjusts pluralization of currency units.

- **`ignoreDecimal` (boolean, default: `false`)**:
  - Determines whether to disregard the fractional (decimal) part of the number during conversion.
  - When `true`, only the integer part is converted to words, ignoring the decimal portion.

- **`ignoreZeroCurrency` (boolean, default: `false`)**:
  - Specifies whether to omit zero value in the currency portion of the words.
  - When `true`, zero currency units will not be included in the output, avoiding redundant mentions.

- **`doNotAddOnly` (boolean, default: `false`)**:
  - Controls whether to append the word "only" at the end of the converted currency words.
  - Works only when `currency` is `true`. When `true`, "only" is not included in the output.

- **`currencyOptions` (object, default: `undefined`)**:
  - Allows customization of currency options while retaining the language settings from the locale.
  - Useful for specifying different currencies (e.g., using EUR instead of USD) while converting to words in a specific language.
  - Supports dynamic currency changes for each conversion call, applicable only when `currency` is `true`.

```ts
const toWords = new ToWords({
  locale: LocaleEnum.EnglisUnitedStates,
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      name: 'Dollar',
      plural: 'Dollars',
      symbol: '$',
      fractionalUnit: {
        name: 'Cent',
        plural: 'Cents',
        symbol: '',
      },
    },
  },
});
```
#### Supported Locales

  | Country             | Language   | Locale          |
  | ------------------- | ---------- | --------------- |
  | UAE                 | English    | en-AE           |
  | Bangladesh          | English    | en-BD           |
  | UK                  | English    | en-GB           |
  | Ghana               | English    | en-GH           |
  | Ireland             | English    | en-IE           |
  | India               | English    | en-IN           |
  | Myanmar             | English    | en-MM           |
  | Mauritius           | English    | en-MU           |
  | Nigeria             | English    | en-NG           |
  | Nepal               | English    | en-NP           |
  | USA                 | English    | en-US (default) |
  | Philippines         | English    | en-PH           |
  | Estonia             | Estonian   | ee-EE           |
  | Iran                | Persian    | fa-IR           |
  | Belgium             | French     | fr-BE           |
  | France              | French     | fr-FR           |
  | India               | Gujarati   | gu-IN           |
  | India               | Hindi      | hi-IN           |
  | India               | Marathi    | mr-IN           |
  | Suriname            | Dutch      | nl-SR           |
  | Brazil              | Portuguese | pt-BR           |
  | Turkey              | Turkish    | tr-TR           |
  | Korean, Republic    | Hangul     | ko-KR           |
  | Pakistan            | English    | en-PK           |
  | Pakistan            | Urdu       | ur-PK           |

### CountryCurrencyCode

The `CountryCurrencyCode` class provides utility methods to map country codes to their respective currency codes.

#### Example

```typescript
import { CountryCurrencyCode } from 'currency-master';

// Get the currency code by country code
const currency = CountryCurrencyCode.getCurrencyByCountryCode('US');
console.log(currency); // 'USD'

// Get all country codes using a specific currency
const countries = CountryCurrencyCode.getCountriesByCurrencyCode('USD');
console.log(countries); // ['US', 'UM']

// Get all the country codes
const countryCodes = CountryCurrencyCode.getAllCountryCodes();
console.log(countryCodes); // List of all all country codes

// Get all currency codes
const currencyCodes = CountryCurrencyCode.getAllCurrencyCodes();
console.log(currencyCodes); // List of all currency codes
```
### CurrencyConversion

The `CurrencyConversion` class provides methods for fetching real-time or historical exchange rates and converting currency from one type to another. It interacts with the [Fawaz Ahmed Currency API](https://github.com/fawazahmed0/currency-api) to retrieve exchange rates.

#### Fetching Currency Rates

You can fetch the latest exchange rates for a specific currency, or fetch historical rates by specifying a date in the `YYYY-MM-DD` format.

#### Fetching Latest Rates

```ts
const rates = await CurrencyConversion.getCurrencyRates(CurrencyEnum.UnitedStatesDollar);
console.log(rates); // Output: { "eur": 0.92, "gbp": 0.80, ... }
```

#### Fetching Historical Rates

```ts
const historicalRates = await CurrencyConversion.getCurrencyRates(CurrencyEnum.UnitedStatesDollar, '2024-09-01');
console.log(historicalRates); // Output: { "eur": 0.90, "gbp": 0.78, ... }
```

#### Converting Currency

You can convert a specific amount from one currency to another using either real-time or historical exchange rates.

##### Real-Time Conversion

```ts
const convertedAmount = await CurrencyConversion.convert(CurrencyEnum.UnitedStatesDollar, CurrencyEnum.Euro, 100);
console.log(convertedAmount); // Output: "92.00" (depending on the exchange rate)
```

##### Historical Conversion

```ts
const historicalConversion = await CurrencyConversion.convert(CurrencyEnum.UnitedStatesDollar, CurrencyEnum.Euro, 100, '2024-09-01');
console.log(historicalConversion); // Output: "90.00" (depending on the historical rate)
```

#### API Reference

##### `CurrencyConversion`

- `getCurrencyRates(currency: CurrencyEnum, date?: string): Promise<CurrencyRates>`
  - **currency**: Base currency (e.g., `CurrencyEnum.USD`).
  - **date** (optional): Historical date in `YYYY-MM-DD` format. If omitted, the latest rates will be fetched.
  - **Returns**: A promise that resolves to the exchange rates for the base currency.

- `convert(from: CurrencyEnum, to: CurrencyEnum, amount: number, date?: string): Promise<string>`
  - **from**: Base currency.
  - **to**: Target currency.
  - **amount**: Amount to convert.
  - **date** (optional): Historical date for conversion. If omitted, the latest exchange rates will be used.
  - **Returns**: A promise that resolves to the converted amount (as a string with two decimal places).

### Useful Enums

#### `CurrencyEnum`

It contains a set of predefined currency codes to be used with the `CurrencyConversion` class.

Example:

```ts
CurrencyEnum.Euro                 // Euro
CurrencyEnum.UnitedStatesDollar   // US Dollar
```


#### `CountryCurrencyEnum`

It contains a mapping of country codes to currency codes.

Example:

```ts
CountryCurrencyEnum.US   // USD
CountryCurrencyEnum.AE   // AED
```

## Contributing

Contributions are welcome! Please see the [Contributing Guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contact

If you have any questions, suggestions, or would like to collaborate, please feel free to reach out:

- **Email:** [ahmadbilal.3491@gmail.com](mailto:ahmadbilal.3491@gmail.com)
- **LinkedIn:** [Ahmad Bilal](https://www.linkedin.com/in/ahmad-bilal-920637165)

I look forward to hearing from you!

## Credits

I would like to acknowledge the following resources that were instrumental in the development of this package:

- [**currency.js**](https://www.npmjs.com/package/currency.js): This library provided valuable insights and inspiration for handling currency formatting and conversion.
- [**to-words**](https://www.npmjs.com/package/to-words): A useful package for converting numbers to words, which served as a reference for implementing similar functionality.
- [**country-to-currency**](https://www.npmjs.com/package/country-to-currency): A helpful resource for mapping countries to their respective currencies.
- [**exchange-api**](https://github.com/fawazahmed0/exchange-api): An open-source API used for currency exchange rates, which guided the implementation of currency conversion features.

Thank you to these projects for their contributions to the open-source community!

[build-img]:https://github.com/dev-ahmadbilal/currency-master/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/dev-ahmadbilal/currency-master/actions/workflows/release.yml
[npm-img]:https://img.shields.io/npm/v/currency-master
[npm-url]:https://www.npmjs.com/package/currency-master
[download-img]: https://badgen.net/npm/dt/currency-master
[issues-img]:https://img.shields.io/github/issues/dev-ahmadbilal/currency-master
[issues-url]:https://github.com/dev-ahmadbilal/currency-master/issues
[codecov-img]:https://codecov.io/gh/dev-ahmadbilal/currency-master/branch/main/graph/badge.svg
[codecov-url]:https://codecov.io/gh/dev-ahmadbilal/currency-master
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
