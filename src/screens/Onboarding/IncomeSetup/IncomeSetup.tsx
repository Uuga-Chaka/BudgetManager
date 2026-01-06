import {Button, Input} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Layout from '../../../components/Layout/Layout';
import {size} from '../../../consts/styles';

const styles = StyleSheet.create({
  container: {
    gap: size.m,
  },
  description: {
    paddingVertical: size.xl,
  },
  button: {},
});

export default function IncomeSetup() {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.description}>Actualizaremos esta información para el mes de enero</Text>
        <Input label={'Nombre del ingreso'} placeholder="Salario" />
        <Input label={'Moneda'} placeholder="COP" />
        <Input label={'Cantidad'} placeholder="1'.000.000" />
        <Input label={'Nombre del ingreso'} placeholder="Salario" />
        <Input label={'Tipo'} placeholder="Ahorro" />
        <Button>Siguiente</Button>
      </View>
    </Layout>
  );
}
