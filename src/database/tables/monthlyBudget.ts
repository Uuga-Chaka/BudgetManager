import {tableSchema} from '@nozbe/watermelondb';

import {
  ACTIVITY_AMOUNT,
  ASSIGNED_AMOUNT,
  AVAILABLE_AMOUNT,
  CATEGORY_ID,
  CREATED_AT,
  MONTH_YEAR,
  MONTHLY_BUDGET,
  UPDATED_AT,
} from '../consts';

export const monthlyBudgetTable = tableSchema({
  name: MONTHLY_BUDGET,
  columns: [
    {
      name: CATEGORY_ID,
      type: 'string',
    },
    {
      name: MONTH_YEAR,
      type: 'string',
    },
    {
      name: ASSIGNED_AMOUNT,
      type: 'number',
    },
    {
      name: ACTIVITY_AMOUNT,
      type: 'number',
    },
    {
      name: AVAILABLE_AMOUNT,
      type: 'number',
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
