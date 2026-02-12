import {tableSchema} from '@nozbe/watermelondb';

import {tables, CREATED_AT, NAME, UPDATED_AT} from '../consts';

export const budgetGroupsTable = tableSchema({
  name: tables.BUDGET_GROUPS,
  columns: [
    {
      name: NAME,
      type: 'string',
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
