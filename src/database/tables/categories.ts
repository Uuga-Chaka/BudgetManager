import {tableSchema} from '@nozbe/watermelondb';
import {CATEGORIES, COLOR, GROUP_ID, ID, IS_SYSTEM_CATEGORY, NAME} from '../consts';

export const categoriesTable = tableSchema({
  name: CATEGORIES,
  columns: [
    {
      name: ID,
      type: 'string',
    },
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
      type: 'number',
    },
    {
      name: IS_SYSTEM_CATEGORY, // True for "Transfer" or "Income" categories
      type: 'boolean',
    },
  ],
});
