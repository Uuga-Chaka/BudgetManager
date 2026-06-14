import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {DashboardIcon, SettingsIcon, ExpensesIcon} from '@app/assets/Icons';
import Dashboard from '@app/screens/Dashboard/Dashboard';
import ExpensesScreen from '@app/screens/Expenses/Expenses';
import Planning from '@app/screens/Planning/Planning';

import {Routes, type TabStackParamList} from './navigation.types';

const Tab = createBottomTabNavigator<TabStackParamList>();
export default function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName={Routes.Dashboard}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: () => {
          if (route.name === Routes.Dashboard) return <DashboardIcon stroke={'#adadad'} />;
          else if (route.name === Routes.Expenses) return <ExpensesIcon stroke={'#adadad'} />;
          return <SettingsIcon stroke={'#adadad'} />;
        },
      })}>
      <Tab.Screen name={Routes.Expenses} component={ExpensesScreen} />
      <Tab.Screen name={Routes.Dashboard} component={Dashboard} />
      <Tab.Screen name={Routes.Planning} component={Planning} />
    </Tab.Navigator>
  );
}
