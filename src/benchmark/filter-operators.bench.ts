import type { FilterOperators } from "../types/filter-operators.ts";
import { bench } from "@ark/attest";

bench("FilterOperators with number", () => {
	return {} as FilterOperators<number>;
}).types([0, "instantiations"]);

bench("FilterOperators with string", () => {
	return {} as FilterOperators<string>;
}).types([0, "instantiations"]);

bench("FilterOperators with array", () => {
	return {} as FilterOperators<number[]>;
}).types([0, "instantiations"]);

bench("FilterOperators with object", () => {
	return {} as FilterOperators<{ a: number; b: string }>;
}).types([0, "instantiations"]);
