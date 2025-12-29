import type { PopOperation } from "../types/pop-operation.ts";
import { bench } from "@ark/attest";

bench("PopOperation with simple arrays", () => {
	return {} as PopOperation<{ a: number[]; b: string }>;
}).types([1551, "instantiations"]);

bench("PopOperation with nested arrays", () => {
	return {} as PopOperation<{ a: { b: number[] } }>;
}).types([1641, "instantiations"]);

bench("PopOperation with multiple arrays", () => {
	return {} as PopOperation<{ a: number[]; b: string[]; c: boolean }>;
}).types([1747, "instantiations"]);

bench("PopOperation with no arrays", () => {
	return {} as PopOperation<{ a: number; b: string }>;
}).types([1401, "instantiations"]);
