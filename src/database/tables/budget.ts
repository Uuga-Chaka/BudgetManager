import {tableSchema} from '@nozbe/watermelondb';

import {tables, CREATED_AT, NAME, UPDATED_AT, BUDGET_GROUP_ID, TARGET_PERCENTAGE} from '../consts';

export const budgetTable = tableSchema({
  name: tables.BUDGET,
  columns: [
    {
      name: NAME,
      type: 'string',
    },
    {
      name: TARGET_PERCENTAGE,
      type: 'number',
    },
    {
      name: BUDGET_GROUP_ID,
      type: 'string',
      isIndexed: true,
    },
    {
      name: CREATED_AT,
      type: 'number',
    },
    {
      name: UPDATED_AT,
      type: 'number',
    },
  ],
});
