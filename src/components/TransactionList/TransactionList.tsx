import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

import {withObservables} from '@nozbe/watermelondb/react';

import {getCurrentMonthTransactions} from '@app/database/queries/createIncome';

import type BudgetModel from '@app/database/models/budget';
import type CategoriesModel from '@app/database/models/categories';
import type TransactionModel from '@app/database/models/transaction';

const styles = StyleSheet.create({
  amount: {
    color: '#2e7d32',
    fontSize: 18,
    fontWeight: '700',
  },
  badge: {
    backgroundColor: '#f0f2f5',
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  budgetText: {
    color: '#8c8c8c',
    fontSize: 13,
  },
  categoryText: {
    color: '#65676b',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 3,
    marginHorizontal: 12,
    marginVertical: 6,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  dateText: {
    color: '#a0a0a0',
    fontSize: 12,
  },
  description: {
    color: '#1a1a1a',
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  footer: {
    borderTopColor: '#f0f0f0',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 8,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  headerSubtitle: {
    color: '#666',
    fontSize: 14,
    marginTop: 2,
  },

  headerTitle: {
    color: '#1a1a1a',
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
  middleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
  },
  summaryBadge: {
    backgroundColor: '#e8f0fe',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  summaryText: {
    color: '#1a73e8',
    fontSize: 12,
    fontWeight: '600',
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
});

interface TransactionItemProps {
  transaction: TransactionModel;
  budget: BudgetModel;
  category: CategoriesModel;
}

const TransactionItem = ({transaction, budget, category}: TransactionItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.description} numberOfLines={1}>
          {transaction.description || 'No description'}
        </Text>
        <Text style={styles.amount}>${transaction.amount.toLocaleString()}</Text>
      </View>

      <View style={styles.middleRow}>
        <View style={styles.badge}>
          <Text style={styles.categoryText}>{category.name}</Text>
        </View>
        <Text style={styles.budgetText}>
          {budget.name} • {budget.targetPercentage * 100}%
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.dateText}>
          {transaction.transactionExecutedAt?.toDateString() ?? 'No Date'}
        </Text>
      </View>
    </View>
  );
};

const ListHeader = () => (
  <View style={styles.headerContainer}>
    <View>
      <Text style={styles.headerTitle}>Transactions</Text>
      <Text style={styles.headerSubtitle}>Your recent activity</Text>
    </View>
    <View style={styles.summaryBadge}>
      <Text style={styles.summaryText}>Feb 2026</Text>
    </View>
  </View>
);

const EnhancedTransactionItem = withObservables(['transaction'], ({transaction}) => ({
  transaction,
  budget: transaction.budget.observe(),
  category: transaction.category.observe(),
}))(TransactionItem);

const enhance = withObservables([], () => ({
  transactions: getCurrentMonthTransactions(),
}));

const TransactionList = ({transactions}: {transactions: TransactionModel[]}) => {
  return (
    <FlatList
      scrollEnabled={false}
      data={transactions}
      keyExtractor={item => item.id}
      ListHeaderComponent={ListHeader}
      renderItem={({item}) => <EnhancedTransactionItem transaction={item} key={item.id} />}
    />
  );
};

export default enhance(TransactionList);
