import type { Singular } from "../types/singular.ts";
import { attest } from "@ark/attest";
import { describe, it } from "vitest";

describe("singular type", () => {
	it("extracts element type from array", () => {
		attest({} as Singular<number[]>).type.toString.snap("number");
	});

	it("returns type as-is for non-arrays", () => {
		attest({} as Singular<number>).type.toString.snap("number");
	});

	it("handles string arrays", () => {
		attest({} as Singular<string[]>).type.toString.snap("string");
	});

	it("handles object arrays", () => {
		attest({} as Singular<{ id: number }[]>).type.toString.snap("{ id: number }");
	});
});
