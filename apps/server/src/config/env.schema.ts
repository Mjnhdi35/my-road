import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  PORT: z
    .string()
    .regex(/^\d+$/, "must be a whole number")
    .transform(Number)
    .pipe(z.int().min(1).max(65_535)),
});

export type Env = z.infer<typeof envSchema>;
