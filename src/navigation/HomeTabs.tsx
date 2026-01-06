import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {BottomTabBar} from '../components/HomeTabs/HomeTabs';
import {Routes, type TabStackParamList} from '../navigation/navigation.types';
import Dashboard from '../screens/Dashboard/Dashboard';
import Planning from '../screens/Planning/Planning';
import Transactions from '../screens/Transactions/Transactions';

const Tab = createBottomTabNavigator<TabStackParamList>();
export default function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName={Routes.Dashboard}
      tabBar={BottomTabBar}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name={Routes.Dashboard} component={Dashboard} />
      <Tab.Screen name={Routes.Transactions} component={Transactions} />
      <Tab.Screen name={Routes.Planning} component={Planning} />
    </Tab.Navigator>
  );
}
