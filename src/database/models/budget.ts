import {Model, Query, Relation} from '@nozbe/watermelondb';
import {children, date, field, readonly, relation} from '@nozbe/watermelondb/decorators';
import {Associations} from '@nozbe/watermelondb/Model';

import {
  BUDGET_GROUP_ID,
  COLOR,
  columns,
  CREATED_AT,
  NAME,
  tables,
  TARGET_PERCENTAGE,
  UPDATED_AT,
} from '../consts';
import BudgetGroupModel from './budgetGroup';
import ScheduledTransactionsModel from './scheduledTransactions';

export default class BudgetModel extends Model {
  static table: string = tables.BUDGET;

  static associations: Associations = {
    [tables.BUDGET_GROUPS]: {type: 'belongs_to', key: BUDGET_GROUP_ID},
    [tables.SCHEDULES_TRANSACTIONS]: {
      type: 'has_many',
      foreignKey: columns.SCHEDULES_TRANSACTION_ID,
    },
  };

  @field(NAME) name!: string;
  @field(TARGET_PERCENTAGE) targetPercentage!: number;
  @field(COLOR) color!: string;

  @relation(tables.BUDGET_GROUPS, BUDGET_GROUP_ID) budgetGroup!: Relation<BudgetGroupModel>;
  @children(tables.SCHEDULES_TRANSACTIONS)
  scheduledTransactions!: Query<ScheduledTransactionsModel>;

  @readonly @date(CREATED_AT) createdAt!: Date;
  @readonly @date(UPDATED_AT) updatedAt!: Date;
}
