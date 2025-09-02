import type { PathsOfLiteral } from "../types/path-of-literal.ts";
import { attest } from "@ark/attest";
import { describe, it } from "vitest";

describe("pathsOfLiteral type", () => {
	it("extracts literal paths from object", () => {
		attest({} as PathsOfLiteral<{ a: 1; b: "hello"; c: number }>)
			.type
			.toString
			.snap("PathsOfLiteral<{ a: 1; b: \"hello\"; c: number }>");
	});

	it("handles nested literals", () => {
		attest({} as PathsOfLiteral<{ a: { b: 42; c: string } }>)
			.type
			.toString
			.snap("\"a.b\"");
	});

	it("handles array literals", () => {
		attest({} as PathsOfLiteral<{ a: [1, 2, 3] }>)
			.type
			.toString
			.snap("PathsOfLiteral<{ a: [1, 2, 3] }>");
	});

	it("handles no literals", () => {
		attest({} as PathsOfLiteral<{ a: number; b: string }>)
			.type
			.toString
			.snap("never");
	});
});
