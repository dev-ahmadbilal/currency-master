export interface CurrencyOptions {
  name: string;
  plural: string;
  symbol: string;
  singular?: string;
  fractionalUnit: {
    name: string;
    plural: string;
    singular?: string;
    symbol: string;
  };
}

export type ConverterOptions = {
  currency?: boolean;
  ignoreDecimal?: boolean;
  ignoreZeroCurrency?: boolean;
  doNotAddOnly?: boolean; // applicable only when currency = true
  currencyOptions?: CurrencyOptions; // applicable only when currency = true, overwrites options from locales
};

export type ToWordsOptions = {
  locale?: string;
  converterOptions?: ConverterOptions;
};

export interface ConstructorOf<T> {
  new (...args: unknown[]): T;
}

export type NumberWordMap = {
  number: number;
  value: string | [string, string];
};

export type LocaleConfig = {
  currency: CurrencyOptions;
  texts: {
    and: string;
    minus: string;
    only: string;
    point: string;
  };
  numberWordsMapping: NumberWordMap[];
  exactWordsMapping?: NumberWordMap[];
  namedLessThan1000?: boolean;
  splitWord?: string;
  ignoreZeroInDecimals?: boolean;
  decimalLengthWordMapping?: Record<number, string>;
  ignoreOneForWords?: string[];
  pluralMark?: string;
  pluralWords?: string[];
  noSplitWordAfter?: string[];
  onlyInFront?: boolean;
  trim?: boolean;
};

export interface LocaleInterface {
  config: LocaleConfig;
}

export enum LocaleEnum {
  EweEstonia = 'ee-EE',
  EnglishUnitedArabEmirates = 'en-AE',
  EnglishBangladesh = 'en-BD',
  EnglishUnitedKingdom = 'en-GB',
  EnglishGhana = 'en-GH',
  EnglishIreland = 'en-IE',
  EnglishIndia = 'en-IN',
  EnglishMyanmar = 'en-MM',
  EnglishMauritius = 'en-MU',
  EnglishNigeria = 'en-NG',
  EnglishNepal = 'en-NP',
  EnglishPhilippines = 'en-PH',
  EnglishUnitedStates = 'en-US',
  SpanishSpain = 'es-ES',
  SpanishMexico = 'es-MX',
  PersianIran = 'fa-IR',
  FrenchBelgium = 'fr-BE',
  FrenchFrance = 'fr-FR',
  GujaratiIndia = 'gu-IN',
  HindiIndia = 'hi-IN',
  KoreanSouthKorea = 'ko-KR',
  MarathiIndia = 'mr-IN',
  DutchSuriname = 'nl-SR',
  PortugueseBrazil = 'pt-BR',
  TurkishTurkey = 'tr-TR',
  EnglishPakistan = 'en-PK',
  UrduPakistan = 'ur-PK',
}
