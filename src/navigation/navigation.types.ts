export const Routes = {
  // MAIN
  Onboarding: 'Onboarding',
  Home: 'Home',
  // TAB
  Dashboard: 'Dashboard',
  Transactions: 'Transactions',
  Planning: 'Planning',
  // ONBOARDING
  Introduction: 'Introduction',
  IncomeSetup: 'IncomeSetup',
};

export type RootStackParamList = {
  [Routes.Onboarding]: undefined;
  [Routes.Home]: undefined;
};

export type TabStackParamList = {
  [Routes.Dashboard]: undefined;
  [Routes.Transactions]: undefined;
  [Routes.Planning]: undefined;
};

export type OnboardingParamList = {
  [Routes.Introduction]: undefined;
  [Routes.IncomeSetup]: undefined;
};
