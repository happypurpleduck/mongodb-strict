import type { PathsOfLiteral } from "../types/path-of-literal.ts";
import { bench } from "@ark/attest";

bench("PathsOfLiteral with literals", () => {
	return {} as PathsOfLiteral<{ a: 1; b: "hello"; c: number }>;
}).types([3792, "instantiations"]);

bench("PathsOfLiteral with nested literals", () => {
	return {} as PathsOfLiteral<{ a: { b: 42; c: string } }>;
}).types([5154, "instantiations"]);

bench("PathsOfLiteral with array literals", () => {
	return {} as PathsOfLiteral<{ a: [1, 2, 3] }>;
}).types([5419, "instantiations"]);

bench("PathsOfLiteral with no literals", () => {
	return {} as PathsOfLiteral<{ a: number; b: string }>;
}).types([3600, "instantiations"]);
