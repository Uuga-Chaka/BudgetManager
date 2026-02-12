import {Model, Query} from '@nozbe/watermelondb';
import {children, date, field, readonly, writer} from '@nozbe/watermelondb/decorators';
import {Associations} from '@nozbe/watermelondb/Model';

import {tables, CREATED_AT, NAME, UPDATED_AT, BUDGET_GROUP_ID} from '../consts';
import BudgetModel from './budget';

export default class BudgetGroupModel extends Model {
  static table: string = tables.BUDGET_GROUPS;

  static associations: Associations = {
    [tables.BUDGET]: {type: 'has_many', foreignKey: BUDGET_GROUP_ID},
  };

  @children(tables.BUDGET) budgets!: Query<BudgetModel>;

  @field(NAME) name!: string;

  @readonly @date(CREATED_AT) createdAt!: Date;
  @readonly @date(UPDATED_AT) updatedAt!: Date;

  @writer async addBudgetGroup(budgetList: {name: string; percentage: number}[]) {
    const budgetCollection = await this.collections.get<BudgetModel>(tables.BUDGET);
    const budgetCreations = budgetList.map(({name, percentage}) => {
      return budgetCollection.prepareCreate(budget => {
        budget.budgetGroup.set(this);
        budget.name = name;
        budget.targetPercentage = percentage;
      });
    });
    await this.database.batch(budgetCreations);

    return budgetCreations;
  }
}
