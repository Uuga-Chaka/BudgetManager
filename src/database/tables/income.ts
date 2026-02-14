import {tableSchema} from '@nozbe/watermelondb';

import {tables, CREATED_AT, CURRENCY, INCOME_AMOUNT, NAME, UPDATED_AT} from '../consts';

export const incomeTable = tableSchema({
  name: tables.INCOME,
  columns: [
    {
      name: NAME,
      type: 'string',
    },
    {
      name: INCOME_AMOUNT,
      type: 'number',
    },
    {
      name: CURRENCY,
      type: 'string',
    },
    {
      name: CREATED_AT,
      type: 'number',
    },
    {
      name: UPDATED_AT,
      type: 'number',
    },
  ],
});
