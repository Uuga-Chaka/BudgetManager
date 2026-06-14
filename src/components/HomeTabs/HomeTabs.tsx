import {type BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {BottomNavigation, BottomNavigationTab} from '@ui-kitten/components';
// FIX: remove unnecesary component
export const BottomTabBar = ({navigation, state}: BottomTabBarProps) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title="Dashboard" />
    <BottomNavigationTab title="Expenses" />
    <BottomNavigationTab title="Planning" />
  </BottomNavigation>
);
