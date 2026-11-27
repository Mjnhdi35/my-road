import { envSchema } from "./env.schema.js";

const valid = {
  NODE_ENV: "development",
  PORT: "3000",
  DB_HOST: "127.0.0.1",
  DB_PORT: "3306",
  DB_NAME: "my_road",
  DB_USER: "my_road",
  DB_PASSWORD: "secret",
};

describe("envSchema", () => {
  it("parses valid variables and converts ports to numbers", () => {
    expect(envSchema.parse(valid)).toEqual({ ...valid, PORT: 3000, DB_PORT: 3306 });
  });

  it.each(Object.keys(valid))("rejects a missing %s", (key) => {
    const { [key as keyof typeof valid]: _omitted, ...rest } = valid;
    expect(envSchema.safeParse(rest).success).toBe(false);
  });

  it.each(["DB_HOST", "DB_NAME", "DB_USER", "DB_PASSWORD"])("rejects an empty %s", (key) => {
    expect(envSchema.safeParse({ ...valid, [key]: "" }).success).toBe(false);
  });

  it("rejects an unknown NODE_ENV", () => {
    expect(envSchema.safeParse({ ...valid, NODE_ENV: "staging" }).success).toBe(false);
  });

  it.each(["PORT", "DB_PORT"])("rejects malformed %s values", (key) => {
    for (const value of ["", " 3000", "3e3", "0x10", "3000.5", "-1", "0", "65536"]) {
      expect(envSchema.safeParse({ ...valid, [key]: value }).success).toBe(false);
    }
  });
});
