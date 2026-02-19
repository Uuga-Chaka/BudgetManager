import {View, StyleSheet, ScrollView} from 'react-native';

import {withObservables} from '@nozbe/watermelondb/react';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';

import {
  getCurrentMonthLatestBudget,
  getIncomeSumByCurrentMonth,
} from '@app/database/queries/createIncome';
import {formatCurrency} from '@app/utils/currency';

import Text from '../core/Text/Text';

import type BudgetModel from '@app/database/models/budget';
import type BudgetGroupModel from '@app/database/models/budgetGroup';
import type IncomeModel from '@app/database/models/income';

// TODO: REDO styles a connect it to themes

const styles = StyleSheet.create({
  allocatedAmount: {
    color: '#212529',
    fontSize: 18,
    fontWeight: '700',
  },
  budgetName: {
    color: '#495057',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    elevation: 3,
    marginRight: 12,
    padding: 16,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,

    width: 150,
  },
  container: {
    paddingVertical: 20,
  },
  divider: {
    backgroundColor: '#E9ECEF',
    height: 1,
    marginVertical: 12,
  },
  header: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  incomeAmount: {
    color: '#212529',
    fontSize: 32,
    fontWeight: '800',
  },
  label: {
    color: '#6C757D',
    fontSize: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  percentage: {
    color: '#0D6EFD',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },
  scrollContainer: {
    marginBottom: 12,
    paddingLeft: 16,
    paddingRight: 8,
  },
});

function Dashboard({
  income,
  budgetGroup,
  budgets,
}: {
  income: IncomeModel[];
  budgets: BudgetModel[];
  budgetGroup: BudgetGroupModel[];
}) {
  const currentMonthIncome = income.reduce((prev, current) => prev + current.incomeAmount, 0);

  const formattedCurrency = (value: number) => {
    const {formatted} = formatCurrency({value: String(value)});
    return formatted;
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Total Income</Text>
        <Text style={styles.incomeAmount}>{formattedCurrency(currentMonthIncome)}</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {budgets.map(e => (
          <View key={e.id} style={styles.card}>
            <Text style={styles.budgetName}>{e.name}</Text>
            <Text style={styles.percentage}>{e.targetPercentage * 100}%</Text>
            <View style={styles.divider} />
            <Text style={styles.allocatedAmount}>
              {formattedCurrency(currentMonthIncome * e.targetPercentage)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const enhance = withObservables([], () => ({
  income: getIncomeSumByCurrentMonth(),
  budgetGroup: getCurrentMonthLatestBudget().pipe(map(groups => groups[0])),
}));

const enhanceWithBudget = withObservables(['budgetGroup'], ({budgetGroup}) => ({
  budgets: budgetGroup ? budgetGroup.budgets.observe() : of([]),
}));

export const DashboardCard = enhance(enhanceWithBudget(Dashboard));
