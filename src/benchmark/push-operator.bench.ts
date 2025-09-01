import type { PushOperator } from "../types/push-operator.ts";
import { bench } from "@ark/attest";

bench("PushOperator with simple arrays", () => {
	return {} as PushOperator<{ a: number[]; b: string }>;
}).types([5367, "instantiations"]);

bench("PushOperator with nested arrays", () => {
	return {} as PushOperator<{ a: { b: number[] } }>;
}).types([5917, "instantiations"]);

bench("PushOperator with object arrays", () => {
	return {} as PushOperator<{ a: { id: number; name: string }[] }>;
}).types([6461, "instantiations"]);

bench("PushOperator with no arrays", () => {
	return {} as PushOperator<{ a: number; b: string }>;
}).types([3725, "instantiations"]);
