import React from 'react';
import {StyleSheet, View} from 'react-native';

import Button from '@app/components/core/Button/Button';
import Text from '@app/components/core/Text/Text';
import {type RootOnboardingScreenProps, type Routes} from '@app/navigation/navigation.types';
import {useSetupStore} from '@app/store';

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  title: {
    marginBottom: 100,
  },
});

export default function ResumeSetup({
  navigation,
}: RootOnboardingScreenProps<typeof Routes.ResumeSetup>) {
  const {categories, countryCode, incomeAmount, incomeName, percentageGroupName, percentageGroups} =
    useSetupStore();
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text variant="h4">
          Este es la información que introdugiste. ¿Quieres terminar de guardarla?
        </Text>
      </View>
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
      <Button onPress={() => navigation.goBack()}>Confirmar</Button>
    </View>
  );
}
