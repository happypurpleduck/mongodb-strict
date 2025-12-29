import type { PathsOfGeneric } from "../types/path-of-generic.ts";
import { bench } from "@ark/attest";

bench("PathsOfGeneric simple object", () => {
	return {} as PathsOfGeneric<{ a: number; b: string }>;
}).types([1322, "instantiations"]);

bench("PathsOfGeneric with literals", () => {
	return {} as PathsOfGeneric<{ status: "active" | "inactive"; count: number }>;
}).types([1342, "instantiations"]);

bench("PathsOfGeneric nested object", () => {
	return {} as PathsOfGeneric<{ a: { b: { c: { d: boolean } } } }>;
}).types([1649, "instantiations"]);

bench("PathsOfGeneric complex structure", () => {
	return {} as PathsOfGeneric<{
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
}).types([2892, "instantiations"]);

bench("PathsOfGeneric mixed literals and generics", () => {
	return {} as PathsOfGeneric<{
		id: number;
		status: "pending" | "completed";
		data: {
			value: string;
			type: "a" | "b" | "c";
		};
	}>;
}).types([1871, "instantiations"]);
