import {type PercentageBudget} from '@app/types/budgetGroup';

export type PercentageDistributionInputProps = Partial<PercentageBudget> & {
  onDeleteButtonPress?: (id: number) => void;
  onNameChange?: ((text: string, id: number) => void) | undefined;
  onPercentageChange?: ((text: string, id: number) => void) | undefined;
};
