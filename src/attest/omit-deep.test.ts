import type { OmitDeep } from "../types/omit-deep.ts";
import { attest } from "@ark/attest";
import { describe, it } from "vitest";

describe("omitDeep type", () => {
	it("omits top-level property", () => {
		attest({} as OmitDeep<{ a: number; b: string }, "a">)
			.type
			.toString
			.snap("{ b: string }");
	});

	it("omits nested property", () => {
		attest({} as OmitDeep<{ a: { b: number; c: string } }, "a.b">)
			.type
			.toString
			.snap("{ a: { c: string } }");
	});

	it("omits from array", () => {
		attest({} as OmitDeep<{ a: number[] }, "a.0">)
			.type
			.toString
			.snap("{ a: [unknown, ...number[]] }");
	});

	it("handles multiple paths", () => {
		attest({} as OmitDeep<{ a: number; b: string; c: boolean }, "a" | "c">)
			.type
			.toString
			.snap("{ b: string }");
	});
});
