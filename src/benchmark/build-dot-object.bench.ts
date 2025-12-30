import type { BuildDotObject } from "../types/build-dot-object.ts";
import { bench } from "@ark/attest";

bench("BuildDotObject with simple nesting", () => {
	return {} as BuildDotObject<{ "a.b": number }>;
}).types([109, "instantiations"]);

bench("BuildDotObject with multiple properties", () => {
	return {} as BuildDotObject<{ "a.b": string; "a.c": number; "d": boolean }>;
}).types([199, "instantiations"]);

bench("BuildDotObject with deep nesting", () => {
	return {} as BuildDotObject<{ "a.b.c.d.e": string }>;
}).types([109, "instantiations"]);

bench("BuildDotObject with empty object", () => {
	return {} as BuildDotObject<Record<never, never>>;
}).types([10, "instantiations"]);
