import type { Get } from "../types/get.ts";
import { bench } from "@ark/attest";

bench("Get simple property", () => {
	return {} as Get<{ a: number }, "a">;
}).types([173, "instantiations"]);

bench("Get nested property", () => {
	return {} as Get<{ a: { b: { c: string } } }, "a.b.c">;
}).types([327, "instantiations"]);

bench("Get array element", () => {
	return {} as Get<string[], "0">;
}).types([178, "instantiations"]);

bench("Get complex nested with array", () => {
	return {} as Get<{ items: { name: string }[] }, "items.0.name">;
}).types([364, "instantiations"]);
