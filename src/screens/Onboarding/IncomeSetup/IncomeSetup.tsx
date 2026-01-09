import {Button, Input, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';

import Layout from '../../../components/Layout/Layout';
import {size} from '../../../consts/styles';

const styles = StyleSheet.create({
  container: {
    gap: size.m,
  },
  description: {
    paddingVertical: size.xl,
  },
  scrollContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical: size.xl,
  },
});

export default function IncomeSetup() {
  return (
    <Layout>
      <KeyboardAwareScrollView
        bottomOffset={50}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.description}>
            Actualizaremos esta información para el mes de enero
          </Text>
          <Input label={'Nombre del ingreso'} placeholder="Salario" />
          <Input label={'Moneda'} placeholder="COP" />
          <Input label={'Cantidad'} placeholder="1'.000.000" />
          <Input label={'Nombre del ingreso'} placeholder="Salario" />
          <Input label={'Tipo'} placeholder="Ahorro" />
          <Button>Siguiente</Button>
        </View>
      </KeyboardAwareScrollView>
    </Layout>
  );
}
