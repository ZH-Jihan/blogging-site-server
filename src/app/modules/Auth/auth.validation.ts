import { z } from 'zod';

const registaionValidacionSchema = z.object({
  name: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(6).max(15),
});

const loginValidacionSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(15),
});

export { loginValidacionSchema, registaionValidacionSchema };
