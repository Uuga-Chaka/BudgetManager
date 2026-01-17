import {create} from 'zustand';

import {type PercentageBudgetGroup} from '@app/types/budgetGroup';

type SetupStoreState = {
  // ##---BUDGET SETUP---##
  incomeName: string;
  countryCode: string;
  incomeAmount: number;
  incomeType: string;

  // ##---PERCENTAGE GROUP---##
  percentageGroupName: string;
  percentageGroups: PercentageBudgetGroup;

  // ##---CATEGORIES---##
  categories: string[];
};

type SetupStoreActions = {
  // ##---BUDGET SETUP---##
  setIncomeName: (incomeName: SetupStoreState['incomeName']) => void;
  setCountryCode: (countryCode: SetupStoreState['countryCode']) => void;
  setIncomeAmount: (incomeAmount: SetupStoreState['incomeAmount']) => void;
  setIncomeType: (incomeType: SetupStoreState['incomeType']) => void;

  // ##---PERCENTAGE GROUP---##
  setPercentageGroupName: (percentageGroupName: SetupStoreState['percentageGroupName']) => void;
  setPercentageGroups: (percentageGroups: SetupStoreState['percentageGroups']) => void;

  // ##---CATEGORIES---##
  setCategories: (categories: SetupStoreState['categories']) => void;
};

type SetupStore = SetupStoreActions & SetupStoreState;

export const useStore = create<SetupStore>()(set => ({
  // ##---BUDGET SETUP---##
  incomeName: '',
  setIncomeName: incomeName => set(() => ({incomeName})),
  countryCode: '',
  setCountryCode: countryCode => set(() => ({countryCode})),
  incomeAmount: 0,
  setIncomeAmount: incomeAmount => set(() => ({incomeAmount})),
  incomeType: '',
  setIncomeType: incomeType => set(() => ({incomeType})),

  // ##---PERCENTAGE GROUP---##
  percentageGroupName: '',
  setPercentageGroupName: percentageGroupName => set(() => ({percentageGroupName})),
  percentageGroups: [],
  setPercentageGroups: percentageGroups => set(() => ({percentageGroups})),

  // ##---CATEGORIES---##
  categories: [],
  setCategories: categories => set(() => ({categories})),
}));
