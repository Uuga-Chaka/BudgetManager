import {Q} from '@nozbe/watermelondb';

import {
  type CommonExpense,
  DEFAULT_BUDGET_SETUP,
  DEFAULT_CATEGORIES,
} from '@app/consts/budgetGroupOptions';
import {type PercentageBudgetGroup} from '@app/types/budgetGroup';
import {getCurrentMonthFirstLastDayInUnix} from '@app/utils/date';

import {database} from '..';
import {columns, tables} from '../consts';

import type BudgetModel from '../models/budget';
import type BudgetGroupModel from '../models/budgetGroup';
import type CategoriesModel from '../models/categories';
import type CommonExpensesModel from '../models/commonExpenses';
import type ExpenseModel from '../models/expenses';
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

interface CommonExpenses {
  budgetId: string;
  categoryId: string;
  description: string;
  budgetAmount: number;
}
interface CommonExpensesPayload {
  budgetGroupId: string;
  commonExpenses: CommonExpenses[];
}

export const createCommonExpense = async ({
  commonExpenses,
  budgetGroupId,
}: CommonExpensesPayload) => {
  try {
    return await database.write(async () => {
      const commonExpensesTable = await database.get<CommonExpensesModel>(tables.COMMON_EXPENSES);

      const preparedRecords = commonExpenses.map(
        ({budgetAmount: amount, budgetId, categoryId, description}) => {
          return commonExpensesTable.prepareCreate(st => {
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

export const getIncomeSumByCurrentMonth = () => {
  const {firstDay, lastDay} = getCurrentMonthFirstLastDayInUnix();

  const results = database
    .get<IncomeModel>(tables.INCOME)
    .query(
      Q.where(columns.CREATED_AT, Q.gte(firstDay)),
      Q.where(columns.CREATED_AT, Q.lte(lastDay)),
    )
    .observe();

  return results;
};

export const getCurrentMonthLatestBudget = () => {
  const {firstDay, lastDay} = getCurrentMonthFirstLastDayInUnix();
  const budgetGroups = database.get<BudgetGroupModel>(tables.BUDGET_GROUPS);

  const currentBudgetGroup = budgetGroups
    .query(
      Q.where(columns.CREATED_AT, Q.gte(firstDay)),
      Q.where(columns.CREATED_AT, Q.lte(lastDay)),
      Q.sortBy(columns.CREATED_AT, Q.desc),
      Q.take(1),
    )
    .observe();

  return currentBudgetGroup;
};

export const getCurrentMonthTransactions = () => {
  const {firstDay, lastDay} = getCurrentMonthFirstLastDayInUnix();

  const transactions = database.get<ExpenseModel>(tables.EXPENSES);

  const currentMonthTransactions = transactions
    .query(
      Q.where(columns.CREATED_AT, Q.gte(firstDay)),
      Q.where(columns.CREATED_AT, Q.lte(lastDay)),
    )
    .observe();

  return currentMonthTransactions;
};

interface CreateTransactionPayload {
  budgetAmount: number;
  budgetId: string;
  categoryId: string;
  description: string;
  budgetGroupId: string;
  date?: Date;
}
export const createTransaction = async ({
  budgetAmount,
  budgetId,
  categoryId,
  description,
  budgetGroupId,
  date,
}: CreateTransactionPayload) => {
  try {
    return await database.write(async () => {
      const transactionDate = new Date();
      return await database.get<ExpenseModel>(tables.EXPENSES).create(transaction => {
        transaction.amount = budgetAmount;
        transaction.budget.id = budgetId;
        transaction.budgetGroup.id = budgetGroupId;
        transaction.category.id = categoryId;
        transaction.description = description;
        transaction.transactionExecutedAt = date || transactionDate;
      });
    });
  } catch (error) {
    console.error(`[Database Error] Failed to create transaction`, error);
  }
};

export const finalizeOnboardingData = async ({
  percentageGroupName,
  incomeName,
  incomeAmount,
  commonExpenses,
  percentageGroups = DEFAULT_BUDGET_SETUP,
}: {
  commonExpenses: CommonExpense[];
  incomeName: string;
  incomeAmount: number;
  percentageGroupName: string;
  percentageGroups?: PercentageBudgetGroup;
}) => {
  try {
    await database.write(async () => {
      const budgetGroup = database.get<BudgetGroupModel>(tables.BUDGET_GROUPS).prepareCreate(bg => {
        bg.name = percentageGroupName;
      });

      const budgetRecords = percentageGroups.map(budget =>
        database.get<BudgetModel>(tables.BUDGET).prepareCreate(b => {
          b.name = budget.name;
          b.targetPercentage = budget.percentage;
          b.budgetGroup.set(budgetGroup);
        }),
      );

      const incomeRecord = database.get<IncomeModel>(tables.INCOME).prepareCreate(income => {
        income.name = incomeName;
        income.incomeAmount = incomeAmount;
        income.currency = 'COP';
      });

      const categoryRecords = DEFAULT_CATEGORIES.map(cat =>
        database.get<CategoriesModel>(tables.CATEGORIES).prepareCreate(category => {
          category.name = cat.name;
        }),
      );

      const budgetMap = new Map<number, BudgetModel>();
      const categoryMap = new Map<number, CategoriesModel>();

      percentageGroups.forEach((budget, index) => {
        budgetMap.set(budget.id, budgetRecords[index]);
      });
      DEFAULT_CATEGORIES.forEach((cat, index) => {
        categoryMap.set(cat.id, categoryRecords[index]);
      });

      const commonExpensesTable = database.get<CommonExpensesModel>(tables.COMMON_EXPENSES);

      const expenseRecords = commonExpenses.map(({budgetId, categoryId, name}) => {
        const dbBudget = budgetMap.get(budgetId);
        const dbCategory = categoryMap.get(categoryId);
        return commonExpensesTable.prepareCreate(transaction => {
          transaction.description = name;
          if (dbBudget) transaction.budget.set(dbBudget);
          if (dbCategory) transaction.category.set(dbCategory);
          transaction.budgetGroup.set(budgetGroup);
        });
      });

      await database.batch(
        budgetGroup,
        ...budgetRecords,
        incomeRecord,
        ...categoryRecords,
        ...expenseRecords,
      );
    });
  } catch (error) {
    console.error(`[Database Error] Failed to finalize onboarding`, error);
  }
};

export const getCommonExpensesByBudgetIds = async (id: string) => {
  try {
    const collection = database.get(tables.COMMON_EXPENSES);
    return await collection.query(Q.where(columns.BUDGET_ID, id)).fetch();
  } catch (err) {
    console.error(`[Database Error] Failed to get Scheduled Transaction By Budget Id:`, err);
    return []; // Return empty array to prevent .map() errors in UI
  }
};

export const getCurrentMonthTransactionsByBudgetId = (id: string) => {
  const {firstDay, lastDay} = getCurrentMonthFirstLastDayInUnix();

  const transactions = database.get<ExpenseModel>(tables.EXPENSES);

  const currentMonthTransactions = transactions
    .query(
      Q.where(columns.BUDGET_ID, id),
      Q.where(columns.CREATED_AT, Q.gte(firstDay)),
      Q.where(columns.CREATED_AT, Q.lte(lastDay)),
    )
    .observe();

  return currentMonthTransactions;
};
