import type { FilterOperations } from "../types/filter-operation.ts";
import { bench } from "@ark/attest";

bench("FilterOperations with simple object", () => {
	return {} as FilterOperations<{ a: number; b: string }>;
}).types([17, "instantiations"]);

bench("FilterOperations with complex object", () => {
	return {} as FilterOperations<{ a: { b: number }; c: string[] }>;
}).types([17, "instantiations"]);

bench("FilterOperations with primitive", () => {
	return {} as FilterOperations<number>;
}).types([10, "instantiations"]);

bench("FilterOperations with array", () => {
	return {} as FilterOperations<number[]>;
}).types([18, "instantiations"]);
