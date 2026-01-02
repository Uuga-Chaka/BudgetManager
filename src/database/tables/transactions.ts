import {tableSchema} from '@nozbe/watermelondb';

import {
  ACCOUNT_ID,
  AMOUNT,
  CATEGORY_ID,
  CREATED_AT,
  DATE,
  TRANSACTIONS,
  TRANSFER_ACCOUNT_ID,
  TYPE,
  UPDATED_AT,
} from '../consts';

export const transactionsTable = tableSchema({
  name: TRANSACTIONS,
  columns: [
    {
      name: ACCOUNT_ID,
      type: 'string',
    },
    {
      name: CATEGORY_ID,
      type: 'string',
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
