import type { Sort } from "../types/sort.ts";
import { bench } from "@ark/attest";

// bench("SortDirection type", () => {
// 	return {} as SortDirection;
// }).types([0, "instantiations"]);

bench("Sort with simple object", () => {
	return {} as Sort<{ a: number; b: string }>;
}).types([193, "instantiations"]);

bench("Sort with nested object", () => {
	return {} as Sort<{ a: { b: { c: number } } }>;
}).types([304, "instantiations"]);

bench("Sort with arrays", () => {
	return {} as Sort<{ items: string[]; count: number }>;
}).types([539, "instantiations"]);

bench("Sort with complex structure", () => {
	return {} as Sort<{
		user: {
			name: string;
			age: number;
			address: {
				street: string;
				city: string;
			};
		};
		posts: {
			title: string;
			tags: string[];
		}[];
	}>;
}).types([998, "instantiations"]);
