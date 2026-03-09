import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AppLayout from '@app/components/Layout/Layout';
import BudgetSetup from '@app/screens/Onboarding/BudgetSetup/BudgetSetup';
import CategoriesSetup from '@app/screens/Onboarding/CategoriesSetup/CategoriesSetup';
import IncomeSetup from '@app/screens/Onboarding/IncomeSetup/IncomeSetup';
import Introduction from '@app/screens/Onboarding/Introduction/Introduction';
import ResumeSetup from '@app/screens/Onboarding/ResumeSetup/ResumeSetup';
import ScheduleTransactions from '@app/screens/Onboarding/ScheduleTransactions/ScheduleTransactions';
import BudgetPlanScreen from '@app/screens/UserSetup/BudgetPlanScreen/BudgetPlanScreen';
import BudgetSummaryScreen from '@app/screens/UserSetup/BudgetSummaryScreen/BudgetSummaryScreen';
import CommonExpensesScreen from '@app/screens/UserSetup/CommonExpensesScreen/CommonExpensesScreen';
import NetIncomeSetupScreen from '@app/screens/UserSetup/NetIncomeSetupScreen/NetIncomeSetupScreen';

import {type OnboardingParamList, Routes} from './navigation.types';

const {Screen, Navigator, Group} = createNativeStackNavigator<OnboardingParamList>();

const titles = {
  selectBudget: 'Configuración presupuestaria',
  netIncome: 'Perfil de ingresos',
  commonExpenses: 'Gastos recurrentes',
  budgetSummary: 'Resumen de presupuesto',
};

export default function OnboardingRouter() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Group screenLayout={AppLayout}>
        <Screen
          name={Routes.SelectBudgetPlan}
          component={BudgetPlanScreen}
          options={{title: titles.selectBudget}}
        />
        <Screen
          name={Routes.NetIncomeSetup}
          component={NetIncomeSetupScreen}
          options={{title: titles.netIncome}}
        />
        <Screen
          name={Routes.CommonExpenses}
          component={CommonExpensesScreen}
          options={{title: titles.commonExpenses}}
        />

        <Screen
          name={Routes.BudgetSummary}
          component={BudgetSummaryScreen}
          options={{title: titles.budgetSummary}}
        />

        <Screen name={Routes.Introduction} component={Introduction} />
        <Screen name={Routes.IncomeSetup} component={IncomeSetup} />
        <Screen name={Routes.BudgetSetup} component={BudgetSetup} />
        <Screen name={Routes.CategoriesSetup} component={CategoriesSetup} />
        <Screen name={Routes.ResumeSetup} component={ResumeSetup} />
        <Screen name={Routes.ScheduleTransactions} component={ScheduleTransactions} />
      </Group>
    </Navigator>
  );
}
