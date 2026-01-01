import {tableSchema} from '@nozbe/watermelondb';
import {ACCOUNTS, CREATED_AT, CURRENCY, CURRENT_BALANCE, NAME, TYPE, UPDATED_AT} from '../consts';

export const accountsTable = tableSchema({
  name: ACCOUNTS,
  columns: [
    {
      name: NAME,
      type: 'string',
    },
    {
      name: TYPE, //Cash, Debit, Savings, Credit
      type: 'string',
    },
    {
      name: CURRENT_BALANCE,
      type: 'number',
    },
    {
      name: CURRENCY,
      type: 'string',
    },
    {
      name: CREATED_AT,
      type: 'string',
    },
    {
      name: UPDATED_AT,
      type: 'string',
    },
  ],
});
