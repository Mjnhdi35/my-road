import { z } from "zod";

const port = z
  .string()
  .regex(/^\d+$/, "must be a whole number")
  .transform(Number)
  .pipe(z.int().min(1).max(65_535));

const required = z.string().trim().min(1);

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  PORT: port,
  DB_HOST: required,
  DB_PORT: port,
  DB_NAME: required,
  DB_USER: required,
  DB_PASSWORD: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;
