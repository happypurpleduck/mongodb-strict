import type { StrictMatchKeysAndValues } from "../types/strict-match-keys-and-values.ts";
import { bench } from "@ark/attest";

bench("StrictMatchKeysAndValues with simple object", () => {
	return {} as StrictMatchKeysAndValues<{ a: number; b: string }>;
}).types([652, "instantiations"]);

bench("StrictMatchKeysAndValues with nested object", () => {
	return {} as StrictMatchKeysAndValues<{ a: { b: number } }>;
}).types([700, "instantiations"]);

bench("StrictMatchKeysAndValues with arrays", () => {
	return {} as StrictMatchKeysAndValues<{ a: number[] }>;
}).types([840, "instantiations"]);

bench("StrictMatchKeysAndValues with empty object", () => {
	return {} as StrictMatchKeysAndValues<Record<never, never>>;
}).types([585, "instantiations"]);
