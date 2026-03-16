import {FlatList, StyleSheet, View} from 'react-native';

import {CommonExpenseItem} from '@app/components/CommonExpenseItem/CommonExpenseItem';
import Button from '@app/components/core/Button/Button';
import Text from '@app/components/core/Text/Text';
import {commonExpensesList} from '@app/consts/budgetGroupOptions';
import {type RootOnboardingScreenProps, Routes} from '@app/navigation/navigation.types';
import {useSetupStore} from '@app/store';
import {type ThemeProps} from '@app/theme/theme';
import {useAppTheme} from '@app/theme/useAppTheme';

const styleProps = (theme: ThemeProps) => {
  const styles = StyleSheet.create({
    buttonContainer: {
      flexDirection: 'column',
      gap: theme.spacing.s,
      paddingVertical: theme.spacing.m,
    },
    container: {
      flex: 1,
    },
    topContainer: {
      justifyContent: 'center',
      paddingVertical: 50,
    },
  });

  return styles;
};

const CommonExpensesScreen = ({
  navigation,
}: RootOnboardingScreenProps<typeof Routes.CommonExpenses>) => {
  const {theme} = useAppTheme();
  const styles = styleProps(theme);

  const {toggleSelectedExpense, commonExpenses} = useSetupStore();

  const handleNext = () => {
    navigation.navigate(Routes.BudgetSummary);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <View style={styles.topContainer}>
            <Text variant="h1">¿Cuales son tus gastos más comunes?</Text>
            <Text variant="p1">
              Selecciona todos los que aplican para ayudarnos a categorizar tus gastos facilmente.
            </Text>
          </View>
        )}
        data={commonExpensesList}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <CommonExpenseItem
            {...item}
            onPress={toggleSelectedExpense}
            isSelected={commonExpenses.some(e => e.name === item.name)}
          />
        )}
        contentContainerStyle={styles.buttonContainer}
        showsVerticalScrollIndicator={false}
      />
      <Button onPress={handleNext}>Continuar</Button>
    </View>
  );
};

export default CommonExpensesScreen;
