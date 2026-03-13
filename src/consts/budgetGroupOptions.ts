import {type PercentageBudgetGroup} from '@app/types/budgetGroup';

export const DEFAULT_BUDGET_SETUP: PercentageBudgetGroup = [
  {
    id: 1,
    name: 'Necesidades',
    percentage: 50,
  },
  {
    id: 2,
    name: 'Deseos',
    percentage: 30,
  },
  {
    id: 3,
    name: 'Ahorros',
    percentage: 20,
  },
];

export const SAVE_YOURSELF_BUDGET: PercentageBudgetGroup = [
  {
    id: 1,
    name: 'Usado',
    percentage: 70,
  },
  {
    id: 2,
    name: 'Restante',
    percentage: 30,
  },
];
