import type { Paths } from "../types/path.ts";
import { bench } from "@ark/attest";

bench("Paths simple object", () => {
	return {} as Paths<{ a: number; b: string }>;
}).types([151, "instantiations"]);

bench("Paths nested object", () => {
	return {} as Paths<{ a: { b: { c: { d: boolean } } } }>;
}).types([355, "instantiations"]);

bench("Paths array", () => {
	return {} as Paths<{ items: string[] }>;
}).types([463, "instantiations"]);

bench("Paths complex structure", () => {
	return {} as Paths<{
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
}).types([1081, "instantiations"]);
