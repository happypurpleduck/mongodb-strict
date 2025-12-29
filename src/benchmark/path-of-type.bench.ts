import type { PathOfType, PathsOfNonExclusiveType, PathsOfType } from "../types/path-of-type.ts";
import { bench } from "@ark/attest";

bench("PathOfType with simple object", () => {
	return {} as PathOfType<{ a: number; b: string }, number>;
}).types([119, "instantiations"]);

bench("PathsOfType with nested object", () => {
	return {} as PathsOfType<{ a: { b: number }; c: string }, number>;
}).types([890, "instantiations"]);

bench("PathsOfNonExclusiveType with literals", () => {
	return {} as PathsOfNonExclusiveType<{ a: number; b: 1 }, number>;
}).types([736, "instantiations"]);

bench("PathOfType with no matches", () => {
	return {} as PathOfType<{ a: string; b: boolean }, number>;
}).types([117, "instantiations"]);
