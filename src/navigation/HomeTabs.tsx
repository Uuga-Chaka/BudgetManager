import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {BottomTabBar} from '@app/components/HomeTabs/HomeTabs';
import Dashboard from '@app/screens/Dashboard/Dashboard';
import Planning from '@app/screens/Planning/Planning';
import Transactions from '@app/screens/Transactions/Transactions';

import {Routes, type TabStackParamList} from './navigation.types';

const Tab = createBottomTabNavigator<TabStackParamList>();
export default function HomeTabs() {
  return (
    <Tab.Navigator initialRouteName={Routes.Dashboard} screenOptions={{headerShown: false}}>
      <Tab.Screen name={Routes.Transactions} component={Transactions} />
      <Tab.Screen name={Routes.Dashboard} component={Dashboard} />
      <Tab.Screen name={Routes.Planning} component={Planning} />
    </Tab.Navigator>
  );
}
