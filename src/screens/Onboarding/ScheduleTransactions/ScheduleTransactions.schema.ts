import {z} from 'zod';

export const schemaKey = {
  categoryId: 'categoryId',
  budgetId: 'budgetId',
  name: 'name',
  budgetAmount: 'budgetAmount',
} as const;

const SingleBudgetSchema = z.object({
  [schemaKey.categoryId]: z.string().nonempty(),
  [schemaKey.budgetId]: z.string().nonempty(),
  [schemaKey.name]: z.string().nonempty(),
  [schemaKey.budgetAmount]: z.number().positive(),
});

export const BudgetListSchema = z.object({
  budgetList: z.array(SingleBudgetSchema),
});

export type ScheduleTransactionFormType = z.infer<typeof BudgetListSchema>;
