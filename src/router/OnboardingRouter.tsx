import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import IncomeSetup from '../screens/Onboarding/IncomeSetup/IncomeSetup';
import Introduction from '../screens/Onboarding/Introduction/Introduction';

const {Screen, Navigator} = createNativeStackNavigator<OnboardingParamList>();

export default function OnboardingRouter() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name={INCOME_SETUP} component={IncomeSetup} />
      <Screen name={INTRODUCTION} component={Introduction} />
    </Navigator>
  );
}

const INTRODUCTION = 'Introduction';
const INCOME_SETUP = 'IncomeSetup';

type OnboardingParamList = {
  [INTRODUCTION]: undefined;
  [INCOME_SETUP]: undefined;
};
