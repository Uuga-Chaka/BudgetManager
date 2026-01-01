import {tableSchema} from '@nozbe/watermelondb';
import {
  ACCOUNT_ID,
  ACTIVE,
  AMOUNT,
  CATEGORY_ID,
  CREATED_AT,
  DAY_OF_MONTH,
  DESCRIPTION,
  SCHEDULES_TRANSACTIONS,
  UPDATED_AT,
} from '../consts';

export const schedulesTransactionsTable = tableSchema({
  name: SCHEDULES_TRANSACTIONS,
  columns: [
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
      type: 'string',
    },
    {
      name: ACCOUNT_ID,
      type: 'string',
    },
    {
      name: DAY_OF_MONTH,
      type: 'number',
    },
    {
      name: ACTIVE,
      type: 'boolean',
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
