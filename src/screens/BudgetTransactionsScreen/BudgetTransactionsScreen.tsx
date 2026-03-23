import {View, Text} from 'react-native';

import {type RootScreenProps, type Routes} from '@app/navigation/navigation.types';

const BudgetTransactionsScreen = ({route}: RootScreenProps<typeof Routes.TransactionByBudget>) => {
  return (
    <View>
      <Text>{route.params.budgetId}</Text>
    </View>
  );
};

export default BudgetTransactionsScreen;
