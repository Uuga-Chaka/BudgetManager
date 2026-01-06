import {type BottomTabBarProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomNavigation, BottomNavigationTab} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native-safe-area-context';

import OnboardingRouter from './OnboardingRouter';
import Dashboard from '../screens/Dashboard/Dashboard';
import Planning from '../screens/Planning/Planning';
import Transactions from '../screens/Transactions/Transactions';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabStackParamList>();

const BottomTabBar = ({navigation, state}: BottomTabBarProps) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title="Dashboard" />
    <BottomNavigationTab title="Transactions" />
    <BottomNavigationTab title="Planning" />
  </BottomNavigation>
);

export default function Router() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <Stack.Navigator
          initialRouteName="Onboarding"
          screenOptions={{
            headerShown: false,
            statusBarStyle: 'dark',
          }}>
          <Stack.Screen name={HOME}>
            {() => (
              <Tab.Navigator
                initialRouteName={DASHBOARD}
                tabBar={BottomTabBar}
                screenOptions={{headerShown: false}}>
                <Tab.Screen name={DASHBOARD} component={Dashboard} />
                <Tab.Screen name={TRANSACTIONS} component={Transactions} />
                <Tab.Screen name={PLANNING} component={Planning} />
              </Tab.Navigator>
            )}
          </Stack.Screen>
          <Stack.Group>
            <Stack.Screen name={ONBOARDING} component={OnboardingRouter} />
          </Stack.Group>
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const ONBOARDING = 'Onboarding';
const HOME = 'Home';
const DASHBOARD = 'Dashboard';
const TRANSACTIONS = 'Transactions';
const PLANNING = 'Planning';

type RootStackParamList = {
  [ONBOARDING]: undefined;
  [HOME]: undefined;
};

type TabStackParamList = {
  [DASHBOARD]: undefined;
  [TRANSACTIONS]: undefined;
  [PLANNING]: undefined;
};
