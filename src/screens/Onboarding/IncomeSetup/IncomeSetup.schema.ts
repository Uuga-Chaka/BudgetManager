import {z} from 'zod';

export const incomeSchema = z
  .object({
    incomeName: z
      .string()
      .min(1, 'El nombre del ingreso no puede estar vacío')
      .max(100, 'El nombre del ingreso es demasiado largo')
      .optional()
      .refine(val => val && val.trim().length > 0, {
        message: 'El nombre del ingreso es requerido',
      }),

    currency: z
      .string()
      .min(1, 'Debe seleccionar una moneda')
      // .regex(/^[A-Z]{3}$/, 'Formato de moneda inválido. Use códigos como USD, EUR, COP')
      .optional()
      .refine(val => val && val.trim().length > 0, {
        message: 'La moneda es requerida',
      }),
    amount: z.coerce
      .number({
        error: 'La cantidad es requerida',
      })
      .min(0.01, 'La cantidad debe ser mayor a 0')
      .max(999999999, 'Máximo 999,999,999')
      // We handle the "required" logic by ensuring it's not 0 or undefined
      .refine(val => val !== 0, 'La cantidad es requerida'),
  })
  .refine(data => data.incomeName && data.currency && data.amount !== undefined, {
    message: 'Todos los campos son requeridos',
    path: ['general'],
  });

export type IncomeFormData = z.input<typeof incomeSchema>;
