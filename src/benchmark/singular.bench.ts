import type { Singular } from "../types/singular.ts";
import { bench } from "@ark/attest";

bench("Singular with number array", () => {
	return {} as Singular<number[]>;
}).types([11, "instantiations"]);

bench("Singular with primitive", () => {
	return {} as Singular<number>;
}).types([6, "instantiations"]);

bench("Singular with string array", () => {
	return {} as Singular<string[]>;
}).types([11, "instantiations"]);

bench("Singular with object array", () => {
	return {} as Singular<{ id: number; name: string }[]>;
}).types([15, "instantiations"]);
