import {Model, Relation} from '@nozbe/watermelondb';
import {field, readonly, relation, text, date} from '@nozbe/watermelondb/decorators';
import {Associations} from '@nozbe/watermelondb/Model';

import {columns, CREATED_AT, tables, UPDATED_AT} from '../consts';
import BudgetModel from './budget';
import BudgetGroupModel from './budgetGroup';
import CategoriesModel from './categories';

export default class ScheduledTransactionsModel extends Model {
  static table: string = tables.SCHEDULES_TRANSACTIONS;

  static associations: Associations = {
    [tables.BUDGET]: {type: 'belongs_to', key: columns.BUDGET_ID},
    [tables.BUDGET_GROUPS]: {type: 'belongs_to', key: columns.BUDGET_GROUP_ID},
    [tables.CATEGORIES]: {type: 'belongs_to', key: columns.CATEGORY_ID},
  };

  @text(columns.DESCRIPTION) description!: string;
  @field(columns.BUDGET_AMOUNT) budgetAmount!: number;

  @readonly @date(CREATED_AT) createdAt!: Date;
  @readonly @date(UPDATED_AT) updatedAt!: Date;

  @relation(tables.BUDGET, columns.BUDGET_ID) budget!: Relation<BudgetModel>;
  @relation(tables.CATEGORIES, columns.CATEGORY_ID) category!: Relation<CategoriesModel>;
  @relation(tables.BUDGET_GROUPS, columns.BUDGET_GROUP_ID) budgetGroup!: Relation<BudgetGroupModel>;
}
