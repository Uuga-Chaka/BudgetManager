import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {type OnboardingParamList, Routes} from './navigation.types';
import IncomeSetup from '../screens/Onboarding/IncomeSetup/IncomeSetup';
import Introduction from '../screens/Onboarding/Introduction/Introduction';

const {Screen, Navigator} = createNativeStackNavigator<OnboardingParamList>();

export default function OnboardingRouter() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name={Routes.IncomeSetup} component={IncomeSetup} />
      <Screen name={Routes.Introduction} component={Introduction} />
    </Navigator>
  );
}
