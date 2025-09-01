import type { UnsetOperation } from "../types/unset-operation.ts";
import { bench } from "@ark/attest";

bench("UnsetOperation with simple object", () => {
	return {} as UnsetOperation<{ a: number; b: string }>;
}).types([2945, "instantiations"]);

bench("UnsetOperation with nested object", () => {
	return {} as UnsetOperation<{ a: { b: number } }>;
}).types([4251, "instantiations"]);

bench("UnsetOperation with arrays", () => {
	return {} as UnsetOperation<{ a: number[] }>;
}).types([4378, "instantiations"]);

bench("UnsetOperation with empty object", () => {
	return {} as UnsetOperation<{}>;
}).types([2874, "instantiations"]);
