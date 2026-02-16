import {Model, Relation} from '@nozbe/watermelondb';
import {field, date, relation, text} from '@nozbe/watermelondb/decorators';
import {Associations} from '@nozbe/watermelondb/Model';

import BudgetModel from './budget';
import BudgetGroupModel from './budgetGroup';
import CategoriesModel from './categories';
import {tables, columns} from '../consts';

export default class TransactionModel extends Model {
  static table = tables.TRANSACTIONS;

  static associations: Associations = {
    [tables.BUDGET]: {type: 'belongs_to', key: columns.BUDGET_ID},
    [tables.BUDGET_GROUPS]: {type: 'belongs_to', key: columns.BUDGET_GROUP_ID},
    [tables.CATEGORIES]: {type: 'belongs_to', key: columns.CATEGORY_ID},
  };

  @text(columns.DESCRIPTION) description!: string;
  @field(columns.BUDGET_AMOUNT) amount!: number;
  @date(columns.TRANSACTION_DATE) transactionDate!: Date;

  @relation(tables.BUDGET, columns.BUDGET_ID) budget!: Relation<BudgetModel>;
  @relation(tables.CATEGORIES, columns.CATEGORY_ID) category!: Relation<CategoriesModel>;
  @relation(tables.BUDGET_GROUPS, columns.BUDGET_GROUP_ID) budgetGroup!: Relation<BudgetGroupModel>;
}
