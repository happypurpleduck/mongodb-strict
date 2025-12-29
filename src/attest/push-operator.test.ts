import type { PushOperator } from "../types/push-operator.ts";
import { attest } from "@ark/attest";
import { describe, it } from "vitest";

describe("pushOperator type", () => {
	it("creates push operations for array paths", () => {
		attest({} as PushOperator<{ a: number[]; b: string }>)
			.type
			.toString
			.snap("PushOperator<{ a: number[]; b: string }>");
	});

	it("handles nested arrays", () => {
		attest({} as PushOperator<{ a: { b: number[] } }>)
			.type
			.toString
			.snap("PushOperator<{ a: { b: number[] } }>");
	});

	it("handles object arrays", () => {
		attest({} as PushOperator<{ a: { id: number; name: string }[] }>)
			.type
			.toString
			.snap("PushOperator<{ a: { id: number; name: string }[] }>");
	});

	it("handles no arrays", () => {
		attest({} as PushOperator<{ a: number; b: string }>)
			.type
			.toString
			.snap("PushOperator<{ a: number; b: string }>");
	});
});
