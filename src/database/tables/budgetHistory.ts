import {tableSchema} from '@nozbe/watermelondb';

import {BUDGET_HISTORY, CREATED_AT, DATE, UPDATED_AT} from '../consts';

export const budgetHistory = tableSchema({
  name: BUDGET_HISTORY,
  columns: [
    {
      name: DATE,
      type: 'string',
    },
    {
      name: 'value',
      type: 'string', // this is the stringified version of the array of value of that specific month
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
