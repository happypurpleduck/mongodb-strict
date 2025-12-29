/* eslint-disable no-template-curly-in-string */
import type { ExtendedPrimitive } from "../index.ts";
import type { Paths } from "../types/path.ts";
import { attest } from "@ark/attest";

import { describe, it } from "vitest";

describe("paths type", () => {
	it("generates paths for simple object", () => {
		attest({} as Paths<{ a: number; b: string }>)
			.type
			.toString
			.snap("\"a\" | \"b\"");
	});

	it("generates paths for nested object", () => {
		attest({} as Paths<{ a: { b: { c: boolean; d: number[] } } }>)
			.type
			.toString

			.snap("\"a.b\" | \"a\" | \"a.b.c\" | \"a.b.d\" | `a.b.d.${number}`");
	});

	it("handles primitive types", () => {
		attest({} as Paths<ExtendedPrimitive>)
			.type
			.toString
			.snap("never");
	});

	it("generates paths for primitive array", () => {
		attest({} as Paths<ExtendedPrimitive[]>)
			.type
			.toString
			.snap("number | `${number}`");
	});

	it("generates paths for array", () => {
		attest({} as Paths<{ a: number; b: string }[]>)
			.type
			.toString
			.snap("  | number\n  | `${number}`\n  | \"a\"\n  | \"b\"\n  | `${number}.a`\n  | `${number}.b`");
	});
});
