// Tables name
export const tables = {
  INCOME: 'income',
  BUDGET_GROUPS: 'budget_group',
  BUDGET: 'budget',
  CATEGORIES: 'categories',
  MONTHLY_BUDGET: 'monthly_budgets',
  SCHEDULES_TRANSACTIONS: 'scheduled_transactions',
  TRANSACTIONS: 'transactions',
  BUDGET_HISTORY: 'budget_history',
} as const;

// Column name

export const columns = {
  BUDGET_ID: 'budget_id',
  BUDGET_GROUP_ID: 'budget_group_id',
  CATEGORY_ID: 'category_id',
  BUDGET_AMOUNT: 'budget_amount',
  DESCRIPTION: 'description',
  SCHEDULES_TRANSACTION_ID: 'schedule_transaction_id',
  TRANSACTION_DATE: 'transaction_date',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

// common
export const ID = 'id';
export const NAME = 'name';
export const TYPE = 'type';
export const GROUP_ID = 'group_id';
export const MONTH_YEAR = 'month_year';
export const ACCOUNT_ID = 'account_id';
export const CATEGORY_ID = 'category_id';
export const AMOUNT = 'amount';
export const DATE = 'date';
export const DESCRIPTION = 'description';
export const DAY_OF_MONTH = 'day_of_month';
export const ACTIVE = 'active';
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
export const IS_SYSTEM_CATEGORY = 'is_system_category';

// monthly_budgets
export const ASSIGNED_AMOUNT = 'assigned_amount';
export const ACTIVITY_AMOUNT = 'activity_amount';
export const AVAILABLE_AMOUNT = 'available_amount';

// transactions
export const TRANSFER_ACCOUNT_ID = 'transfer_account_id';

// scheduled_transactions
