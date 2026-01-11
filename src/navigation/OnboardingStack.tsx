import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from '@ui-kitten/components';
import React from 'react';

import {type OnboardingParamList, Routes} from './navigation.types';
import BudgetSetup from '../screens/Onboarding/BudgetSetup/BudgetSetup';
import IncomeSetup from '../screens/Onboarding/IncomeSetup/IncomeSetup';
import Introduction from '../screens/Onboarding/Introduction/Introduction';

const {Screen, Navigator} = createNativeStackNavigator<OnboardingParamList>();

export default function OnboardingRouter() {
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerTransparent: true,
        title: '',
        headerStyle: {
          backgroundColor: theme['background-basic-color-1'],
        },
        headerTintColor: theme['background-alternative-color-2'],
        headerTitleAlign: 'center',
      }}>
      <Screen name={Routes.Introduction} component={Introduction} />
      <Screen name={Routes.IncomeSetup} component={IncomeSetup} />
      <Screen name={Routes.BudgetSetup} component={BudgetSetup} />
    </Navigator>
  );
}
