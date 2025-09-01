import type { SetFields } from "../types/set-fields.ts";
import { attest } from "@ark/attest";
import { describe, it } from "vitest";

describe("setFields type", () => {
	it("creates set operations for array paths", () => {
		attest({} as SetFields<{ a: number[]; b: string }>).type.toString.snap(
			"SetFields<{ a: number[]; b: string }>",
		);
	});

	it("handles nested arrays", () => {
		attest({} as SetFields<{ a: { b: number[] } }>).type.toString.snap(
			"SetFields<{ a: { b: number[] } }>",
		);
	});

	it("handles object arrays", () => {
		attest({} as SetFields<{ a: { id: number; name: string }[] }>).type.toString.snap(
			"SetFields<{ a: { id: number; name: string }[] }>",
		);
	});

	it("handles no arrays", () => {
		attest({} as SetFields<{ a: number; b: string }>).type.toString.snap(
			"SetFields<{ a: number; b: string }>",
		);
	});
});
