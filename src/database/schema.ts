import {appSchema} from '@nozbe/watermelondb';

import {budgetTable} from './tables/budget';
import {budgetGroupsTable} from './tables/budgetGroups';
import {categoriesTable} from './tables/categories';
import {commonExpensesTable} from './tables/commonExpenses';
import {incomeTable} from './tables/income';
import {transactionsTable} from './tables/transactions';

export default appSchema({
  version: 1,
  tables: [
    incomeTable,
    budgetTable,
    budgetGroupsTable,
    categoriesTable,
    // monthlyBudgetTable,
    transactionsTable,
    commonExpensesTable,
  ],
});
