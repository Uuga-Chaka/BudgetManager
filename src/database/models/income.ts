import {Model, Query} from '@nozbe/watermelondb';
import {children, date, field, readonly} from '@nozbe/watermelondb/decorators';
import {Associations} from '@nozbe/watermelondb/Model';

import {
  ACCOUNT_ID,
  tables,
  CREATED_AT,
  CURRENCY,
  INCOME_AMOUNT,
  NAME,
  TRANSACTIONS,
  UPDATED_AT,
} from '../consts';
import Transaction from './transaction';

export default class IncomeModel extends Model {
  static table = tables.INCOME;

  // static associations: Associations = {
  //   [TRANSACTIONS]: {type: 'has_many', foreignKey: ACCOUNT_ID},
  // } as const;

  @field(NAME) name!: string;
  @field(CURRENCY) currency!: string;
  @field(INCOME_AMOUNT) incomeAmount!: number;

  @date(CREATED_AT) createdAt!: number;
  @date(UPDATED_AT) updatedAt!: number;

  // @children(TRANSACTIONS) transactions!: Query<Transaction>;
}
