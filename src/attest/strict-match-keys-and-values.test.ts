import type { StrictMatchKeysAndValues } from "../types/strict-match-keys-and-values.ts";
import { attest } from "@ark/attest";
import { describe, it } from "vitest";

describe("strictMatchKeysAndValues type", () => {
	it("creates path-to-value mapping", () => {
		attest({} as StrictMatchKeysAndValues<{ a: number; b: string }>)
			.type
			.toString
			.snap("StrictMatchKeysAndValues<{ a: number; b: string }>");
	});

	it("handles nested objects", () => {
		attest({} as StrictMatchKeysAndValues<{ a: { b: number } }>)
			.type
			.toString
			.snap("StrictMatchKeysAndValues<{ a: { b: number } }>");
	});

	it("handles arrays", () => {
		attest({} as StrictMatchKeysAndValues<{ a: number[] }>)
			.type
			.toString
			.snap("StrictMatchKeysAndValues<{ a: number[] }>");
	});

	it("handles empty object", () => {
		attest({} as StrictMatchKeysAndValues<{}>)
			.type
			.toString
			.snap("StrictMatchKeysAndValues<{}>");
	});
});
