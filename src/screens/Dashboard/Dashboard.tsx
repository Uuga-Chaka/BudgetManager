import React from 'react';
import {Text, View} from 'react-native';

import Button from '@app/components/core/Button/Button';
import {type RootTabScreenProps, type Routes} from '@app/navigation/navigation.types';

export default function Dashboard({navigation}: RootTabScreenProps<typeof Routes.Dashboard>) {
  return (
    <View>
      <Text>Dashboard</Text>
      <Button onPress={() => navigation.navigate('AddTransaction')}>Navegar</Button>
    </View>
  );
}
