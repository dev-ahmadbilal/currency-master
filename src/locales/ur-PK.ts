import { LocaleInterface, LocaleConfig } from '../types/to-word.type';

export default class Locale implements LocaleInterface {
  public config: LocaleConfig = {
    currency: {
      name: 'روپیہ',
      plural: 'روپے',
      singular: 'روپیہ',
      symbol: 'Rs',
      fractionalUnit: {
        name: 'پیسہ',
        plural: 'پیسے',
        singular: 'پیسہ',
        symbol: '',
      },
    },
    texts: {
      and: 'اور',
      minus: 'رِن',
      only: 'صرف',
      point: 'اعشاریہ',
    },
    numberWordsMapping: [
      { number: 10000000, value: 'کروڑ' },
      { number: 100000, value: 'لاکھ' },
      { number: 1000, value: 'ہزار' },

      // Numbers from 100 to 91
      { number: 100, value: 'سو' },
      { number: 99, value: 'ننانوے' },
      { number: 98, value: 'اٹھانوے' },
      { number: 97, value: 'ستانوے' },
      { number: 96, value: 'چھیانوے' },
      { number: 95, value: 'پچانوے' },
      { number: 94, value: 'چورانوے' },
      { number: 93, value: 'ترانوے' },
      { number: 92, value: 'بانوے' },
      { number: 91, value: 'اکانوے' },

      // Numbers from 90 to 81
      { number: 90, value: 'نوے' },
      { number: 89, value: 'انانوے' },
      { number: 88, value: 'اٹھاسی' },
      { number: 87, value: 'ستاسی' },
      { number: 86, value: 'چھیاسی' },
      { number: 85, value: 'پچاسی' },
      { number: 84, value: 'چوراسی' },
      { number: 83, value: 'تراسی' },
      { number: 82, value: 'بیاسی' },
      { number: 81, value: 'اکاسی' },

      // Numbers from 80 to 71
      { number: 80, value: 'اسی' },
      { number: 79, value: 'اناسی' },
      { number: 78, value: 'اٹھتر' },
      { number: 77, value: 'ستتر' },
      { number: 76, value: 'چھہتر' },
      { number: 75, value: 'پچھتر' },
      { number: 74, value: 'چوہتر' },
      { number: 73, value: 'تہتر' },
      { number: 72, value: 'بہتر' },
      { number: 71, value: 'کہتر' },

      // Numbers from 70 to 61
      { number: 70, value: 'ستر' },
      { number: 69, value: 'انہتر' },
      { number: 68, value: 'اڑسٹھ' },
      { number: 67, value: 'ستاسٹھ' },
      { number: 66, value: 'سڑسٹھ' },
      { number: 65, value: 'پینسٹھ' },
      { number: 64, value: 'چونسٹھ' },
      { number: 63, value: 'تریسٹھ' },
      { number: 62, value: 'باسٹھ' },
      { number: 61, value: 'اکسٹھ' },

      // Numbers from 60 to 51
      { number: 60, value: 'ساٹھ' },
      { number: 59, value: 'انسٹھ' },
      { number: 58, value: 'اٹھاون' },
      { number: 57, value: 'ستاون' },
      { number: 56, value: 'چھپن' },
      { number: 55, value: 'پچپن' },
      { number: 54, value: 'چون' },
      { number: 53, value: 'ترپن' },
      { number: 52, value: 'باون' },
      { number: 51, value: 'اکاون' },

      // Numbers from 50 to 41
      { number: 50, value: 'پچاس' },
      { number: 49, value: 'انچاس' },
      { number: 48, value: 'اڑتالیس' },
      { number: 47, value: 'سنتالیس' },
      { number: 46, value: 'چھیالیس' },
      { number: 45, value: 'پینتالیس' },
      { number: 44, value: 'چوالیس' },
      { number: 43, value: 'تینتالیس' },
      { number: 42, value: 'بیالیس' },
      { number: 41, value: 'اکتالیس' },

      // Numbers from 40 to 31
      { number: 40, value: 'چالیس' },
      { number: 39, value: 'انتالیس' },
      { number: 38, value: 'اڑتیس' },
      { number: 37, value: 'سینتیس' },
      { number: 36, value: 'چھتیس' },
      { number: 35, value: 'پینتیس' },
      { number: 34, value: 'چونتیس' },
      { number: 33, value: 'تینتیس' },
      { number: 32, value: 'بتیس' },
      { number: 31, value: 'اکتیس' },

      // Numbers from 30 to 21
      { number: 30, value: 'تیس' },
      { number: 29, value: 'انتیسں' },
      { number: 28, value: 'اٹھائیس' },
      { number: 27, value: 'ستائیس' },
      { number: 26, value: 'چھبببیس' },
      { number: 25, value: 'پچیس' },
      { number: 24, value: 'چوبیس' },
      { number: 23, value: 'تئیس' },
      { number: 22, value: 'بائیس' },
      { number: 21, value: 'اکیس' },

      // Numbers from 20 to 11
      { number: 20, value: 'بیس' },
      { number: 19, value: 'انیس' },
      { number: 18, value: 'اٹھارہ' },
      { number: 17, value: 'سترہ' },
      { number: 16, value: 'سولہ' },
      { number: 15, value: 'پندرہ' },
      { number: 14, value: 'چودہ' },
      { number: 13, value: 'تیرہ' },
      { number: 12, value: 'بارہ' },
      { number: 11, value: 'گیارہ' },

      // Numbers from 10 to 1
      { number: 10, value: 'دس' },
      { number: 9, value: 'نو' },
      { number: 8, value: 'آٹھ' },
      { number: 7, value: 'سات' },
      { number: 6, value: 'چھ' },
      { number: 5, value: 'پانچ' },
      { number: 4, value: 'چار' },
      { number: 3, value: 'تین' },
      { number: 2, value: 'دو' },
      { number: 1, value: 'ایک' },
      { number: 0, value: 'صفر' },

      // Large numbers
    ],
    // exactWordsMapping: [{ number: 100, value: 'ایک سو' }],
  };
}
