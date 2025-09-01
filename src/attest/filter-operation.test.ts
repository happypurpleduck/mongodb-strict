import type { FilterOperations } from "../types/filter-operation.ts";
import { attest } from "@ark/attest";
import { describe, it } from "vitest";

describe("filterOperations type", () => {
	it("applies operators to object properties", () => {
		attest({} as FilterOperations<{ a: number }>).type.toString.snap(
			"{ a?: FilterOperators<number> | undefined }",
		);
	});

	it("applies operators to primitive type", () => {
		attest({} as FilterOperations<number>).type.toString.snap(
			"FilterOperators<number>",
		);
	});

	it("handles empty object", () => {
		attest({} as FilterOperations<{}>).type.toString.snap("{}");
	});

	it("handles array type", () => {
		attest({} as FilterOperations<number[]>).type.toString.snap(
			"(FilterOperators<number> | undefined)[]",
		);
	});
});
