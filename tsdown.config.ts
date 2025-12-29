import type { UserConfig } from "tsdown";
import { defineConfig } from "tsdown";

const config: UserConfig = defineConfig({
	entry: "./src/index.ts",
	dts: {
		resolve: [/^type-fest/],
	},
	clean: true,
});

export default config;
