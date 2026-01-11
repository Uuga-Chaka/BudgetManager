import React from 'react';
import {View} from 'react-native';

import {Button, Text} from '@ui-kitten/components';

import AppLayout from '@app/components/Layout/Layout';
import {size} from '@app/consts/styles';
import {type RootOnboardingScreenProps, Routes} from '@app/navigation/navigation.types';

export default function Introduction({
  navigation,
}: RootOnboardingScreenProps<typeof Routes.Introduction>) {
  const navigate = () => navigation.push(Routes.IncomeSetup);

  return (
    <AppLayout>
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
    </AppLayout>
  );
}
