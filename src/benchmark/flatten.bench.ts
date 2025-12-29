import type { Flatten } from "../types/flatten.ts";
import { bench } from "@ark/attest";

bench("Flatten with number array", () => {
	return {} as Flatten<number[]>;
}).types([11, "instantiations"]);

bench("Flatten with string array", () => {
	return {} as Flatten<string[]>;
}).types([11, "instantiations"]);

bench("Flatten with object array", () => {
	return {} as Flatten<{ id: number; name: string }[]>;
}).types([21, "instantiations"]);

bench("Flatten with readonly array", () => {
	return {} as Flatten<readonly number[]>;
}).types([9, "instantiations"]);

bench("Flatten with non-array", () => {
	return {} as Flatten<number>;
}).types([11, "instantiations"]);

bench("Flatten with nested array", () => {
	return {} as Flatten<number[][]>;
}).types([12, "instantiations"]);
