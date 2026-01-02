import {Model, Query} from '@nozbe/watermelondb';
import {children, date, field, readonly} from '@nozbe/watermelondb/decorators';
import {Associations} from '@nozbe/watermelondb/Model';

import {
  ACCOUNT_ID,
  ACCOUNTS,
  CREATED_AT,
  CURRENCY,
  CURRENT_BALANCE,
  NAME,
  TRANSACTIONS,
  TYPE,
  UPDATED_AT,
} from '../consts';
import Transaction from './transaction';
import type {AccountType} from '../types';

export default class AccountModel extends Model {
  static table = ACCOUNTS;

  static associations: Associations = {
    [TRANSACTIONS]: {type: 'has_many', foreignKey: ACCOUNT_ID},
  } as const;

  @field(NAME) name!: string;
  @field(TYPE) type!: AccountType;
  @field(CURRENCY) currency!: string;
  @field(CURRENT_BALANCE) currentBalance!: number;

  @readonly @date(CREATED_AT) createdAt!: Date;
  @readonly @date(UPDATED_AT) updatedAt!: Date;

  // Relationship: Get all transactions for this account
  @children(TRANSACTIONS) transactions!: Query<Transaction>;
}
