import type { PopOperation } from "../types/pop-operation.ts";
import { attest } from "@ark/attest";
import { describe, it } from "vitest";

describe("popOperation type", () => {
	it("creates pop operations for array paths", () => {
		attest({} as PopOperation<{ a: number[]; b: string }>).type.toString.snap(
			"PopOperation<{ a: number[]; b: string }>",
		);
	});

	it("handles nested arrays", () => {
		attest({} as PopOperation<{ a: { b: number[] } }>).type.toString.snap(
			"PopOperation<{ a: { b: number[] } }>",
		);
	});

	it("handles multiple arrays", () => {
		attest({} as PopOperation<{ a: number[]; b: string[]; c: boolean }>).type.toString.snap(
			"PopOperation<{\n  a: number[]\n  b: string[]\n  c: boolean\n}>",
		);
	});

	it("handles no arrays", () => {
		attest({} as PopOperation<{ a: number; b: string }>).type.toString.snap(
			"PopOperation<{ a: number; b: string }>",
		);
	});
});
