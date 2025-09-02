import type { PickDeep } from "../types/pick-deep.ts";
import { attest } from "@ark/attest";
import { describe, it } from "vitest";

describe("pickDeep type", () => {
	it("picks top-level property", () => {
		attest({} as PickDeep<{ a: number; b: string }, "a">)
			.type
			.toString
			.snap("{ a: number }");
	});

	it("picks nested property", () => {
		attest({} as PickDeep<{ a: { b: number; c: string } }, "a.b">)
			.type
			.toString
			.snap("{ a: { b: number } }");
	});

	it("picks from array", () => {
		attest({} as PickDeep<{ a: number[] }, "a.0">)
			.type
			.toString
			.snap("{ a: [number] }");
	});

	it("picks multiple paths", () => {
		attest({} as PickDeep<{ a: number; b: string; c: boolean }, "a" | "c">)
			.type
			.toString
			.snap("{ a: number; c: boolean }");
	});
});
