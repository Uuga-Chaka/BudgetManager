import {Button, Input, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';

import AppKeyBoardAwareScrollView from '../../../components/AppKeyBoardAwareScrollView/AppKeyBoardAwareScrollView';
import Layout from '../../../components/Layout/Layout';
import {size} from '../../../consts/styles';
import {type RootOnboardingScreenProps, Routes} from '../../../navigation/navigation.types';

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
    <Layout>
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
    </Layout>
  );
}
