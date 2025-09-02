import type { FilterOperators } from "../types/filter-operators.ts";
import { attest } from "@ark/attest";
import { describe, it } from "vitest";

describe("filterOperators type", () => {
	it("provides operators for number type", () => {
		attest({} as FilterOperators<number>)
			.type
			.toString
			.snap("FilterOperators<number>");
	});

	it("provides operators for string type", () => {
		attest({} as FilterOperators<string>)
			.type
			.toString
			.snap("FilterOperators<string>");
	});

	it("provides operators for array type", () => {
		attest({} as FilterOperators<number[]>)
			.type
			.toString
			.snap("FilterOperators<number[]>");
	});

	it("provides operators for object type", () => {
		attest({} as FilterOperators<{ a: number }>)
			.type
			.toString
			.snap("FilterOperators<{ a: number }>");
	});
});
