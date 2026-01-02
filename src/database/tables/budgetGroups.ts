import {tableSchema} from '@nozbe/watermelondb';

import {BUDGET_GROUPS, CREATED_AT, GROUP_ID, NAME, TARGET_PERCENTAGE, UPDATED_AT} from '../consts';

export const budgetGroupsTable = tableSchema({
  name: BUDGET_GROUPS,
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
      name: GROUP_ID,
      type: 'string',
      isIndexed: true,
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
