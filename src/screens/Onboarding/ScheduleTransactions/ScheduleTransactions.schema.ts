import {z} from 'zod';

import {currencyStringToNumber} from '@app/utils/currency';

export const schemaKey = {
  categoryId: 'categoryId',
  budgetId: 'budgetId',
  description: 'description',
  budgetAmount: 'budgetAmount',
  budgetList: 'budgetList',
  budgetGroupId: 'budgetGroupId',
} as const;

const SingleBudgetSchema = z.object({
  [schemaKey.categoryId]: z.string().nonempty(),
  [schemaKey.budgetId]: z.string().nonempty(),
  [schemaKey.description]: z.string().nonempty(),
  [schemaKey.budgetAmount]: z
    .string()
    .nonempty()
    .transform(n => currencyStringToNumber(n)),
});

export const BudgetListSchema = z.object({
  [schemaKey.budgetGroupId]: z.string().trim().nonempty(),
  [schemaKey.budgetList]: z.array(SingleBudgetSchema),
});

export type ScheduleTransactionFormTypeInput = z.input<typeof BudgetListSchema>;
export type ScheduleTransactionFormTypeOutput = z.output<typeof BudgetListSchema>;
