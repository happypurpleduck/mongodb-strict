import type { UnsetOperation } from "../types/unset-operation.ts";
import { attest } from "@ark/attest";
import { describe, it } from "vitest";

describe("unsetOperation type", () => {
	it("creates unset operations for all paths", () => {
		attest({} as UnsetOperation<{ a: number; b: string }>).type.toString.snap(
			"UnsetOperation<{ a: number; b: string }>",
		);
	});

	it("handles nested objects", () => {
		attest({} as UnsetOperation<{ a: { b: number } }>).type.toString.snap(
			"UnsetOperation<{ a: { b: number } }>",
		);
	});

	it("handles arrays", () => {
		attest({} as UnsetOperation<{ a: number[] }>).type.toString.snap(
			"UnsetOperation<{ a: number[] }>",
		);
	});

	it("handles empty object", () => {
		attest({} as UnsetOperation<{}>).type.toString.snap(
			"UnsetOperation<{}>",
		);
	});
});
