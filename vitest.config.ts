import { defineConfig } from "vitest/config";

export const config: ReturnType<typeof defineConfig> = defineConfig({
	test: {
		globalSetup: ["./setupVitest.ts"],
	},
});

export default config;
