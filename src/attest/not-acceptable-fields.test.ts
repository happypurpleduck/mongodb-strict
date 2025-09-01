import type { NotAcceptedFields } from "../types/not-acceptable-fields.ts";
import { attest } from "@ark/attest";
import { describe, it } from "vitest";

describe("notAcceptedFields type", () => {
	it("marks number paths as never", () => {
		attest({} as NotAcceptedFields<{ a: number; b: string }, number>).type.toString.snap(
			"NotAcceptedFields<{ a: number; b: string }, number>",
		);
	});

	it("marks string paths as never", () => {
		attest({} as NotAcceptedFields<{ a: string; b: number }, string>).type.toString.snap(
			"NotAcceptedFields<{ a: string; b: number }, string>",
		);
	});

	it("handles empty object", () => {
		attest({} as NotAcceptedFields<{}, number>).type.toString.snap(
			"NotAcceptedFields<{}, number>",
		);
	});

	it("marks array paths as never", () => {
		attest({} as NotAcceptedFields<{ a: number[]; b: string }, number[]>).type.toString.snap(
			"NotAcceptedFields<\n  { a: number[]; b: string },\n  number[]\n>",
		);
	});
});
