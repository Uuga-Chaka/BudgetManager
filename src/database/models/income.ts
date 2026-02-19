import {Model} from '@nozbe/watermelondb';
import {date, field, readonly} from '@nozbe/watermelondb/decorators';

import {tables, columns} from '../consts';

export default class IncomeModel extends Model {
  static table = tables.INCOME;

  @field(columns.NAME) name!: string;
  @field(columns.CURRENCY) currency!: string;
  @field(columns.INCOME_AMOUNT) incomeAmount!: number;

  @readonly @date(columns.CREATED_AT) createdAt!: number;
  @readonly @date(columns.UPDATED_AT) updatedAt!: number;
}
