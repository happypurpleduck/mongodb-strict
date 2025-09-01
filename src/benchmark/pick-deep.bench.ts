import type { PickDeep } from "../types/pick-deep.ts";
import { bench } from "@ark/attest";

bench("PickDeep with simple object", () => {
	return {} as PickDeep<{ a: number; b: string }, "a">;
}).types([426, "instantiations"]);

bench("PickDeep with nested object", () => {
	return {} as PickDeep<{ a: { b: number; c: string } }, "a.b">;
}).types([530, "instantiations"]);

bench("PickDeep with array", () => {
	return {} as PickDeep<{ a: number[] }, "a.0">;
}).types([512, "instantiations"]);

bench("PickDeep with multiple paths", () => {
	return {} as PickDeep<{ a: number; b: string; c: boolean }, "a" | "c">;
}).types([572, "instantiations"]);
