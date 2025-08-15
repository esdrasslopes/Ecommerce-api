import { defineConfig } from "vitest/config";

import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    environment: "./prisma/vitest-environment-prisma/prisma-environment.ts",
    include: ["src/http/controllers/**/*.{test,spec}.ts"],
    name: "prisma",
  },
});
