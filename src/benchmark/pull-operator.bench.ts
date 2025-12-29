import type { PullOperator } from "../types/pull-operator.ts";
import { bench } from "@ark/attest";

bench("PullOperator with simple arrays", () => {
	return {} as PullOperator<{ a: number[]; b: string }>;
}).types([1576, "instantiations"]);

bench("PullOperator with nested arrays", () => {
	return {} as PullOperator<{ a: { b: number[] } }>;
}).types([1666, "instantiations"]);

bench("PullOperator with object arrays", () => {
	return {} as PullOperator<{ a: { id: number; name: string }[] }>;
}).types([1920, "instantiations"]);

bench("PullOperator with no arrays", () => {
	return {} as PullOperator<{ a: number; b: string }>;
}).types([1426, "instantiations"]);
