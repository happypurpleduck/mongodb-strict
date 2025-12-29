import type { AlternativeType, Condition, RegExpOrString } from "../types/condition.ts";
import { bench } from "@ark/attest";

bench("RegExpOrString with string", () => {
	return {} as RegExpOrString<string>;
}).types([9, "instantiations"]);

bench("RegExpOrString with number", () => {
	return {} as RegExpOrString<number>;
}).types([3, "instantiations"]);

bench("AlternativeType with string", () => {
	return {} as AlternativeType<string>;
}).types([26, "instantiations"]);

bench("AlternativeType with array", () => {
	return {} as AlternativeType<string[]>;
}).types([36, "instantiations"]);

bench("AlternativeType with number array", () => {
	return {} as AlternativeType<number[]>;
}).types([24, "instantiations"]);

bench("Condition with string", () => {
	return {} as Condition<string>;
}).types([41, "instantiations"]);

bench("Condition with number", () => {
	return {} as Condition<number>;
}).types([32, "instantiations"]);

bench("Condition with array", () => {
	return {} as Condition<string[]>;
}).types([51, "instantiations"]);

bench("Condition with object", () => {
	return {} as Condition<{ id: number; name: string }>;
}).types([33, "instantiations"]);
