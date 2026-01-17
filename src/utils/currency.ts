import {ONLY_NUMBERS_REGEX} from '@app/consts/regex';

export const formatCurrency = (value: string, locale = 'es-CO', currency = 'COP') => {
  const rawValue = value.replace(ONLY_NUMBERS_REGEX, '');
  const numericValue = parseInt(rawValue, 10) || 0;

  const formatted = new Intl.NumberFormat(locale, {
    currency: currency,
    minimumFractionDigits: 0,
  }).format(numericValue);

  return {numericValue, formatted};
};
