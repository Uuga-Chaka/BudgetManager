import {z} from 'zod';

export const budgetSchema = z.object({
  percentageGroupName: z
    .string()
    .trim()
    .min(1, 'El nombre del ingreso es requerido')
    .max(100, 'El nombre del ingreso es demasiado largo'),
  percentageGroups: z
    .array(
      z.object({
        id: z.number(),
        name: z.string().trim().min(1, 'El nombre del grupo es requerido'),
        percentage: z.number().min(0).max(100),
      }),
    )
    .min(1, 'Debes agregar al menos un grupo')
    .superRefine((groups, ctx) => {
      const total = groups.reduce((acc, curr) => acc + curr.percentage, 0);
      if (total !== 100) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `La suma de los porcentajes debe ser 100% (Actual: ${total}%)`,
          path: [],
        });
      }
    }),
});

export type BudgetFormData = z.infer<typeof budgetSchema>;
