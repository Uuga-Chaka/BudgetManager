import React from 'react';
import {Text, View} from 'react-native';

import {type RootTabScreenProps, type Routes} from '@app/navigation/navigation.types';

export default function Dashboard({navigation}: RootTabScreenProps<typeof Routes.Dashboard>) {
  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  );
}
