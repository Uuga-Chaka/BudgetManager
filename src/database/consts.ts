// Tables name
export const tables = {
  INCOME: 'income',
  BUDGET_GROUPS: 'budget_group',
  BUDGET: 'budget',
  CATEGORIES: 'categories',
  MONTHLY_BUDGET: 'monthly_budgets',
  COMMON_EXPENSES: 'common_expenses',
  EXPENSES: 'expenses',
  BUDGET_HISTORY: 'budget_history',
} as const;

// Column name

export const columns = {
  BUDGET_ID: 'budget_id',
  BUDGET_GROUP_ID: 'budget_group_id',
  CATEGORY_ID: 'category_id',
  BUDGET_AMOUNT: 'budget_amount',
  DESCRIPTION: 'description',
  SCHEDULED_EXPENSE_ID: 'schedule_expense_id',
  EXPENSE_CREATION_DATE: 'expense_executed_at',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
  NAME: 'name',
  CURRENCY: 'currency',
  INCOME_AMOUNT: 'income_amount',
  EXPENSE_ID: 'expense_id',
  COLOR: 'color',
  TARGET_PERCENTAGE: 'target_percentage',
};

// common
export const NAME = 'name';
export const MONTH_YEAR = 'month_year';
export const CATEGORY_ID = 'category_id';
export const DATE = 'date';
export const CREATED_AT = 'created_at';
export const UPDATED_AT = 'updated_at';

// accounts
export const INCOME_AMOUNT = 'income_amount';
export const CURRENCY = 'currency';

// budget_groups
export const TARGET_PERCENTAGE = 'target_percentage';
export const BUDGET_GROUP_ID = 'budget_group_id';

// categories
export const COLOR = 'color';

// monthly_budgets
export const ASSIGNED_AMOUNT = 'assigned_amount';
export const ACTIVITY_AMOUNT = 'activity_amount';
export const AVAILABLE_AMOUNT = 'available_amount';
