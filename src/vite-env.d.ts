/// <reference types="vite/client" />

declare module "@lovable.dev/vite-tanstack-config" {
  import type { UserConfig } from "vite";
  export function defineConfig(config?: any): (env: any) => Promise<UserConfig>;
}
