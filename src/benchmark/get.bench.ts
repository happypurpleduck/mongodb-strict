import type { Get } from "../types/get.ts";
import { bench } from "@ark/attest";

// type BasicGet<T, K extends keyof T> = T[K];

// bench("Get", () => {
// 	return {} as BasicGet<{ a: number }, "a">;
// }).types([5, "instantiations"]);

bench("Get simple property", () => {
	return {} as Get<{ a: number }, "a">;
}).types([12084, "instantiations"]);

bench("Get nested property", () => {
	return {} as Get<{ a: { b: { c: string } } }, "a.b.c">;
}).types([12200, "instantiations"]);

bench("Get array element", () => {
	return {} as Get<string[], "0">;
}).types([12085, "instantiations"]);

bench("Get complex nested with array", () => {
	return {} as Get<{ items: { name: string }[] }, "items.0.name">;
}).types([12200, "instantiations"]);
