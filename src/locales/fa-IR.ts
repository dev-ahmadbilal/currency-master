import { LocaleInterface, LocaleConfig } from '../types/to-word.type';

export default class Locale implements LocaleInterface {
  public config: LocaleConfig = {
    currency: {
      name: 'تومان',
      plural: '',
      singular: '',
      symbol: 'تومان',
      fractionalUnit: {
        name: '',
        singular: 'ریال',
        plural: 'تومان',
        symbol: '',
      },
    },
    texts: {
      and: 'و',
      minus: 'منفی',
      only: '',
      point: 'و',
    },
    numberWordsMapping: [
      { number: 1000000000000000, value: 'کوادریلیون' },
      { number: 1000000000000, value: 'تیلیارد' },
      { number: 1000000000, value: 'میلیارد' },
      { number: 1000000, value: 'میلیون' },
      { number: 1000, value: 'هزار' },
      { number: 900, value: 'نهصد' },
      { number: 800, value: 'هشتصد' },
      { number: 700, value: 'هفتصد' },
      { number: 600, value: 'ششصد' },
      { number: 500, value: 'پانصد' },
      { number: 400, value: 'چهارصد' },
      { number: 300, value: 'سیصد' },
      { number: 200, value: 'دویست' },
      { number: 100, value: 'صد' },
      { number: 90, value: 'نود' },
      { number: 80, value: 'هشتاد' },
      { number: 70, value: 'هفتاد' },
      { number: 60, value: 'شصت' },
      { number: 50, value: 'پنجاه' },
      { number: 40, value: 'چهل' },
      { number: 30, value: 'سی' },
      { number: 20, value: 'بیست' },
      { number: 19, value: 'نوزده' },
      { number: 18, value: 'هجده' },
      { number: 17, value: 'هفده' },
      { number: 16, value: 'شانزده' },
      { number: 15, value: 'پانزده' },
      { number: 14, value: 'چهارده' },
      { number: 13, value: 'سیزده' },
      { number: 12, value: 'دوازده' },
      { number: 11, value: 'یازده' },
      { number: 10, value: 'ده' },
      { number: 9, value: 'نه' },
      { number: 8, value: 'هشت' },
      { number: 7, value: 'هفت' },
      { number: 6, value: 'شش' },
      { number: 5, value: 'پنج' },
      { number: 4, value: 'چهار' },
      { number: 3, value: 'سه' },
      { number: 2, value: 'دو' },
      { number: 1, value: 'یک' },
      { number: 0, value: 'صفر' },
    ],
    namedLessThan1000: true,
    splitWord: 'و',
    ignoreZeroInDecimals: true,
    decimalLengthWordMapping: {
      1: 'دهم',
      2: 'صدم',
      3: 'هزارم',
      4: 'ده‌هزارم',
      5: 'صد‌هزارم',
      6: 'میلیونیوم',
      7: 'ده‌میلیونیوم',
      8: 'صد‌میلیونیوم',
      9: 'میلیاردیوم',
    },
  };
}
