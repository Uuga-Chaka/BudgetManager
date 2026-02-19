import {tableSchema} from '@nozbe/watermelondb';

import {columns, tables} from '../consts';

export const transactionsTable = tableSchema({
  name: tables.TRANSACTIONS,
  columns: [
    {
      name: columns.DESCRIPTION,
      type: 'string',
    },
    {
      name: columns.BUDGET_AMOUNT,
      type: 'number',
    },
    {
      name: columns.CATEGORY_ID,
      type: 'string',
    },
    {
      name: columns.BUDGET_ID,
      type: 'string',
    },
    {
      name: columns.BUDGET_GROUP_ID,
      type: 'string',
    },
    {
      name: columns.TRANSACTION_DATE,
      type: 'number',
    },
    {
      name: columns.CREATED_AT,
      type: 'number',
    },
    {
      name: columns.UPDATED_AT,
      type: 'number',
    },
  ],
});
