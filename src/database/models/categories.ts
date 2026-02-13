import {Model} from '@nozbe/watermelondb';
import {date, field, readonly} from '@nozbe/watermelondb/decorators';

import {tables, CREATED_AT, NAME, UPDATED_AT} from '../consts';

export default class CategoriesModel extends Model {
  static table: string = tables.CATEGORIES;

  @field(NAME) name!: string;

  @readonly @date(CREATED_AT) createdAt!: Date;
  @readonly @date(UPDATED_AT) updatedAt!: Date;
}
