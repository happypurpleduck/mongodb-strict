import type { Paths } from "../types/path.ts";
import { bench } from "@ark/attest";

bench("Paths simple object", () => {
	return {} as Paths<{ a: number; b: string }>;
}).types([2508, "instantiations"]);

bench("Paths nested object", () => {
	return {} as Paths<{ a: { b: { c: { d: boolean } } } }>;
}).types([4703, "instantiations"]);

bench("Paths array", () => {
	return {} as Paths<{ items: string[] }>;
}).types([4330, "instantiations"]);

bench("Paths complex structure", () => {
	return {} as Paths<{
		user: { name: string; age: number; address: { street: string; city: string } };
		posts: { title: string; tags: string[] }[];
	}>;
}).types([6024, "instantiations"]);
