import type { PullAllOperator } from "../types/pull-all-operator.ts";
import { attest } from "@ark/attest";
import { describe, it } from "vitest";

describe("pullAllOperator type", () => {
	it("creates pullAll operations for array paths", () => {
		attest({} as PullAllOperator<{ a: number[]; b: string }>)
			.type
			.toString
			.snap("PullAllOperator<{ a: number[]; b: string }>");
	});

	it("handles nested arrays", () => {
		attest({} as PullAllOperator<{ a: { b: number[] } }>)
			.type
			.toString
			.snap("PullAllOperator<{ a: { b: number[] } }>");
	});

	it("handles multiple arrays", () => {
		attest({} as PullAllOperator<{ a: number[]; b: string[]; c: boolean }>)
			.type
			.toString
			.snap("PullAllOperator<{\n  a: number[]\n  b: string[]\n  c: boolean\n}>");
	});

	it("handles no arrays", () => {
		attest({} as PullAllOperator<{ a: number; b: string }>)
			.type
			.toString
			.snap("PullAllOperator<{ a: number; b: string }>");
	});
});
