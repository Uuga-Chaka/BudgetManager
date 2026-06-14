import {View, Text} from 'react-native';

import {type RootScreenProps, type Routes} from '@app/navigation/navigation.types';

const BudgetExpensesScreen = ({route}: RootScreenProps<typeof Routes.ExpenseByBudget>) => {
  return (
    <View>
      <Text>{route.params.budgetId}</Text>
    </View>
  );
};

export default BudgetExpensesScreen;
