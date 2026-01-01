import {Model} from '@nozbe/watermelondb';
import {Associations} from '@nozbe/watermelondb/Model';
import {
  BUDGET_GROUPS,
  COLOR,
  CREATED_AT,
  GROUP_ID,
  NAME,
  TARGET_PERCENTAGE,
  UPDATED_AT,
} from '../consts';
import {date, field, readonly} from '@nozbe/watermelondb/decorators';

export default class BudgetGroupModel extends Model {
  static table: string = BUDGET_GROUPS;

  static associations: Associations = {
    [BUDGET_GROUPS]: {type: 'has_many', foreignKey: GROUP_ID},
  };

  @field(NAME) name!: string;
  @field(TARGET_PERCENTAGE) targetPercentage!: number;
  @field(COLOR) color!: string;

  @readonly @date(CREATED_AT) createdAt!: Date;
  @readonly @date(UPDATED_AT) updatedAt!: Date;
}
