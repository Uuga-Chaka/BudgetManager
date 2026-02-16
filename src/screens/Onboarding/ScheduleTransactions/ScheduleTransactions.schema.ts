import {z} from 'zod';

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
  [schemaKey.budgetAmount]: z.number().positive(),
});

export const BudgetListSchema = z.object({
  [schemaKey.budgetGroupId]: z.string().trim().nonempty(),
  [schemaKey.budgetList]: z.array(SingleBudgetSchema),
});

export type ScheduleTransactionFormType = z.infer<typeof BudgetListSchema>;
