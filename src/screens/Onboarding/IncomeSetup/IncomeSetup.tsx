import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Button, Input, Text} from '@ui-kitten/components';

import AppKeyBoardAwareScrollView from '@app/components/AppKeyBoardAwareScrollView/AppKeyBoardAwareScrollView';
import AppLayout from '@app/components/Layout/Layout';
import {size} from '@app/consts/styles';
import {Routes, type RootOnboardingScreenProps} from '@app/navigation/navigation.types';

const styles = StyleSheet.create({
  container: {
    gap: size.m,
  },
  description: {
    paddingVertical: size.xl,
  },
});

export default function IncomeSetup({
  navigation,
}: RootOnboardingScreenProps<typeof Routes.IncomeSetup>) {
  const navigate = () => navigation.push(Routes.BudgetSetup);

  return (
    <AppLayout>
      <AppKeyBoardAwareScrollView>
        <View style={styles.container}>
          <Text style={styles.description}>
            Actualizaremos esta información para el mes de enero
          </Text>
          <Input label={'Nombre del ingreso'} placeholder="Salario" />
          <Input label={'Moneda'} placeholder="COP" />
          <Input label={'Cantidad'} placeholder="1'.000.000" />
          <Input label={'Nombre del ingreso'} placeholder="Salario" />
          <Input label={'Tipo'} placeholder="Ahorro" />
          <Button onPress={navigate}>Siguiente</Button>
        </View>
      </AppKeyBoardAwareScrollView>
    </AppLayout>
  );
}
