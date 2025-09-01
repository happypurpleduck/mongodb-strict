import type { SetFields } from "../types/set-fields.ts";
import { bench } from "@ark/attest";

bench("SetFields with simple arrays", () => {
	return {} as SetFields<{ a: number[]; b: string }>;
}).types([386, "instantiations"]);

bench("SetFields with nested arrays", () => {
	return {} as SetFields<{ a: { b: number[] } }>;
}).types([313, "instantiations"]);

bench("SetFields with object arrays", () => {
	return {} as SetFields<{ a: { id: number; name: string }[] }>;
}).types([321, "instantiations"]);

bench("SetFields with no arrays", () => {
	return {} as SetFields<{ a: number; b: string }>;
}).types([381, "instantiations"]);
