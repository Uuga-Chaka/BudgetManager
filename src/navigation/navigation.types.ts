import {
  type BottomTabNavigationProp,
  type BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {
  type NavigatorScreenParams,
  type CompositeNavigationProp,
  type CompositeScreenProps,
} from '@react-navigation/native';
import {
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';

export const Routes = {
  // ROOT
  Onboarding: 'Onboarding',
  Home: 'Home',

  // TAB
  Dashboard: 'Dashboard',
  Transactions: 'Transactions',
  Planning: 'Planning',

  // ONBOARDING
  Introduction: 'Introduction',
  IncomeSetup: 'IncomeSetup',
  BudgetSetup: 'BudgetSetup',
  CategoriesSetup: 'CategoriesSetup',
} as const;

export type RootStackParamList = {
  [Routes.Onboarding]: NavigatorScreenParams<OnboardingParamList>;
  [Routes.Home]: NavigatorScreenParams<TabStackParamList>;
};

export type TabStackParamList = {
  [Routes.Dashboard]: undefined;
  [Routes.Transactions]: undefined;
  [Routes.Planning]: undefined;
};

export type OnboardingParamList = {
  [Routes.Introduction]: undefined;
  [Routes.IncomeSetup]: undefined;
  [Routes.BudgetSetup]: undefined;
  [Routes.CategoriesSetup]: undefined;
};

// types for screen components props
export type RootOnboardingScreenProps<RouteName extends keyof OnboardingParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<OnboardingParamList, RouteName>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type RootTabScreenProps<RouteName extends keyof TabStackParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabStackParamList, RouteName>,
  CompositeScreenProps<
    NativeStackScreenProps<OnboardingParamList>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

// types when annotating navigation directly
export type RootOnboardingScreenNavigationProps<RouteName extends keyof OnboardingParamList> =
  CompositeNavigationProp<
    NativeStackNavigationProp<OnboardingParamList, RouteName>,
    NativeStackNavigationProp<RootStackParamList>
  >;

export type RootTabScreenNavigationProps<RouteName extends keyof TabStackParamList> =
  CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList, RouteName>,
    CompositeNavigationProp<
      NativeStackNavigationProp<OnboardingParamList>,
      NativeStackNavigationProp<RootStackParamList>
    >
  >;
