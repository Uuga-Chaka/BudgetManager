import {Button, Text} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';

import Layout from '../../../components/Layout/Layout';
import {size} from '../../../consts/styles';
import {Routes, type RootOnboardingScreenProps} from '../../../navigation/navigation.types';

export default function Introduction({
  navigation,
}: RootOnboardingScreenProps<typeof Routes.Introduction>) {
  const navigate = () => navigation.push(Routes.IncomeSetup);

  return (
    <Layout>
      <View>
        <View style={{gap: size.l}}>
          <Text category="h1">Welcome</Text>
          <Text category="h4">Let&apos;s start setting up all your information</Text>
          <Text category="P2">
            We&apos;ll be asking you all the information you need to start your budget planning but
            you can leave it as it&apos;s
          </Text>
        </View>
        <Button style={{marginTop: size.l}} onPress={navigate}>
          Siguiente
        </Button>
      </View>
    </Layout>
  );
}
