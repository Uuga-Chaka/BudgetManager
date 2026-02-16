import {tableSchema} from '@nozbe/watermelondb';

import {columns, CREATED_AT, tables, UPDATED_AT} from '../consts';

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
