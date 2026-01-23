import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AppLayout from '@app/components/Layout/Layout';
import BudgetSetup from '@app/screens/Onboarding/BudgetSetup/BudgetSetup';
import CategoriesSetup from '@app/screens/Onboarding/CategoriesSetup/CategoriesSetup';
import IncomeSetup from '@app/screens/Onboarding/IncomeSetup/IncomeSetup';
import Introduction from '@app/screens/Onboarding/Introduction/Introduction';

import {type OnboardingParamList, Routes} from './navigation.types';

const {Screen, Navigator, Group} = createNativeStackNavigator<OnboardingParamList>();

export default function OnboardingRouter() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Group screenLayout={AppLayout}>
        <Screen name={Routes.Introduction} component={Introduction} />
        <Screen name={Routes.IncomeSetup} component={IncomeSetup} />
        <Screen name={Routes.BudgetSetup} component={BudgetSetup} />
        <Screen name={Routes.CategoriesSetup} component={CategoriesSetup} />
      </Group>
    </Navigator>
  );
}
