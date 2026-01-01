import {tableSchema} from '@nozbe/watermelondb';
import {
  ACCOUNT_ID,
  ACTIVE,
  AMOUNT,
  CATEGORY_ID,
  DAY_OF_MONTH,
  DESCRIPTION,
  ID,
  SCHEDULES_TRANSACTIONS,
} from '../consts';

export const schedulesTransactionsTable = tableSchema({
  name: SCHEDULES_TRANSACTIONS,
  columns: [
    {
      name: ID,
      type: 'number',
    },
    {
      name: DESCRIPTION,
      type: 'string',
    },
    {
      name: AMOUNT,
      type: 'number',
    },
    {
      name: CATEGORY_ID,
      type: 'number',
    },
    {
      name: ACCOUNT_ID,
      type: 'number',
    },
    {
      name: DAY_OF_MONTH,
      type: 'number',
    },
    {
      name: ACTIVE,
      type: 'boolean',
    },
  ],
});
