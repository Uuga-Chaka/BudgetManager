export type PercentageBudget = {
  id: number;
  name: string;
  percentage: string;
};

export type PercentageDistributionInputProps = Partial<PercentageBudget> & {
  onDeleteButtonPress?: (id: number) => void;
  onNameChange?: ((text: string, id: number) => void) | undefined;
  onPercentageChange?: ((text: string, id: number) => void) | undefined;
};
