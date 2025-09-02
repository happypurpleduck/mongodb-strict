import type { UpdateFilter } from "../types/update-filter.ts";
import { attest } from "@ark/attest";
import { describe, it } from "vitest";

describe("updateFilter type", () => {
	it("creates update operations interface", () => {
		attest({} as UpdateFilter<{ a: number; b: string }>)
			.type
			.toString
			.snap("UpdateFilter<{ a: number; b: string }>");
	});

	it("handles nested objects", () => {
		attest({} as UpdateFilter<{ a: { b: number } }>)
			.type
			.toString
			.snap("UpdateFilter<{ a: { b: number } }>");
	});

	it("handles arrays", () => {
		attest({} as UpdateFilter<{ a: number[] }>)
			.type
			.toString
			.snap("UpdateFilter<{ a: number[] }>");
	});

	it("handles complex schema", () => {
		attest({} as UpdateFilter<{ a: number; b: string[]; c: { d: boolean } }>)
			.type
			.toString
			.snap("UpdateFilter<{\n  a: number\n  b: string[]\n  c: { d: boolean }\n}>");
	});
});
