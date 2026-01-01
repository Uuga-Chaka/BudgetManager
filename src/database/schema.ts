import {accountsTable} from './tables/accounts';
import {appSchema} from '@nozbe/watermelondb';
import {budgetGroupsTable} from './tables/budgetGroups';
import {categoriesTable} from './tables/categories';
import {monthlyBudgetTable} from './tables/monthlyBudget';
import {schedulesTransactionsTable} from './tables/schedulesTransactions';
import {transactionsTable} from './tables/transactions';

export default appSchema({
  version: 1,
  tables: [
    accountsTable,
    budgetGroupsTable,
    categoriesTable,
    monthlyBudgetTable,
    transactionsTable,
    schedulesTransactionsTable,
  ],
});
