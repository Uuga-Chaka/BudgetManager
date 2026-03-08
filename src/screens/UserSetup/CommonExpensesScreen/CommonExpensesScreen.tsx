import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import Button from '@app/components/core/Button/Button';
import Text from '@app/components/core/Text/Text';
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
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.s,
    },
    container: {
      flex: 1,
      paddingVertical: 24,
    },
    topContainer: {
      justifyContent: 'center',
      minHeight: '50%',
    },
  });

  return styles;
};

const CommonExpensesScreen = () => {
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

  const handleButtonSelected = useCallback(
    (selectedExpense: string) => {
      if (selectedExpenses.includes(selectedExpense)) {
        return 'filled';
      }
      return 'outline';
    },
    [selectedExpenses],
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topContainer}>
        <Text variant="h1">¿Cuales son tus gastos más comunes?</Text>
        <Text variant="p1">
          Selecciona todos los que aplican para ayudarnos a categorizar tus gastos más facilmente.
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.buttonContainer}>
          {commonExpensesList.map(e => (
            <Button
              key={e.name}
              variant={handleButtonSelected(e.name)}
              onPress={() => onSelectedExpense(e.name)}>
              {e.name}
            </Button>
          ))}
        </View>
        <Button>Continuar</Button>
      </View>
    </ScrollView>
  );
};

export default CommonExpensesScreen;
