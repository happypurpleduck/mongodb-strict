import type { PullAllOperator } from "../types/pull-all-operator.ts";
import { bench } from "@ark/attest";

bench("PullAllOperator with simple arrays", () => {
	return {} as PullAllOperator<{ a: number[]; b: string }>;
}).types([5355, "instantiations"]);

bench("PullAllOperator with nested arrays", () => {
	return {} as PullAllOperator<{ a: { b: number[] } }>;
}).types([5905, "instantiations"]);

bench("PullAllOperator with multiple arrays", () => {
	return {} as PullAllOperator<{ a: number[]; b: string[]; c: boolean }>;
}).types([6109, "instantiations"]);

bench("PullAllOperator with no arrays", () => {
	return {} as PullAllOperator<{ a: number; b: string }>;
}).types([3713, "instantiations"]);
