import antfu from "@antfu/eslint-config";

export default antfu({
	ignores: ["src2"],

	type: "lib",

	typescript: {
		tsconfigPath: "./tsconfig.json",
		parserOptions: {
			projectService: true,
			tsconfigRootDir: import.meta.dirname,
		},
	},

	formatters: true,
	stylistic: {
		semi: true,
		indent: "tab",
		quotes: "double",
	},

	rules: {
		"ts/ban-ts-comment": "off",
		"ts/no-empty-object-type": "off",

		// TODO: Enable.
		"ts/explicit-function-return-type": "off",

		// TODO: set for test dir only
		"no-console": "off",
		"antfu/no-top-level-await": "off",
	},
});
