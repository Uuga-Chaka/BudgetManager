import {tableSchema} from '@nozbe/watermelondb';
import {ACCOUNTS, CURRENCY, CURRENT_BALANCE, ID, NAME, TYPE} from '../consts';

export const accountsTable = tableSchema({
  name: ACCOUNTS,
  columns: [
    {
      name: ID,
      type: 'number',
    },
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
  ],
});
