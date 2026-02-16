import {database} from '..';
import {tables} from '../consts';

import type BudgetGroupModel from '../models/budgetGroup';
import type CategoriesModel from '../models/categories';
import type IncomeModel from '../models/income';
import type ScheduledTransactionsModel from '../models/scheduledTransactions';

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
        income.incomeAmount = currentBalance;
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

export const createCategories = async (categories: {name: string}[]) => {
  try {
    return await database.write(async () => {
      const categoriesCollection = database.get<CategoriesModel>(tables.CATEGORIES);
      const preparedRecords = categories
        .filter(({name}) => name.trim().length > 0)
        .map(({name}) =>
          categoriesCollection.prepareCreate(category => {
            category.name = name.trim();
          }),
        );

      if (preparedRecords.length === 0) return [];
      await database.batch(...preparedRecords);

      return preparedRecords;
    });
  } catch (error) {
    console.error(`[Database Error] Failed to create categories`, {categories, error});
  }
};

interface SetupDataPayload {
  income: {
    name: string;
    incomeAmount: number;
    currency: string;
  };
  budgetGroup: {
    name: string;
    budgets: {name: string; percentage: number}[];
  };
  categories: {name: string}[];
}

export const initializeAccountSetup = async ({
  income,
  budgetGroup,
  categories,
}: SetupDataPayload) => {
  try {
    return await database.write(async writer => {
      const newIncome = await database.get<IncomeModel>(tables.INCOME).create(i => {
        i.name = income.name;
        i.incomeAmount = income.incomeAmount;
        i.currency = income.currency;
      });

      const newBudgetGroup = await database
        .get<BudgetGroupModel>(tables.BUDGET_GROUPS)
        .create(bg => {
          bg.name = budgetGroup.name;
        });
      const newBudgets = await writer.callWriter(() =>
        newBudgetGroup.addBudgetGroup(budgetGroup.budgets),
      );

      const categoriesCollection = database.get<CategoriesModel>(tables.CATEGORIES);
      const preparedCategories = categories
        .filter(c => c.name.trim().length > 0)
        .map(c =>
          categoriesCollection.prepareCreate(cat => {
            cat.name = c.name.trim();
          }),
        );

      if (preparedCategories.length > 0) {
        await database.batch(...preparedCategories);
      }

      return {
        income: newIncome,
        budgetGroup: newBudgetGroup,
        budgets: newBudgets,
        categories: preparedCategories,
      };
    });
  } catch (error) {
    console.error(`[Database Error] Critical failure during combined setup:`, error);
    throw error;
  }
};

export const getAllBudgetGroups = async () => {
  try {
    return await database.get<BudgetGroupModel>(tables.BUDGET_GROUPS).query().fetch();
  } catch (error) {
    console.error(`[Database Error] Failed to get all budget group`, error);
    return [];
  }
};

export const getAllCategories = async () => {
  try {
    return await database.get<CategoriesModel>(tables.CATEGORIES).query().fetch();
  } catch (error) {
    console.error(`[Database Error] Failed to get all categories`, error);
    return [];
  }
};

export const getAllIncomes = async () => {
  try {
    const incomes = await database.get<IncomeModel>(tables.INCOME).query().fetch();
    return incomes?.[0];
  } catch (error) {
    console.error(`[Database Error] Failed to get all incomes`, error);
  }
};

interface ScheduledTransactions {
  budgetId: string;
  categoryId: string;
  description: string;
  budgetAmount: number;
}
interface ScheduledTransactionPayload {
  budgetGroupId: string;
  scheduledTransactions: ScheduledTransactions[];
}

export const createScheduledTransaction = async ({
  scheduledTransactions,
  budgetGroupId,
}: ScheduledTransactionPayload) => {
  try {
    return await database.write(async () => {
      const scheduleTransactionsTable = await database.get<ScheduledTransactionsModel>(
        tables.SCHEDULES_TRANSACTIONS,
      );

      const preparedRecords = scheduledTransactions.map(
        ({budgetAmount: amount, budgetId, categoryId, description}) => {
          return scheduleTransactionsTable.prepareCreate(st => {
            st.budget.id = budgetId;
            st.budgetGroup.id = budgetGroupId;
            st.category.id = categoryId;
            st.description = description;
            st.budgetAmount = amount;
          });
        },
      );

      if (preparedRecords.length === 0) return [];

      await database.batch(...preparedRecords);

      return preparedRecords;
    });
  } catch (error) {
    console.error(`[Database Error] Failed to create scheduled transaction`, error);
  }
};
