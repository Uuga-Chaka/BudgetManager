import {tableSchema} from '@nozbe/watermelondb';

import {tables, CREATED_AT, NAME, UPDATED_AT} from '../consts';

export const categoriesTable = tableSchema({
  name: tables.CATEGORIES,
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
