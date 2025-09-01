import type { SimplifyDeep } from "../types/simplify-deep.ts";
import { attest } from "@ark/attest";
import { describe, it } from "vitest";

describe("simplifyDeep type", () => {
	it("simplifies nested object", () => {
		attest({} as SimplifyDeep<{ a: { b: number } }>).type.toString.snap(
			"{ a: { b: number } }",
		);
	});

	it("simplifies array", () => {
		attest({} as SimplifyDeep<{ a: number[] }>).type.toString.snap(
			"{ a: number[] }",
		);
	});

	it("handles primitives", () => {
		attest({} as SimplifyDeep<number>).type.toString.snap("number");
	});

	it("simplifies complex nested structure", () => {
		attest({} as SimplifyDeep<{ a: { b: { c: number[] } } }>).type.toString.snap(
			"{ a: { b: { c: number[] } } }",
		);
	});
});
