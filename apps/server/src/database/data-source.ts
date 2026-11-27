import { existsSync } from "node:fs";
import { DataSource } from "typeorm";
import { envSchema } from "../config/env.schema.js";
import { databaseOptions } from "./database.options.js";

for (const file of [".env.local", ".env"]) {
  if (existsSync(file)) {
    process.loadEnvFile(file);
  }
}

const env = envSchema
  .pick({ DB_HOST: true, DB_PORT: true, DB_NAME: true, DB_USER: true, DB_PASSWORD: true })
  .parse(process.env);

export default new DataSource({
  ...databaseOptions(env),
  entities: ["dist/**/*.entity.js"],
  migrations: ["dist/migrations/*.js"],
});
