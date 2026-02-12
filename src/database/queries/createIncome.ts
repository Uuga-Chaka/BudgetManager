import {database} from '..';
import {tables} from '../consts';

import type BudgetGroupModel from '../models/budgetGroup';
import type IncomeModel from '../models/income';

interface CreateIncomePayload {
  name: string;
  currentBalance: number;
  currency: string;
}

export const createIncome = async ({
  name,
  currentBalance,
  currency,
}: CreateIncomePayload): Promise<IncomeModel | null> => {
  try {
    return await database.write(async () => {
      const newIncome = await database.get<IncomeModel>(tables.INCOME).create(income => {
        income.name = name;
        income.currentBalance = currentBalance;
        income.currency = currency;
      });

      return newIncome;
    });
  } catch (error) {
    console.error(`[Database Error] Failed to create income "${name}":`, error);

    return null;
  }
};

export const createBudgetGroup = async ({
  name,
  budgetList,
}: {
  name: string;
  budgetList: {id: string; name: string; percentage: number}[];
}) => {
  try {
    return await database.write(async () => {
      const newBudgetGroup = await database
        .get<BudgetGroupModel>(tables.BUDGET_GROUPS)
        .create(budgetGroup => {
          budgetGroup.name = name;
        });

      const response = newBudgetGroup.addBudgetGroup(budgetList);

      return {name: newBudgetGroup, budgetList: response};
    });
  } catch (error) {
    console.error(`[Database Error] Failed to create budget group "${name}":`, error);
  }
};
