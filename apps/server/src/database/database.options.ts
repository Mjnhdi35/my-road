import type { DataSourceOptions } from "typeorm";
import type { Env } from "../config/env.schema.js";

export type DatabaseEnv = Pick<Env, "DB_HOST" | "DB_PORT" | "DB_NAME" | "DB_USER" | "DB_PASSWORD">;

export function databaseOptions(env: DatabaseEnv): DataSourceOptions {
  return {
    type: "mysql",
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    synchronize: false,
  };
}
