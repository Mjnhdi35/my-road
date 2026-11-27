import { envSchema } from "./env.schema.js";

const valid = { NODE_ENV: "development", PORT: "3000" };

describe("envSchema", () => {
  it("parses valid variables and converts PORT to a number", () => {
    expect(envSchema.parse(valid)).toEqual({
      NODE_ENV: "development",
      PORT: 3000,
    });
  });

  it.each(["NODE_ENV", "PORT"])("rejects a missing %s", (key) => {
    const { [key as keyof typeof valid]: _omitted, ...rest } = valid;
    expect(envSchema.safeParse(rest).success).toBe(false);
  });

  it("rejects an unknown NODE_ENV", () => {
    expect(envSchema.safeParse({ ...valid, NODE_ENV: "staging" }).success).toBe(false);
  });

  it.each(["", " 3000", "3e3", "0x10", "3000.5", "-1", "0", "65536"])("rejects PORT=%j", (port) => {
    expect(envSchema.safeParse({ ...valid, PORT: port }).success).toBe(false);
  });
});
