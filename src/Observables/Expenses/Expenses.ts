import {type ExtractedObservables, withObservables} from '@nozbe/watermelondb/react';

import {getCurrentMonthExpenses} from '@app/database/queries/createIncome';

import type ExpenseModel from '@app/database/models/expenses';

const ObserveKeys = {
  EXPENSES: 'expenses',
  BUDGET: 'budget',
  CATEGORY: 'category',
  BUDGET_GROUP: 'budgetGroup',

  EXPENSE: 'expense',
} as const;

const observeCurrentMonthExpenses = () => ({
  [ObserveKeys.EXPENSES]: getCurrentMonthExpenses(),
});

const observeExpenseRelations = (props: {[ObserveKeys.EXPENSE]: ExpenseModel}) => ({
  [ObserveKeys.BUDGET]: props[ObserveKeys.EXPENSE].budget.observe(),
  [ObserveKeys.CATEGORY]: props[ObserveKeys.EXPENSE].category.observe(),
  [ObserveKeys.BUDGET_GROUP]: props[ObserveKeys.EXPENSE].budgetGroup.observe(),
});

export const EnhanceWithCurrentMonthExpenses = withObservables([], observeCurrentMonthExpenses);
export type EnhanceWithCurrentMonthExpensesProps = ExtractedObservables<
  ReturnType<typeof observeCurrentMonthExpenses>
>;

export const EnhancedExpenseItem = withObservables([ObserveKeys.EXPENSE], observeExpenseRelations);
export type EnhancedExpenseItemProps = {[ObserveKeys.EXPENSE]: ExpenseModel} & ExtractedObservables<
  ReturnType<typeof observeExpenseRelations>
>;
