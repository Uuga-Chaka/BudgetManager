import {tableSchema} from '@nozbe/watermelondb';
import {
  ACTIVITY_AMOUNT,
  ASSIGNED_AMOUNT,
  AVAILABLE_AMOUNT,
  CATEGORY_ID,
  ID,
  MONTH_YEAR,
  MONTHLY_BUDGET,
} from '../consts';

export const monthlyBudgetTable = tableSchema({
  name: MONTHLY_BUDGET,
  columns: [
    {
      name: ID,
      type: 'number',
    },
    {
      name: CATEGORY_ID,
      type: 'number',
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
  ],
});
