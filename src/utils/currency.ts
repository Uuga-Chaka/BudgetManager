import {ONLY_NUMBERS_REGEX} from '@app/consts/regex';

// TODO: Handle different locale
export const formatCurrency = ({
  value,
  locale = 'en-CO',
  currency = 'COP',
}: {
  value: string;
  locale?: string;
  currency?: string;
}) => {
  const rawValue = value.replace(ONLY_NUMBERS_REGEX, '');
  const numericValue = (parseInt(rawValue, 10) || 0) / 100;
  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currencyDisplay: 'code',
  })
    .format(numericValue)
    .replace(currency, '')
    .trim();

  return {numericValue, formatted};
};
