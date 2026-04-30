import {tableSchema} from '@nozbe/watermelondb';

import {columns, tables} from '../consts';

export const expensesTable = tableSchema({
  name: tables.EXPENSES,
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
      name: columns.EXPENSE_CREATION_DATE,
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
