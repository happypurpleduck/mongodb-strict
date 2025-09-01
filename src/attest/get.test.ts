import type { Get } from "../types/get.ts";
import { attest } from "@ark/attest";
import { describe, it } from "vitest";

describe("get type", () => {
	it("gets simple property", () => {
		attest({} as Get<{ a: number }, "a">).type.toString.snap("number");
	});

	it("gets nested property", () => {
		attest({} as Get<{ a: { b: string } }, "a.b">).type.toString.snap("string");
	});

	it("gets array element", () => {
		attest({} as Get<string[], "0">).type.toString.snap("string | undefined");
	});

	it("handles invalid path", () => {
		attest({} as Get<{ a: number }, "b">).type.toString.snap("never");
	});
});
