import {type OnboardingParamList} from '@app/navigation/navigation.types';
import {type PercentageBudgetGroup} from '@app/types/budgetGroup';

export type RuleList = {
  title: string;
  description: string;
  buttonRedirection: keyof OnboardingParamList;
  image: string;
  groupName?: string;
  budgetGroup?: PercentageBudgetGroup;
  disabled?: boolean;
};
