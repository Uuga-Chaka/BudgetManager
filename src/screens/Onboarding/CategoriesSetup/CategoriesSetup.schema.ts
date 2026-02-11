import {z} from 'zod';

export const categorySchema = z.object({
  categories: z
    .array(
      z.object({
        id: z.number(),
        name: z
          .string()
          .trim()
          .min(1, 'El nombre del grupo es requerido')
          .max(50, 'El nombre es demasiado largo'),
      }),
    )
    .min(1, 'Debes agregar al menos un grupo')
    .superRefine((data, ctx) => {
      const names = data.map(item => item.name.toLowerCase());
      const duplicates = names.filter((name, index) => names.indexOf(name) !== index);

      if (duplicates.length > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `El nombre "${duplicates[0]}" ya está en uso`,
          path: [names.indexOf(duplicates[0]), 'name'], // Points error to the specific field
        });
      }
    }),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
