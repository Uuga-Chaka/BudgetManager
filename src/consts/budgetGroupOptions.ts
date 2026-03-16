import {type PercentageBudgetGroup} from '@app/types/budgetGroup';

export const BUDGET_ID = {
  NECESSITIES: 1,
  WISHES: 2,
  SAVINGS: 3,
};

export const CATEGORY_ID = {
  HOUSE: 1,
  HOBBIES: 2,
  PERSONAL: 3,
  HEALTH: 4,
  DEBTS: 5,
};

export const DEFAULT_CATEGORIES = [
  {
    name: 'Hogar',
    id: CATEGORY_ID.HOUSE,
  },
  {
    name: 'Ocio',
    id: CATEGORY_ID.HOBBIES,
  },
  {
    name: 'Salud',
    id: CATEGORY_ID.HEALTH,
  },
  {
    name: 'Personal',
    id: CATEGORY_ID.PERSONAL,
  },
  {
    name: 'Deudas',
    id: CATEGORY_ID.DEBTS,
  },
];

export const DEFAULT_BUDGET_SETUP: PercentageBudgetGroup = [
  {
    id: BUDGET_ID.NECESSITIES,
    name: 'Necesidades',
    percentage: 0.5,
  },
  {
    id: BUDGET_ID.WISHES,
    name: 'Deseos',
    percentage: 0.3,
  },
  {
    id: BUDGET_ID.SAVINGS,
    name: 'Ahorros',
    percentage: 0.2,
  },
];

export const SAVE_YOURSELF_BUDGET: PercentageBudgetGroup = [
  {
    id: 1,
    name: 'Ahorros',
    percentage: 70,
  },
  {
    id: 2,
    name: 'Gastos',
    percentage: 30,
  },
];

export const commonExpensesList = [
  {
    name: 'Seguro médico',
    category: 'Hogar',
    categoryId: CATEGORY_ID.HOUSE,
    budget: 'Necesidades',
    budgetId: BUDGET_ID.NECESSITIES,
  },
  {
    name: 'Deudas del carro',
    category: 'Hogar',
    categoryId: CATEGORY_ID.HOUSE,
    budget: 'Necesidades',
    budgetId: BUDGET_ID.NECESSITIES,
  },
  {
    name: 'Mercado',
    category: 'Hogar',
    categoryId: CATEGORY_ID.HOUSE,
    budget: 'Necesidades',
    budgetId: BUDGET_ID.NECESSITIES,
  },
  {
    name: 'Arriendo',
    category: 'Hogar',
    categoryId: CATEGORY_ID.HOUSE,
    budget: 'Necesidades',
    budgetId: BUDGET_ID.NECESSITIES,
  },
  {
    name: 'Utilidades',
    category: 'Hogar',
    categoryId: CATEGORY_ID.HOUSE,
    budget: 'Necesidades',
    budgetId: BUDGET_ID.NECESSITIES,
  },
  {
    name: 'Salida a comer',
    category: 'Ocio',
    categoryId: CATEGORY_ID.HOBBIES,
    budget: 'Deseos',
    budgetId: BUDGET_ID.WISHES,
  },
  {
    name: 'Subscripciones',
    category: 'Hogar',
    categoryId: CATEGORY_ID.HOUSE,
    budget: 'Deseos',
    budgetId: BUDGET_ID.WISHES,
  },
  {
    name: 'Entretenimiento',
    category: 'Hogar',
    categoryId: CATEGORY_ID.HOUSE,
    budget: 'Deseos',
    budgetId: BUDGET_ID.WISHES,
  },
  {
    name: 'Membresía del gimansio',
    category: 'Personal',
    categoryId: CATEGORY_ID.PERSONAL,
    budget: 'Necesidades',
    budgetId: BUDGET_ID.NECESSITIES,
  },
  {
    name: 'Viaje',
    category: 'Ahorro',
    categoryId: CATEGORY_ID.HEALTH,
    budget: 'Deseos',
    budgetId: BUDGET_ID.WISHES,
  },
];

export type CommonExpense = (typeof commonExpensesList)[number];
