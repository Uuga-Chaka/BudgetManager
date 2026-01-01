import {tableSchema} from '@nozbe/watermelondb';
import {BUDGET_GROUPS, ID, NAME, TARGET_PERCENTAGE} from '../consts';

export const budgetGroupsTable = tableSchema({
  name: BUDGET_GROUPS,
  columns: [
    {
      name: ID,
      type: 'number',
    },
    {
      name: NAME,
      type: 'string',
    },
    {
      name: TARGET_PERCENTAGE,
      type: 'number',
    },
  ],
});
