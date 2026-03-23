import {tableSchema} from '@nozbe/watermelondb';

import {tables, columns} from '../consts';

export const budgetTable = tableSchema({
  name: tables.BUDGET,
  columns: [
    {
      name: columns.NAME,
      type: 'string',
    },
    {
      name: columns.COLOR,
      type: 'string',
    },
    {
      name: columns.TARGET_PERCENTAGE,
      type: 'number',
    },
    {
      name: columns.BUDGET_GROUP_ID,
      type: 'string',
      isIndexed: true,
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
