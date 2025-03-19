import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/share/ThemesCookie/index.ts"],
  format: ['cjs', 'esm'],
  external: ["react", "next"],
  clean: true,
  dts: true,
});
