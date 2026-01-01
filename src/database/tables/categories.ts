import {tableSchema} from '@nozbe/watermelondb';
import {
  CATEGORIES,
  COLOR,
  CREATED_AT,
  GROUP_ID,
  IS_SYSTEM_CATEGORY,
  NAME,
  UPDATED_AT,
} from '../consts';

export const categoriesTable = tableSchema({
  name: CATEGORIES,
  columns: [
    {
      name: NAME,
      type: 'string',
    },
    {
      name: COLOR,
      type: 'string',
    },
    {
      name: GROUP_ID,
      type: 'string',
    },
    {
      name: IS_SYSTEM_CATEGORY, // True for "Transfer" or "Income" categories
      type: 'boolean',
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
