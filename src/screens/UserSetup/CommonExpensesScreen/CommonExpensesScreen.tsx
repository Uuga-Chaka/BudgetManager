import {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {CommonExpenseItem} from '@app/components/CommonExpenseItem/CommonExpenseItem';
import Button from '@app/components/core/Button/Button';
import Text from '@app/components/core/Text/Text';
import {type RootOnboardingScreenProps, Routes} from '@app/navigation/navigation.types';
import {type ThemeProps} from '@app/theme/theme';
import {useAppTheme} from '@app/theme/useAppTheme';

const commonExpensesList = [
  {
    name: 'Seguro médico',
    category: 'Hogar',
    budget: 'Necesidades',
  },
  {
    name: 'Deudas del carro',
    category: 'Hogar',
    budget: 'Necesidades',
  },
  {
    name: 'Mercado',
    category: 'Hogar',
    budget: 'Necesidades',
  },
  {
    name: 'Arriendo',
    category: 'Hogar',
    budget: 'Necesidades',
  },
  {
    name: 'Utilidades',
    category: 'Hogar',
    budget: 'Necesidades',
  },
  {
    name: 'Salida a comer',
    category: 'Deseos',
    budget: 'Ocio',
  },
  {
    name: 'Subscripciones',
    category: 'Hogar',
    budget: 'Deseos',
  },
  {
    name: 'Entretenimiento',
    category: 'Hogar',
    budget: 'Deseos',
  },
  {
    name: 'Membresía del gimansio',
    category: 'Personal',
    budget: 'Necesidades',
  },
  {
    name: 'Viaje',
    category: 'Ahorro',
    budget: 'Deseos',
  },
];

const styleProps = (theme: ThemeProps) => {
  const styles = StyleSheet.create({
    bottomContainer: {
      flex: 1,
      justifyContent: 'space-between',
    },
    buttonContainer: {
      flexDirection: 'column',
      gap: theme.spacing.s,
      paddingVertical: theme.spacing.m,
    },
    container: {
      flex: 1,
      paddingVertical: 24,
    },
    topContainer: {
      justifyContent: 'center',
      paddingVertical: 100,
    },
  });

  return styles;
};

const CommonExpensesScreen = ({
  navigation,
}: RootOnboardingScreenProps<typeof Routes.CommonExpenses>) => {
  const {theme} = useAppTheme();
  const styles = styleProps(theme);

  const [selectedExpenses, setSelectedExpenses] = useState<string[]>([]);

  const onSelectedExpense = (selectedExpense: string) => {
    setSelectedExpenses(prev => {
      if (selectedExpenses.includes(selectedExpense)) {
        return selectedExpenses.filter(e => e !== selectedExpense);
      }
      return [...prev, selectedExpense];
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text variant="h1">¿Cuales son tus gastos más comunes?</Text>
        <Text variant="p1">
          Selecciona todos los que aplican para ayudarnos a categorizar tus gastos más facilmente.
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <ScrollView
          contentContainerStyle={styles.buttonContainer}
          showsVerticalScrollIndicator={false}>
          {commonExpensesList.map(e => (
            <CommonExpenseItem
              {...e}
              key={e.name}
              onPress={onSelectedExpense}
              isSelected={selectedExpenses.includes(e.name)}
            />
          ))}
        </ScrollView>
        <Button onPress={() => navigation.navigate(Routes.BudgetSummary)}>Continuar</Button>
      </View>
    </View>
  );
};

export default CommonExpensesScreen;
