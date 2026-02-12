import {Model, Query, Relation} from '@nozbe/watermelondb';
import {children, date, field, readonly, relation} from '@nozbe/watermelondb/decorators';
import {Associations} from '@nozbe/watermelondb/Model';

import {
  BUDGET_GROUPS,
  CATEGORIES,
  CATEGORY_ID,
  COLOR,
  CREATED_AT,
  GROUP_ID,
  IS_SYSTEM_CATEGORY,
  MONTHLY_BUDGET,
  NAME,
  TRANSACTIONS,
  UPDATED_AT,
} from '../consts';
import BudgetGroupModel from './budgetGroup';
import MonthlyBudgetModel from './monthlyBudget';
import TransactionModel from './transaction';

export default class CategoriesModel extends Model {
  static table: string = CATEGORIES;
  static associations: Associations = {
    [BUDGET_GROUPS]: {type: 'belongs_to', key: GROUP_ID},
    [MONTHLY_BUDGET]: {type: 'has_many', foreignKey: CATEGORY_ID},
    [TRANSACTIONS]: {type: 'has_many', foreignKey: CATEGORY_ID},
  };

  @field(NAME) name!: string;
  @field(COLOR) color!: string;
  @field(IS_SYSTEM_CATEGORY) isSystemCategory!: boolean;

  @readonly @date(CREATED_AT) createdAt!: Date;
  @readonly @date(UPDATED_AT) updatedAt!: Date;

  @relation(BUDGET_GROUPS, GROUP_ID) group!: Relation<BudgetGroupModel>;

  @children(TRANSACTIONS) transactions!: Query<TransactionModel>;
  @children(MONTHLY_BUDGET) monthlyBudgets!: Query<MonthlyBudgetModel>;
}
