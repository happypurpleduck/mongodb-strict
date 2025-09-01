import type { Projection, ProjectionType } from "../types/project.ts";
import { bench } from "@ark/attest";

bench("Projection with simple object", () => {
	return {} as Projection<{ a: number; b: string }>;
}).types([2974, "instantiations"]);

bench("ProjectionType with inclusion", () => {
	return {} as ProjectionType<{ a: number; b: string }, { a: 1 }>;
}).types([5165, "instantiations"]);

bench("ProjectionType with exclusion", () => {
	return {} as ProjectionType<{ a: number; b: string }, { b: 0 }>;
}).types([5090, "instantiations"]);

bench("ProjectionType with undefined", () => {
	return {} as ProjectionType<{ a: number; b: string }, undefined>;
}).types([2991, "instantiations"]);
