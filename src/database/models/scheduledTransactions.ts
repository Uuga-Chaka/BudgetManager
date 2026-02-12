import {Model, Relation} from '@nozbe/watermelondb';
import {field, relation, text} from '@nozbe/watermelondb/decorators';
import {Associations} from '@nozbe/watermelondb/Model';

import {
  ACCOUNT_ID,
  INCOME,
  ACTIVE,
  AMOUNT,
  CATEGORIES,
  CATEGORY_ID,
  DAY_OF_MONTH,
  DESCRIPTION,
  SCHEDULES_TRANSACTIONS,
} from '../consts';
import CategoriesModel from './categories';
import IncomeModel from './income';

export default class ScheduledTransactionsModel extends Model {
  static table: string = SCHEDULES_TRANSACTIONS;

  static associations: Associations = {
    [INCOME]: {type: 'belongs_to', key: ACCOUNT_ID},
    [CATEGORIES]: {type: 'belongs_to', key: CATEGORY_ID},
  };

  @text(DESCRIPTION) description!: string;
  @field(AMOUNT) amount!: number;
  @field(DAY_OF_MONTH) dayOfMonth!: number;
  @field(ACTIVE) active!: boolean;

  @relation(INCOME, ACCOUNT_ID) account!: Relation<IncomeModel>;
  @relation(CATEGORIES, CATEGORY_ID) category!: Relation<CategoriesModel>;
}
