# Currency Master

Currency Master is a simple TypeScript library that provides methods for fetching real-time or historical exchange rates and converting currency from one type to another. It interacts with the [Fawaz Ahmed Currency API](https://github.com/fawazahmed0/currency-api) to retrieve exchange rates.

## Installation

```bash
npm install currency-master
```

## Usage

### Importing the ConversionMaster Class

```ts
import { ConversionMaster, CurrencyEnum } from 'currency-master';
```

### Fetching Currency Rates

You can fetch the latest exchange rates for a specific currency, or fetch historical rates by specifying a date in the `YYYY-MM-DD` format.

#### Fetching Latest Rates

```ts
const rates = await ConversionMaster.getCurrencyRates(CurrencyEnum.UnitedStatesDollar);
console.log(rates); // Output: { "eur": 0.92, "gbp": 0.80, ... }
```

#### Fetching Historical Rates

```ts
const historicalRates = await ConversionMaster.getCurrencyRates(CurrencyEnum.UnitedStatesDollar, '2024-09-01');
console.log(historicalRates); // Output: { "eur": 0.90, "gbp": 0.78, ... }
```

### Converting Currency

You can convert a specific amount from one currency to another using either real-time or historical exchange rates.

#### Real-Time Conversion

```ts
const convertedAmount = await ConversionMaster.convert(CurrencyEnum.UnitedStatesDollar, CurrencyEnum.Euro, 100);
console.log(convertedAmount); // Output: "92.00" (depending on the exchange rate)
```

#### Historical Conversion

```ts
const historicalConversion = await ConversionMaster.convert(CurrencyEnum.UnitedStatesDollar, CurrencyEnum.Euro, 100, '2024-09-01');
console.log(historicalConversion); // Output: "90.00" (depending on the historical rate)
```

## API Reference

### `ConversionMaster`

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

## Enum Reference

### `CurrencyEnum`

`CurrencyEnum` contains a set of predefined currency codes to be used with the `ConversionMaster` class.

Example:

```ts
CurrencyEnum.UnitedStatesDollar   // US Dollar
CurrencyEnum.Euro   // Euro
```

## License

This project is licensed under the MIT License.
