import type { SimplifyDeep } from "../types/simplify-deep.ts";
import { bench } from "@ark/attest";

bench("SimplifyDeep with nested object", () => {
	return {} as SimplifyDeep<{ a: { b: number } }>;
}).types([237, "instantiations"]);

bench("SimplifyDeep with array", () => {
	return {} as SimplifyDeep<{ a: number[] }>;
}).types([237, "instantiations"]);

bench("SimplifyDeep with primitive", () => {
	return {} as SimplifyDeep<number>;
}).types([8, "instantiations"]);

bench("SimplifyDeep with complex structure", () => {
	return {} as SimplifyDeep<{ a: { b: { c: number[] } } }>;
}).types([237, "instantiations"]);
