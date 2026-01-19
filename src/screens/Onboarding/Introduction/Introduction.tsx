import React from 'react';
import {View} from 'react-native';

import {size} from '@app/consts/styles';
import Button from '@app/core/Button/Button';
import Text from '@app/core/Text/Text';
import {type RootOnboardingScreenProps, Routes} from '@app/navigation/navigation.types';

export default function Introduction({
  navigation,
}: RootOnboardingScreenProps<typeof Routes.Introduction>) {
  const navigate = () => navigation.push(Routes.IncomeSetup);

  return (
    <View>
      <View style={{gap: size.l}}>
        <Text variant="h1">Welcome</Text>
        <Text variant="h4">Let&apos;s start setting up all your information</Text>
        <Text variant="p2">
          We&apos;ll be asking you all the information you need to start your budget planning but
          you can leave it as it&apos;s
        </Text>
      </View>
      <Button style={{marginTop: size.l}} onPress={navigate}>
        Siguiente
      </Button>
    </View>
  );
}
