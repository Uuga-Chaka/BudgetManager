import {Model, Relation} from '@nozbe/watermelondb';
import {Associations} from '@nozbe/watermelondb/Model';
import {
  ACTIVITY_AMOUNT,
  ASSIGNED_AMOUNT,
  AVAILABLE_AMOUNT,
  CATEGORIES,
  CATEGORY_ID,
  CREATED_AT,
  MONTH_YEAR,
  UPDATED_AT,
} from '../consts';
import {date, field, readonly, relation, text} from '@nozbe/watermelondb/decorators';
import CategoriesModel from './categories';

export default class MonthlyBudgetModel extends Model {
  static associations: Associations = {
    [CATEGORIES]: {type: 'belongs_to', key: CATEGORY_ID},
  };

  @text(CATEGORY_ID) categoryId!: string;
  @text(MONTH_YEAR) monthYear: string = '';
  @field(ASSIGNED_AMOUNT) assignedAmount: number = 0;
  @field(ACTIVITY_AMOUNT) activityAmount: number = 0;
  @field(AVAILABLE_AMOUNT) availableAmount: number = 0;

  @readonly @date(CREATED_AT) createdAt!: Date;
  @readonly @date(UPDATED_AT) updatedAt!: Date;

  @relation(CATEGORIES, CATEGORY_ID) category!: Relation<CategoriesModel>;
}
