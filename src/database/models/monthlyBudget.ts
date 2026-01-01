import {Model, Relation} from '@nozbe/watermelondb';
import {Associations} from '@nozbe/watermelondb/Model';
import {
  ACTIVITY_AMOUNT,
  ASSIGNED_AMOUNT,
  CATEGORIES,
  CATEGORY_ID,
  CREATED_AT,
  MONTH_YEAR,
  MONTHLY_BUDGET,
  UPDATED_AT,
} from '../consts';
import {date, field, readonly, relation, text} from '@nozbe/watermelondb/decorators';
import CategoriesModel from './categories';

export default class MonthlyBudgetModel extends Model {
  static table: string = MONTHLY_BUDGET;
  static associations: Associations = {
    [CATEGORIES]: {type: 'belongs_to', key: CATEGORY_ID},
  };

  @text(CATEGORY_ID) categoryId!: string;
  @text(MONTH_YEAR) monthYear: string = '';
  @field(ASSIGNED_AMOUNT) assignedAmount: number = 0;
  @field(ACTIVITY_AMOUNT) activityAmount: number = 0;

  @readonly @date(CREATED_AT) createdAt!: Date;
  @readonly @date(UPDATED_AT) updatedAt!: Date;

  get availableAmount(): number {
    return this.assignedAmount - this.activityAmount;
  }

  @relation(CATEGORIES, CATEGORY_ID) category!: Relation<CategoriesModel>;
}
