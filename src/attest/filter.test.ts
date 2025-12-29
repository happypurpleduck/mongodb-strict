import type { Filter } from "../types/filter.ts";
import { attest } from "@ark/attest";
import { describe, it } from "vitest";

describe("filter type", () => {
	it("creates filter for simple object", () => {
		attest({} as Filter<{ a: number; b: string }>)
			.type
			.toString
			.snap("Filter<{ a: number; b: string }>");
	});

	it("handles literal filters", () => {
		attest({} as Filter<{ a: "literal"; b: number }>)
			.type
			.toString
			.snap("Filter<{ a: \"literal\"; b: number }>");
	});

	it("includes $or, $and, $nor", () => {
		attest({} as Filter<{ a: number }>)
			.type
			.toString
			.snap("Filter<{ a: number }>");
	});
});
