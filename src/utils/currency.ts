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

export const currencyStringToNumber = (currencyString: string) => {
  // Taken from > https://stackoverflow.com/questions/24163889/html5-input-for-money-currency
  const cleanedString = currencyString
    .trim()
    .replace(/^[^\d-]+/, '')
    .replace(/[^\d.,\-]+$/, '');

  // Create a NumberFormat instance for parsing
  const numberFormat = new Intl.NumberFormat('en-US');

  // Get the formatting options to determine decimal and group separators
  const formatParts = numberFormat.formatToParts(1234.5);
  const decimalSeparator = formatParts.find(part => part.type === 'decimal')?.value || '.';
  const groupSeparator = formatParts.find(part => part.type === 'group')?.value || ',';

  // Replace group separators and normalize decimal separator
  const normalizedString = cleanedString
    .replace(new RegExp(`\\${groupSeparator}`, 'g'), '')
    .replace(decimalSeparator, '.');

  // Parse the string to a number
  const number = parseFloat(normalizedString);

  // Check if the result is a valid number
  if (isNaN(number)) {
    throw new Error('Invalid number format');
  }

  return number;
};
