import type { UnsetOperation } from "../types/unset-operation.ts";
import { bench } from "@ark/attest";

bench("UnsetOperation with simple object", () => {
	return {} as UnsetOperation<{ a: number; b: string }>;
}).types([649, "instantiations"]);

bench("UnsetOperation with nested object", () => {
	return {} as UnsetOperation<{ a: { b: number } }>;
}).types([697, "instantiations"]);

bench("UnsetOperation with arrays", () => {
	return {} as UnsetOperation<{ a: number[] }>;
}).types([709, "instantiations"]);

bench("UnsetOperation with empty object", () => {
	return {} as UnsetOperation<Record<never, never>>;
}).types([582, "instantiations"]);
