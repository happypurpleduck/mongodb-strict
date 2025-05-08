import antfu from "@antfu/eslint-config";

export default antfu({
	ignores: ["src2"],

	type: "lib",

	typescript: true,

	stylistic: {
		semi: true,
		indent: "tab",
		quotes: "double",
	},
});
