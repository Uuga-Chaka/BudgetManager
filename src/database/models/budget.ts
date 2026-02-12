import {Model, Relation} from '@nozbe/watermelondb';
import {date, field, readonly, relation} from '@nozbe/watermelondb/decorators';
import {Associations} from '@nozbe/watermelondb/Model';

import {
  BUDGET_GROUP_ID,
  COLOR,
  CREATED_AT,
  NAME,
  tables,
  TARGET_PERCENTAGE,
  UPDATED_AT,
} from '../consts';
import BudgetGroupModel from './budgetGroup';

export default class BudgetModel extends Model {
  static table: string = tables.BUDGET;

  static associations: Associations = {
    [tables.BUDGET_GROUPS]: {type: 'belongs_to', key: BUDGET_GROUP_ID},
  };

  @field(NAME) name!: string;
  @field(TARGET_PERCENTAGE) targetPercentage!: number;
  @field(COLOR) color!: string;
  @relation(tables.BUDGET_GROUPS, BUDGET_GROUP_ID) budgetGroup!: Relation<BudgetGroupModel>;

  @readonly @date(CREATED_AT) createdAt!: Date;
  @readonly @date(UPDATED_AT) updatedAt!: Date;
}
