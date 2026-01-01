import {Model, Relation} from '@nozbe/watermelondb';
import {field, date, relation, readonly} from '@nozbe/watermelondb/decorators';
import AccountModel from './accounts';
import CategoriesModel from './categories';
import {
  ACCOUNT_ID,
  ACCOUNTS,
  AMOUNT,
  CATEGORIES,
  CATEGORY_ID,
  CREATED_AT,
  DATE,
  TRANSFER_ACCOUNT_ID,
  TYPE,
  UPDATED_AT,
} from '../consts';

export default class TransactionModel extends Model {
  static table = 'transactions';

  static associations = {
    accounts: {type: 'belongs_to', key: 'account_id'},
    categories: {type: 'belongs_to', key: 'category_id'},
  } as const;

  @field(AMOUNT) amount!: number;
  @field(TYPE) type!: 'INCOME' | 'EXPENSE' | 'TRANSFER';
  @date(DATE) date!: Date;

  @readonly @date(CREATED_AT) createdAt!: Date;
  @readonly @date(UPDATED_AT) updatedAt!: Date;

  // Relations
  @relation(ACCOUNTS, ACCOUNT_ID) account!: Relation<AccountModel>;
  @relation(CATEGORIES, CATEGORY_ID) category!: Relation<CategoriesModel>;

  // For Transfers only
  @field(TRANSFER_ACCOUNT_ID) transferAccountId?: string;
}
