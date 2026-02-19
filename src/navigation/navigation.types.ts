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
  AddTransaction: 'AddTransaction',

  // TAB
  Dashboard: 'Dashboard',
  Transactions: 'Transactions',
  Planning: 'Planning',

  // ONBOARDING
  Introduction: 'Introduction',
  IncomeSetup: 'IncomeSetup',
  BudgetSetup: 'BudgetSetup',
  CategoriesSetup: 'CategoriesSetup',
  ResumeSetup: 'ResumeSetup',
  ScheduleTransactions: 'ScheduleTransactions',
} as const;

export type RootStackParamList = {
  [Routes.Onboarding]: NavigatorScreenParams<OnboardingParamList> | undefined;
  [Routes.Home]: NavigatorScreenParams<TabStackParamList> | undefined;
  [Routes.AddTransaction]: undefined;
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
  [Routes.ResumeSetup]: undefined;
  [Routes.ScheduleTransactions]: undefined;
};

// types for screen components props
export type RootScreenProps<RouteName extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  RouteName
>;

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
