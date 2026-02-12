import {Model, Relation} from '@nozbe/watermelondb';
import {field, date, relation, readonly} from '@nozbe/watermelondb/decorators';

import CategoriesModel from './categories';
import IncomeModel from './income';
import {
  ACCOUNT_ID,
  INCOME,
  AMOUNT,
  CATEGORIES,
  CATEGORY_ID,
  CREATED_AT,
  DATE,
  TRANSACTIONS,
  TRANSFER_ACCOUNT_ID,
  TYPE,
  UPDATED_AT,
} from '../consts';

import type {TransactionType} from '../types';

export default class TransactionModel extends Model {
  static table = TRANSACTIONS;

  static associations = {
    [INCOME]: {type: 'belongs_to', key: 'account_id'},
    [CATEGORIES]: {type: 'belongs_to', key: 'category_id'},
  } as const;

  @field(AMOUNT) amount!: number;
  @field(TYPE) type!: TransactionType;
  @date(DATE) date!: Date;

  @readonly @date(CREATED_AT) createdAt!: Date;
  @readonly @date(UPDATED_AT) updatedAt!: Date;

  // Relations
  @relation(INCOME, ACCOUNT_ID) account!: Relation<IncomeModel>;
  @relation(CATEGORIES, CATEGORY_ID) category!: Relation<CategoriesModel>;

  // For Transfers only
  @field(TRANSFER_ACCOUNT_ID) transferAccountId?: string;
}
