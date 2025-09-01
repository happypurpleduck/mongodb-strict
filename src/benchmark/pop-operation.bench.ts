import type { PopOperation } from "../types/pop-operation.ts";
import { bench } from "@ark/attest";

bench("PopOperation with simple arrays", () => {
	return {} as PopOperation<{ a: number[]; b: string }>;
}).types([5352, "instantiations"]);

bench("PopOperation with nested arrays", () => {
	return {} as PopOperation<{ a: { b: number[] } }>;
}).types([5902, "instantiations"]);

bench("PopOperation with multiple arrays", () => {
	return {} as PopOperation<{ a: number[]; b: string[]; c: boolean }>;
}).types([6101, "instantiations"]);

bench("PopOperation with no arrays", () => {
	return {} as PopOperation<{ a: number; b: string }>;
}).types([3710, "instantiations"]);
