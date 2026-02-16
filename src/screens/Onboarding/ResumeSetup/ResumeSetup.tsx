import React from 'react';
import {StyleSheet, View} from 'react-native';

import Button from '@app/components/core/Button/Button';
import Text from '@app/components/core/Text/Text';
import {localStorageKeys} from '@app/consts/localStorageKeys';
import {database} from '@app/database';
import {initializeAccountSetup} from '@app/database/queries/createIncome';
import {Routes, type RootOnboardingScreenProps} from '@app/navigation/navigation.types';
import {useSetupStore} from '@app/store';

const styles = StyleSheet.create({
  container: {},
  dataContainer: {
    gap: 12,
    paddingVertical: 45,
  },
  title: {},
});

export default function ResumeSetup({
  navigation,
}: RootOnboardingScreenProps<typeof Routes.ResumeSetup>) {
  const {categories, countryCode, incomeAmount, incomeName, percentageGroupName, percentageGroups} =
    useSetupStore();

  const saveSetup = async () => {
    try {
      await initializeAccountSetup({
        income: {
          name: incomeName,
          currency: countryCode,
          incomeAmount: incomeAmount,
        },
        budgetGroup: {
          name: percentageGroupName,
          budgets: percentageGroups,
        },
        categories: categories,
      });

      database.localStorage.set(localStorageKeys.IS_ONBOARDING_COMPLETED, true);
      navigation.reset({index: 0, routes: [{name: Routes.ScheduleTransactions}]});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text variant="h4">
          Este es la información que introdugiste. ¿Quieres terminar de guardarla?
        </Text>
      </View>
      <View style={styles.dataContainer}>
        <View>
          <Text variant="h6">Entrada de dinero</Text>

          <Text>{countryCode}</Text>
          <Text>{incomeAmount}</Text>
          <Text>{incomeName}</Text>
        </View>

        <View>
          <Text variant="h6">Grupo de porcentajes</Text>
          <Text>{percentageGroupName}</Text>
          {percentageGroups.map(e => (
            <Text key={e.id}>
              {e.name} - {e.percentage}%
            </Text>
          ))}
        </View>

        <View>
          <Text variant="h6">Categorias creadas</Text>
          {categories.map(e => (
            <Text key={e.id}>{e.name}</Text>
          ))}
        </View>
      </View>
      <Button onPress={saveSetup}>Confirmar</Button>
    </View>
  );
}
