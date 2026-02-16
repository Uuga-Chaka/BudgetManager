import {appSchema} from '@nozbe/watermelondb';

import {budgetTable} from './tables/budget';
import {budgetGroupsTable} from './tables/budgetGroups';
import {categoriesTable} from './tables/categories';
import {incomeTable} from './tables/income';
import {schedulesTransactionsTable} from './tables/schedulesTransactions';
import {transactionsTable} from './tables/transactions';

export default appSchema({
  version: 2,
  tables: [
    incomeTable,
    budgetTable,
    budgetGroupsTable,
    categoriesTable,
    // monthlyBudgetTable,
    transactionsTable,
    schedulesTransactionsTable,
  ],
});
