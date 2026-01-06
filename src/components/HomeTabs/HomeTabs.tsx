import {type BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {BottomNavigation, BottomNavigationTab} from '@ui-kitten/components';

export const BottomTabBar = ({navigation, state}: BottomTabBarProps) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title="Dashboard" />
    <BottomNavigationTab title="Transactions" />
    <BottomNavigationTab title="Planning" />
  </BottomNavigation>
);
