import {appSchema} from '@nozbe/watermelondb';

import {budgetTable} from './tables/budget';
import {budgetGroupsTable} from './tables/budgetGroups';
import {categoriesTable} from './tables/categories';
import {commonExpensesTable} from './tables/commonExpenses';
import {expensesTable} from './tables/expenses';
import {incomeTable} from './tables/income';

export default appSchema({
  version: 1,
  tables: [
    incomeTable,
    budgetTable,
    budgetGroupsTable,
    categoriesTable,
    // monthlyBudgetTable,
    expensesTable,
    commonExpensesTable,
  ],
});
