import type { Get } from "../types/get.ts";
import { bench } from "@ark/attest";

bench("Get simple property", () => {
	return {} as Get<{ a: number }, "a">;
}).types([63, "instantiations"]);

bench("Get nested property", () => {
	return {} as Get<{ a: { b: { c: string } } }, "a.b.c">;
}).types([144, "instantiations"]);

bench("Get array element", () => {
	return {} as Get<string[], "0">;
}).types([74, "instantiations"]);

bench("Get complex nested with array", () => {
	return {} as Get<{ items: { name: string }[] }, "items.0.name">;
}).types([164, "instantiations"]);

// Array projection benchmarks
bench("Get array projection simple", () => {
	return {} as Get<{ items: { name: string }[] }, "items.name">;
}).types([132, "instantiations"]);

bench("Get array projection nested", () => {
	return {} as Get<{ items: { info: { label: string } }[] }, "items.info.label">;
}).types([177, "instantiations"]);

// Deep nesting benchmarks
bench("Get deeply nested 5 levels", () => {
	return {} as Get<{ a: { b: { c: { d: { e: number } } } } }, "a.b.c.d.e">;
}).types([198, "instantiations"]);

// Mixed array and object access
bench("Get array index then property", () => {
	return {} as Get<{ data: { value: number }[] }, "data.0.value">;
}).types([164, "instantiations"]);

bench("Get template literal number index", () => {
	return {} as Get<{ items: string[] }, `items.${number}`>;
}).types([131, "instantiations"]);
