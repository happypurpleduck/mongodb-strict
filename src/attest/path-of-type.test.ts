import type {
	PathOfType,
	PathsOfNonExclusiveType,
	PathsOfType,
} from "../types/path-of-type.ts";
import { attest } from "@ark/attest";
import { describe, it } from "vitest";

describe("pathOfType types", () => {
	it("pathOfType extracts matching keys", () => {
		attest({} as PathOfType<{ a: number; b: string }, number>)
			.type
			.toString
			.snap("\"a\"");
	});

	it("pathsOfType extracts matching paths", () => {
		attest({} as PathsOfType<{ a: { b: number }; c: string }, number>)
			.type
			.toString
			.snap("\"a.b\"");
	});

	it("pathsOfNonExclusiveType extracts non-exclusive paths", () => {
		attest({} as PathsOfNonExclusiveType<{ a: number; b: 1 }, number>)
			.type
			.toString
			.snap("\"a\"");
	});

	it("handles no matches", () => {
		attest({} as PathOfType<{ a: string; b: boolean }, number>)
			.type
			.toString
			.snap("never");
	});
});
