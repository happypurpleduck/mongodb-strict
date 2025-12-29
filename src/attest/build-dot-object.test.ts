import type { BuildDotObject } from "../types/build-dot-object.ts";
import { attest } from "@ark/attest";
import { describe, it } from "vitest";

describe("buildDotObject type", () => {
	it("builds nested object from flat dot notation", () => {
		attest({} as BuildDotObject<{ "a.b": number }>)
			.type
			.toString
			.snap("{ a: { b: number } }");
	});

	it("handles multiple nested properties", () => {
		attest({} as BuildDotObject<{ "a.b": string; "a.c": number; "d.e.f": boolean }>)
			.type
			.toString
			.snap("{ a: { b: string } } & { a: { c: number } } & {\n  d: { \"e.f\": boolean }\n}");
	});

	it("handles empty object", () => {
		attest({} as BuildDotObject<{}>)
			.type
			.toString
			.snap("unknown");
	});

	it("handles single level property", () => {
		attest({} as BuildDotObject<{ a: string }>)
			.type
			.toString
			.snap("{ a: string }");
	});
});
