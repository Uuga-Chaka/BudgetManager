import {z} from 'zod';

export const schemaKey = {
  categoryId: 'categoryId',
  budgetId: 'budgetId',
  description: 'description',
  budgetAmount: 'budgetAmount',
  budgetGroupId: 'budgetGroupId',
} as const;

export const AddTransactionSchema = z.object({
  [schemaKey.categoryId]: z.string().nonempty(),
  [schemaKey.budgetId]: z.string().nonempty(),
  [schemaKey.description]: z.string().nonempty(),
  [schemaKey.budgetAmount]: z.string(),
  [schemaKey.budgetGroupId]: z.string().nonempty(),
});

export type AddTransactionFormType = z.infer<typeof AddTransactionSchema>;
