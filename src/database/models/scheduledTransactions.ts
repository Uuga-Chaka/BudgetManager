import {Model, Relation} from '@nozbe/watermelondb';
import {Associations} from '@nozbe/watermelondb/Model';
import {
  ACCOUNT_ID,
  ACCOUNTS,
  ACTIVE,
  AMOUNT,
  CATEGORIES,
  CATEGORY_ID,
  DAY_OF_MONTH,
  DESCRIPTION,
  SCHEDULES_TRANSACTIONS,
} from '../consts';
import {field, relation, text} from '@nozbe/watermelondb/decorators';
import AccountModel from './accounts';
import CategoriesModel from './categories';

export default class ScheduledTransactionsModel extends Model {
  static table: string = SCHEDULES_TRANSACTIONS;

  static associations: Associations = {
    [ACCOUNTS]: {type: 'belongs_to', key: ACCOUNT_ID},
    [CATEGORIES]: {type: 'belongs_to', key: CATEGORY_ID},
  };

  @text(DESCRIPTION) description!: string;
  @field(AMOUNT) amount!: number;
  @field(DAY_OF_MONTH) dayOfMonth!: number;
  @field(ACTIVE) active!: boolean;

  @relation(ACCOUNTS, ACCOUNT_ID) account!: Relation<AccountModel>;
  @relation(CATEGORIES, CATEGORY_ID) category!: Relation<CategoriesModel>;
}
