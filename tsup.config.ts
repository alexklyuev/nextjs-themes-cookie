import { defineConfig } from "tsup"

export default defineConfig({
  entry: [
    "src/share/ThemesCookie/server.ts",
    "src/share/ThemesCookie/client.tsx",
  ],
  format: 'esm',
  external: ["react", "next"],
  clean: true,
  dts: true,
});
