import {tableSchema} from '@nozbe/watermelondb';
import {
  ACCOUNT_ID,
  AMOUNT,
  CATEGORY_ID,
  DATE,
  ID,
  TRANSACTIONS,
  TRANSFER_ACCOUNT_ID,
  TYPE,
} from '../consts';

export const transactionsTable = tableSchema({
  name: TRANSACTIONS,
  columns: [
    {
      name: ID,
      type: 'number',
    },
    {
      name: ACCOUNT_ID,
      type: 'number',
    },
    {
      name: CATEGORY_ID,
      type: 'number',
    },
    {
      name: AMOUNT,
      type: 'string',
    },
    {
      name: DATE,
      type: 'string',
    },
    {
      name: TYPE, // Income, Expense, Transfer
      type: 'string',
    },
    {
      name: TRANSFER_ACCOUNT_ID, // Only populated if type is 'TRANSFER' (Destination Account)
      type: 'string',
    },
  ],
});
