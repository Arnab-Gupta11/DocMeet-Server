import { z } from 'zod';

export const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(100, 'Password cannot exceed 100 characters'),
  }),
});

export const authValidations = {
  loginValidationSchema,
};
