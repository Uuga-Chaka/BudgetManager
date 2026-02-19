import {z} from 'zod';

import {currencyStringToNumber} from '@app/utils/currency';

const schemaKeys = {
  incomeName: 'incomeName',
  currency: 'currency',
  amount: 'amount',
} as const;

export const incomeSchema = z
  .object({
    [schemaKeys.incomeName]: z
      .string()
      .min(1, 'El nombre del ingreso no puede estar vacío')
      .max(100, 'El nombre del ingreso es demasiado largo')
      .refine(val => val && val.trim().length > 0, {
        message: 'El nombre del ingreso es requerido',
      }),

    [schemaKeys.currency]: z
      .string()
      .min(1, 'Debe seleccionar una moneda')
      .refine(val => val && val.trim().length > 0, {
        message: 'La moneda es requerida',
      }),
    [schemaKeys.amount]: z
      .string({
        error: 'La cantidad es requerida',
      })
      .nonempty()
      .transform(n => currencyStringToNumber(n)),
  })
  .refine(data => data.incomeName && data.currency && data.amount !== undefined, {
    message: 'Todos los campos son requeridos',
    path: ['general'],
  });

export type IncomeFormData = z.input<typeof incomeSchema>;
export type IncomeFormDataOutout = z.output<typeof incomeSchema>;
