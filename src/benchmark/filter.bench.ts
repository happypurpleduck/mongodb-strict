import type { Filter } from "../types/filter.ts";
import { bench } from "@ark/attest";

bench("Filter simple object", () => {
	return {} as Filter<{ a: number; b: string }>;
}).types([8193, "instantiations"]);

bench("Filter with literals", () => {
	return {} as Filter<{ status: "active" | "inactive"; count: number }>;
}).types([8205, "instantiations"]);

bench("Filter complex object", () => {
	return {} as Filter<{
		user: { name: string; age: number };
		tags: string[];
		metadata: { created: Date; updated: Date };
	}>;
}).types([11235, "instantiations"]);
