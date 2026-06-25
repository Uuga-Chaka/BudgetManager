import {StyleSheet, View} from 'react-native';

import {PlusIcons} from '@app/assets/Icons';
import AppKeyBoardAwareScrollView from '@app/components/AppKeyBoardAwareScrollView/AppKeyBoardAwareScrollView';
import Button from '@app/components/core/Button/Button';
import {DashboardCard} from '@app/components/DashboardCard/DashboardCard';
import List from '@app/components/ExpensesList/ExpensesList';
import {Routes, type RootTabScreenProps} from '@app/navigation/navigation.types';

const styles = StyleSheet.create({
  buttonStyle: {
    bottom: 10,
    position: 'absolute',
    right: 10,
    width: 'auto',
  },
  container: {
    flex: 1,
  },
});

export default function Expenses({navigation}: RootTabScreenProps<typeof Routes.Expenses>) {
  return (
    <View style={styles.container}>
      <AppKeyBoardAwareScrollView>
        <DashboardCard />
        <List />
      </AppKeyBoardAwareScrollView>
      <Button
        onPress={() => navigation.navigate(Routes.AddExpense)}
        IconLeft={PlusIcons}
        style={styles.buttonStyle}
      />
    </View>
  );
}
