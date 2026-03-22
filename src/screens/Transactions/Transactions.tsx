import {StyleSheet, View} from 'react-native';

import {PlusIcons} from '@app/assets/Icons';
import AppKeyBoardAwareScrollView from '@app/components/AppKeyBoardAwareScrollView/AppKeyBoardAwareScrollView';
import Button from '@app/components/core/Button/Button';
import {DashboardCard} from '@app/components/DashboardCard/DashboardCard';
import TransactionList from '@app/components/TransactionList/TransactionList';
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

export default function Transactions({navigation}: RootTabScreenProps<typeof Routes.Transactions>) {
  return (
    <View style={styles.container}>
      <AppKeyBoardAwareScrollView>
        <DashboardCard />
        <TransactionList />
      </AppKeyBoardAwareScrollView>
      <Button
        onPress={() => navigation.navigate(Routes.AddTransaction)}
        IconLeft={PlusIcons}
        style={styles.buttonStyle}
      />
    </View>
  );
}
