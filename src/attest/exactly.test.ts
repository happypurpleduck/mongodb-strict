import type { Exactly } from "../types/exactly.ts";
import { attest } from "@ark/attest";
import { describe, it } from "vitest";

describe("exactly type", () => {
	it("preserves exact structure", () => {
		attest({} as Exactly<{ a: 1 }, { a: number }>).type.toString.snap(
			"Exactly<{ a: 1 }, { a: number }>",
		);
	});

	it("works with empty objects", () => {
		attest({} as Exactly<{}, {}>).type.toString.snap("Record<never, never>");
	});

	it("excludes extra keys", () => {
		attest(
			{} as Exactly<{ a: string }, { a: string; b: number }>,
		).type.toString.snap("Exactly<{ a: string }, { a: string; b: number }>");
	});
});
