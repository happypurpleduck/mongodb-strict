import type { PullOperator } from "../types/pull-operator.ts";
import { attest } from "@ark/attest";
import { describe, it } from "vitest";

describe("pullOperator type", () => {
	it("creates pull operations for array paths", () => {
		attest({} as PullOperator<{ a: number[]; b: string }>).type.toString.snap(
			"PullOperator<{ a: number[]; b: string }>",
		);
	});

	it("handles nested arrays", () => {
		attest({} as PullOperator<{ a: { b: number[] } }>).type.toString.snap(
			"PullOperator<{ a: { b: number[] } }>",
		);
	});

	it("handles object arrays", () => {
		attest({} as PullOperator<{ a: { id: number; name: string }[] }>).type.toString.snap(
			"PullOperator<{ a: { id: number; name: string }[] }>",
		);
	});

	it("handles no arrays", () => {
		attest({} as PullOperator<{ a: number; b: string }>).type.toString.snap(
			"PullOperator<{ a: number; b: string }>",
		);
	});
});
